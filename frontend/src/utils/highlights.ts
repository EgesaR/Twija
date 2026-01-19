// utils/highlights.ts
export function generateHighlights(steps: string[]): string[] {
  return steps
    .map((step) =>
      step
        .replace(/\(.*?\)/g, '') // remove brackets
        .replace(/Begin at|Start at|Visit|Explore|Discover|Enjoy|See/gi, '')
        .trim()
    )
    .filter(Boolean)
    .slice(0, 5); // max 5 highlights
}
