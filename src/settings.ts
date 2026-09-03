import { useLocalStorage } from "@vueuse/core";
import { settingsCacheKey } from "./const.ts";

export type Settings = {
  // Show the ShadeMap link on place cards
  shadeMap: boolean;
};

const defaultSettings: Settings = {
  shadeMap: false,
};

export const useSettings = () => {
  const settings = useLocalStorage<Settings>(settingsCacheKey, defaultSettings, {
    mergeDefaults: true,
  });
  return { settings };
};
