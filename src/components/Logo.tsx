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
          gradient: "from-white to-gray-100",
          border: "border-white/20",
          shadow: "shadow-white/10",
          text: "text-white",
        };
      case "dark":
        return {
          gradient: "from-gray-800 to-gray-900",
          border: "border-gray-700",
          shadow: "shadow-gray-900/20",
          text: "text-gray-900",
        };
      default:
        return {
          gradient: "from-blue-500 via-purple-500 to-blue-600",
          border: "border-blue-200",
          shadow: "shadow-blue-500/20",
          text: "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
        };
    }
  };

  const colors = getLogoColors();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Modern Apple-style Icon */}
      <div
        className={`
        relative ${sizeClasses[size]} 
        bg-gradient-to-br ${colors.gradient}
        rounded-2xl
        border ${colors.border}
        shadow-lg ${colors.shadow}
        transform transition-all duration-300
        hover:scale-105 hover:shadow-xl hover:${colors.shadow}
        group
      `}
      >
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm"></div>

        {/* Icon content - Modern geometric travel symbol */}
        <div className="relative w-full h-full flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-2/3 h-2/3 text-white drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
            fill="currentColor"
          >
            {/* Travel/Journey symbol inspired by Apple's design philosophy */}
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5L6.5 16l4-4-4-4L8 6.5l5.5 5.5L8 17.5z" />
            <circle cx="16" cy="8" r="2" fillOpacity="0.8" />
          </svg>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Brand Text */}
      {showText && (
        <span
          className={`
          ${textSizeClasses[size]} font-bold tracking-tight
          ${colors.text}
          transition-all duration-300
          hover:scale-105
        `}
        >
          ShareTrip
          <span className="font-light">X</span>
        </span>
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
      className="group transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl"
    >
      <Logo {...props} />
    </Link>
  );
};

// Compact version for small spaces
export const CompactLogo: React.FC<Omit<LogoProps, "showText">> = (props) => {
  return <Logo {...props} showText={false} />;
};

// Alternative simplified version
export const SimpleLogo: React.FC<LogoProps> = ({
  variant = "default",
  size = "md",
  className = "",
}) => {
  const colors =
    variant === "white"
      ? "text-white"
      : variant === "dark"
      ? "text-gray-900"
      : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent";

  const sizeClass = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }[size];

  return (
    <div className={`flex items-center ${className}`}>
      <span className={`${sizeClass} font-bold tracking-tight ${colors}`}>
        ShareTrip
        <span className="font-light">X</span>
      </span>
    </div>
  );
};

export default Logo;
