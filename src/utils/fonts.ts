// Arabic typography: in RTL/Arabic, swap the Latin display/body faces (Playfair Display,
// Inter — neither of which has Arabic glyphs) for Noto Naskh Arabic at the matching weight.
// Playfair maps to Naskh too so Arabic headings/wordmark-adjacent titles render in the
// proper Naskh face rather than a system fallback.

const NASKH_BY_FAMILY: Record<string, string> = {
  Inter_400Regular: 'NotoNaskhArabic_400Regular',
  Inter_500Medium: 'NotoNaskhArabic_500Medium',
  Inter_600SemiBold: 'NotoNaskhArabic_600SemiBold',
  Inter_700Bold: 'NotoNaskhArabic_700Bold',
  PlayfairDisplay_400Regular: 'NotoNaskhArabic_400Regular',
  PlayfairDisplay_600SemiBold: 'NotoNaskhArabic_600SemiBold',
  PlayfairDisplay_700Bold: 'NotoNaskhArabic_700Bold',
};

/** Map a Latin font family to its Arabic Naskh equivalent when `isRTL`; identity otherwise. */
export function arFont(family: string | undefined, isRTL: boolean): string | undefined {
  if (!isRTL || !family) return family;
  return NASKH_BY_FAMILY[family] ?? family;
}
