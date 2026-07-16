import { ref, watch } from "vue";
import { useUrlSearchParams } from "@vueuse/core";
import { Place, useSearch } from "./search";

const isValidID = (value: string): boolean => /^[NWR]?\d+$/.test(value);

export const useDetail = () => {
  const place = ref<Place | null>(null);
  const params = useUrlSearchParams("history", {
    writeMode: "push",
  });
  const clearID = () => {
    delete params.id;
    place.value = null;
  };

  const { searchByID } = useSearch();
  watch(() => params.id, async (newId) => {
    const id = Array.isArray(newId) ? newId[0] : newId;
    if (!id) {
      place.value = null;
      return;
    }
    if (!isValidID(id)) {
      place.value = null;
      return;
    }
    place.value = await searchByID(id);
  }, { immediate: true });

  return {
    place,
    clearID,
  };
};
