/** Dev-only logger — no-op in production. */
export const logger = {
  log: (...args: unknown[]) => {
    if (__DEV__) console.log('[Aurafy]', ...args);
  },
  warn: (...args: unknown[]) => {
    if (__DEV__) console.warn('[Aurafy]', ...args);
  },
  error: (...args: unknown[]) => {
    if (__DEV__) console.error('[Aurafy]', ...args);
  },
};
