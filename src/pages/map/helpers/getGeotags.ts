export function getGeotags(story: any) {
  console.log("getGeogtags")
  var places: any[] = [];
  console.log(story)
  for (var page of story.pages) {
    for (var layer of page.layers) {
      if (layer.type === "group") {
        for (var layerInLayer of layer.layers) {
          if (layerInLayer.type === "geo_widget") {
            if (layerInLayer.title === "Add a location") {continue;}
            const name = layerInLayer.title;
            const location = layerInLayer.geo_pin.location; 
            const geoData = {
              name,
              location,
            }
            places = [...places, geoData];
            console.log(places);
          }
        }
      } else if (layer.type === "geo_widget") {
        if (layer.title === "Add a location") {continue;}
        const name = layer.title;
        const location = layer.geo_pin.location;
        const geoData = {
          name,
          location,
        }
        places = [...places, geoData];
        console.log(places);
      }
    }
  }

  return places;
}