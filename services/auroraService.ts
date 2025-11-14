import { KpIndex } from "@/types/aurora";

const NOAA_API_URL = "https://services.swpc.noaa.gov/json";

export async function fetchKpIndex(): Promise<number> {
  try {
    const response = await fetch(`${NOAA_API_URL}/planetary_k_index_1m.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch Kp index");
    }
    const data: any[] = await response.json();
    if (!data || data.length === 0) {
      return 2;
    }
    const latest = data[data.length - 1];
    const kpValue =
      typeof latest.kp === "number" ? latest.kp : parseFloat(String(latest.kp));
    return isNaN(kpValue) ? 2 : kpValue;
  } catch (error) {
    console.error("Error fetching Kp index:", error);
    return 2;
  }
}

export async function fetch3DayForecast(): Promise<KpIndex[]> {
  try {
    const response = await fetch(`${NOAA_API_URL}/planetary_k_index_1m.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch forecast");
    }
    const data: any[] = await response.json();
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.slice(-24).map((item) => {
      const kpValue =
        typeof item.kp === "number"
          ? item.kp
          : parseFloat(String(item.kp)) || 0;
      return {
        time_tag: item.time_tag || new Date().toISOString(),
        kp: kpValue,
        observed: item.observed,
      };
    });
  } catch (error) {
    console.error("Error fetching forecast:", error);
    return [];
  }
}

export function getAuroraViewingConditions(kp: number): {
  level: string;
  description: string;
  color: string;
  northernLocations: string;
  southernLocations: string;
  visibility: string;
} {
  if (kp >= 9) {
    return {
      level: "Extreme",
      description: "Exceptional aurora activity worldwide",
      color: "#FF3B30",
      northernLocations:
        "Aurora Borealis visible across most of North America, Europe, and Asia",
      southernLocations:
        "Aurora Australis visible across South America, Australia, and New Zealand",
      visibility: "Visible as far as the equator in both hemispheres",
    };
  } else if (kp >= 7) {
    return {
      level: "High",
      description: "Strong aurora activity at mid-latitudes",
      color: "#FF9500",
      northernLocations:
        "Aurora Borealis visible in northern US, central Europe, and southern Canada",
      southernLocations:
        "Aurora Australis visible in southern Australia, New Zealand, and southern Argentina",
      visibility: "Visible at latitudes 50° and higher",
    };
  } else if (kp >= 5) {
    return {
      level: "Moderate",
      description: "Active auroras at higher latitudes",
      color: "#FFCC00",
      northernLocations:
        "Aurora Borealis visible in Canada, Scandinavia, Scotland, and Alaska",
      southernLocations:
        "Aurora Australis visible in Tasmania and southern New Zealand",
      visibility: "Visible at latitudes 60° and higher",
    };
  } else if (kp >= 3) {
    return {
      level: "Low",
      description: "Minor aurora activity near polar regions",
      color: "#34C759",
      northernLocations:
        "Aurora Borealis visible in northern Canada, Iceland, and northern Scandinavia",
      southernLocations:
        "Aurora Australis visible in Antarctica and far southern regions",
      visibility: "Visible at latitudes 65° and higher",
    };
  } else {
    return {
      level: "Quiet",
      description: "Minimal aurora activity",
      color: "#8E8E93",
      northernLocations: "Aurora Borealis limited to Arctic Circle",
      southernLocations: "Aurora Australis limited to Antarctic Circle",
      visibility: "Limited to extreme polar regions (70°+ latitude)",
    };
  }
}
