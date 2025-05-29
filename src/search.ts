export type Place = {
  name: string;
  display_name: string;
  addresstype: string;
  lat: string;
  lon: string;
};

export const searchLocation = async (query: string): Promise<Place[]> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${
      encodeURIComponent(query)
    }`,
  );
  if (!response.ok) return [];
  const res = await response.json();

  // deno-lint-ignore no-explicit-any
  return res.map((item: any) => ({
    name: item.name,
    display_name: item.display_name,
    addresstype: item.type,
    lat: item.lat,
    lon: item.lon,
  }));
};
