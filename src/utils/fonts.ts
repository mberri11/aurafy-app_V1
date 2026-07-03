// Arabic typography: in RTL/Arabic, swap the Latin display/body faces (Playfair Display,
// Hanken Grotesk — neither of which has Arabic glyphs) for Noto Naskh Arabic at the matching
// weight. Playfair maps to Naskh too so Arabic headings/wordmark-adjacent titles render in
// the proper Naskh face rather than a system fallback. The heavy 800/900 body weights map to
// the heaviest loaded Naskh (700) so Arabic never falls through to a glyph-less Latin face.

const NASKH_BY_FAMILY: Record<string, string> = {
  HankenGrotesk_400Regular: 'NotoNaskhArabic_400Regular',
  HankenGrotesk_500Medium: 'NotoNaskhArabic_500Medium',
  HankenGrotesk_600SemiBold: 'NotoNaskhArabic_600SemiBold',
  HankenGrotesk_700Bold: 'NotoNaskhArabic_700Bold',
  HankenGrotesk_800ExtraBold: 'NotoNaskhArabic_700Bold',
  HankenGrotesk_900Black: 'NotoNaskhArabic_700Bold',
  PlayfairDisplay_400Regular: 'NotoNaskhArabic_400Regular',
  PlayfairDisplay_600SemiBold: 'NotoNaskhArabic_600SemiBold',
  PlayfairDisplay_700Bold: 'NotoNaskhArabic_700Bold',
  // Share-card quote face — Naskh has no italic; regular is the correct AR fallback.
  PlayfairDisplay_400Regular_Italic: 'NotoNaskhArabic_400Regular',
};

/** Map a Latin font family to its Arabic Naskh equivalent when `isRTL`; identity otherwise. */
export function arFont(family: string | undefined, isRTL: boolean): string | undefined {
  if (!isRTL || !family) return family;
  return NASKH_BY_FAMILY[family] ?? family;
}
