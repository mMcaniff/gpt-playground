import { fetchStellerPlaceStories } from "../data-providers";
import { findClosestPlaceMatch, findClosestStellerMatch } from "../helpers/findClosestMatch";
import { Place } from "../models";
import { StellerPlace } from "../models";

export const handleSearch = async (searchTerm: string, places: Place[], stellerPlaces: StellerPlace[]) => {
  console.log(searchTerm, places, stellerPlaces);

  const stellerPlace: StellerPlace = findClosestStellerMatch(searchTerm, stellerPlaces);
  const stories = await fetchStellerPlaceStories(stellerPlace.id);
  const randomIndex = Math.floor(Math.random() * stories.data.length);
  const story = await stories.data[randomIndex].story;
  const place = findClosestPlaceMatch(searchTerm, places);
  place.geotagDescriptions = ["Searching..."];

  

  return {
    story: story,
    place: place, 
  }
};