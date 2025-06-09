import { useRef, useCallback, use } from "react";
import { Sheet } from "react-modal-sheet";
import { useOnClickOutside } from "usehooks-ts";

export function BottomSheet({ open, onClose }) {
  const contentInnerRef = useRef(null);

  const ref = useRef(null);
  const snapPoints = [1, 0.6, 0];

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
              <div className="py-2 px-12 max-w-5xl mx-auto">
                <h1 className="text-lg font-bold">Hello, World!</h1>
                <p>This is a bottom sheet example.</p>
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
