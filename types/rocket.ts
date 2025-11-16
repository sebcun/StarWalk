export interface Rocket {
  id: string;
  name: string;
  provider: {
    id: number;
    name: string;
    type: string;
  };
  vehicle: {
    id: number;
    name: string;
  };
  pad: {
    id: number;
    name: string;
    location: {
      id: number;
      name: string;
      state: string;
      country: string;
    };
  };
  missions: Array<{
    id: number;
    name: string;
    description: string;
  }>;
  win_open: string;
  t0: string | null;
  win_close: string;
  est_date: {
    month: number;
    day: number;
    year: number;
    quarter: number | null;
  };
  date_str: string;
  tags: Array<{
    id: number;
    text: string;
  }>;
  slug: string;
  weather_summary: string | null;
  weather_temp: number | null;
  weather_condition: string | null;
  weather_wind_mph: number | null;
  weather_icon: string | null;
  weather_updated: string | null;
  quicktext: string;
  media: Array<any>;
  result: number;
  suborbital: boolean;
  modified: string;
}

export interface SimplifiedRocket {
  id: string;
  name: string;
  provider: string;
  vehicle: string;
  location: string;
  country: string;
  launchTime: string;
  launchDate: string;
  description: string;
  status: string;
  color: string;
  mission: string;
}
