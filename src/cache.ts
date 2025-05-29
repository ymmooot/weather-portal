import type { Place } from "./search.ts";

const CACHE_KEY = "search_location_cache_v1";

export function loadCache(): Map<string, Place[]> {
  const cache = new Map<string, Place[]>();
  if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
    try {
      const raw = globalThis.localStorage.getItem(CACHE_KEY);
      if (raw) {
        const obj = JSON.parse(raw) as Record<string, Place[]>;
        for (const [k, v] of Object.entries(obj)) {
          cache.set(k, v);
        }
      }
    } catch (_e) {
      // ignore
    }
  }
  return cache;
}

export function saveCache(cache: Map<string, Place[]>) {
  if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
    try {
      const obj: Record<string, Place[]> = {};
      for (const [k, v] of cache.entries()) {
        obj[k] = v;
      }
      globalThis.localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
    } catch (_e) {
      // ignore
    }
  }
}
