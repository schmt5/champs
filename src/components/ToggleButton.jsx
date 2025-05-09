import React from 'react';

const ToggleButton = ({ 
  text, 
  isSelected, 
  isDisabled, 
  onClick 
}) => {
  return (
    <div
      onClick={() => !isDisabled && onClick(text)}
      className={`
        p-4 rounded-lg shadow-md text-center cursor-pointer
        ${isSelected ? "bg-primary-400 text-white" : "bg-white text-gray-800"}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      role="option"
    >
      {text}
    </div>
  );
};

export default ToggleButton; 