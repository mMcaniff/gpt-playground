import React from "react";
import GoogleMapReact from "google-map-react";
import { Input } from "antd";

import StellerEmbed from "../../components/steller/Embed";
import PlaceDetail from "./components/PlaceDetail";
import { useMap } from "./useMap";

import { MapMarker, MarkerProps } from "./components/MapMarker"
import { googleConfig } from "../../configuration/configuration";

import "./MapPage.css";

const MapPage: React.FC = () => {
  const { mapCenter, mapZoom, markers, place, story, handleMapChange, onSearch } = useMap();

  const onChange = (event: any) => {
    handleMapChange(event);
  }

  console.log(place?.geotagDescriptions);
  return (
    <div className="map-page-container">
      <div>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: googleConfig.accessKeyId,
          }}
          center={mapCenter}
          zoom={mapZoom}
          onChange={onChange}
          style = {{ zIndex: -1}}
        >
          {/* {markers.map((marker: MarkerProps) => (
            <MapMarker lat={marker.lat} lng={marker.lng} text={marker.text} key={marker.text}/>
          ))} */}
        </GoogleMapReact>
        <Input.Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          className="search-bar"
        />
      </div>
      <div className="place-detail-container">
        {<StellerEmbed key={story.id} story={story} />}
        <PlaceDetail 
          place={place}
        />
      </div>
    </div>
  );
}

export default MapPage;
