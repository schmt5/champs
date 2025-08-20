import { animate, createScope } from "animejs";
import { useRef, useState, useCallback, useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { cn } from "../utils/cn";
import { useLanguageStore } from "../store/languageStore";

export function VideoPlayer({
  champion,
  src,
  height,
  width,
  onOpenChampionInfo,
  isChampionInfoOpen,
}) {
  const { t } = useLanguageStore();
  const [canPlay, setCanPlay] = useState(false);
  const root = useRef(null);
  const scope = useRef(null);

  const onCanPlay = useCallback(() => {
    setCanPlay(true);
    if (scope.current) {
      scope.current.methods.playChampBarAnimation();
    }
  }, []);

  useEffect(() => {
    scope.current = createScope({ root }).add((self) => {
      // Register the animation method that can be called later
      self.add("playChampBarAnimation", () => {
        animate(".cmp-champ-bar", {
          scale: [0.7, 1],
          duration: 300,
          delay: 300,
        });
      });

      animate(".cmp-loading-spinner", {
        opacity: [0, 1],
        duration: 500,
        easing: "easeInOutQuad",
      });
    });

    return () => scope.current?.revert();
  }, []);

  console.log(champion);

  return (
    <div ref={root} className="relative min-h-16 min-w-16 z-10">
      <div className={!canPlay ? "sr-only" : ""}>
        <video height={height} width={width} autoPlay onCanPlay={onCanPlay} className="rounded-t-xs">
          <source src={src} type="video/mp4" />
        </video>

        {champion.name !== "your-spot" && (
          <div
            style={{ transform: "translateY(100%)" }}
            className="cmp-champ-bar p-4 absolute bottom-0 left-0 right-0 border-2 border-t-0 rounded-xs border-gray-200"
          >
            <div className="flex flex-col items-center gap-2">
              <div>
              
                <p className="text-gray-900 font-medium">
                  {t(champion.headline)}
                </p>
              </div>
              <a
                href="https://champions.swiss-skills.ch"
                target="_blank"
                className="cursor-pointer relative inline-block font-medium group py-2 px-6 m-0"
              >
                <span
                  className={cn(
                    "absolute rounded inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-primary-500 group-hover:-translate-x-0 group-hover:-translate-y-0"
                  )}
                ></span>
                <span
                  className={cn(
                    "absolute inset-0 w-full h-full bg-white border-2 border-primary-500 rounded"
                  )}
                ></span>
                <span className="relative text-primary-500 text-xl font-semibold">
                  {t("get_inspired")}
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
      {!canPlay && (
        <div className="cmp-loading-spinner">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

function OpenChampInfoButton({ onOpenChampionInfo, isChampionInfoOpen }) {
  return (
    <button
      onClick={onOpenChampionInfo}
      disabled={isChampionInfoOpen}
      className="cursor-pointer relative inline-block font-medium group py-2 px-6 m-0"
    >
      <span
        className={cn(
          "absolute rounded inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-primary-500 group-hover:-translate-x-0 group-hover:-translate-y-0"
        )}
      ></span>
      <span
        className={cn(
          "absolute inset-0 w-full h-full bg-white border-2 border-primary-500 rounded"
        )}
      ></span>
      <span className="relative text-primary-500 text-xl font-semibold">
        {t("more_info")}
      </span>
    </button>
  );
}
