#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// QUESTION-POOL VALIDATOR — the guard for the pool standard documented at the
// top of src/engine/questionPool.ts. Run with `pnpm validate:pools`.
//
// Reads the POOLED_MODULES registry straight out of questionPool.ts (so opting
// a module in automatically puts it under guard), locates each module's data
// file in src/data/questions/, and asserts for every pooled module:
//   * exactly 40 questions with unique, module-prefixed ids
//   * q01–q20 are core: true, q21–q40 are core: false
//   * pair q(N)/q(N+20) shares framework, dimension and personWeight
//   * categorical pairs (answers carry `category`) share the exact same
//     answer-category set; every question has exactly 4 soloAnswers
//   * text carries all 4 locales (en/fr/ar/es), no stubs
//   * if the module uses soloText, EVERY question has one, with {name}
//     present in all 4 locales
// Exits 1 with a per-module failure list when anything is off.
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const QUESTIONS_DIR = join(ROOT, 'src', 'data', 'questions');
const POOL_FILE = join(ROOT, 'src', 'engine', 'questionPool.ts');

// ── 1. Pooled module ids from the registry ───────────────────────────────────
const poolSrc = readFileSync(POOL_FILE, 'utf8');
const registryMatch = poolSrc.match(/const POOLED_MODULES = new Set<string>\(\[([\s\S]*?)\]\)/);
if (!registryMatch) {
  console.error('validate:pools — could not find POOLED_MODULES registry in questionPool.ts');
  process.exit(1);
}
const pooledIds = [...registryMatch[1].matchAll(/'([\w]+)'/g)].map((m) => m[1]);

// Polarity-balanced modules (red_green_flag) replace the core/counterpart axis
// with a red/green one — read straight out of the same file so the two registries
// can never drift. These skip the q(N+20) pairing + core:false assertions and get
// their own polarity rules instead (see below).
const polarityMatch = poolSrc.match(
  /const POLARITY_BALANCED_MODULES = new Set<string>\(\[([\s\S]*?)\]\)/,
);
const polarityIds = new Set(
  polarityMatch ? [...polarityMatch[1].matchAll(/'([\w]+)'/g)].map((m) => m[1]) : [],
);
if (pooledIds.length === 0) {
  console.log('validate:pools — registry is empty, nothing to validate.');
  process.exit(0);
}

// ── 2. moduleId → data file (found by its q01 id) ────────────────────────────
const files = readdirSync(QUESTIONS_DIR).filter((f) => f.endsWith('.ts'));
const fileByModule = {};
for (const f of files) {
  const src = readFileSync(join(QUESTIONS_DIR, f), 'utf8');
  for (const id of pooledIds) {
    if (src.includes(`id: '${id}_q01'`)) fileByModule[id] = { file: f, src };
  }
}

// ── 3. Per-module checks ─────────────────────────────────────────────────────
const LOCALES = ['en', 'fr', 'ar', 'es'];
let failed = false;

