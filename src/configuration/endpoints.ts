export const stellerEndpoints = () => {

  const getPartnerPlace = (placeId: number) => `https://api.steller.co/v1/places/internal/${placeId}`;
  const getPartnerStoriesForPlace = (placeId: number) => `https://partners.steller.co/v1/places/${placeId}/content`;
  
}