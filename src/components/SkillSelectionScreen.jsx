import { useState, useMemo, useCallback } from "react";
import ToggleButton from "./ToggleButton";
import { adjectives, champions } from "../db/data";
import { BottomSheet } from "./BottomSheet";

export function SkillSelectionScreen() {
  // State für ausgewählte Adjektive (max. 2)
  const [selectedAdjectives, setSelectedAdjectives] = useState([]);

  // Berechne abgeleitete Werte mit useMemo für bessere Performance
  const isMaxSelected = useMemo(
    () => selectedAdjectives.length >= 2,
    [selectedAdjectives]
  );

  const adjectiveStatus = useMemo(() => {
    return adjectives.map((adj) => ({
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

  return (
    <div className="min-h-screen flex flex-col bg-primary-50">
      {/* Header */}

      {selectedAdjectives.length < 2 ? (
        <div className="h-[360px] mx-auto py-12 w-full ">
          <h1 className="font-display text-5xl text-center font-medium tracking-tight text-balance text-gray-800">
            {selectedAdjectives.length === 0 ? (
              <span>
                Wähle deine <strong>erste</strong> Stärke aus
              </span>
            ) : (
              <span>
                Wähle deine <strong>zweite</strong> Stärke aus
              </span>
            )}
          </h1>
        </div>
      ) : (
        <div className="h-[360px] mx-auto grid place-content-center w-full py-4">
          <div className="rounded-4xl border-2 border-primary-200 shadow-xl relative aspect-video overflow-hidden">
            <img
              height={324}
              width={576}
              src="/assets/champion-1-landscape.jpg"
              alt="Champ"
            />
            <div className="p-4 absolute bottom-0 left-0 right-0 rounded-xs bg-white/40 backdrop-blur ring-1 ring-black/5">
              <h1 className="font-display text-3xl font-medium tracking-tight text-gray-900">
                Daniela Ziller
              </h1>
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
      <BottomSheet />
    </div>
  );
}
