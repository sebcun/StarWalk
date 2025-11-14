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

export interface Constellation {
  name: string;
  latinName: string;
  abbreviation: string;
  description: string;
  color: string;
  facts: string[];
  brightest: string;
  visibility: {
    hemisphere: string;
    bestMonth: string;
    season: string;
  };
  statistics: {
    area: string;
    stars: string;
    rank: string;
  };
}
