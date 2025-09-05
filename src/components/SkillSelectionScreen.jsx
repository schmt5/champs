import { useState, useCallback } from "react";
import { useLanguageStore } from "../store/languageStore";
import { VideoPlayer } from "./ui/VideoPlayer";
import { useChampionStore } from "../store/championStore";
import { SkillSplitButton } from "./ui/SkillSplitButton";
import { SkillInfoBottomSheet } from "./ui/SkillInfoBottomSheet";
import { useUnmount } from "usehooks-ts";
import { Logo } from "./ui/Logo";

export function SkillSelectionScreen({ onNavigateToHome }) {
  const { t, getSkills, currentLanguage } = useLanguageStore();
  const { selectedSkills, onSelectSkill, getChampion, resetSkills } =
    useChampionStore();

  const champion = getChampion();
  const skills = getSkills();

  const [displaySkillId, setDisplaySkillId] = useState(null);
  const onDisplaySkillInfo = useCallback((skillId) => {
    setDisplaySkillId(skillId);
  }, []);
  const onHideSkillInfo = useCallback(() => {
    setDisplaySkillId(null);
  }, []);

  useUnmount(() => {
    setDisplaySkillId(null);
    resetSkills();
  });

  return (
    <div className="h-dvh grid grid-cols-2 gap-6">
      {/* Header */}
      {!champion ? (
        <div
          className="h-full bg-primary-50 flex items-center justify-center px-6"
          style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)" }}
        >
          <h1 className="font-display text-5xl 2xl:text-7xl text-center font-medium tracking-tight text-balance text-gray-800 pl-8 pr-12">
            {selectedSkills.length === 0 && (
              <span>
                {t("choose")} <strong>{t("first")}</strong> {t("choose_skill")}
              </span>
            )}
            {selectedSkills.length === 1 && (
              <span>
                {t("choose")} <strong>{t("second")}</strong> {t("choose_skill")}
              </span>
            )}
          </h1>
        </div>
      ) : (
        <div className="mx-auto grid place-content-center w-full max-w-2xl pl-6">
          <VideoPlayer
            champion={champion}
            src={champion.srcs[currentLanguage]}
            onNavigateToHome={onNavigateToHome}
          />
        </div>
      )}

      <div className="bg-white pr-6 flex flex-col">
        <Logo onNavigateToHome={onNavigateToHome} />
        {/* Adjektiv-Grid */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6 2xl:gap-8 w-full max-w-2xl 2xl:max-w-3xl">
            {Object.entries(skills).map(([key, skill]) => (
              <SkillSplitButton
                key={key}
                id={key}
                text={skill.text}
                isSelected={selectedSkills.includes(key)}
                isDisabled={champion && !selectedSkills.includes(key)}
                onSkillToggle={onSelectSkill}
                onDisplaySkillInfo={onDisplaySkillInfo}
              />
            ))}
          </div>
        </div>
      </div>

      <SkillInfoBottomSheet
        skill={skills[displaySkillId]}
        open={displaySkillId !== null}
        onClose={onHideSkillInfo}
      />
    </div>
  );
}
