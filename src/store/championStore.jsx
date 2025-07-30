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
      champion.skills.every((skill) => selectedSkills.includes(skill))
    );

    return selected || "no_champion_found";
  },
  resetSkills: () => set({ selectedSkills: [] }),
}));
