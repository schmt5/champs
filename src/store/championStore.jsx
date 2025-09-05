import { create } from "zustand";
import { CHAMPIONS } from "../db/champions";

export const useChampionStore = create((set, get) => ({
  champions: CHAMPIONS,
  selectedSkills: [],
  onSelectSkill: (skill) => {
    const { selectedSkills } = get();

    if (selectedSkills.includes(skill)) {
      set({
        selectedSkills: selectedSkills.filter((s) => s !== skill),
      });
    } else {
      set({ selectedSkills: [...selectedSkills, skill] });
    }
  },
  getChampion: () => {
    const { champions, selectedSkills } = get();

    if (selectedSkills.length < 2) {
      return null;
    }

    const selected = champions.find((champion) =>
      champion.skills.every((skill) => selectedSkills.includes(skill)),
    );

    return (
      selected || {
        name: "yourspot",
        skills: [],
        headline: "",
        srcs: {
          de: "/assets/videos/yourspot-45-de.mp4",
          fr: "/assets/videos/yourspot-45-fr.mp4",
          it: "/assets/videos/yourspot-45-it.mp4",
        },
      }
    );
  },
  resetSkills: () => set({ selectedSkills: [] }),
}));
