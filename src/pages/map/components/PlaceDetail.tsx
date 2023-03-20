import React, { useState } from "react";
//import "../../../css/trip/PlaceDetail.css";
import { Place } from "../models";

interface Props {
  place?: Place;
}

const PlaceDetail: React.FC<Props> = (props) => {
  const [selectedNav, setSelectedNav] = useState("description");

  const nav = {
    description: props.place?.description,
    itinerary: props.place?.itinerary,
    story: props.place?.story,
    hotels: props.place?.hotels,
    geotags: props.place?.geotagDescriptions,
  } as any;

  const handleNavClick = (navItem: string) => {
    setSelectedNav(navItem);
  };

  const renderNavContent = () => {
    if (selectedNav === "itinerary") {
      return (
        <ul>
          {nav[selectedNav].map((item: any, index: number) => (
            <li key={index}>
              <b>{item.place}</b>: {item.description}
            </li>
          ))}
        </ul>
      );
    }

    if (selectedNav === "hotels") {
      return (
        <ul>
          {nav[selectedNav].map((item: any, index: number) => (
            <li key={index}>
              <b>{item.hotelName}</b>: {item.description}
            </li>
          ))}
        </ul>
      );
    }

    if (selectedNav === "geotags") {
      return (
        <ul style={{display: 'flex', flexDirection: 'column'}}>
          {nav[selectedNav].map((item: any, index: number) => (
            <li key={index} style={{marginBottom: '25px'}}>
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return <p>{nav[selectedNav]}</p>;
  };

  return (
    <div className="place-detail">
      <div className="place-detail__nav">
        <button onClick={() => handleNavClick("description")}>
          Description
        </button>
        <button onClick={() => handleNavClick("itinerary")}>Itinerary</button>
        <button onClick={() => handleNavClick("story")}>Story</button>
        <button onClick={() => handleNavClick("hotels")}>Hotels</button>
        <button onClick={() => handleNavClick("geotags")}>Geotags</button>
      </div>
      <div className="place-detail__content">{renderNavContent()}</div>
    </div>
  );
};

export default PlaceDetail;
