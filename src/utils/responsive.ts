import { Dimensions } from 'react-native';

/**
 * Responsive scaling.
 *
 * Every size in `design-reference/screenshots/*` was authored on a **360dp-wide**
 * logical screen — the same width as the primary test device. We express layout
 * values in those design-dp and scale them linearly with the real screen width so
 * the UI holds its proportions on narrower/wider phones and small tablets.
 *
 * Measurement → code conversion (how the design numbers were derived):
 *   design PNG is 1080px wide but framed in a device bezel; the live screen
 *   content is ~880px ⇒ **2.444 px per dp**  → design_dp = design_px / 2.444
 *   a device screenshot of width W maps W px ⇒ 360 dp ⇒ **W/360 px per dp**
 *     (the 540px reference shots ⇒ 1.5 px/dp) → device_dp = device_px / 1.5
 * Compare both in dp; the code value is the design_dp.
 *
 * On the 360dp baseline device FACTOR === 1, so values are unchanged there.
 */
const BASE_WIDTH = 360;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Clamp so tiny phones aren't unreadable and tablets don't balloon.
const FACTOR = Math.min(Math.max(SCREEN_WIDTH / BASE_WIDTH, 0.85), 1.25);

/** Scale a design-baseline dp value to the current screen width. */
export function rs(size: number): number {
  return size * FACTOR;
}

export const screenWidth = SCREEN_WIDTH;
export const scaleFactor = FACTOR;
