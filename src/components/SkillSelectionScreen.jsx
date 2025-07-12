import { useState, useMemo, useCallback } from "react";
import { BottomSheet } from "./BottomSheet";
import { useLanguageStore } from "../store/languageStore";
import { VideoPlayer } from "./VideoPlayer";
import { useChampionStore } from "../store/championStore";
import { SKILLS_DE } from "../db/skills";
import { SkillSplitButton } from "./ui/SkillSplitButton";
import { SkillInfoBottomSheet } from "./ui/SkillInfoBottomSheet";

export function SkillSelectionScreen() {
  const { t, currentLanguage } = useLanguageStore();
  const { selectedSkills, onSelectSkill, getHasReachedLimit } =
    useChampionStore();

  const hasReachedLimit = getHasReachedLimit();
  // State für ausgewählte Adjektive (max. 2)
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const [displaySkillId, setDisplaySkillId] = useState(null);
  const onDisplaySkillInfo = useCallback((skillId) => {
    setDisplaySkillId(skillId);
  }, []);
  const onHideSkillInfo = useCallback(() => {
    setDisplaySkillId(null);
  }, []);

  const skills = useMemo(() => {
    if (currentLanguage === "de") {
      return SKILLS_DE;
    }
  }, [currentLanguage]);

  const onOpenBottomSheet = useCallback(() => {
    setOpenBottomSheet(true);
  }, []);

  const onCloseBottomSheet = useCallback(() => {
    setOpenBottomSheet(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-primary-50">
      {/* Header */}
      {!hasReachedLimit ? (
        <div className="h-[360px] mx-auto py-12 w-full ">
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
        <div className="h-[360px] mx-auto grid place-content-center w-full">
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
        <div className="mt-12 grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          {Object.entries(skills).map(([key, skill]) => (
            <SkillSplitButton
              key={key}
              id={key}
              text={skill.text}
              isSelected={selectedSkills.includes(key)}
              isDisabled={hasReachedLimit && !selectedSkills.includes(key)}
              onSkillToggle={onSelectSkill}
              onDisplaySkillInfo={onDisplaySkillInfo}
            />
          ))}
        </div>
      </div>
      <BottomSheet open={openBottomSheet} onClose={onCloseBottomSheet} />
      <SkillInfoBottomSheet
        skill={skills[displaySkillId]}
        open={displaySkillId !== null}
        onClose={onHideSkillInfo}
      />
    </div>
  );
}
