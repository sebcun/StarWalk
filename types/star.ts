export interface Star {
  name: string;
  commonName: string;
  constellation: string;
  description: string;
  color: string;
  facts: string[];
  statistics: {
    distance: string;
    magnitude: string;
    spectralType: string;
    temperature: string;
  };
  coordinates: {
    rightAscension: string;
    declination: string;
  };
}

export interface StarPosition {
  altitude: number;
  azimuth: number;
  visible: boolean;
}
