import React from 'react';
import { Text as RNText, StyleSheet, TextProps, TextStyle } from 'react-native';
import { useIsRTL } from '@/src/utils/rtl';
import { arFont } from '@/src/utils/fonts';

interface AppTextProps extends TextProps {
  /** Opt out of the Arabic Naskh swap — e.g. the Latin "Aurafy" wordmark. */
  latin?: boolean;
}

/**
 * Drop-in replacement for RN `<Text>` that swaps the font family to its Arabic Naskh
 * equivalent when the active language is RTL (see `arFont`). Screens import it as
 * `{ AppText as Text }` so every existing `<Text>` picks up Naskh in Arabic with no
 * per-site change. Latin-only text (wordmark) passes `latin` to keep its display face.
 */
export const AppText = React.forwardRef<RNText, AppTextProps>(function AppText(
  { style, latin, ...rest },
  ref,
) {
  const isRTL = useIsRTL();
  const mappedStyle = React.useMemo(() => {
    if (!isRTL || latin) return style;
    const flat = StyleSheet.flatten(style) as TextStyle | undefined;
    const family = flat?.fontFamily;
    if (!family) return style;
    const naskh = arFont(family, true);
    return naskh === family ? style : [style, { fontFamily: naskh }];
  }, [style, isRTL, latin]);

  return <RNText ref={ref} style={mappedStyle} {...rest} />;
});

export default AppText;
