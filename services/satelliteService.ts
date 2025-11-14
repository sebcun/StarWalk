import { PopularSatellite, Satellite } from "@/types/satellite";

export const popularSatellites: PopularSatellite[] = [
  {
    name: "International Space Station",
    noradId: 25544,
    description: "Orbiting laboratory with crew aboard",
    type: "ISS",
    color: "#4A90E2",
    facts: [
      "Travels at 17,500 mph (28,000 km/h)",
      "Orbits Earth every 90 minutes",
      "Has been continuously inhabited since 2000",
      "Can be seen with naked eye from Earth",
      "Size of a football field including solar arrays",
    ],
    statistics: {
      orbitalPeriod: "92.9 minutes",
      speed: "7.66 km/s",
      mass: "419,725 kg",
      size: "109m × 73m",
    },
  },
  {
    name: "Hubble Space Telescope",
    noradId: 20580,
    description: "Famous space telescope capturing deep space images",
    type: "Scientific",
    color: "#9B59B6",
    facts: [
      "Launched in 1990 aboard Space Shuttle Discovery",
      "Has made over 1.5 million observations",
      "Orbits above Earth's atmosphere for clear images",
      "Has been serviced by astronauts 5 times",
      "Helped determine the age of the universe",
    ],
    statistics: {
      orbitalPeriod: "95 minutes",
      speed: "7.59 km/s",
      mass: "11,110 kg",
      size: "13.2m × 4.2m",
    },
  },
  {
    name: "Tiangong Space Station",
    noradId: 48274,
    description: "Chinese space station in low Earth orbit",
    type: "Space Station",
    color: "#E74C3C",
    facts: [
      "China's first long-term space station",
      "Completed construction in 2022",
      "Can support 3 astronauts long-term",
      "Has a planned 15-year lifespan",
      "Consists of three modules",
    ],
    statistics: {
      orbitalPeriod: "91 minutes",
      speed: "7.68 km/s",
      mass: "66,000 kg",
      size: "37m × 16.6m",
    },
  },
  {
    name: "Starlink-1012",
    noradId: 44718,
    description: "SpaceX internet satellite constellation",
    type: "Communication",
    color: "#1ABC9C",
    facts: [
      "Part of SpaceX's global internet network",
      "Over 5,000 Starlink satellites in orbit",
      "Designed to provide high-speed internet globally",
      "Each satellite weighs about 260 kg",
      "Have autonomous collision avoidance",
    ],
    statistics: {
      orbitalPeriod: "95 minutes",
      speed: "7.5 km/s",
      mass: "260 kg",
      size: "3.2m × 1.6m",
    },
  },
  {
    name: "NOAA 18",
    noradId: 28654,
    description: "Weather and environmental monitoring satellite",
    type: "Scientific",
    color: "#F39C12",
    facts: [
      "Monitors Earth's weather and climate",
      "Part of NOAA's polar-orbiting satellite system",
      "Provides data for weather forecasting",
      "Tracks hurricanes and severe weather",
      "Monitors sea surface temperatures",
    ],
    statistics: {
      orbitalPeriod: "102 minutes",
      speed: "7.4 km/s",
      mass: "1,457 kg",
      size: "4.2m × 1.9m",
    },
  },
  {
    name: "GPS BIIR-2",
    noradId: 28474,
    description: "Global positioning system satellite",
    type: "Navigation",
    color: "#34C759",
    facts: [
      "Part of the GPS constellation of 31 satellites",
      "Enables precise location services worldwide",
      "Orbits at medium Earth orbit altitude",
      "Atomic clocks maintain precise timing",
      "Used by billions of devices globally",
    ],
    statistics: {
      orbitalPeriod: "717 minutes",
      speed: "3.87 km/s",
      mass: "2,032 kg",
      size: "17.5m wingspan",
    },
  },
];

export async function fetchSatellitePosition(
  noradId: number
): Promise<Satellite | null> {
  try {
    const latitude = 0;
    const longitude = 0;
    const altitude = 0;
    const apiKey = "EGHXQA-62NYVJ-EDNHN3-5LQO";

    const response = await fetch(
      `https://api.n2yo.com/rest/v1/satellite/positions/${noradId}/${latitude}/${longitude}/${altitude}/1/&apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch satellite position");
    }

    const data = await response.json();

    if (data.positions && data.positions.length > 0) {
      const position = data.positions[0];
      return {
        satid: data.info?.satid || noradId,
        satname: data.info?.satname || "Unknown",
        intDesignator: data.info?.intDesignator || "N/A",
        launchDate: data.info?.launchDate || "Unknown",
        satlat:
          typeof position.satlatitude === "number" ? position.satlatitude : 0,
        satlng:
          typeof position.satlongitude === "number" ? position.satlongitude : 0,
        satalt:
          typeof position.sataltitude === "number"
            ? position.sataltitude
            : typeof position.satalt === "number"
            ? position.satalt
            : 0,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching satellite position:", error);
    return null;
  }
}

export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}° ${latDir}, ${Math.abs(lng).toFixed(
    2
  )}° ${lngDir}`;
}

export function getVisibilityStatus(altitude: number): {
  status: string;
  color: string;
} {
  if (altitude > 0 && altitude < 2000) {
    return { status: "Visible", color: "#34C759" };
  } else if (altitude >= 2000) {
    return { status: "High Orbit", color: "#007AFF" };
  } else {
    return { status: "Below Horizon", color: "#8E8E93" };
  }
}
