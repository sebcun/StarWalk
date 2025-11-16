import { Config } from "@/config";
import { APOD } from "@/types/apod";

const APOD_API_URL = "https://api.nasa.gov/planetary/apod";

export async function fetchAPOD(
  date?: string
): Promise<APOD | null | "not_released"> {
  try {
    let url = `${APOD_API_URL}?api_key=${Config.nasaApiKey}`;

    if (date) {
      url += `&date=${date}`;
    }

    const response = await fetch(url);

    if (response.status === 404) {
      return "not_released";
    }

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch APOD");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching APOD:", error);
    return null;
  }
}
