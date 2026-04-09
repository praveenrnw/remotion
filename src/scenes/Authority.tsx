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
 * AUTHORITY — 16.5–29.5s (390 frames)
 * Logo reveal → animated stats counters → world-map dots.
 * VO says: "We're Nativewit, product engineering studio, 5+ years,
 * 30+ products, clients across AU/US/Asia."
 */

/* Map dot positions (approximate screen %, top/left) */
const MAP_DOTS = [
  { label: "AU", top: 72, left: 80, delay: 281 },
  { label: "US", top: 38, left: 18, delay: 281 },
  { label: "Asia", top: 42, left: 72, delay: 300 },
];

export const Authority: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Transitions ────────────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const exitFade = interpolate(frame, [360, 390], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 1: Logo + brand name (frames 0-100) ─────────── */
  const logoProgress = spring({ frame, fps, config: { damping: 100, mass: 0.5 } });
  const logoScale = interpolate(logoProgress, [0, 1], [0.7, 1]);

  const nameReveal = interpolate(frame, [1, 40], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Subtitle (VO "product engineering studio" at frame 43) */
  const subtitleProgress = spring({
    frame: frame - 43,
    fps,
    config: { damping: 120 },
  });

  /* ── Phase 1→2 cross: brand fades up, stats appear below ── */
  const brandLift = interpolate(frame, [130, 180], [0, -80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Phase 2: Animated counters (frame 164 = "5+ years") ── */
  const yearsCount = Math.min(
    5,
    Math.floor(
      interpolate(frame, [164, 200], [0, 5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );
  const yearsOpacity = interpolate(frame, [164, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const productsCount = Math.min(
    30,
    Math.floor(
      interpolate(frame, [219, 260], [0, 30], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );
  const productsOpacity = interpolate(frame, [219, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 3: World map dots (frame 281 = "clients across") */
  const mapOpacity = interpolate(frame, [270, 290], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Device icons (mobile + web) — VO "mobile and web" at f108 */
  const deviceProgress = spring({
    frame: frame - 95,
    fps,
    config: { damping: 100 },
  });

  /* ── Continuous 2-second breathing cycle ─────────────────── */
  const breathe = Math.sin(frame * Math.PI / 30);
  const breatheY = breathe * 3;
  const breatheScale = 1 + breathe * 0.01;

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: Math.min(entryFade, exitFade),
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}12 0%, transparent 70%)`,
          filter: "blur(60px)",
          opacity: logoProgress,
        }}
      />

      {/* Floating ambient particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const px = 10 + (i * 37) % 80;
        const py = 15 + (i * 53) % 70;
        const drift = Math.sin((frame + i * 40) * 0.03) * 15;
        const particleOpacity = interpolate(frame, [20, 60], [0, 0.15], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={`ap-${i}`}
            style={{
              position: "absolute",
              top: `${py + drift * 0.3}%`,
              left: `${px}%`,
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              borderRadius: "50%",
              background: theme.colors.accent,
              opacity: particleOpacity,
              transform: `translateY(${drift}px)`,
            }}
          />
        );
      })}

      {/* ─── Brand block (lifts up to make space for stats) ─── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translateY(${brandLift}px)`,
        }}
      >
        {/* Logo with shimmer + pulse ring */}
        <div
          style={{
            opacity: logoProgress,
            transform: `scale(${logoScale})`,
            marginBottom: 20,
            position: "relative",
          }}
        >
          {/* Pulse ring around logo */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 130,
              height: 130,
              borderRadius: "50%",
              border: `1px solid ${theme.colors.accent}22`,
              opacity: 0.5 + Math.sin(frame * 0.08) * 0.3,
            }}
          />
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 8,
            }}
          >
            <Img
              src={staticFile("logo.png")}
              style={{ width: 90, height: "auto" }}
            />
            {/* Shimmer sweep */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)`,
                transform: `translateX(${interpolate(frame, [5, 35], [-100, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
              }}
            />
          </div>
        </div>

        {/* Brand name */}
        <h1
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: theme.colors.textPrimary,
            margin: 0,
            letterSpacing: "-2px",
            clipPath: `inset(0 ${100 - nameReveal}% 0 0)`,
            transform: `translateY(${breatheY * 0.5}px)`,
          }}
        >
          We're{" "}
          <span style={{ color: theme.colors.accent }}>Nativewit.</span>
        </h1>

        {/* Subtitle + device icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 16,
            opacity: subtitleProgress,
          }}
        >
          {/* Phone icon */}
          <div
            style={{
              width: 16,
              height: 26,
              borderRadius: 4,
              border: `2px solid ${theme.colors.textMuted}`,
              opacity: deviceProgress,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 2,
                left: "50%",
                transform: "translateX(-50%)",
                width: 6,
                height: 2,
                borderRadius: 1,
                background: theme.colors.textMuted,
              }}
            />
          </div>

          <span
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: theme.colors.textSecondary,
              letterSpacing: 1,
            }}
          >
            Product Engineering Studio
          </span>

          {/* Laptop icon */}
          <div
            style={{
              opacity: deviceProgress,
              position: "relative",
              width: 28,
              height: 20,
            }}
          >
            <div
              style={{
                width: 26,
                height: 16,
                borderRadius: 3,
                border: `2px solid ${theme.colors.textMuted}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: -2,
                width: 30,
                height: 2,
                borderRadius: 1,
                background: theme.colors.textMuted,
              }}
            />
          </div>
        </div>
      </div>

      {/* ─── Stats row ────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "58%",
          display: "flex",
          gap: 80,
          alignItems: "center",
          transform: `translateY(${breatheY}px) scale(${breatheScale})`,
        }}
      >
        {/* Years counter */}
        <div style={{ textAlign: "center", opacity: yearsOpacity }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: theme.colors.accent,
              lineHeight: 1,
              letterSpacing: "-1px",
            }}
          >
            {yearsCount}+
          </div>
          <p
            style={{
              fontSize: 22,
              color: theme.colors.textMuted,
              margin: "10px 0 0",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2.5,
            }}
          >
            Years
          </p>
        </div>

        {/* Products counter */}
        <div style={{ textAlign: "center", opacity: productsOpacity }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: theme.colors.accent,
              lineHeight: 1,
              letterSpacing: "-1px",
            }}
          >
            {productsCount}+
          </div>
          <p
            style={{
              fontSize: 22,
              color: theme.colors.textMuted,
              margin: "10px 0 0",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2.5,
            }}
          >
            Products shipped
          </p>
        </div>
      </div>

      {/* ─── World map dots ───────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: mapOpacity,
        }}
      >
        {/* Simplified continent outlines — faint rectangles */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "10%",
            width: "22%",
            height: "35%",
            borderRadius: 8,
            border: `1px solid ${theme.colors.border}`,
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "60%",
            width: "30%",
            height: "50%",
            borderRadius: 8,
            border: `1px solid ${theme.colors.border}`,
            opacity: 0.3,
          }}
        />

        {/* Glowing location dots */}
        {MAP_DOTS.map((dot) => {
          const dotProgress = spring({
            frame: frame - dot.delay,
            fps,
            config: { damping: 60, mass: 0.4 },
          });
          const dotScale = interpolate(dotProgress, [0, 1], [0, 1]);
          const ringPulse = frame > dot.delay + 15
            ? 1 + Math.sin((frame - dot.delay) * 0.15) * 0.3
            : 0;

          return (
            <div
              key={dot.label}
              style={{
                position: "absolute",
                top: `${dot.top}%`,
                left: `${dot.left}%`,
                transform: `translate(-50%, -50%) scale(${dotScale})`,
              }}
            >
              {/* Pulse ring */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) scale(${ringPulse})`,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: `1px solid ${theme.colors.accent}44`,
                  opacity: dotProgress,
                }}
              />
              {/* Core dot */}
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: theme.colors.accent,
                  boxShadow: `0 0 16px 4px ${theme.colors.accent}55`,
                }}
              />
              {/* Label */}
              <span
                style={{
                  position: "absolute",
                  top: 18,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 20,
                  fontWeight: 800,
                  color: theme.colors.textMuted,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  opacity: dotProgress,
                }}
              >
                {dot.label}
              </span>
            </div>
          );
        })}

        {/* Connection arc lines between dots */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* US → Asia arc */}
          <path
            d="M 18 38 Q 45 20 72 42"
            fill="none"
            stroke={theme.colors.accent}
            strokeWidth="0.2"
            opacity={mapOpacity * 0.5}
            strokeDasharray="2 1.5"
            strokeDashoffset={interpolate(frame, [281, 390], [50, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
          {/* Asia → AU arc */}
          <path
            d="M 72 42 Q 82 55 80 72"
            fill="none"
            stroke={theme.colors.accent}
            strokeWidth="0.2"
            opacity={mapOpacity * 0.5}
            strokeDasharray="2 1.5"
            strokeDashoffset={interpolate(frame, [300, 390], [30, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
          {/* US → AU arc */}
          <path
            d="M 18 38 Q 50 70 80 72"
            fill="none"
            stroke={theme.colors.accent}
            strokeWidth="0.15"
            opacity={mapOpacity * 0.3}
            strokeDasharray="2 2"
            strokeDashoffset={interpolate(frame, [310, 390], [80, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
          {/* Traveling dot on US→Asia path */}
          {frame > 300 && (
            <circle
              cx={interpolate(frame, [300, 370], [18, 72], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              cy={interpolate(frame, [300, 335, 370], [38, 24, 42], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              r="0.8"
              fill={theme.colors.accent}
              opacity={mapOpacity * 0.8}
            />
          )}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
