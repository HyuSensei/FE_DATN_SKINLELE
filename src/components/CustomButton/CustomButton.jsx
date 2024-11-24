import React from "react";

const CustomButton = ({
  children,
  variant = "default",
  className = "",
  onClick,
}) => {
  const baseStyle =
    "px-6 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-200",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    default: "bg-gray-100 hover:bg-gray-200 text-gray-800",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
