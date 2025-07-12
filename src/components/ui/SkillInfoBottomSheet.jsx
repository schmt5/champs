import { useRef } from "react";
import { Sheet } from "react-modal-sheet";
import { useOnClickOutside } from "usehooks-ts";

export function SkillInfoBottomSheet({ skill, open, onClose }) {
  const contentInnerRef = useRef(null);

  const ref = useRef(null);
  const snapPoints = [1, 0.95];
  useOnClickOutside(contentInnerRef, onClose);

  if (!open || !skill) {
    return null;
  }

  return (
    <Sheet
      ref={ref}
      snapPoints={snapPoints}
      initialSnap={1}
      isOpen={open}
      onClose={onClose}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div ref={contentInnerRef} className="h-full w-full">
            <div className="flex gap-6 p-4 max-w-3xl mx-auto">
              <img
                className="flex-1 overflow-hidden aspect-auto rounded-xs"
                src={skill.src}
                alt={skill.text}
              />
              <div className="flex-1">
                <h1 className="font-display text-5xl font-medium tracking-tight text-gray-900">
                  {skill.text}
                </h1>
                <p className="text-gray-900 text-xl mt-4 font-medium">
                  {skill.description}
                </p>
              </div>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
