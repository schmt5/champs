import { useCallback, useEffect, useRef, useState } from "react";
import { createScope, createTimeline, stagger, utils } from "animejs";
import { cn } from "../utils/cn";
import sleep from "../utils/sleep";
import { useLanguageStore } from "../store/languageStore";
import { Logo } from "./ui/Logo";
import { Carousel } from "./ui/Carousel";

const HomeScreen = ({ onNextPage, onNavigateToHome }) => {
  const root = useRef(null);
  const scope = useRef(null);
  const startGameAnimation = useRef(null);
  const [loading, setLoading] = useState(false);
  const { t, setLanguage, currentLanguage, availableLanguages } =
    useLanguageStore();

  const handleStartGame = useCallback(async () => {
    setLoading(true);
    if (startGameAnimation.current) {
      startGameAnimation.current.play();
    }

    await sleep(1200);
    onNextPage();
  }, [onNextPage]);

  useEffect(() => {
    const cursor = document.querySelector(".cmp-cursor");
    const spans = document.querySelectorAll(".cmp-title-spans");

    scope.current = createScope({ root }).add(() => {
      utils.set(spans, {
        opacity: 0,
      });

      const textTimeline = createTimeline({
        loop: true,
        alternate: true,
      });

      textTimeline
        .add(cursor, {
          opacity: [0, 1, 0, 1, 0, 1, 0, 1, 0],
          easing: "steps(1)",
          duration: 3000,
        })
        .add(
          spans,
          {
            opacity: [0, 1],
            duration: 180,
            delay: stagger(utils.random(100, 160)),
            easing: "easeInOutQuad",
          },
          3000,
        )
        .add({
          duration: 2000,
        });
    });

    const startSpinner = utils.$(".cmp-start-spinner");

    const timeline = createTimeline({ autoplay: false });

    timeline
      .add(startSpinner, {
        x: 128,
        width: 64,
        height: 64,
        easing: "easeInOutQuad",
        duration: 500,
      })
      .add(startSpinner, {
        rotate: 90,
        duration: 500,
        loop: true,
        loopDelay: 50,
        easing: "easeInOutQuad",
      });

    startGameAnimation.current = timeline;

    // Properly cleanup all anime.js instances declared inside the scope
    return () => scope.current.revert();
  }, []);

  const champions = "Champions.";
  const championsSpans = champions.split("").map((char, index) => (
    <span key={index} className="cmp-title-spans inline-block">
      {char}
    </span>
  ));

  return (
    <div
      ref={root}
      className="flex flex-col min-h-screen mx-auto max-w-5xl 2xl:max-w-[1536px] relative"
    >
      <Logo onClick={onNavigateToHome} />
      <div className="mt-12 sm:mt-0 px-6 flex gap-1">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            className={cn(
              "px-4 py-6 hover:underline transition-colors 2xl:text-xl",
              currentLanguage === lang.code ? "text-primary-500 underline" : "",
            )}
            onClick={() => setLanguage(lang.code)}
          >
            {lang.name}
          </button>
        ))}
      </div>

      <div className="flex-1 flex pt-12">
        <div className="p-6 grid lg:grid-cols-3 place-content-center">
          <div className="lg:col-span-2 space-y-8 max-w-3xl px-4">
            <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-tight text-balance text-gray-600 lg:text-8xl 2xl:text-9xl mb-1">
              SwissSkills
            </h1>
            <h1 className="relative font-display text-5xl sm:text-7xl font-medium tracking-tight text-balance text-primary-500 lg:text-8xl 2xl:text-9xl">
              {championsSpans}
              <span className="cmp-cursor inline-block w-1 bg-primary-500 absolute top-1 bottom-4 left-0" />
            </h1>
            <p className="mt-12 text-gray-600 text-3xl 2xl:text-5xl 2xl:mb-16">
              {t("teaser_start")}
            </p>

            {!loading && (
              <button
                onClick={handleStartGame}
                className="cursor-pointer relative inline-block font-medium group py-4 2xl:py-6 px-12 2xl:px-14 m-0"
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
                <span className="relative text-primary-500 font-medium text-2xl 2xl:text-4xl">
                  {t("start_game")}
                </span>
              </button>
            )}

            <div
              className={cn(
                "cmp-start-spinner w-64 h-16 2xl:h-24 2xl:w-72 bg-white rounded border-2 2xl:border-4 border-primary-500",
                {
                  hidden: !loading,
                },
              )}
            />
          </div>
          <div className="mt-28 lg:mt-0 lg:-translate-y-6">
            <Carousel className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
