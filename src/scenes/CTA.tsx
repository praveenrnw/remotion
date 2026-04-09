import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/**
 * CTA — 65.5–78s (375 frames)
 * Clean close. Logo + one line + URL.
 */

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Scene fade-in ──────────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  /* ── Logo ───────────────────────────────────────────────── */
  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 80, mass: 0.5 },
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0.6, 1]);

  /* ── Phase 1: "Building something that matters" (f13-75) ─ */
  const buildReveal = spring({
    frame: frame - 13,
    fps,
    config: { damping: 80, mass: 0.5 },
  });
  const buildFade = interpolate(frame, [68, 82], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 2: "Let's talk." line — VO at f83 ────────────── */
  const lineReveal = interpolate(frame, [73, 100], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Text scale entrance ────────────────────────────────── */
  const textScale = interpolate(
    spring({ frame: frame - 75, fps, config: { damping: 60, mass: 0.4 } }),
    [0, 1],
    [0.85, 1],
  );

  /* ── Underline after text reveals ───────────────────────── */
  const underlineWidth = interpolate(frame, [100, 135], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Shimmer sweep across text ──────────────────────────── */
  const shimmerX = interpolate(frame, [105, 145], [-100, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  /* ── URL ────────────────────────────────────────────────── */
  const urlProgress = spring({
    frame: frame - 120,
    fps,
    config: { damping: 100 },
  });
  const urlScale = interpolate(urlProgress, [0, 1], [0.9, 1]);

  /* ── Ambient glow pulse ─────────────────────────────────── */
  const glowPulse = interpolate(
    frame,
    [0, 125, 250, 375],
    [0.1, 0.25, 0.15, 0.2],
  );

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: entryFade,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}22 0%, transparent 60%)`,
          filter: "blur(80px)",
          opacity: glowPulse,
        }}
      />

      {/* Expanding ring pulses */}
      {[0, 1, 2].map((i) => {
        const ringDelay = 50 + i * 80;
        const ringProgress = interpolate(
          (frame - ringDelay) % 200,
          [0, 200],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const ringOp = frame > ringDelay
          ? interpolate(ringProgress, [0, 0.3, 1], [0, 0.15, 0])
          : 0;
        return (
          <div
            key={`ring-${i}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 100 + ringProgress * 500,
              height: 100 + ringProgress * 500,
              borderRadius: "50%",
              border: `1px solid ${theme.colors.accent}`,
              opacity: ringOp,
            }}
          />
        );
      })}

      {/* Rising particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const px = 42 + (i * 17) % 20;
        const rise = ((frame + i * 30) % 120) / 120;
        const pOp = interpolate(rise, [0, 0.2, 0.8, 1], [0, 0.2, 0.15, 0]);
        return (
          <div
            key={`rp-${i}`}
            style={{
              position: "absolute",
              bottom: `${rise * 80}%`,
              left: `${px}%`,
              width: 2 + (i % 2),
              height: 2 + (i % 2),
              borderRadius: "50%",
              background: theme.colors.accent,
              opacity: frame > 30 ? pOp : 0,
            }}
          />
        );
      })}

      {/* Logo */}
      <div
        style={{
          opacity: logoProgress,
          transform: `scale(${logoScale})`,
          marginBottom: 40,
        }}
      >
        <Img
          src={staticFile("logo.png")}
          style={{ width: 80, height: "auto" }}
        />
      </div>

      {/* Phase 1: "Building something that matters" visual */}
      {buildReveal > 0 && buildFade > 0 && (
        <div
          style={{
            position: "absolute",
            top: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: buildReveal * buildFade,
          }}
        >
          {/* Abstract assembling structure */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
            {[0, 1, 2, 3, 4].map((i) => {
              const blockDelay = 13 + i * 8;
              const blockProgress = spring({
                frame: frame - blockDelay,
                fps,
                config: { damping: 50, mass: 0.3 },
              });
              const heights = [24, 36, 52, 40, 28];
              const widths = [16, 18, 22, 18, 16];
              return (
                <div
                  key={`block-${i}`}
                  style={{
                    width: widths[i],
                    height: heights[i] * blockProgress,
                    borderRadius: 3,
                    background: i === 2
                      ? `linear-gradient(to top, ${theme.colors.accent}55, ${theme.colors.accent})`
                      : `linear-gradient(to top, ${theme.colors.accent}22, ${theme.colors.accent}55)`,
                    border: `1px solid ${theme.colors.accent}${i === 2 ? '88' : '33'}`,
                    transform: `translateY(${interpolate(blockProgress, [0, 1], [10, 0])}px)`,
                  }}
                />
              );
            })}
          </div>
          {/* Foundation line */}
          <div
            style={{
              width: interpolate(buildReveal, [0, 1], [0, 120]),
              height: 2,
              background: `linear-gradient(90deg, transparent, ${theme.colors.accent}44, transparent)`,
              borderRadius: 1,
            }}
          />
        </div>
      )}

      {/* Phase 2: Main CTA line with cursor */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: theme.colors.textPrimary,
            margin: 0,
            textAlign: "center",
            lineHeight: 1.25,
            letterSpacing: "-1.5px",
            maxWidth: 900,
            clipPath: `inset(0 ${100 - lineReveal}% 0 0)`,
            transform: `scale(${textScale})`,
            position: "relative",
          }}
        >
          <span style={{ color: theme.colors.accent }}>Let's talk.</span>
          {/* Shimmer overlay */}
          {lineReveal >= 100 && (
            <span
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(90deg, transparent ${shimmerX - 20}%, rgba(255,255,255,0.15) ${shimmerX}%, transparent ${shimmerX + 20}%)`,
                pointerEvents: "none",
              }}
            />
          )}
        </h1>

        {/* Accent underline */}
        <div
          style={{
            width: `${underlineWidth}%`,
            height: 3,
            background: `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.accentSoft})`,
            borderRadius: 2,
            marginTop: 6,
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: underlineWidth > 50 ? `0 0 12px ${theme.colors.accent}44` : "none",
          }}
        />

        {/* Blinking cursor after text */}
        {lineReveal >= 100 && (
          <div
            style={{
              position: "absolute",
              right: -12,
              top: "10%",
              width: 3,
              height: "65%",
              background: theme.colors.accent,
              borderRadius: 1,
              opacity: Math.sin(frame * 0.15) > 0 ? 0.8 : 0,
            }}
          />
        )}
      </div>

      {/* URL */}
      <div
        style={{
          marginTop: 48,
          opacity: urlProgress,
          transform: `scale(${urlScale})`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: theme.colors.accent,
          }}
        />
        <span
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: theme.colors.textSecondary,
            letterSpacing: 1,
          }}
        >
          nativewit.in
        </span>
      </div>
    </AbsoluteFill>
  );
};
