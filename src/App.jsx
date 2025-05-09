import React, { useState, useMemo, useCallback } from "react";

function App() {
  // Adjektive-Liste
  const adjectives = useMemo(
    () => [
      "kreativ",
      "analytisch",
      "freundlich",
      "ehrgeizig",
      "geduldig",
      "spontan",
      "loyal",
      "humorvoll",
    ],
    []
  );

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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header mit Titel und Beschreibung */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-500 text-center mb-4">
            Wähle deine Adjektive
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Wähle bis zu 2 Adjektive aus, die zu deiner Persönlichkeit passen
          </p>

          {/* Anzeige der ausgewählten Adjektive */}
          <div className="flex justify-center gap-3 mb-6">
            {[0, 1].map((index) => (
              <div
                key={`slot-${index}`}
                className={`w-32 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                  selectedAdjectives[index]
                    ? "bg-primary-400 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {selectedAdjectives[index] || "• • •"}
              </div>
            ))}
          </div>

          {/* Reset-Button (nur anzeigen, wenn mindestens ein Adjektiv ausgewählt ist) */}
          {selectedAdjectives.length > 0 && (
            <div className="flex justify-center mb-6">
              <button
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full transition-colors duration-300"
              >
                Zurücksetzen
              </button>
            </div>
          )}
        </div>

        {/* Adjektiv-Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {adjectiveStatus.map((adjective, index) => (
            <div
              key={index}
              onClick={() =>
                !adjective.isDisabled && handleSelectAdjective(adjective.text)
              }
              className={`
                p-4 rounded-lg shadow-md text-center cursor-pointer transform transition-all duration-300
                ${
                  adjective.isSelected
                    ? "bg-primary-400 text-white scale-105"
                    : "bg-white text-gray-800 hover:bg-yellow-50"
                }
                ${
                  adjective.isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                }
              `}
              aria-selected={adjective.isSelected}
              aria-disabled={adjective.isDisabled}
              role="option"
            >
              {adjective.text}
            </div>
          ))}
        </div>

        {/* Ausgewählte Adjektive Anzeige (Zusammenfassung) */}
        {selectedAdjectives.length > 0 && (
          <div className="mt-12 text-center animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-600 mb-3">
              Deine Auswahl:
            </h2>
            <p className="text-gray-700">{selectedAdjectives.join(" & ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
