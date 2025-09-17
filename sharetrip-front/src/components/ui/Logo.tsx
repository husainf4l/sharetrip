import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = "md",
  variant = "default",
  className = "",
}) => {
  const sizes = {
    sm: "w-24 h-8",
    md: "w-32 h-10",
    lg: "w-40 h-12",
    xl: "w-48 h-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <div
      className={`${sizes[size]} ${className} flex items-center justify-center`}
    >
      <svg
        viewBox="0 0 180 50"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Modern gradient definition */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {variant === "white" ? (
              <>
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* Clean, modern typography with gradient */}
        <text
          x="0"
          y="32"
          className={`${textSizes[size]} font-medium tracking-tight`}
          style={{
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: "500",
            letterSpacing: "-0.02em",
            fill: "url(#logoGradient)",
          }}
        >
          raheva
        </text>
      </svg>
    </div>
  );
};

export default Logo;
