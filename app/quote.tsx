// Daily Quote — the daily ritual. Pushed from Home, the Stars daily card and the
// FeaturedInsightCard ritual variant. NO [id] param: there is only ever TODAY's quote,
// resolved from the user's anchor inside the screen.
// Thin re-export; implementation in src/screens (same split the Insights screens use).
// Stack registration: app/_layout.tsx (name="quote").
export { default } from '@/src/screens/quotes/DailyQuoteScreen';
