export function pad(n: number) {
  return String(n).padStart(2, "0");
}
export function toISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
export function todayISO() {
  return toISO(new Date());
}
export function parseISO(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}
/** 6 weeks (42 days) grid starting on Monday for the given month. */
export function monthGrid(year: number, month: number): string[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // Monday = 0
  const start = new Date(year, month, 1 - offset);
  return Array.from({ length: 42 }, (_, i) =>
    toISO(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)),
  );
}
export function startOfWeekISO(d = new Date()) {
  const offset = (d.getDay() + 6) % 7;
  return toISO(new Date(d.getFullYear(), d.getMonth(), d.getDate() - offset));
}
export function addDaysISO(iso: string, days: number) {
  const d = parseISO(iso);
  return toISO(new Date(d.getFullYear(), d.getMonth(), d.getDate() + days));
}
