import { Place } from "../models";
import { StellerPlace } from "../models";

// searchHelper.js
const levenshteinDistance = (a: string, b: string) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }

  return matrix[b.length][a.length];
};

export const findClosestStellerMatch = (searchTerm: string, places: StellerPlace[]): StellerPlace => {
  let minDistance = Number.MAX_SAFE_INTEGER;
  let closestMatch = places[0];
  for (var place of places) {
    const distance = levenshteinDistance(searchTerm, place.name);
    if (distance < minDistance) {
      minDistance = distance;
      closestMatch = place;
    }
  };
  return closestMatch;
};

export const findClosestPlaceMatch = (searchTerm: string, places: Place[]): Place => {
  let minDistance = Number.MAX_SAFE_INTEGER;
  let closestMatch = places[0];
  for (var place of places) {
    const distance = levenshteinDistance(searchTerm, place.name);
    if (distance < minDistance) {
      minDistance = distance;
      closestMatch = place;
    }
  };
  return closestMatch;
};