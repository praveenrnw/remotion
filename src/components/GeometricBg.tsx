import React from "react";

/**
 * Animated geometric grid background with rotating rings and floating dots.
 * Used across all scenes for visual consistency.
 */
export const GeometricBg: React.FC<{ frame: number; opacity?: number }> = ({
  frame,
  opacity = 0.06,
}) => {
  const rot = frame * 0.15;
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
      viewBox="0 0 1920 1080"
    >
      {/* Grid Lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 213}
          y1={0}
          x2={i * 213}
          y2={1080}
          stroke="#ffffff"
          strokeWidth={0.5}
          opacity={opacity * 0.5}
        />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={0}
          y1={i * 216}
          x2={1920}
          y2={i * 216}
          stroke="#ffffff"
          strokeWidth={0.5}
          opacity={opacity * 0.5}
        />
      ))}

      {/* Rotating Red Ring */}
      <circle
        cx={960}
        cy={540}
        r={420}
        stroke="#ff4646"
        strokeWidth={0.8}
        fill="none"
        opacity={opacity * 0.8}
        transform={`rotate(${rot}, 960, 540)`}
        strokeDasharray="40 20"
      />

      {/* Rotating White Ring */}
      <circle
        cx={960}
        cy={540}
        r={600}
        stroke="#ffffff"
        strokeWidth={0.4}
        fill="none"
        opacity={opacity * 0.4}
        transform={`rotate(${-rot * 0.6}, 960, 540)`}
        strokeDasharray="80 40"
      />

      {/* Floating Dots */}
      {[
        { cx: 120, cy: 200, r: 3, speed: 0.05, amp: 15 },
        { cx: 1800, cy: 150, r: 2, speed: 0.07, amp: 20 },
        { cx: 200, cy: 900, r: 4, speed: 0.04, amp: 12 },
        { cx: 1750, cy: 880, r: 3, speed: 0.06, amp: 18 },
        { cx: 960, cy: 80, r: 2, speed: 0.09, amp: 10 },
      ].map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy + Math.sin(frame * d.speed + i) * d.amp}
          r={d.r}
          fill="#ff4646"
          opacity={0.4}
        />
      ))}
    </svg>
  );
};
