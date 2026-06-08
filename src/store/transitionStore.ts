import { create } from 'zustand';

/**
 * Tiny transient (non-persisted) flag. Set when the user taps "Begin" on the last
 * onboarding slide so Home knows to play the one-shot cosmic intro overlay exactly
 * once. Rendering the reveal as an overlay on top of an already-mounted Home (rather
 * than a separate route) means there is no route-swap gap / black flash on handoff.
 */
interface TransitionState {
  playIntro: boolean;
  requestIntro: () => void;
  consumeIntro: () => void;
}

export const useTransitionStore = create<TransitionState>((set) => ({
  playIntro: false,
  requestIntro: () => set({ playIntro: true }),
  consumeIntro: () => set({ playIntro: false }),
}));
