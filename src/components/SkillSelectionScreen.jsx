import { useState, useMemo, useCallback } from "react";
import ToggleButton from "./ToggleButton";
import { adjectives, champions } from "../db/data";
import { BottomSheet } from "./BottomSheet";
import { useLanguageStore } from "../store/languageStore";

export function SkillSelectionScreen() {
  const { t, currentLanguage } = useLanguageStore();
  // State für ausgewählte Adjektive (max. 2)
  const [selectedAdjectives, setSelectedAdjectives] = useState([]);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  // Berechne abgeleitete Werte mit useMemo für bessere Performance
  const isMaxSelected = useMemo(
    () => selectedAdjectives.length >= 2,
    [selectedAdjectives]
  );

  const adjectiveStatus = useMemo(() => {
    return adjectives[currentLanguage].map((adj) => ({
      text: adj,
      isSelected: selectedAdjectives.includes(adj),
      isDisabled: isMaxSelected && !selectedAdjectives.includes(adj),
    }));
  }, [adjectives, selectedAdjectives, isMaxSelected]);

  // Event-Handler mit useCallback für bessere Performance
  const handleSelectAdjective = useCallback((adjective) => {
    setSelectedAdjectives((prev) => {
      // Wenn bereits ausgewählt, entferne es
      if (prev.includes(adjective)) {
        return prev.filter((adj) => adj !== adjective);
      }

      // Wenn noch nicht 2 ausgewählt, füge es hinzu
      if (prev.length < 2) {
        return [...prev, adjective];
      }

      // Ansonsten behalte den aktuellen Zustand
      return prev;
    });
  }, []);

  // Handler zum Zurücksetzen der Auswahl
  const handleReset = useCallback(() => {
    setSelectedAdjectives([]);
  }, []);

  const onOpenBottomSheet = useCallback(() => {
    setOpenBottomSheet(true);
  }, []);

  const onCloseBottomSheet = useCallback(() => {
    setOpenBottomSheet(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-primary-50">
      {/* Header */}

      {selectedAdjectives.length < 2 ? (
        <div className="h-[360px] mx-auto py-12 w-full ">
          <h1 className="font-display text-5xl text-center font-medium tracking-tight text-balance text-gray-800">
            {selectedAdjectives.length === 0 ? (
              <span>
                {t("choose")} <strong>{t("first")}</strong> {t("choose_skill")}
              </span>
            ) : (
              <span>
                {t("choose")} <strong>{t("second")}</strong> {t("choose_skill")}
              </span>
            )}
          </h1>
        </div>
      ) : (
        <div className="h-[360px] mx-auto grid place-content-center w-full py-4">
          <div className="rounded-4xl border-2 border-gray-300 shadow-xl relative aspect-video overflow-hidden">
            <img
              height={324}
              width={576}
              src="/assets/champion-1-landscape.jpg"
              alt="Champ"
            />
            <div className="p-4 absolute bottom-0 left-0 right-0 rounded-xs bg-white/40 backdrop-blur ring-1 ring-black/5">
              <div className="flex items-center justify-between gap-4">
                <h1 className="font-display text-3xl font-medium tracking-tight text-gray-900">
                  Daniela Ziller
                </h1>
                <button className="cursor-pointer" onClick={onOpenBottomSheet}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-900 font-medium">
                SwissSkill National Team, Mahlerin
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-t-4xl border-t-2 border-primary-100 flex-1 py-8 shadow-xl">
        {/* Adjektiv-Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {adjectiveStatus.map((adjective, index) => (
            <ToggleButton
              key={index}
              text={adjective.text}
              isSelected={adjective.isSelected}
              isDisabled={adjective.isDisabled}
              onClick={handleSelectAdjective}
            />
          ))}
        </div>
      </div>
      <BottomSheet open={openBottomSheet} onClose={onCloseBottomSheet} />
    </div>
  );
}
