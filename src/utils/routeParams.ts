export function getWordParam(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return '';

  try {
    return decodeURIComponent(String(raw)).trim().toLowerCase();
  } catch {
    return String(raw).trim().toLowerCase();
  }
}
