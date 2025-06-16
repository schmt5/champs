import React, { useState, useMemo, useCallback } from "react";

import HomeScreen from "./components/HomeScreen";

import { ExplainScreen } from "./components/ExplainScreen";
import { SkillSelectionScreen } from "./components/SkillSelectionScreen";

function App() {
  const [status, setStatus] = useState("home");

  const handleStartGame = useCallback(() => {
    setStatus("game");
  }, []);

  if (status === "home") {
    return <HomeScreen onNextPage={handleStartGame} />;
  }

  return <SkillSelectionScreen />;
}

export default App;
