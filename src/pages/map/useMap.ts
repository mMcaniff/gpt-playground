import { useEffect, useState } from "react";
import { MarkerProps } from "./components/MapMarker";
import { Coords } from "google-map-react";

import { Place, StellerPlace } from "./models";
import { fetchPlaces, fetchStellerPlaces  } from "./data-providers";
import { handleSearch } from "./actions";
import { fetchGeotagDescriptions } from "./data-providers/fetchGeotagDescriptions";
import { getGeotags } from "./helpers/getGeotags";

const defaultProps = {
  center: {
    lat: 47.6062,
    lng: -122.3321,
  },
  zoom: 15,
};

interface MapState {
  selectedPlace?: Place;
  stellerStory: any;
  markers: MarkerProps[];
  mapCenter: Coords;
  mapZoom: number;
}

interface MapData {
  stellerPlaces: StellerPlace[],
  places: Place[],
}

export const useMap = () => {
  const [state, setState] = useState<MapState>({
    stellerStory: {},
    markers: [],
    mapCenter: defaultProps.center,
    mapZoom: defaultProps.zoom,
  });

  const [data, setData] = useState<MapData>({
    stellerPlaces: [],
    places: [],
  })

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    data.places = await fetchPlaces();
    data.stellerPlaces = await fetchStellerPlaces();
  }

  const onSearch = async (searchTerm: string) => {
    const { story, place } = await handleSearch(searchTerm, data.places, data.stellerPlaces);

    if (place) {
      const places = getGeotags(story);
      console.log(places);
      const descriptions = await fetchGeotagDescriptions(places);
      console.log(descriptions)
      place.geotagDescriptions = descriptions;

      setState((prevState) => ({
        ...prevState,
        selectedPlace: place,
        mapCenter: {lat: place.location.lat, lng: place.location.lng - .1},
        mapZoom: 12,
        stellerStory: story,
      }));
    }
  };

  const addMarker = (lat: number, lng: number, text: string) => {
    return { lat, lng, text, key: text };
  };

  const handleMapChange = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      mapCenter: event.center,
      mapZoom: event.zoom,
    }));
  }

  return {
    mapCenter: state.mapCenter,
    mapZoom: state.mapZoom,
    handleMapChange,
    markers: state.markers,
    onSearch,
    place: state.selectedPlace,
    story: state.stellerStory,
  };
};
