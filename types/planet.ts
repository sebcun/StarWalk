export interface Planet {
  name: string;
  distanceFromSun: number;
  diameter: number;
  orbitalPeriod: number;
  rotationPeriod: number;
  moons: number;
  description: string;
  color: string;
  facts: string[];
}

export interface PlanetVisibility {
  name: string;
  visible: boolean;
  bestViewingTime: string;
  constellation: string;
  magnitude: number;
}
