import React from 'react';
import { cn } from '../utils/cn';

const ToggleButton = ({ 
  text, 
  isSelected, 
  isDisabled, 
  onClick 
}) => {
  return (
    <div
      onClick={() => !isDisabled && onClick(text)}
      className={cn(
        "p-4 rounded-lg shadow-md text-center cursor-pointer",
        isSelected && "bg-primary-400 text-white",
        !isSelected && "bg-white text-gray-800",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      role="option"
    >
      {text}
    </div>
  );
};

export default ToggleButton; 