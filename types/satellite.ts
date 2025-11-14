export interface Satellite {
  satid: number;
  satname: string;
  intDesignator: string;
  launchDate: string;
  satlat: number;
  satlng: number;
  satalt: number;
}

export interface SatellitePass {
  startAz: number;
  startAzCompass: string;
  startEl: number;
  startUTC: number;
  maxAz: number;
  maxAzCompass: string;
  maxEl: number;
  maxUTC: number;
  endAz: number;
  endAzCompass: string;
  endEl: number;
  endUTC: number;
  mag: number;
  duration: number;
}

export interface PopularSatellite {
  name: string;
  noradId: number;
  description: string;
  type: "ISS" | "Space Station" | "Communication" | "Scientific" | "Navigation";
  color: string;
  facts: string[];
  statistics: {
    orbitalPeriod: string;
    speed: string;
    mass: string;
    size: string;
  };
}
