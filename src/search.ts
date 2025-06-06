import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { searchByIDResultCacheKey, searchQueryCacheKey, searchResultCacheKey } from "./const.ts";

export type Place = {
  place_id: string;
  osm_id: string;
  name: string;
  display_name: string;
  addresstype: string;
  lat: number;
  lon: number;
};

export const useHistory = () => {
  const store = useLocalStorage(searchQueryCacheKey, [] as string[]);
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

const isJapan = (detail: string) => detail.endsWith("日本");
const resToPlace = (item: any): Place => {
  const p = {
    place_id: item.place_id.toString(),
    osm_id: item.osm_id.toString(),
    name: item.name,
    display_name: item.display_name,
    addresstype: item.type,
    lat: item.lat,
    lon: item.lon,
  };
  if (!p.name) {
    p.name = item.names?.name;
  }
  if (!item.lat) {
    p.lon = item.geometry?.coordinates[0];
    p.lat = item.geometry?.coordinates[1];
  }
  return p as Place;
};

export const useSearch = () => {
  const store = useLocalStorage(
    searchResultCacheKey,
    new Map<string, Place[]>(),
  );
  const history = useHistory();
  const searching = ref(false);
  const search = async (query: string): Promise<Place[]> => {
    searching.value = true;

    if (store.value.has(query)) {
      history.add(query);
      searching.value = false;
      return store.value.get(query)!;
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
    );
    if (!response.ok) {
      searching.value = false;
      return [];
    }
    const res = await response.json();

    // deno-lint-ignore no-explicit-any
    const places = res.map(resToPlace).filter((place: Place) => isJapan(place.display_name));

    store.value.set(query, places);
    if (places.length > 0) {
      history.add(query);
    }

    searching.value = false;
    return places;
  };

  const storeForID = useLocalStorage(
    searchByIDResultCacheKey,
    new Map<string, Place>(),
  );

  const searchByID = async (osmID: string): Promise<Place | null> => {
    if (storeForID.value.has(osmID)) {
      return storeForID.value.get(osmID)!;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/details?osmtype=N&osmid=${osmID}&addressdetails=0&hierarchy=0&group_hierarchy=1&format=json`,
      );
      if (!response.ok) {
        return null;
      }
      const res = await response.json();
      const place = resToPlace(res);
      storeForID.value.set(osmID, place);
      return place;
    } catch {
      return null;
    }
  };

  return { search, history, searching, searchByID };
};