for (const moduleId of pooledIds) {
  const entry = fileByModule[moduleId];
  const problems = [];
  if (!entry) {
    console.error(`✗ ${moduleId}: no data file in src/data/questions/ contains '${moduleId}_q01'`);
    failed = true;
    continue;
  }

  // Split into per-question blocks (same boundaries as the authored layout).
  const blockRe = new RegExp(
    `id: '${moduleId}_q(\\d+)',([\\s\\S]*?)(?=\\n  \\{\\n    id: '${moduleId}_q|\\n\\];)`,
    'g',
  );
  const blocks = new Map();
  for (const m of entry.src.matchAll(blockRe)) {
    const num = parseInt(m[1], 10);
    if (blocks.has(num)) problems.push(`duplicate id q${m[1]}`);
    blocks.set(num, m[2]);
  }

  if (blocks.size !== 40) problems.push(`expected 40 questions, found ${blocks.size}`);

  const isPolarity = polarityIds.has(moduleId);
  const meta = new Map();
  const usesSolo = [...blocks.values()].some((b) => b.includes('soloText'));
  for (const [num, body] of blocks) {
    const fw = body.match(/framework: '(\w+)'/)?.[1] ?? null;
    const dim = body.match(/dimension: '(\w+)'/)?.[1] ?? null;
    const weight = body.match(/personWeight: (\d+)/)?.[1] ?? null;
    const coreTrue = body.includes('core: true');
    const coreFalse = body.includes('core: false');
    const cats = [...body.matchAll(/category: '(\w+)'/g)].map((m) => m[1]).sort();
    const answerCount = (body.match(/label: \{/g) ?? []).length;
    const polarity = body.match(/polarity: '(\w+)'/)?.[1] ?? null;
    meta.set(num, { fw, dim, weight, coreTrue, coreFalse, cats, body, answerCount, polarity });

    if (!fw) problems.push(`q${num}: missing framework`);
    if (!dim) problems.push(`q${num}: missing dimension`);
    for (const loc of LOCALES) {
      if (!new RegExp(`\\b${loc}: `).test(body)) problems.push(`q${num}: missing '${loc}' locale`);
    }
    // Polarity modules: ALL 40 are core:true (no counterpart axis) and every
    // question must declare a polarity. Others keep the core/counterpart rule.
    if (isPolarity) {
      if (!coreTrue) problems.push(`q${num}: must be core: true (polarity-balanced module)`);
      if (polarity !== 'red' && polarity !== 'green') {
        problems.push(`q${num}: missing or invalid polarity (expected 'red' | 'green')`);
      }
    } else {
      if (num <= 20 && !coreTrue) problems.push(`q${num}: must be core: true`);
      if (num > 20 && !coreFalse) problems.push(`q${num}: must be core: false`);
    }
    if (answerCount > 0 && answerCount !== 4) {
      problems.push(`q${num}: has ${answerCount} soloAnswers, expected 4`);
    }
    if (usesSolo) {
      const solo = body.match(/soloText: \{([\s\S]*?)\n    \}/)?.[1];
      if (!solo) problems.push(`q${num}: missing soloText`);
      else if ((solo.match(/\{name\}/g) ?? []).length < 4) {
        problems.push(`q${num}: soloText missing {name} in one or more locales`);
      }
    }
  }

  if (isPolarity) {
    // ── Polarity rules (replace the q(N+20) pairing assertions entirely) ──
    // exactly 20 of each polarity, and exactly 4 per (dimension × polarity) so
    // the sampler's 10 buckets of 4 always yield 2 per bucket = 10 red/10 green.
    const byPolarity = { red: 0, green: 0 };
    const byDimPol = {};
    for (const { dim, polarity } of meta.values()) {
      if (polarity in byPolarity) byPolarity[polarity] += 1;
      if (dim && polarity) {
        const key = `${dim}|${polarity}`;
        byDimPol[key] = (byDimPol[key] ?? 0) + 1;
      }
    }
    if (byPolarity.red !== 20) problems.push(`expected 20 red questions, found ${byPolarity.red}`);
    if (byPolarity.green !== 20) {
      problems.push(`expected 20 green questions, found ${byPolarity.green}`);
    }
    const dims = [...new Set([...meta.values()].map((m) => m.dim).filter(Boolean))].sort();
    for (const dim of dims) {
      for (const pol of ['red', 'green']) {
        const n = byDimPol[`${dim}|${pol}`] ?? 0;
        if (n !== 4) problems.push(`${dim} × ${pol}: expected 4 questions, found ${n}`);
      }
    }
  } else {
  for (let i = 1; i <= 20; i++) {
    const a = meta.get(i);
    const b = meta.get(i + 20);
    if (!a || !b) {
      problems.push(`pair q${i}/q${i + 20}: one side missing`);
      continue;
    }
    if (a.fw !== b.fw) problems.push(`pair q${i}/q${i + 20}: framework ${a.fw} ≠ ${b.fw}`);
    if (a.dim !== b.dim) problems.push(`pair q${i}/q${i + 20}: dimension ${a.dim} ≠ ${b.dim}`);
    if (a.weight !== b.weight) {
      problems.push(`pair q${i}/q${i + 20}: personWeight ${a.weight} ≠ ${b.weight}`);
    }
    if (a.cats.join() !== b.cats.join()) {
      problems.push(
        `pair q${i}/q${i + 20}: category sets differ (${a.cats.join(',')}) vs (${b.cats.join(',')})`,
      );
    }
  }
  }

  if (problems.length) {
    failed = true;
    console.error(`✗ ${moduleId} (${entry.file}):`);
    for (const p of problems) console.error(`    ${p}`);
  } else {
    const catTotals = {};
    for (const { cats } of meta.values()) for (const c of cats) catTotals[c] = (catTotals[c] ?? 0) + 1;
    const catNote = Object.keys(catTotals).length
      ? ` — slots: ${Object.entries(catTotals).map(([k, v]) => `${k} ${v}`).join(', ')}`
      : '';
    const shape = isPolarity
      ? '20 red / 20 green, 4 per dimension × polarity OK'
      : '20 pairs OK';
    console.log(`✓ ${moduleId} (${entry.file}): 40 questions, ${shape}${catNote}`);
  }
}

if (failed) {
  console.error('\nvalidate:pools FAILED — see the pool standard in src/engine/questionPool.ts');
  process.exit(1);
}
console.log(`\nvalidate:pools passed — ${pooledIds.length} pooled module(s) conform to the standard.`);
