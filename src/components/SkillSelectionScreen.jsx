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
    <div className="min-h-screen flex flex-col">
      <Logo
        onNavigateToHome={onNavigateToHome}
        compact
        background={!champion}
      />

      {/* Header */}
      {!champion ? (
        <div
          className="h-[320px] md:h-[470px] mx-auto py-12 w-full bg-primary-50"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)" }}
        >
          <h1 className="font-display text-5xl text-center font-medium tracking-tight text-balance text-gray-800">
            {selectedSkills.length === 0 ? (
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
        <div className="mx-auto grid place-content-center w-full">
          <VideoPlayer
            champion={champion}
            src="/assets/v0-quer.mp4"
            height={472}
            width={840}
            onOpenChampionInfo={onOpenBottomSheet}
            isChampionInfoOpen={openBottomSheet}
          />
        </div>
      )}

      <div
        className="bg-white flex-1 py-12"
        style={{ clipPath: "polygon(0 7%, 100% 0, 100% 100%, 0 100%)" }}
      >
        {/* Adjektiv-Grid */}
        <div className="mt-12 grid grid-cols-2 gap-6 max-w-2xl mx-auto">
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
      <BottomSheet
        champion={champion}
        open={openBottomSheet}
        onClose={onCloseBottomSheet}
      />
      <SkillInfoBottomSheet
        skill={skills[displaySkillId]}
        open={displaySkillId !== null}
        onClose={onHideSkillInfo}
      />
    </div>
  );
}
