import axios from 'axios';
import { stellerConfig } from '../../../configuration/configuration';

export const fetchStellerPlaces = async () => {
  try {
    const url = `https://partners.steller.co/v1/places`;
    const config = {
      headers: {
        'Authorization': "Bearer " + stellerConfig.bingAccessToken,
      }
    };
    const response = await axios.get(url, config);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};