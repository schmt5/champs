import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { SKILLS_DE, SKILLS_FR, SKILLS_IT } from "../db/skills";

const translations = {
  de: {
    swiss_skills: "SwissSkills",
    champions: "Champions",
    teaser_start: "Mach mit! Wähle zwei Stärken – finde deinen Champion!",
    teaser_end: "Entdecke noch mehr Champions – und lass dich inspirieren!",
    which_champion_are_you: "Welcher Champion bist du?",
    start_game: "Jetzt starten",
    choose_two_adjectives: "Wähle zwei Adjektive, die zu dir passen...",
    choose: "Wähle deine",
    choose_skill: "Stärke aus",
    claim_spot_leading: "Noch frei - dieser Platz könnte",
    claim_spot_strong: "deiner",
    claim_spot_trailing: "sein",
    your_spot: "Hier fehlt jemand wie du!",
    first: "erste",
    second: "zweite",
    more_info: "mehr erfahren",
    get_inspired: "Entdecke noch mehr Champions!",
    champion_headline_jeremie: "SwissSkill National Team, Mahler",
  },
  fr: {
    swiss_skills: "SwissSkills",
    champions: "Champions",
    teaser_start:
      "Lance-toi! Choisis deux forces et trouve le ou la champion·ne qui te correspond!",
    teaser_end:
      "Découvrez encore plus de champions – et laissez-vous inspirer !",
    which_champion_are_you: "Quel champion êtes-vous ?",
    start_game: "Commence maintenant",
    choose_two_adjectives:
      "Choisissez deux adjectifs qui vous correspondent...",
    choose: "Choisis ta",
    choose_skill: "force",
    first: "première",
    second: "deuxième",
    claim_spot_leading: "Encore libre - cette place pourrait être la",
    claim_spot_strong: "tienne",
    claim_spot_trailing: "",
    your_spot: "Il manque quelqu'un comme vous ici!",
    more_info: "en savoir plus",
    get_inspired: "Découvre encore plus de champions ne s!",
  },
  it: {
    swiss_skills: "SwissSkills",
    champions: "Campioni",
    teaser_start:
      "Unisciti a noi! Scegli due punti di forza - trova il tuo o la tua campionessa!",
    teaser_end: "Scopri ancora più campioni – e lasciati ispirare!",
    which_champion_are_you: "Quale campione sei?",
    start_game: "Inizia ora",
    choose_two_adjectives: "Scegli due aggettivi che ti rappresentano...",
    choose: "Scegli la tua",
    choose_skill: "forza",
    claim_spot_leading: "Ancora libero - questo posto potrebbe essere il",
    claim_spot_strong: "tuo",
    claim_spot_trailing: "",
    your_spot: "Il manca qualcuno come te qui!",
    first: "prima",
    second: "seconda",
    more_info: "maggiori informazioni",
    get_inspired: "Scopri ancora più campioni e campionesse!",
  },
};

// Verfügbare Sprachen
export const availableLanguages = [
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
];

// Language Store erstellen
export const useLanguageStore = create(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // State
        currentLanguage: "de",
        translations,
        availableLanguages,
        getSkills: () => {
          const { currentLanguage } = get();

          if (currentLanguage === "fr") {
            return SKILLS_FR;
          } else if (currentLanguage === "it") {
            return SKILLS_IT;
          } else {
            return SKILLS_DE;
          }
        },

        // Actions
        setLanguage: (languageCode) => {
          // Validierung: Sprache muss verfügbar sein
          const isValid = availableLanguages.some(
            (lang) => lang.code === languageCode,
          );
          if (!isValid) {
            console.warn(`Language '${languageCode}' is not available`);
            return;
          }

          set({ currentLanguage: languageCode });
        },

        // Übersetzungsfunktion
        t: (key) => {
          const { translations, currentLanguage } = get();
          const translation = translations[currentLanguage]?.[key];

          if (translation) {
            return translation;
          } else {
            return key;
          }
        },

        // Hilfsfunktionen
        getCurrentLanguageInfo: () => {
          const { currentLanguage } = get();
          return availableLanguages.find(
            (lang) => lang.code === currentLanguage,
          );
        },

        // Neue Übersetzungen hinzufügen (für dynamische Inhalte)
        addTranslations: (languageCode, newTranslations) => {
          set((state) => ({
            translations: {
              ...state.translations,
              [languageCode]: {
                ...state.translations[languageCode],
                ...newTranslations,
              },
            },
          }));
        },
      }),
      {
        name: "language-storage",
        // Nur currentLanguage persistieren, nicht die ganzen translations
        partialize: (state) => ({ currentLanguage: state.currentLanguage }),

        // Beim Laden aus localStorage
        onRehydrateStorage: () => (state) => {
          if (state?.currentLanguage) {
            console.log(
              "Language restored from storage:",
              state.currentLanguage,
            );
          }
        },
      },
    ),
  ),
);

// Side Effect: HTML lang Attribut automatisch setzen
useLanguageStore.subscribe(
  (state) => state.currentLanguage,
  (currentLanguage) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = currentLanguage;
      console.log("HTML lang attribute set to:", currentLanguage);
    }
  },
);

// Initial HTML lang setzen (falls nicht durch Hydration gesetzt)
if (typeof document !== "undefined") {
  const initialLanguage = useLanguageStore.getState().currentLanguage;
  document.documentElement.lang = initialLanguage;
}
