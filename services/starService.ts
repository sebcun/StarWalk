import { Star } from "@/types/star";

export const popularStars: Star[] = [
  {
    name: "Sirius",
    commonName: "The Dog Star",
    constellation: "Canis Major",
    description: "The brightest star in the night sky",
    color: "#A4D8FF",
    facts: [
      "Brightest star visible from Earth",
      "Actually a binary star system",
      "Ancient Egyptians based their calendar on it",
      "Appears to twinkle more than other stars",
      "Will be the brightest star for the next 60,000 years",
    ],
    statistics: {
      distance: "8.6 light-years",
      magnitude: "-1.46",
      spectralType: "A1V",
      temperature: "9,940 K",
    },
    coordinates: {
      rightAscension: "06h 45m 08.9s",
      declination: "-16° 42' 58\"",
    },
  },
  {
    name: "Betelgeuse",
    commonName: "Alpha Orionis",
    constellation: "Orion",
    description: "Red supergiant star nearing the end of its life",
    color: "#FF6B4A",
    facts: [
      "One of the largest known stars",
      "Could explode as a supernova at any time",
      "If placed at our Sun's position, would extend past Mars",
      "Brightness varies irregularly",
      "Expected to go supernova within 100,000 years",
    ],
    statistics: {
      distance: "642 light-years",
      magnitude: "0.50",
      spectralType: "M1-2",
      temperature: "3,500 K",
    },
    coordinates: {
      rightAscension: "05h 55m 10.3s",
      declination: "+07° 24' 25\"",
    },
  },
  {
    name: "Rigel",
    commonName: "Beta Orionis",
    constellation: "Orion",
    description: "Blue supergiant and brightest star in Orion",
    color: "#B0D9FF",
    facts: [
      "Seventh brightest star in the night sky",
      "Actually a multiple star system",
      "Over 40,000 times more luminous than the Sun",
      "Blue-white color indicates extreme heat",
      'Name means "the foot" in Arabic',
    ],
    statistics: {
      distance: "860 light-years",
      magnitude: "0.13",
      spectralType: "B8",
      temperature: "11,000 K",
    },
    coordinates: {
      rightAscension: "05h 14m 32.3s",
      declination: "-08° 12' 06\"",
    },
  },
  {
    name: "Vega",
    commonName: "Alpha Lyrae",
    constellation: "Lyra",
    description: "Fifth brightest star and once the North Star",
    color: "#CAE1FF",
    facts: [
      "Was the North Star 12,000 years ago",
      "Will be the North Star again in 13,727 years",
      "First star photographed other than the Sun",
      "Rotates very rapidly",
      "Has a debris disk that may contain planets",
    ],
    statistics: {
      distance: "25 light-years",
      magnitude: "0.03",
      spectralType: "A0V",
      temperature: "9,602 K",
    },
    coordinates: {
      rightAscension: "18h 36m 56.3s",
      declination: "+38° 47' 01\"",
    },
  },
  {
    name: "Polaris",
    commonName: "The North Star",
    constellation: "Ursa Minor",
    description: "Current north pole star used for navigation",
    color: "#FFF9E3",
    facts: [
      "Marks the location of the celestial north pole",
      "Actually a triple star system",
      "Not the brightest star, just the most northerly",
      "Has been used for navigation for centuries",
      "About 2,500 times more luminous than the Sun",
    ],
    statistics: {
      distance: "433 light-years",
      magnitude: "1.98",
      spectralType: "F7",
      temperature: "6,015 K",
    },
    coordinates: {
      rightAscension: "02h 31m 49.1s",
      declination: "+89° 15' 51\"",
    },
  },
  {
    name: "Arcturus",
    commonName: "Alpha Boötis",
    constellation: "Boötes",
    description: "Fourth brightest star and orange giant",
    color: "#FFB347",
    facts: [
      "Fourth brightest star in the night sky",
      "An aging red giant star",
      "Moving through space faster than most stars",
      'Name means "Guardian of the Bear" in Greek',
      "Can be found by following the arc of the Big Dipper",
    ],
    statistics: {
      distance: "37 light-years",
      magnitude: "-0.05",
      spectralType: "K0",
      temperature: "4,286 K",
    },
    coordinates: {
      rightAscension: "14h 15m 39.7s",
      declination: "+19° 10' 56\"",
    },
  },
  {
    name: "Antares",
    commonName: "Alpha Scorpii",
    constellation: "Scorpius",
    description: "Red supergiant marking the heart of the scorpion",
    color: "#FF4444",
    facts: [
      'Name means "rival of Mars" due to its red color',
      "One of the largest known stars",
      "If placed at the Sun's position, would extend to Mars",
      "Will eventually explode as a supernova",
      "Has a blue companion star",
    ],
    statistics: {
      distance: "550 light-years",
      magnitude: "1.09",
      spectralType: "M1.5",
      temperature: "3,570 K",
    },
    coordinates: {
      rightAscension: "16h 29m 24.5s",
      declination: "-26° 25' 55\"",
    },
  },
  {
    name: "Altair",
    commonName: "Alpha Aquilae",
    constellation: "Aquila",
    description: "Bright white star and one of the closest visible",
    color: "#F0F8FF",
    facts: [
      "One of the closest stars visible to naked eye",
      "Rotates extremely fast",
      "Part of the Summer Triangle asterism",
      "Flattened shape due to rapid rotation",
      'Name means "the flying eagle" in Arabic',
    ],
    statistics: {
      distance: "17 light-years",
      magnitude: "0.77",
      spectralType: "A7V",
      temperature: "7,550 K",
    },
    coordinates: {
      rightAscension: "19h 50m 47.0s",
      declination: "+08° 52' 06\"",
    },
  },
];

export function calculateStarVisibility(
  ra: string,
  dec: string
): {
  visible: boolean;
  status: string;
  bestViewingTime: string;
} {
  const now = new Date();
  const hours = now.getHours();

  const decValue = parseFloat(dec.split("°")[0]);
  const isNorthern = decValue > 0;

  if (hours >= 21 || hours <= 4) {
    return {
      visible: true,
      status: "Visible",
      bestViewingTime: "Now - Late night",
    };
  } else if (hours >= 18 || hours <= 6) {
    return {
      visible: true,
      status: "Visible",
      bestViewingTime: isNorthern ? "Evening to dawn" : "Night",
    };
  } else {
    return {
      visible: false,
      status: "Not visible",
      bestViewingTime: isNorthern ? "After sunset" : "Late evening",
    };
  }
}

export function getStarColorTemperature(temp: string): string {
  const tempValue = parseInt(temp.replace(/[^0-9]/g, ""));

  if (tempValue > 10000) return "Blue-white (Very Hot)";
  if (tempValue > 7500) return "White (Hot)";
  if (tempValue > 6000) return "Yellow-white (Warm)";
  if (tempValue > 5000) return "Yellow (Sun-like)";
  if (tempValue > 3500) return "Orange (Cool)";
  return "Red (Coolest)";
}
