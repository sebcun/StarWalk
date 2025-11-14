import { NewsArticle } from "@/types/news";

const API_BASE_URL = "https://api.spaceflightnewsapi.net/v4";

export async function fetchSpaceNews(
  limit: number = 20
): Promise<NewsArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch space news");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching space news:", error);
    throw error;
  }
}
