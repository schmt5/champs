import { useState, useCallback } from "react";
import { BottomSheet } from "./BottomSheet";
import { useLanguageStore } from "../store/languageStore";
import { VideoPlayer } from "./VideoPlayer";
import { useChampionStore } from "../store/championStore";
import { SkillSplitButton } from "./ui/SkillSplitButton";
import { SkillInfoBottomSheet } from "./ui/SkillInfoBottomSheet";
import { useUnmount } from "usehooks-ts";
import { Logo } from "./Logo";

export function SkillSelectionScreen({ onNavigateToHome }) {
  const { t, getSkills } = useLanguageStore();
  const { selectedSkills, onSelectSkill, getChampion, resetSkills } =
    useChampionStore();

  const champion = getChampion();

  // State für ausgewählte Adjektive (max. 2)
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const [displaySkillId, setDisplaySkillId] = useState(null);
  const onDisplaySkillInfo = useCallback((skillId) => {
    setDisplaySkillId(skillId);
  }, []);
  const onHideSkillInfo = useCallback(() => {
    setDisplaySkillId(null);
  }, []);

  const skills = getSkills();

  const onOpenBottomSheet = useCallback(() => {
    setOpenBottomSheet(true);
  }, []);

  const onCloseBottomSheet = useCallback(() => {
    setOpenBottomSheet(false);
  }, []);

  useUnmount(() => {
    setOpenBottomSheet(false);
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
          <h1 className="font-display text-5xl text-center font-medium tracking-tight text-balance text-gray-800 max-w-xl">
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
        <div className="mx-auto grid place-content-center w-full pl-6">
          <VideoPlayer
            champion={champion}
            src={champion.src}
            height={600}
            width={480}
            onOpenChampionInfo={onOpenBottomSheet}
            isChampionInfoOpen={openBottomSheet}
          />
        </div>
      )}

      <div className="bg-white pr-6 flex flex-col">
        <Logo onNavigateToHome={onNavigateToHome} compact />
        {/* Adjektiv-Grid */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
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

      {/* Park it here, maybe use it later */}
      {false && (
        <BottomSheet
          champion={champion}
          open={openBottomSheet}
          onClose={onCloseBottomSheet}
        />
      )}

      <SkillInfoBottomSheet
        skill={skills[displaySkillId]}
        open={displaySkillId !== null}
        onClose={onHideSkillInfo}
      />
    </div>
  );
}
