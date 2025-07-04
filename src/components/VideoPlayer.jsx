import { animate, createScope } from "animejs";
import { useRef } from "react";
import { useCallback, useEffect } from "react";

export function VideoPlayer({
  src,
  height,
  width,
  onOpenChampionInfo,
  isChampionInfoOpen,
}) {
  const root = useRef(null);
  const scope = useRef(null);
  const onVideoEnd = useCallback(() => {
    if (scope.current) {
      scope.current.methods.playChampBarAnimation();
    }
  }, []);

  useEffect(() => {
    scope.current = createScope({ root }).add((self) => {
      // Register the animation method that can be called later
      self.add("playChampBarAnimation", () => {
        animate(".cmp-champ-bar", {
          translateY: "0%",
          scale: [0.7, 1],
          duration: 300,
        });
      });
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <div
      ref={root}
      className="rounded-4xl border-2 border-gray-300 shadow-xl relative aspect-video overflow-hidden"
    >
      <video height={height} width={width} autoPlay onEnded={onVideoEnd}>
        <source src={src} type="video/mp4" />
      </video>
      <div
        style={{ transform: "translateY(100%)" }}
        className="cmp-champ-bar p-4 absolute bottom-0 left-0 right-0 rounded-xs bg-white/40 backdrop-blur ring-1 ring-black/5"
      >
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-display text-3xl font-medium tracking-tight text-gray-900">
            Daniela Ziller
          </h1>
          <button
            className="cursor-pointer"
            onClick={onOpenChampionInfo}
            disabled={isChampionInfoOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-900 font-medium">
          SwissSkill National Team, Mahlerin
        </p>
      </div>
    </div>
  );
}
