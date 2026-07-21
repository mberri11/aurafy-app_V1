import { create } from 'zustand';
import { Person, ReadingMode, ResultData } from '../types';

/** Transient session state for the current reading flow (not persisted). */
interface ReadingState {
  currentModuleId: string;
  currentMode: ReadingMode;
  currentPersons: Person[];
  currentAnswers: Record<string, string>;
  currentResult: ResultData | null;
  viewOnlyResult: ResultData | null; // for reading history view
  /** Option C two-tier result: false = minimal (name + verdict + confidence only);
   *  true = full (insights, full picture, share). Set by the ad-gate (watch ad or
   *  1★ → true, free skip → false) or by the unlock card on the result itself. */
  resultUnlocked: boolean;
  /** Deterministic seed for this reading session's question selection (see
   *  src/engine/questionPool.ts). Minted once per startReading so re-renders and
   *  quiz-resume keep the same served set; a fresh reading gets a fresh seed. */
  currentSeed: number;
  /** The exact question ids the quiz served, in served order — loading.tsx scores
   *  against these and result.tsx persists them onto the saved Reading. */
  currentQuestionIds: string[];
  // Actions
  startReading: (moduleId: string, mode: ReadingMode, persons: Person[]) => void;
  setServedQuestions: (questionIds: string[]) => void;
  recordAnswer: (questionId: string, value: string) => void;
  setResult: (result: ResultData) => void;
  setViewOnlyResult: (result: ResultData | null) => void;
  setResultUnlocked: (unlocked: boolean) => void;
  resetReading: () => void;
}

export const useReadingStore = create<ReadingState>()((set) => ({
  currentModuleId: '',
  currentMode: 'solo',
  currentPersons: [],
  currentAnswers: {},
  currentResult: null,
  viewOnlyResult: null,
  resultUnlocked: false,
  currentSeed: 0,
  currentQuestionIds: [],

  startReading: (moduleId: string, mode: ReadingMode, persons: Person[]): void => {
    set({
      currentModuleId: moduleId,
      currentMode: mode,
      currentPersons: persons,
      currentAnswers: {},
      currentResult: null,
      resultUnlocked: false,
      currentSeed: Date.now(),
      currentQuestionIds: [],
    });
  },

  setServedQuestions: (questionIds: string[]): void => {
    set({ currentQuestionIds: questionIds });
  },

  recordAnswer: (questionId: string, value: string): void => {
    set((s) => ({ currentAnswers: { ...s.currentAnswers, [questionId]: value } }));
  },

  setResult: (result: ResultData): void => {
    set({ currentResult: result });
  },

  setViewOnlyResult: (result: ResultData | null): void => {
    set({ viewOnlyResult: result });
  },

  setResultUnlocked: (unlocked: boolean): void => {
    set({ resultUnlocked: unlocked });
  },

  resetReading: (): void => {
    set({
      currentModuleId: '',
      currentMode: 'solo',
      currentPersons: [],
      currentAnswers: {},
      currentResult: null,
      resultUnlocked: false,
      currentSeed: 0,
      currentQuestionIds: [],
    });
  },
}));
