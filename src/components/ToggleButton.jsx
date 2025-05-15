import React from 'react';
import { cn } from '../utils/cn';

const ToggleButton = ({
    text,
    isSelected,
    isDisabled,
    onClick
}) => {
    return (
        <button
            onClick={() => onClick(text)}
            disabled={isDisabled}
            className={cn(
                "w-full p-4 rounded-xl text-center font-medium cursor-pointer border-2 border-primary-500",
                isSelected && "bg-primary-500 text-white",
                !isSelected && "bg-white text-primary-500",
                isDisabled && "opacity-50 cursor-not-allowed"
            )}
            aria-selected={isSelected}
            type="button"
        >
            {text}
        </button>
    );
};

export default ToggleButton; 