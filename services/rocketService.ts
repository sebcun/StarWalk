import { Rocket, SimplifiedRocket } from "@/types/rocket";

export async function fetchUpcomingLaunches(): Promise<SimplifiedRocket[]> {
  try {
    const response = await fetch(
      "https://fdo.rocketlaunch.live/json/launches/next/5"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch rocket launches");
    }

    const data = await response.json();
    const launches: Rocket[] = data.result || [];

    return launches.map((launch) => simplifyRocketData(launch));
  } catch (error) {
    console.error("Error fetching rocket launches:", error);
    return [];
  }
}

function simplifyRocketData(rocket: Rocket): SimplifiedRocket {
  const launchDate = rocket.t0 || rocket.win_open;
  const date = new Date(launchDate);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let status = "Scheduled";
  let color = "#007AFF";

  if (diffDays < 0) {
    status = "Launched";
    color = "#34C759";
  } else if (diffDays === 0) {
    status = "Today";
    color = "#FF9500";
  } else if (diffDays === 1) {
    status = "Tomorrow";
    color = "#FF9500";
  } else if (diffDays <= 7) {
    status = `In ${diffDays} days`;
    color = "#5856D6";
  } else {
    status = `In ${diffDays} days`;
    color = "#007AFF";
  }

  const mission =
    rocket.missions && rocket.missions.length > 0
      ? rocket.missions[0].description || rocket.missions[0].name
      : "Mission details not available";

  return {
    id: rocket.id,
    name: rocket.name,
    provider: rocket.provider?.name || "Unknown Provider",
    vehicle: rocket.vehicle?.name || "Unknown Vehicle",
    location: rocket.pad?.name || "Unknown Location",
    country: rocket.pad?.location?.country || "Unknown",
    launchTime: formatLaunchTime(launchDate),
    launchDate: launchDate,
    description: mission,
    status,
    color,
    mission:
      rocket.missions && rocket.missions.length > 0
        ? rocket.missions[0].name
        : "Unknown Mission",
  };
}

export function formatLaunchTime(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  };
  return date.toLocaleString("en-US", options);
}

export function getCountdownText(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();

  if (diffTime < 0) {
    return "Launched";
  }

  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `T-${days}d ${hours}h`;
  } else if (hours > 0) {
    return `T-${hours}h ${minutes}m`;
  } else {
    return `T-${minutes}m`;
  }
}
