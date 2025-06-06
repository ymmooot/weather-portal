import { ref, watch } from "vue";
import { useUrlSearchParams } from "@vueuse/core";
import { Place, useSearch } from "./search";

const isValidNumber = (value: string): boolean => !isNaN(Number(value)) && Number(value) >= 0;

export const useDetail = () => {
  const place = ref<Place | null>(null);
  const params = useUrlSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const clearID = () => {
    delete params.id;
    place.value = null;
  };

  const { searchByID } = useSearch();
  watch(() => id, async (newId) => {
    if (!newId) {
      place.value = null;
      return;
    }
    if (!isValidNumber(newId)) {
      place.value = null;
      return;
    }
    place.value = await searchByID(newId);
  }, { immediate: true });

  return {
    place,
    clearID,
  };
};
