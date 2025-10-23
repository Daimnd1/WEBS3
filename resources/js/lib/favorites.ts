const KEY = "favorites:ids";
const toKey = (id: string | number) => String(id);

const safeGet = (k: string): string | null => {
  if (typeof window === "undefined") return null;
  try { return window.localStorage.getItem(k); } catch { return null; }
};
const safeSet = (k: string, v: string): void => {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(k, v); } catch {}
};


function read(): string[] {
  const raw = safeGet(KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as string[]; } catch { return []; }
}

function write(ids: string[]): void {
  safeSet(KEY, JSON.stringify(ids));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("favorites:changed"));
  }
}

// PUBLIC API
export function getFavoriteIds(): string[] {
  return read();
}

export function isFavorite(id: string | number): boolean {
  return read().includes(toKey(id));
}

export function addFavorite(id: string | number): void {
  const k = toKey(id);
  const ids = read();
  if (!ids.includes(k)) write([...ids, k]);
}

export function removeFavorite(id: string | number): void {
  const k = toKey(id);
  write(read().filter((x) => x !== k));
}

export function toggleFavorite(id: string | number): void {
  const k = toKey(id);
  const ids = read();
  const i = ids.indexOf(k);
  if (i >= 0) ids.splice(i, 1); else ids.push(k);
  write(ids);
}

export function clearFavorites(): void {
  write([]);
}
