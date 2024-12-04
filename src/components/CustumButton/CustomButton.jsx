import React from "react";

const CustumButton = ({
  children,
  variant = "default",
  className = "",
  onClick,
  icon,
  loading = false,
  type = "button",
}) => {
  const baseStyle =
    "px-6 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm relative overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-200/50 active:shadow-inner disabled:opacity-70 disabled:cursor-not-allowed",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    default:
      "bg-gray-100 hover:bg-gray-200 text-gray-800 active:bg-gray-300 disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed",
    danger:
      "bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 active:bg-red-100 group relative",
    dangerFilled:
      "bg-gradient-to-r from-rose-400 to-rose-500 hover:opacity-90 text-white shadow-lg hover:shadow-rose-200/50 active:shadow-inner disabled:opacity-70 disabled:cursor-not-allowed",
  };

  // Ripple effect for danger variant
  const dangerHoverEffect =
    variant === "danger"
      ? `
    after:absolute
    after:content-['']
    after:bg-red-500
    after:w-full
    after:h-full
    after:scale-0
    after:top-0
    after:left-0
    after:transition-transform
    after:duration-300
    after:origin-center
    hover:after:scale-100
    hover:text-white
    after:-z-10
  `
      : "";

  return (
    <button
      type={type}
      className={`
        ${baseStyle} 
        ${variants[variant]} 
        ${className} 
        ${dangerHoverEffect}
        flex items-center justify-center gap-2
        disabled:shadow-none
      `}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          <span className="opacity-70">Đang xử lý...</span>
        </>
      ) : (
        <>
          {icon && (
            <span
              className={variant === "danger" ? "group-hover:text-white" : ""}
            >
              {icon}
            </span>
          )}
          <span
            className={variant === "danger" ? "group-hover:text-white" : ""}
          >
            {children}
          </span>
        </>
      )}
    </button>
  );
};

export default CustumButton;
