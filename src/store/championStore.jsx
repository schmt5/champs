import { create } from "zustand";

export const useChampionStore = create((set, get) => ({
  champions: [],
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
  getHasReachedLimit: () => {
    const { selectedSkills } = get();
    return selectedSkills.length >= 2;
  },
}));
