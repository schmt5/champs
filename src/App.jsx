import React, { useState, useMemo, useCallback } from "react";
import ToggleButton from "./components/ToggleButton";
import HomeScreen from "./components/HomeScreen";
import { adjectives } from "./db/data";
import { ExplainScreen } from "./components/ExplainScreen";

function App() {
  const [status, setStatus] = useState("home");

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


  const handleExplain = useCallback(() => {
    setStatus("explain");
  }, []);

  // Handler zum Starten des Spiels
  const handleStartGame = useCallback(() => {
    setStatus("game");
  }, []);

  if (status === "home") {
    return <HomeScreen onNextPage={handleExplain} />;
  }

  if (status === "explain") {
    return <ExplainScreen onNextPage={handleStartGame} />;
  }

  return (
    <div className="min-h-screen bg-primary-500 flex flex-col">

      {/* Header mit Titel und Beschreibung */}
      <div className="h-80 mx-auto max-w-5xl px-4 py-8">
        <h1 className="font-display text-5xl text-center font-medium tracking-tight text-balance text-white">
          Champions
        </h1>

        <div className="my-4">
          <div className='cmp-profile-image w-20 h-20 rounded-full shadow-xl border-2 border-white overflow-hidden'>
            <img src="src/assets/champion-1-quad.jpg" className="h-full w-full object-cover"></img>
          </div>
        </div>
      </div>


      <div className="bg-white rounded-t-4xl flex-1 py-8 shadow-xl">
        {/* Anzeige der ausgewählten Adjektive */}
        <div className="flex justify-center gap-3 mb-6">
          {[0, 1].map((index) => (
            <div
              key={`slot-${index}`}
              className={`w-32 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${selectedAdjectives[index]
                ? "bg-primary-400 text-white"
                : "bg-gray-100 text-gray-400"
                }`}
            >
              {selectedAdjectives[index] || "• • •"}
            </div>
          ))}
        </div>


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
    </div >
  );
}

export default App;
