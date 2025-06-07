import { useRef, useEffect } from "react";
import { animate, createScope, utils } from "animejs";
import { useLanguageStore } from "../store/languageStore";

export function ExplainScreen({ onNextPage }) {
  const root = useRef(null);
  const scope = useRef(null);
  const { t } = useLanguageStore();

  useEffect(() => {
    scope.current = createScope({ root }).add((self) => {
      animate("progress", {
        duration: 4000,
        value: 1000,
        modifier: utils.round(0),
        delay: 400,
        onComplete: onNextPage,
      });
    });

    return () => scope.current.revert();
  }, []);

  return (
    <div
      ref={root}
      className="min-h-screen mx-auto max-w-3xl grid place-content-center"
    >
      <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-gray-600 text-center mb-12">
        {t("choose_two_adjectives")}
      </h1>

      <div className="flex justify-center">
        <progress className="w-xl rounded-full" max="1000" value="0"></progress>
      </div>
    </div>
  );
}
