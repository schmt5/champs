import { useState, useCallback } from "react";
import HomeScreen from "./components/HomeScreen";
import { ExplainScreen } from "./components/ExplainScreen";
import { SkillSelectionScreen } from "./components/SkillSelectionScreen";

function App() {
  const [status, setStatus] = useState("home");

  const onNavigateToHome = useCallback(() => {
    setStatus("home");
  }, []);

  const handleStartGame = useCallback(() => {
    setStatus("game");
  }, []);

  if (status === "home") {
    return (
      <HomeScreen
        onNavigateToHome={onNavigateToHome}
        onNextPage={handleStartGame}
      />
    );
  }

  return <SkillSelectionScreen onNavigateToHome={onNavigateToHome} />;
}

export default App;
