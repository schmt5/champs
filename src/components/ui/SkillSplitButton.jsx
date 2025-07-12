import { useCallback } from "react";
import { cn } from "../../utils/cn";

export function SkillSplitButton({
  id,
  text,
  isSelected,
  isDisabled,
  onSkillToggle: onSkillToggleFromProps,
  onDisplaySkillInfo: onDisplaySkillInfoFromProps,
}) {
  const onSkillToggle = useCallback(() => {
    onSkillToggleFromProps(id);
  }, [id, onSkillToggleFromProps]);

  const onDisplaySkillInfo = useCallback(() => {
    onDisplaySkillInfoFromProps(id);
  }, [id, onDisplaySkillInfoFromProps]);

  return (
    <div className="flex rounded-full">
      <button
        onClick={onSkillToggle}
        disabled={isDisabled}
        className={cn(
          "w-full p-2 rounded-l-full text-center text-lg font-medium cursor-pointer border-2 border-r-0 border-primary-500",
          { "bg-primary-500 text-white": isSelected },
          { "bg-white text-primary-500": !isSelected },
          {
            "cursor-not-allowed opacity-70 text-gray-500 border-gray-500":
              isDisabled,
          }
        )}
        aria-selected={isSelected}
      >
        <span className="inline-block translate-x-4">{text}</span>
      </button>
      <button
        onClick={onDisplaySkillInfo}
        className={cn(
          "flex items-center justify-center p-2 rounded-r-full border-2 bg-white text-primary-500 w-16",
          { "cursor-not-allowed opacity-70 text-gray-500": isDisabled }
        )}
        disabled={isDisabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 inline-block -translate-x-px"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </button>
    </div>
  );
}
