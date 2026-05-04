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
  // Actions
  startReading: (moduleId: string, mode: ReadingMode, persons: Person[]) => void;
  recordAnswer: (questionId: string, value: string) => void;
  setResult: (result: ResultData) => void;
  setViewOnlyResult: (result: ResultData | null) => void;
  resetReading: () => void;
}

export const useReadingStore = create<ReadingState>()((set) => ({
  currentModuleId: '',
  currentMode: 'solo',
  currentPersons: [],
  currentAnswers: {},
  currentResult: null,
  viewOnlyResult: null,

  startReading: (moduleId: string, mode: ReadingMode, persons: Person[]): void => {
    set({ currentModuleId: moduleId, currentMode: mode, currentPersons: persons, currentAnswers: {}, currentResult: null });
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

  resetReading: (): void => {
    set({ currentModuleId: '', currentMode: 'solo', currentPersons: [], currentAnswers: {}, currentResult: null });
  },
}));
