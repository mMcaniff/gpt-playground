import axios from 'axios';
import { stellerConfig } from '../../../configuration/configuration';

export const fetchStellerPlaceStories = async (placeId: string) => {
  try {
    const url = `https://partners.steller.co/v1/places/${placeId}/content`;
    const config = {
      headers: {
        'Authorization': "Bearer " + stellerConfig.bingAccessToken,
      }
    };
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};