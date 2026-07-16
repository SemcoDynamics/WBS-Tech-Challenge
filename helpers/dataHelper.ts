/**
 * Generates an accessible label for a date grid cell.
 * If `daysAhead` is omitted, a random number between 3 and 10 (inclusive) is used.
 * @param daysAhead - Number of days in the future (optional)
 * @param locale - Locale for formatting (default: 'en-GB')
 */
export function gridCellLabelFor(daysAhead?: number, locale = 'en-GB'): string {
  // pick a random integer between min and max inclusive
  function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const offset = daysAhead === undefined ? randInt(3, 10) : daysAhead;

  const d = new Date();
  d.setDate(d.getDate() + offset);

  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(d);
  const day = d.getDate();
  const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(d);

  return `Choose ${weekday}, ${day} ${month}`;
}
