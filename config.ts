import Constants from "expo-constants";

export const Config = {
  nasaApiKey: Constants.expoConfig?.extra?.nasaApiKey || "DEMO_KEY",
  n2yoApiKey: Constants.expoConfig?.extra?.n2yoApiKey || "",
};
