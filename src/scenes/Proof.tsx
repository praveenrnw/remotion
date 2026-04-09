import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";

/**
 * PROOF — 29.5–44s (435 frames)
 * Animated infographic cards for each product category.
 * VO: AI video tools, mental health platforms, fintech, shipped in weeks.
 */

const CATEGORIES = [
  { label: "Video & AI", color: "#8b5cf6", delay: 0 },
  { label: "Health", color: theme.colors.green, delay: 84 },
  { label: "Fintech", color: theme.colors.blue, delay: 185 },
];

export const Proof: React.FC = () => {
  const frame = useCurrentFrame();

  /* ── Scene transitions ──────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const exitFade = interpolate(frame, [405, 435], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── "Shipped in weeks" calendar animation (frame 339) ─── */
  const calendarProgress = interpolate(frame, [339, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── "Real products, real users" highlight (frame 271) ─── */
  const realUsersReveal = interpolate(frame, [271, 292], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  const realUsersPulse = frame >= 271 && frame < 339
    ? 0.5 + Math.sin((frame - 271) * 0.12) * 0.5
    : 0;

  /* ── Speed arrows for "weeks not months" ────────────────── */
  const arrowProgress = interpolate(frame, [350, 400], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Continuous 2-second breathing cycle ─────────────────── */
  const breathe = Math.sin(frame * Math.PI / 30);
  const breatheY = breathe * 3;

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        opacity: Math.min(entryFade, exitFade),
        overflow: "hidden",
      }}
    >
      {/* Floating data particles */}
      {Array.from({ length: 10 }).map((_, i) => {
        const px = 8 + (i * 41) % 84;
        const py = 10 + (i * 59) % 80;
        const drift = Math.sin((frame + i * 35) * 0.025) * 12;
        const particleOpacity = interpolate(frame, [15, 50], [0, 0.1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={`fp-${i}`}
            style={{
              position: "absolute",
              top: `${py}%`,
              left: `${px}%`,
              width: i % 3 === 0 ? 4 : 3,
              height: i % 3 === 0 ? 4 : 3,
              borderRadius: i % 2 === 0 ? "50%" : 1,
              background: CATEGORIES[i % 3].color,
              opacity: particleOpacity,
              transform: `translateY(${drift}px)`,
            }}
          />
        );
      })}
      {/* Section label */}
      <span
        style={{
          position: "absolute",
          top: 60,
          left: 120,
          fontSize: 24,
          fontWeight: 800,
          color: theme.colors.accent,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: interpolate(frame, [5, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        What we've shipped
      </span>

      {/* ─── 3 category cards in a row ────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "14%",
          left: 120,
          right: 120,
          display: "flex",
          gap: 28,
          height: "48%",
        }}
      >
        {CATEGORIES.map((cat, i) => {
          const cardProgress = interpolate(
            frame - cat.delay,
            [0, 25],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            },
          );
          const cardY = interpolate(cardProgress, [0, 1], [30, 0]);

          /* Staggered card float for continuous movement */
          const cardBreathe = Math.sin((frame + i * 20) * Math.PI / 30) * 3;

          /* Active glow while VO discusses this category */
          const nextDelay = CATEGORIES[i + 1]?.delay ?? 339;
          const isActive = frame >= cat.delay && frame < nextDelay;

          return (
            <div
              key={cat.label}
              style={{
                flex: 1,
                background: theme.colors.surface,
                borderRadius: 20,
                border: `1px solid ${isActive ? cat.color + "55" : theme.colors.border}`,
                opacity: cardProgress,
                transform: `translateY(${cardY + cardBreathe}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: `${interpolate(cardProgress, [0, 1], [0, 100])}%`,
                  height: 3,
                  background: cat.color,
                  borderRadius: "20px 20px 0 0",
                }}
              />

              {/* Active glow background */}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at 50% 40%, ${cat.color}12 0%, transparent 70%)`,
                  }}
                />
              )}

              {/* Active pulsing border glow */}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    inset: -1,
                    borderRadius: 21,
                    border: `1px solid ${cat.color}44`,
                    opacity: 0.5 + Math.sin(frame * 0.1) * 0.3,
                  }}
                />
              )}

              {/* Category-specific icon */}
              {i === 0 && (
                /* Video/AI — Play button + sparkle */
                <div style={{ position: "relative", width: 70, height: 70 }}>
                  {/* Play triangle */}
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: `30px solid ${cat.color}`,
                      borderTop: "18px solid transparent",
                      borderBottom: "18px solid transparent",
                      marginLeft: 22,
                      marginTop: 17,
                    }}
                  />
                  {/* AI sparkle dots */}
                  {[0, 1, 2].map((s) => {
                    const sparkleAngle = ((frame * 2 + s * 120) % 360) * (Math.PI / 180);
                    return (
                      <div
                        key={s}
                        style={{
                          position: "absolute",
                          top: 35 + Math.sin(sparkleAngle) * 32,
                          left: 35 + Math.cos(sparkleAngle) * 32,
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: cat.color,
                          opacity: 0.7,
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {i === 1 && (
                /* Health — Heart + pulse line */
                <div style={{ position: "relative", width: 80, height: 70 }}>
                  {/* Simplified heart using two circles + rotated square */}
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 20,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: cat.color,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 36,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: cat.color,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 18,
                      left: 24,
                      width: 32,
                      height: 32,
                      background: cat.color,
                      transform: "rotate(45deg)",
                      borderRadius: "0 0 5px 0",
                    }}
                  />
                  {/* Pulse line */}
                  <svg
                    style={{ position: "absolute", bottom: -5, left: 0, width: 80, height: 20 }}
                    viewBox="0 0 80 20"
                  >
                    <polyline
                      points="0,10 20,10 28,2 36,18 44,10 80,10"
                      fill="none"
                      stroke={cat.color}
                      strokeWidth="2"
                      strokeDasharray="80"
                      strokeDashoffset={interpolate(
                        frame - cat.delay,
                        [0, 40],
                        [80, 0],
                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                      )}
                    />
                  </svg>
                </div>
              )}

              {i === 2 && (
                /* Fintech — Bar chart */
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 8,
                    height: 60,
                  }}
                >
                  {[0.4, 0.65, 0.9, 0.55, 1].map((h, j) => {
                    const barH = interpolate(
                      frame - cat.delay,
                      [j * 8, j * 8 + 25],
                      [0, h * 60],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                    );
                    return (
                      <div
                        key={j}
                        style={{
                          width: 12,
                          height: barH,
                          background:
                            j === 4
                              ? cat.color
                              : `${cat.color}88`,
                          borderRadius: "3px 3px 0 0",
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {/* Category label */}
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: cat.color,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ─── "Real products, real users" visual (frame 271) ── */}
      {realUsersReveal > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: realUsersReveal,
          }}
        >
          {/* User avatar dots */}
          {[0, 1, 2, 3, 4].map((i) => {
            const avatarDelay = 271 + i * 6;
            const avatarProgress = interpolate(
              frame - avatarDelay,
              [0, 20],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.19, 1, 0.22, 1),
              },
            );
            return (
              <div
                key={`user-${i}`}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: i % 2 === 0 ? theme.colors.accent : theme.colors.green,
                  opacity: avatarProgress * 0.8,
                  transform: `scale(${interpolate(avatarProgress, [0, 1], [0.3, 1])})`,
                  border: `2px solid ${theme.colors.surface}`,
                  marginLeft: i > 0 ? -8 : 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Tiny person silhouette */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.colors.surface }} />
                  <div style={{ width: 12, height: 6, borderRadius: "0 0 6px 6px", background: theme.colors.surface, marginTop: 1 }} />
                </div>
              </div>
            );
          })}
          {/* Glow pulse behind avatars */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 180,
              height: 60,
              borderRadius: 30,
              background: `radial-gradient(ellipse, ${theme.colors.accent}18 0%, transparent 70%)`,
              opacity: realUsersPulse,
            }}
          />
        </div>
      )}

      {/* ─── "Shipped in weeks" block ─────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "14%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: calendarProgress,
        }}
      >
        {/* Calendar icon */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 8,
            border: `2px solid ${theme.colors.accent}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Calendar header */}
          <div
            style={{
              height: 12,
              background: theme.colors.accent,
            }}
          />
          {/* Grid dots */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 3,
              padding: 4,
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((d) => (
              <div
                key={d}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 1,
                  background: d < 2 ? theme.colors.accent : theme.colors.textMuted,
                }}
              />
            ))}
          </div>
        </div>

        {/* Fast-forward arrows */}
        <div style={{ display: "flex", gap: 4 }}>
          {[0, 1, 2].map((a) => {
            const arrowOpacity = interpolate(
              arrowProgress,
              [a * 0.2, a * 0.2 + 0.4],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );
            return (
              <div
                key={a}
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `12px solid ${theme.colors.accent}`,
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  opacity: arrowOpacity,
                }}
              />
            );
          })}
        </div>

        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: theme.colors.textMuted,
            letterSpacing: 2.5,
            textTransform: "uppercase",
          }}
        >
          Weeks, not months
        </span>
      </div>
    </AbsoluteFill>
  );
};
