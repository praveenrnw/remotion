import React from "react";
import { interpolate } from "remotion";
import { theme } from "../theme";

/**
 * Friendly robot guide character that appears throughout the video.
 * Minimalist SVG design matching the Nativewit brand.
 */
export const RobotGuide: React.FC<{
  frame: number;
  /** Position from left as percentage */
  x?: number;
  /** Position from bottom as percentage */
  y?: number;
  /** Scale multiplier (default 1) */
  scale?: number;
  /** Which expression: "neutral" | "happy" | "thinking" | "waving" */
  expression?: "neutral" | "happy" | "thinking" | "waving";
}> = ({ frame, x = 5, y = 5, scale = 1, expression = "neutral" }) => {
  const breathe = Math.sin(frame * Math.PI / 30) * 3;
  const headTilt = Math.sin(frame * 0.04) * 2;

  /* Antenna blink */
  const antennaBlink = Math.sin(frame * 0.2) > 0.7 ? 1 : 0.4;

  /* Arm wave for "waving" expression */
  const waveAngle =
    expression === "waving"
      ? Math.sin(frame * 0.25) * 15 - 30
      : 0;

  /* Eye states */
  const eyeScale =
    expression === "happy"
      ? 0.6
      : expression === "thinking"
        ? 1.2
        : 1;

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        bottom: `${y}%`,
        transform: `scale(${scale}) translateY(${breathe}px)`,
        transformOrigin: "bottom center",
        opacity,
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <svg
        width="100"
        height="140"
        viewBox="0 0 100 140"
        style={{ overflow: "visible" }}
      >
        {/* Antenna */}
        <line
          x1="50"
          y1="20"
          x2="50"
          y2="8"
          stroke={theme.colors.textMuted}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="5"
          r="5"
          fill={theme.colors.accent}
          opacity={antennaBlink}
        >
        </circle>

        {/* Head */}
        <g transform={`rotate(${headTilt}, 50, 40)`}>
          <rect
            x="25"
            y="18"
            width="50"
            height="40"
            rx="12"
            fill={theme.colors.surface}
            stroke={theme.colors.textMuted}
            strokeWidth="2"
          />

          {/* Eyes */}
          {expression === "happy" ? (
            <>
              {/* Happy eyes — arcs */}
              <path
                d="M36 34 Q39 28 42 34"
                fill="none"
                stroke={theme.colors.accent}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M58 34 Q61 28 64 34"
                fill="none"
                stroke={theme.colors.accent}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </>
          ) : expression === "thinking" ? (
            <>
              {/* Thinking eyes — one squinted */}
              <circle cx="39" cy="34" r="4" fill={theme.colors.accent} />
              <ellipse cx="61" cy="34" rx="5" ry="2" fill={theme.colors.accent} />
            </>
          ) : (
            <>
              {/* Normal / neutral eyes */}
              <circle
                cx="39"
                cy="34"
                r={4 * eyeScale}
                fill={theme.colors.accent}
              />
              <circle
                cx="61"
                cy="34"
                r={4 * eyeScale}
                fill={theme.colors.accent}
              />
            </>
          )}

          {/* Mouth */}
          {expression === "happy" ? (
            <path
              d="M40 45 Q50 52 60 45"
              fill="none"
              stroke={theme.colors.accent}
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : expression === "thinking" ? (
            <line
              x1="42"
              y1="46"
              x2="58"
              y2="48"
              stroke={theme.colors.textMuted}
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <line
              x1="42"
              y1="47"
              x2="58"
              y2="47"
              stroke={theme.colors.textMuted}
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </g>

        {/* Body */}
        <rect
          x="30"
          y="60"
          width="40"
          height="45"
          rx="8"
          fill={theme.colors.surface}
          stroke={theme.colors.textMuted}
          strokeWidth="2"
        />

        {/* Chest indicator */}
        <circle
          cx="50"
          cy="78"
          r="6"
          fill={theme.colors.accent}
          opacity={0.4 + Math.sin(frame * 0.12) * 0.3}
        />

        {/* Left arm */}
        <line
          x1="30"
          y1="68"
          x2="15"
          y2="90"
          stroke={theme.colors.textMuted}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="15" cy="90" r="5" fill={theme.colors.surface} stroke={theme.colors.textMuted} strokeWidth="2" />

        {/* Right arm (waves if expression is waving) */}
        <g transform={`rotate(${waveAngle}, 70, 68)`}>
          <line
            x1="70"
            y1="68"
            x2="85"
            y2="90"
            stroke={theme.colors.textMuted}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="85" cy="90" r="5" fill={theme.colors.surface} stroke={theme.colors.textMuted} strokeWidth="2" />
        </g>

        {/* Legs */}
        <line
          x1="42"
          y1="105"
          x2="38"
          y2="128"
          stroke={theme.colors.textMuted}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="58"
          y1="105"
          x2="62"
          y2="128"
          stroke={theme.colors.textMuted}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Feet */}
        <ellipse cx="35" cy="131" rx="8" ry="4" fill={theme.colors.surface} stroke={theme.colors.textMuted} strokeWidth="1.5" />
        <ellipse cx="65" cy="131" rx="8" ry="4" fill={theme.colors.surface} stroke={theme.colors.textMuted} strokeWidth="1.5" />

        {/* Thinking bubble for thinking expression */}
        {expression === "thinking" && (
          <>
            <circle cx="80" cy="15" r="3" fill={theme.colors.textMuted} opacity="0.4" />
            <circle cx="88" cy="8" r="5" fill={theme.colors.textMuted} opacity="0.3" />
            <rect x="82" y="-8" width="18" height="14" rx="7" fill={theme.colors.textMuted} opacity="0.25" />
            <text x="91" y="2" textAnchor="middle" fill={theme.colors.textPrimary} fontSize="8" fontWeight="bold" opacity="0.5">?</text>
          </>
        )}
      </svg>
    </div>
  );
};
