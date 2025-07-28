import { useRef } from "react";
import { Sheet } from "react-modal-sheet";
import { useOnClickOutside } from "usehooks-ts";
import { useLanguageStore } from "../store/languageStore";
import { BottomSheetCloseButton } from "./ui/BottomSheetCloseButton";

export function BottomSheet({ champion, open, onClose }) {
  const { t, getSkills } = useLanguageStore();
  const skills = getSkills();

  const contentInnerRef = useRef(null);
  const ref = useRef(null);
  const snapPoints = [1, 0.68, 0];

  useOnClickOutside(contentInnerRef, onClose);

  if (!champion) {
    return null;
  }

  return (
    <>
      <Sheet
        ref={ref}
        snapPoints={snapPoints}
        initialSnap={1}
        isOpen={open}
        onClose={onClose}
        onSnap={(snapIndex) =>
          console.log("> Current snap point index:", snapIndex)
        }
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div ref={contentInnerRef} className="h-96 w-full">
              <BottomSheetCloseButton onClose={onClose} />
              <div className="p-4 max-w-2xl mx-auto">
                <h1 className="font-display text-3xl font-medium tracking-tight text-gray-900">
                  {champion.name}
                </h1>
                <p className="text-gray-500 font-medium mt-1">
                  {t(champion.headline)}
                </p>

                <div className="flex items-center gap-4 mt-4">
                  {champion.skills.map((skillKey) => (
                    <span
                      key={skillKey}
                      className="inline-flex items-center py-2 px-4 rounded-full text-sm font-medium text-white bg-gradient-to-br from-[#e60000] to-[#ff4444]"
                    >
                      {skills[skillKey].text}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <p className="text-gray-700 text-xl">
                    <span>{t("teaser_end")}</span>
                  </p>
                  <p>
                    <a
                      className="text-primary-500 underline text-xl"
                      target="_blank"
                      href="https://champions.swiss-skills.ch"
                    >
                      champions.swiss-skills.ch
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
}
