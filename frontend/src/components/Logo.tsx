import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "default" | "white" | "dark" | "compact";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "default",
  size = "md",
  className = "",
  showText = true,
}) => {
  const sizeClasses = {
    sm: showText ? "w-6 h-6" : "w-5 h-5",
    md: showText ? "w-8 h-8" : "w-7 h-7",
    lg: showText ? "w-10 h-10" : "w-9 h-9",
    xl: showText ? "w-12 h-12" : "w-11 h-11",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const getLogoColors = () => {
    switch (variant) {
      case "white":
        return {
          bg: "bg-white",
          border: "border-gray-100",
          text: "text-gray-900",
          accent: "text-gray-600",
        };
      case "dark":
        return {
          bg: "bg-gray-900",
          border: "border-gray-800",
          text: "text-white",
          accent: "text-gray-300",
        };
      default:
        return {
          bg: "bg-white",
          border: "border-gray-200",
          text: "text-gray-900",
          accent: "text-blue-600",
        };
    }
  };

  const colors = getLogoColors();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* STX Icon - Clean text-based logo */}
      <div
        className={`
        relative ${sizeClasses[size]}
        ${colors.bg}
        rounded-lg
        border ${colors.border}
        transition-all duration-200
        hover:scale-105
        group
        flex items-center justify-center
      `}
      >
        <span
          className={`
          font-bold tracking-wider
          ${colors.text}
          select-none
          font-['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif']
          group-hover:scale-105 transition-all duration-200
          ${
            size === "sm"
              ? "text-sm"
              : size === "md"
              ? "text-base"
              : size === "lg"
              ? "text-lg"
              : "text-xl"
          }
        `}
        >
          STX
        </span>
      </div>

      {/* Brand Text - Ultra-elegant Apple Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`
            ${textSizeClasses[size]} font-semibold tracking-tight
            ${colors.text}
            transition-all duration-200
            hover:scale-105
            font-['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif']
            select-none
            leading-tight
            drop-shadow-sm
          `}
          >
            ShareTrip
          </span>
          <span
            className={`
            ${textSizeClasses[size]} font-light tracking-widest
            ${colors.accent}
            transition-all duration-200
            hover:scale-105
            font-['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif']
            select-none
            leading-none
            -mt-1
            opacity-90
          `}
          >
            X
          </span>
        </div>
      )}
    </div>
  );
};

// Logo with Link wrapper for navigation
export const LogoLink: React.FC<LogoProps & { href?: string }> = ({
  href = "/",
  ...props
}) => {
  return (
    <Link
      href={href}
      className="group transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:ring-offset-2 rounded-xl"
    >
      <Logo {...props} />
    </Link>
  );
};

// Compact version for small spaces
export const CompactLogo: React.FC<Omit<LogoProps, "showText">> = (props) => {
  return <Logo {...props} showText={false} />;
};

// Alternative simplified version with ultra-minimalist Apple-style
export const SimpleLogo: React.FC<LogoProps> = ({
  variant = "default",
  size = "md",
  className = "",
}) => {
  const getSimpleColors = () => {
    switch (variant) {
      case "white":
        return {
          text: "text-gray-900",
          accent: "text-gray-600",
        };
      case "dark":
        return {
          text: "text-white",
          accent: "text-gray-300",
        };
      default:
        return {
          text: "text-gray-900",
          accent: "text-blue-600",
        };
    }
  };

  const colors = getSimpleColors();

  const sizeClass = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* STX Icon for SimpleLogo */}
      <div
        className={`
        relative w-8 h-8
        bg-white
        rounded-lg
        border border-gray-200
        transition-all duration-200
        hover:scale-105
        group
        flex items-center justify-center
        ${
          size === "sm"
            ? "w-6 h-6"
            : size === "md"
            ? "w-8 h-8"
            : size === "lg"
            ? "w-10 h-10"
            : "w-12 h-12"
        }
      `}
      >
        <span
          className={`
          font-bold tracking-wider
          ${colors.text}
          select-none
          font-['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif']
          group-hover:scale-105 transition-all duration-200
          ${
            size === "sm"
              ? "text-xs"
              : size === "md"
              ? "text-sm"
              : size === "lg"
              ? "text-base"
              : "text-lg"
          }
        `}
        >
          STX
        </span>
      </div>

      {/* Elegant stacked typography */}
      <div className="flex flex-col">
        <span
          className={`${sizeClass} font-semibold tracking-tight ${colors.text} select-none font-['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'] leading-tight drop-shadow-sm`}
        >
          ShareTrip
        </span>
        <span
          className={`${sizeClass} font-light tracking-widest ${colors.accent} select-none font-['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'] leading-none -mt-1 opacity-90`}
        >
          X
        </span>
      </div>
    </div>
  );
};

export default Logo;
