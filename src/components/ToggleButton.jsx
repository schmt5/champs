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
                "w-full p-4 rounded-lg shadow-md text-center cursor-pointer border-0",
                isSelected && "bg-primary-400 text-white",
                !isSelected && "bg-white text-gray-800",
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