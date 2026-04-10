import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";
import { GeometricBg } from "../components/GeometricBg";
import { RobotGuide } from "../components/RobotGuide";

/**
 * HOOK — 0–5s (150 frames)
 * VO: "Most software agencies will build what you ask for.
 *      That's not what great products need."
 *
 * Draws a full mobile phone and reveals a COPY stamp on it,
 * then transitions to a "great product" infographic.
 */

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneDraw = interpolate(frame, [5, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  const stampProgress = spring({
    frame: Math.max(0, frame - 55),
    fps,
    config: { damping: 40, mass: 0.4 },
  });

  const glitchT = interpolate(frame, [85, 93, 100, 115], [0, 1, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const infoReveal = interpolate(frame, [90, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  const exitFade = interpolate(frame, [132, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        opacity: exitFade,
        overflow: "hidden",
      }}
    >
      <GeometricBg frame={frame} opacity={0.04} />

      {/* ── Full mobile phone — drawn progressively ──────── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateX(${infoReveal > 0 ? interpolate(infoReveal, [0, 1], [0, -280]) : 0}px)`,
        }}
      >
        <svg width="260" height="480" viewBox="0 0 260 480">
          {/* Phone body */}
          <rect x="10" y="10" width="240" height="460" rx="30"
            fill={theme.colors.surface} stroke={theme.colors.textSecondary}
            strokeWidth="3" strokeDasharray="1500"
            strokeDashoffset={1500 - phoneDraw * 1500} />
          {/* Notch */}
          <rect x="90" y="15" width="80" height="12" rx="6"
            fill={theme.colors.bg} stroke={theme.colors.textMuted} strokeWidth="1.5"
            opacity={interpolate(phoneDraw, [0.1, 0.2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          {/* Status bar */}
          <rect x="30" y="32" width="200" height="4" rx="2" fill={theme.colors.accent}
            opacity={interpolate(phoneDraw, [0.15, 0.25], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          {/* App header */}
          <rect x="30" y="48" width="200" height="30" rx="6" fill={theme.colors.surfaceLight}
            opacity={interpolate(phoneDraw, [0.2, 0.35], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          {/* Hamburger */}
          {[0, 1, 2].map((l) => (
            <rect key={`m-${l}`} x="40" y={56 + l * 5} width="14" height="2" rx="1"
              fill={theme.colors.textMuted}
              opacity={interpolate(phoneDraw, [0.25, 0.35], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          ))}
          {/* Hero image placeholder */}
          <rect x="30" y="90" width="200" height="120" rx="10"
            fill={`${theme.colors.accent}15`} stroke={theme.colors.border} strokeWidth="1.5"
            opacity={interpolate(phoneDraw, [0.3, 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          <polygon points="100,130 130,155 85,155" fill={theme.colors.accent}
            opacity={interpolate(phoneDraw, [0.4, 0.55], [0, 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          <circle cx="158" cy="125" r="12" fill={theme.colors.accent}
            opacity={interpolate(phoneDraw, [0.4, 0.55], [0, 0.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          {/* Content skeleton lines */}
          {[0.6, 0.85, 0.5, 0.75, 0.4, 0.9, 0.55].map((w, j) => (
            <rect key={`l-${j}`} x="30" y={228 + j * 22} width={200 * w} height="8" rx="4"
              fill={theme.colors.border}
              opacity={interpolate(phoneDraw, [0.5 + j * 0.05, 0.6 + j * 0.05], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          ))}
          {/* Bottom nav */}
          <rect x="20" y="420" width="220" height="40" rx="8" fill={theme.colors.surfaceLight}
            opacity={interpolate(phoneDraw, [0.8, 0.95], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          {[0, 1, 2, 3].map((n) => (
            <rect key={`n-${n}`} x={50 + n * 48} y="432" width="16" height="16"
              rx={n === 1 ? 8 : 3} fill={theme.colors.textMuted}
              opacity={interpolate(phoneDraw, [0.85, 0.98], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          ))}
        </svg>

        {/* COPY Stamp */}
        {stampProgress > 0.01 && (
          <div style={{
            position: "absolute", top: "38%", left: "50%",
            transform: `translate(-50%, -50%) rotate(-12deg) scale(${stampProgress})`,
            border: `4px solid ${theme.colors.accent}aa`, borderRadius: 10,
            padding: "10px 32px", opacity: Math.min(stampProgress, 0.65),
          }}>
            <span style={{
              fontSize: 42, fontWeight: 900, color: theme.colors.accent,
              letterSpacing: 8, textTransform: "uppercase", fontFamily: theme.font,
            }}>COPY</span>
          </div>
        )}
      </div>

      {/* Glitch scan lines */}
      {glitchT > 0 && (
        <div style={{
          position: "absolute", inset: 0,
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${theme.colors.accent}20 2px, ${theme.colors.accent}20 3px)`,
          opacity: glitchT, mixBlendMode: "screen",
        }} />
      )}

      {/* ── "Great product" infographic ──────────────────── */}
      {infoReveal > 0 && (
        <div style={{
          position: "absolute", top: "50%", right: "12%",
          transform: "translateY(-50%)", opacity: infoReveal,
          display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 24,
        }}>
          <span style={{
            fontSize: 34, fontWeight: 900, color: theme.colors.accent,
            letterSpacing: 3, textTransform: "uppercase",
          }}>Great products need</span>
          {[
            { icon: "💡", label: "Vision & Strategy", delay: 0 },
            { icon: "🎯", label: "User-Centered Design", delay: 6 },
            { icon: "⚡", label: "Technical Excellence", delay: 12 },
            { icon: "🔄", label: "Rapid Iteration", delay: 18 },
          ].map((item, i) => {
            const p = interpolate(frame - 100 - item.delay, [0, 15], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16,
                opacity: p, transform: `translateX(${interpolate(p, [0, 1], [30, 0])}px)`,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${theme.colors.accent}18`, border: `2px solid ${theme.colors.accent}44`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                }}>{item.icon}</div>
                <span style={{
                  fontSize: 24, fontWeight: 700, color: theme.colors.textSecondary, letterSpacing: 1,
                }}>{item.label}</span>
              </div>
            );
          })}
        </div>
      )}

      <RobotGuide frame={frame} x={3} y={3} scale={0.7}
        expression={frame > 85 ? "thinking" : "neutral"} />
    </AbsoluteFill>
  );
};
