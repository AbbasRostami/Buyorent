import { Coordinates, POI, POIQueryConfig } from "@/types/geo";

export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function estimateWalkingTime(distanceKm: number): number {
  const walkingSpeedKmh = 5;
  return Math.round((distanceKm / walkingSpeedKmh) * 60);
}

export async function getCoordinates(address: string): Promise<Coordinates> {
  try {
    let response = await fetch(
      `${
        process.env.NEXT_PUBLIC_MAP_API_URL
      }&q=${encodeURIComponent(address)}&countrycodes=ir`,
      {
        headers: {
          "User-Agent": "NextLevelPropertyApp/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch coordinates");
    }

    let data = await response.json();

    if (!data || data.length === 0) {
      const cityName = address.split(",")[0]?.trim();

      if (cityName) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_MAP_API_URL}&q=${encodeURIComponent(
            cityName
          )}&countrycodes=ir`,
          {
            headers: {
              "User-Agent": "NextLevelPropertyApp/1.0",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch coordinates");
        }

        data = await response.json();
      }
    }

    if (!data || data.length === 0) {
      return {
        lat: 35.6892,
        lon: 51.389,
      };
    }

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Error getting coordinates:", error);
    return {
      lat: 35.6892,
      lon: 51.389,
    };
  }
}

export async function getNearbyPOIs(
  lat: number,
  lon: number,
  poi: POIQueryConfig
): Promise<POI | null> {
  try {
    const radius = 1000;
    const query = `
      [out:json][timeout:25];
      (
        node["${poi.key}"="${poi.value}"](around:${radius},${lat},${lon});
      );
      out body;
      >;
      out skel qt;
    `;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_INTERPRETER_URL}/interpreter`,
      {
        method: "POST",
        body: query,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch POIs");
    }

    const data = await response.json();
    if (!data.elements || data.elements.length === 0) {
      return null;
    }

    let closestPOI = data.elements[0];
    let minDistance = Infinity;

    for (const element of data.elements) {
      const distance = haversineDistance(lat, lon, element.lat, element.lon);
      if (distance < minDistance) {
        minDistance = distance;
        closestPOI = element;
      }
    }

    const distance = minDistance * 1000;
    const walkingTime = estimateWalkingTime(minDistance);

    return {
      name: closestPOI.tags.name || "نامشخص",
      distance: Math.round(distance),
      walkingTime,
      type: poi.type,
    };
  } catch (error) {
    console.error("Error getting nearby POIs:", error);
    return null;
  }
}
