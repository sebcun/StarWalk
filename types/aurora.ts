export interface AuroraForecast {
  kpIndex: number;
  probability: string;
  viewingConditions: string;
  hemisphereData: {
    north: string;
    south: string;
  };
}

export interface KpIndex {
  time_tag: string;
  kp: number;
  observed?: string;
}
