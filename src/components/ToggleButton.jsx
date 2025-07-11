import { useCallback } from "react";
import { cn } from "../utils/cn";

const ToggleButton = ({
  id,
  text,
  isSelected,
  isDisabled,
  onClick: onClickFromProps,
}) => {
  const onClick = useCallback(() => {
    onClickFromProps(id);
  }, [id, onClickFromProps]);

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "w-full p-2 rounded-full text-center text-lg font-medium cursor-pointer border-2 border-primary-500",
        isSelected && "bg-primary-500 text-white",
        !isSelected && "bg-white text-primary-500",
        isDisabled &&
          "cursor-not-allowed opacity-70 text-gray-500 border-gray-500"
      )}
      aria-selected={isSelected}
    >
      {text}
    </button>
  );
};

export default ToggleButton;
