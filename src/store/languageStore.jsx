import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

// Übersetzungen definieren
const translations = {
  de: {
    swiss_skills: "SwissSkills",
    champions: "Champions",
    which_champion_are_you: "Welcher Champion bist du?",
    start_game: "Spiel starten",
    hello: "Hallo",
    settings: "Einstellungen",
    language: "Sprache",
    save: "Speichern",
    cancel: "Abbrechen",
    loading: "Laden...",
    error: "Ein Fehler ist aufgetreten",
    success: "Erfolgreich gespeichert",
  },
  fr: {
    swiss_skills: "SwissSkills",
    champions: "Champions",
    which_champion_are_you: "Quel champion êtes-vous ?",
    start_game: "Démarrer le jeu",
    hello: "Bonjour",
    settings: "Paramètres",
    language: "Langue",
    save: "Enregistrer",
    cancel: "Annuler",
    loading: "Chargement...",
    error: "Une erreur est survenue",
    success: "Enregistré avec succès",
  },
};

// Verfügbare Sprachen
export const availableLanguages = [
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
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

        // Actions
        setLanguage: (languageCode) => {
          // Validierung: Sprache muss verfügbar sein
          const isValid = availableLanguages.some(
            (lang) => lang.code === languageCode
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
            (lang) => lang.code === currentLanguage
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
              state.currentLanguage
            );
          }
        },
      }
    )
  )
);

// Side Effect: HTML lang Attribut automatisch setzen
useLanguageStore.subscribe(
  (state) => state.currentLanguage,
  (currentLanguage) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = currentLanguage;
      console.log("HTML lang attribute set to:", currentLanguage);
    }
  }
);

// Initial HTML lang setzen (falls nicht durch Hydration gesetzt)
if (typeof document !== "undefined") {
  const initialLanguage = useLanguageStore.getState().currentLanguage;
  document.documentElement.lang = initialLanguage;
}
