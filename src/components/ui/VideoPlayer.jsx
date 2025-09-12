import { animate, createScope, createSpring } from "animejs";
import { useRef, useState, useCallback, useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { cn } from "../../utils/cn";
import { useLanguageStore } from "../../store/languageStore";

export function VideoPlayer({ src, onNavigateToHome }) {
  const { t } = useLanguageStore();
  const [canPlay, setCanPlay] = useState(false);
  const root = useRef(null);
  const scope = useRef(null);

  const onCanPlay = useCallback(() => {
    setCanPlay(true);
  }, []);

  const onEnded = useCallback(() => {
    if (scope.current) {
      scope.current.methods.playChampBarAnimation();
    }
  }, []);

  useEffect(() => {
    scope.current = createScope({ root }).add((self) => {
      // Register the animation method that can be called later
      self.add("playChampBarAnimation", () => {
        animate(".cmp-champ-bar", {
          scale: [0.4, 1],
          opacity: [0, 1],
          duration: 500,
          ease: createSpring(),
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

  return (
    <div ref={root} className="relative min-h-16 min-w-16 z-10">
      <div className={!canPlay ? "sr-only" : ""}>
        <video
          autoPlay
          onCanPlay={onCanPlay}
          onEnded={onEnded}
          className="rounded-xl"
        >
          <source src={src} type="video/mp4" />
        </video>

        <div
          style={{ transform: "translateY(100%)" }}
          className="cmp-champ-bar absolute opacity-0 -bottom-4 left-0 right-0 rounded-xl"
        >
          <a
            href="https://champions.swiss-skills.ch"
            target="_blank"
            onClick={onNavigateToHome}
            className="cursor-pointer relative inline-block w-full font-medium group py-2 2xl:py-4 px-6 m-0"
          >
            <span
              className={cn(
                "absolute rounded inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-primary-500 group-hover:-translate-x-0 group-hover:-translate-y-0",
              )}
            ></span>
            <span
              className={cn(
                "absolute inset-0 w-full h-full bg-white border-2 2xl:border-4 border-primary-500 rounded",
              )}
            ></span>
            <span className="relative inline-block w-full text-primary-500 text-xl 2xl:text-2xl text-center 2xl:font-medium">
              {t("get_inspired")}
            </span>
          </a>
        </div>
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
          "absolute rounded inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-primary-500 group-hover:-translate-x-0 group-hover:-translate-y-0",
        )}
      ></span>
      <span
        className={cn(
          "absolute inset-0 w-full h-full bg-white border-2 border-primary-500 rounded",
        )}
      ></span>
      <span className="relative text-primary-500 text-xl font-semibold">
        {t("more_info")}
      </span>
    </button>
  );
}
