import { Constellation } from "@/types/star";

export const popularConstellations: Constellation[] = [
  {
    name: "Orion",
    latinName: "Orion",
    abbreviation: "Ori",
    description: "The Hunter - one of the most recognizable constellations",
    color: "#4A90E2",
    facts: [
      "Contains the famous Orion's Belt asterism",
      "Home to the Orion Nebula, a stellar nursery",
      "Features Betelgeuse and Rigel, two of the brightest stars",
      "Visible from both hemispheres",
      "Named after a hunter in Greek mythology",
    ],
    brightest: "Rigel (0.13 mag)",
    visibility: {
      hemisphere: "Both",
      bestMonth: "January",
      season: "Winter (Northern) / Summer (Southern)",
    },
    statistics: {
      area: "594 sq. degrees",
      stars: "81 stars",
      rank: "26th largest",
    },
  },
  {
    name: "Ursa Major",
    latinName: "Ursa Major",
    abbreviation: "UMa",
    description: "The Great Bear - contains the Big Dipper asterism",
    color: "#F39C12",
    facts: [
      "Third largest constellation in the sky",
      "Contains the Big Dipper asterism",
      "Used for navigation to find Polaris",
      "Visible year-round in northern latitudes",
      "Associated with many different myths worldwide",
    ],
    brightest: "Alioth (1.76 mag)",
    visibility: {
      hemisphere: "Northern",
      bestMonth: "April",
      season: "Spring",
    },
    statistics: {
      area: "1,280 sq. degrees",
      stars: "135 stars",
      rank: "3rd largest",
    },
  },
  {
    name: "Cassiopeia",
    latinName: "Cassiopeia",
    abbreviation: "Cas",
    description: "The Queen - distinctive W or M shaped constellation",
    color: "#9B59B6",
    facts: [
      "Easily recognizable W or M shape",
      "Visible year-round in northern latitudes",
      "Named after a vain queen in Greek mythology",
      "Contains several notable star clusters",
      "Opposite to the Big Dipper from Polaris",
    ],
    brightest: "Schedar (2.24 mag)",
    visibility: {
      hemisphere: "Northern",
      bestMonth: "November",
      season: "Fall/Winter",
    },
    statistics: {
      area: "598 sq. degrees",
      stars: "90 stars",
      rank: "25th largest",
    },
  },
  {
    name: "Scorpius",
    latinName: "Scorpius",
    abbreviation: "Sco",
    description: "The Scorpion - distinctive J-shaped constellation",
    color: "#E74C3C",
    facts: [
      "One of the few constellations that looks like its name",
      "Contains Antares, a red supergiant star",
      "Rich in deep sky objects",
      "Associated with the myth of Orion",
      "Most visible in summer in the northern hemisphere",
    ],
    brightest: "Antares (1.09 mag)",
    visibility: {
      hemisphere: "Both",
      bestMonth: "July",
      season: "Summer (Northern) / Winter (Southern)",
    },
    statistics: {
      area: "497 sq. degrees",
      stars: "100 stars",
      rank: "33rd largest",
    },
  },
  {
    name: "Lyra",
    latinName: "Lyra",
    abbreviation: "Lyr",
    description: "The Lyre - small but prominent summer constellation",
    color: "#1ABC9C",
    facts: [
      "Contains Vega, the fifth brightest star",
      "Small but easily identifiable constellation",
      "Contains the Ring Nebula (M57)",
      "Named after Orpheus's lyre in Greek mythology",
      "Part of the Summer Triangle asterism",
    ],
    brightest: "Vega (0.03 mag)",
    visibility: {
      hemisphere: "Northern",
      bestMonth: "August",
      season: "Summer",
    },
    statistics: {
      area: "286 sq. degrees",
      stars: "45 stars",
      rank: "52nd largest",
    },
  },
  {
    name: "Cygnus",
    latinName: "Cygnus",
    abbreviation: "Cyg",
    description: "The Swan - flies along the Milky Way",
    color: "#34C759",
    facts: [
      "Also known as the Northern Cross",
      "Flies along the Milky Way",
      "Part of the Summer Triangle",
      "Contains many interesting deep sky objects",
      "Named after several different swans in Greek mythology",
    ],
    brightest: "Deneb (1.25 mag)",
    visibility: {
      hemisphere: "Northern",
      bestMonth: "September",
      season: "Summer/Fall",
    },
    statistics: {
      area: "804 sq. degrees",
      stars: "150 stars",
      rank: "16th largest",
    },
  },
  {
    name: "Aquila",
    latinName: "Aquila",
    abbreviation: "Aql",
    description: "The Eagle - soars through the summer Milky Way",
    color: "#FF9500",
    facts: [
      "Contains Altair, one of the closest bright stars",
      "Part of the Summer Triangle",
      "Lies in the Milky Way band",
      "Named after the eagle that carried Zeus's thunderbolts",
      "Easy to spot due to Altair's brightness",
    ],
    brightest: "Altair (0.77 mag)",
    visibility: {
      hemisphere: "Both",
      bestMonth: "August",
      season: "Summer (Northern) / Winter (Southern)",
    },
    statistics: {
      area: "652 sq. degrees",
      stars: "70 stars",
      rank: "22nd largest",
    },
  },
  {
    name: "Crux",
    latinName: "Crux",
    abbreviation: "Cru",
    description: "The Southern Cross - iconic southern constellation",
    color: "#4169E1",
    facts: [
      "Smallest of all 88 constellations",
      "Most recognizable constellation in the southern sky",
      "Used for navigation in the southern hemisphere",
      "Featured on several national flags",
      "Points toward the south celestial pole",
    ],
    brightest: "Acrux (0.77 mag)",
    visibility: {
      hemisphere: "Southern",
      bestMonth: "May",
      season: "Visible year-round in far south",
    },
    statistics: {
      area: "68 sq. degrees",
      stars: "49 stars",
      rank: "88th (smallest)",
    },
  },
];

export function getConstellationVisibility(
  hemisphere: string,
  bestMonth: string
): {
  visible: boolean;
  status: string;
  bestTime: string;
} {
  const now = new Date();
  const currentMonth = now.toLocaleString("en-US", { month: "long" });
  const hours = now.getHours();

  if (hemisphere === "Southern" && currentMonth === bestMonth) {
    return {
      visible: true,
      status: "Best viewing this month",
      bestTime: "Evening",
    };
  } else if (hemisphere === "Northern" && currentMonth === bestMonth) {
    return {
      visible: true,
      status: "Best viewing this month",
      bestTime: "Evening",
    };
  } else if (hemisphere === "Both") {
    return {
      visible: true,
      status: "Visible",
      bestTime: hours >= 20 || hours <= 4 ? "Now" : "After sunset",
    };
  } else {
    return {
      visible: false,
      status: "Not optimal",
      bestTime: `Best in ${bestMonth}`,
    };
  }
}
