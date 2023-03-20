
export const fetchGeotagDescriptions = async (places: any[]): Promise<string[]> => {
  try {
    const response = await fetch(
      `http://localhost:3000/places/location-descriptions`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(places),
      }
    );
    const json: string[] = await response.json();
    return json;
  } catch (error) {
    // Handle the error here
    console.error(error);
    return [];
  }
};