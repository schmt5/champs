import React, { useState, useMemo, useCallback } from "react";

import HomeScreen from "./components/HomeScreen";

import { ExplainScreen } from "./components/ExplainScreen";
import { SkillSelectionScreen } from "./components/SkillSelectionScreen";

function App() {
  const [status, setStatus] = useState("home");


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
    <SkillSelectionScreen />
   
  );
}

export default App;
