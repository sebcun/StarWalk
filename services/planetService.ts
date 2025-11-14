import { Planet, PlanetVisibility } from "@/types/planet";

export const planets: Planet[] = [
  {
    name: "Mercury",
    distanceFromSun: 57.9,
    diameter: 4879,
    orbitalPeriod: 88,
    rotationPeriod: 58.6,
    moons: 0,
    color: "#8C7853",
    description: "The smallest and fastest planet, closest to the Sun",
    facts: [
      "Has the most eccentric orbit of all planets",
      "Surface temperatures range from -173°C to 427°C",
      "One day on Mercury lasts 176 Earth days",
    ],
  },
  {
    name: "Venus",
    distanceFromSun: 108.2,
    diameter: 12104,
    orbitalPeriod: 225,
    rotationPeriod: 243,
    moons: 0,
    color: "#FFC649",
    description: "The brightest planet in our sky, often called Earth's twin",
    facts: [
      "Hottest planet with surface temperature of 465°C",
      "Rotates backwards compared to most planets",
      "A day on Venus is longer than its year",
    ],
  },
  {
    name: "Earth",
    distanceFromSun: 149.6,
    diameter: 12742,
    orbitalPeriod: 365,
    rotationPeriod: 1,
    moons: 1,
    color: "#4A90E2",
    description: "Our home planet, the only known world with life",
    facts: [
      "About 71% of Earth's surface is covered with water",
      "The only planet not named after a god",
      "Has a protective magnetic field and atmosphere",
    ],
  },
  {
    name: "Mars",
    distanceFromSun: 227.9,
    diameter: 6779,
    orbitalPeriod: 687,
    rotationPeriod: 1.03,
    moons: 2,
    color: "#CD5C5C",
    description: "The Red Planet, target for future human exploration",
    facts: [
      "Home to the largest volcano in the solar system",
      "Has seasons similar to Earth",
      "A day on Mars is 24 hours and 37 minutes",
    ],
  },
  {
    name: "Jupiter",
    distanceFromSun: 778.5,
    diameter: 139820,
    orbitalPeriod: 4333,
    rotationPeriod: 0.41,
    moons: 95,
    color: "#C88B3A",
    description: "The largest planet, a gas giant with a Great Red Spot",
    facts: [
      "Has at least 95 known moons",
      "The Great Red Spot is a storm larger than Earth",
      "Completes a rotation in just 10 hours",
    ],
  },
  {
    name: "Saturn",
    distanceFromSun: 1434,
    diameter: 116460,
    orbitalPeriod: 10759,
    rotationPeriod: 0.45,
    moons: 146,
    color: "#FAD5A5",
    description: "Famous for its spectacular ring system",
    facts: [
      "Has the most extensive ring system",
      "Could float in water due to low density",
      "Has 146 known moons",
    ],
  },
  {
    name: "Uranus",
    distanceFromSun: 2871,
    diameter: 50724,
    orbitalPeriod: 30687,
    rotationPeriod: 0.72,
    moons: 27,
    color: "#4FD0E7",
    description: "An ice giant that rotates on its side",
    facts: [
      "Rotates on its side at 98° tilt",
      "Has faint rings discovered in 1977",
      "Coldest planetary atmosphere in solar system",
    ],
  },
  {
    name: "Neptune",
    distanceFromSun: 4495,
    diameter: 49244,
    orbitalPeriod: 60190,
    rotationPeriod: 0.67,
    moons: 14,
    color: "#4169E1",
    description: "The windiest planet with supersonic storms",
    facts: [
      "Has the fastest winds in the solar system",
      "Was discovered by mathematical prediction",
      "Takes 165 Earth years to orbit the Sun",
    ],
  },
];

export function getPlanetVisibility(): PlanetVisibility[] {
  const now = new Date();
  const hour = now.getHours();

  return [
    {
      name: "Mercury",
      visible: (hour >= 6 && hour <= 7) || (hour >= 18 && hour <= 19),
      bestViewingTime: "Dawn or dusk",
      constellation: "Varies",
      magnitude: -0.4,
    },
    {
      name: "Venus",
      visible: (hour >= 5 && hour <= 7) || (hour >= 18 && hour <= 20),
      bestViewingTime: "Morning or evening",
      constellation: "Varies",
      magnitude: -4.6,
    },
    {
      name: "Mars",
      visible: hour >= 20 || hour <= 4,
      bestViewingTime: "Late evening",
      constellation: "Varies",
      magnitude: 0.5,
    },
    {
      name: "Jupiter",
      visible: hour >= 19 || hour <= 5,
      bestViewingTime: "Most of the night",
      constellation: "Varies",
      magnitude: -2.5,
    },
    {
      name: "Saturn",
      visible: hour >= 20 || hour <= 3,
      bestViewingTime: "Evening to midnight",
      constellation: "Varies",
      magnitude: 0.7,
    },
  ];
}
