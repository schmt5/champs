import { useRef } from "react";
import { Sheet } from "react-modal-sheet";
import { useOnClickOutside } from "usehooks-ts";

export function BottomSheet({ open, onClose }) {
  const contentInnerRef = useRef(null);

  const ref = useRef(null);
  const snapPoints = [1, 0.68, 0];

  const snapTo = (i) => ref.current?.snapTo(i);

  useOnClickOutside(contentInnerRef, onClose);

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
                  Daniela Ziller
                </h1>
                <p className="text-gray-900 font-medium">
                  SwissSkill National Team, Mahlerin
                </p>

                <div>
                  
                </div>
                <button className="block" onClick={() => snapTo(0)}>
                  Snap to index 0
                </button>
                <button className="block" onClick={() => snapTo(1)}>
                  Snap to index 1
                </button>
                <button className="block" onClick={() => snapTo(2)}>
                  Snap to index 2
                </button>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
}
