import { Itinerary, Hotel, Location } from "./"

export default interface Place {
  id: string,
  name:string,
  location: Location
  description: string
  itinerary: Itinerary
  story: string
  hotels: Hotel[]
  geotagDescriptions: string[]
}