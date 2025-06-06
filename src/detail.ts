import { ref, watch } from "vue";
import { useUrlSearchParams } from "@vueuse/core";
import { Place, useSearch } from "./search";

const isValidNumber = (value: string): boolean => !isNaN(Number(value)) && Number(value) >= 0;

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
    if (!isValidNumber(id)) {
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
