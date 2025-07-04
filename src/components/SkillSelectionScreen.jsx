import { useState, useMemo, useCallback } from "react";
import ToggleButton from "./ToggleButton";
import { adjectives } from "../db/data";
import { BottomSheet } from "./BottomSheet";
import { useLanguageStore } from "../store/languageStore";
import { Logo } from "./Logo";
import { VideoPlayer } from "./VideoPlayer";

export function SkillSelectionScreen({ onNavigateToHome }) {
  const { t, currentLanguage } = useLanguageStore();
  // State für ausgewählte Adjektive (max. 2)
  const [selectedAdjectives, setSelectedAdjectives] = useState([]);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

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
  }, [selectedAdjectives, isMaxSelected, currentLanguage]);

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

  const onOpenBottomSheet = useCallback(() => {
    setOpenBottomSheet(true);
  }, []);

  const onCloseBottomSheet = useCallback(() => {
    setOpenBottomSheet(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-primary-50">
      <Logo onNavigateToHome={onNavigateToHome} />

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
          <VideoPlayer
            src="/assets/v0-quer.mp4"
            height={360}
            width={640}
            onOpenChampionInfo={onOpenBottomSheet}
            isChampionInfoOpen={openBottomSheet}
          />
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
