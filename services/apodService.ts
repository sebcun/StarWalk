import { APOD } from "@/types/apod";

const NASA_API_KEY = "DEMO_KEY";
const APOD_API_URL = "https://api.nasa.gov/planetary/apod";

export async function fetchAPOD(): Promise<APOD | null> {
  try {
    const response = await fetch(`${APOD_API_URL}?api_key=${NASA_API_KEY}`);

    if (!response.ok) {
      throw new Error("Failed to fetch APOD");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching APOD:", error);
    return null;
  }
}
