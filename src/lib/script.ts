export const WORDS_PER_MINUTE = 150;
export const HOOK_MAX_SECONDS = 3;

export function countWords(text: string) {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}
export function secondsFor(words: number) {
  return Math.round((words / WORDS_PER_MINUTE) * 60);
}
export function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return m > 0 ? `${m}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}
