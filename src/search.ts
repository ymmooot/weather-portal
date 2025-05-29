import { loadCache, saveCache } from "./cache.ts";

export type Place = {
  name: string;
  display_name: string;
  addresstype: string;
  lat: string;
  lon: string;
};

const cache = loadCache();

function updateCache(query: string, places: Place[]) {
  cache.set(query, places);
  saveCache(cache);
}

export const searchLocation = async (query: string): Promise<Place[]> => {
  if (cache.has(query)) {
    return cache.get(query)!;
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${
      encodeURIComponent(query)
    }`,
  );
  if (!response.ok) return [];
  const res = await response.json();

  // deno-lint-ignore no-explicit-any
  const places = res.map((item: any) => ({
    name: item.name,
    display_name: item.display_name,
    addresstype: item.type,
    lat: item.lat,
    lon: item.lon,
  }));

  updateCache(query, places);

  return places;
};
