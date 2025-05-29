import { useLocalStorage } from "@vueuse/core";

export type Place = {
  name: string;
  display_name: string;
  addresstype: string;
  lat: string;
  lon: string;
};

export const useHistory = () => {
  const store = useLocalStorage("search_history_v1", [] as string[]);
  const add = (query: string) => {
    const idx = store.value.indexOf(query);
    if (idx !== -1) {
      store.value.splice(idx, 1);
    }
    store.value.unshift(query);
    if (store.value.length > 20) store.value.length = 20;
  };
  const get = () => {
    return store.value;
  };
  return {
    add,
    get,
  };
};

export const useSearch = () => {
  const store = useLocalStorage(
    "search_location_cache_v1",
    new Map<string, Place[]>(),
  );
  const history = useHistory();
  const search = async (query: string): Promise<Place[]> => {
    if (store.value.has(query)) {
      history.add(query);
      return store.value.get(query)!;
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

    store.value.set(query, places);
    if (places.length > 0) {
      history.add(query);
    }

    return places;
  };

  return { search, history };
};
