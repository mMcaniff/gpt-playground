import { Location, Place } from "./";

export default interface MapState {
  center: Location, 
  zoom: Number, 
  place: Place, 
  places: [Place]
}