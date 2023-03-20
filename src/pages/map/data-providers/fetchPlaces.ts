import { Place } from "../models";

const fetchPlaces = async (): Promise<Place[]> => {
  try {
    const response = await fetch(`http://localhost:3000/places/`, {
      method: 'GET'
    });
  
    const data:Place[] = await response.json();
    return data;
  } catch (error) {
    // Handle the error here
    console.error(error);
    return [];
  }
}

export default fetchPlaces; 
