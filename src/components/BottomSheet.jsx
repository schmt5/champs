import { useRef } from "react";
import { Sheet } from "react-modal-sheet";
import { useOnClickOutside } from "usehooks-ts";
import { useLanguageStore } from "../store/languageStore";

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
                      className="inline-flex items-center py-2 px-4 rounded-full text-sm font-medium text-white bg-gradient-to-br from-[#e60000] to-[#ff4444] transition-all duration-300 ease-in-out cursor-default select-none hover:bg-gradient-to-br hover:from-[#cc0000] hover:to-[#e60000] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(230,0,0,0.4)]"
                    >
                      {skills[skillKey].text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
}
