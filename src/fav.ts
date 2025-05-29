import { useLocalStorage } from "@vueuse/core";
import { type Place } from "./search.ts";

export const useFav = () => {
  const store = useLocalStorage("fav_v2", [] as Place[]);
  const toggle = (place: Place) => {
    if (store.value.some((p) => p.place_id === place.place_id)) {
      store.value = store.value.filter((p) => p.place_id !== place.place_id);
    } else {
      store.value.unshift(place);
    }
  };
  const get = () => {
    return store.value;
  };
  const isFav = (place: Place) =>
    store.value.some((p) => p.place_id === place.place_id);
  return {
    toggle,
    get,
    isFav,
  };
};
