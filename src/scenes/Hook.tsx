import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/**
 * HOOK — 0–5s (150 frames)
 * 3D perspective conveyor belt of identical app mockups → dramatic glitch break.
 * VO: "Most software agencies will build what you ask for.
 *      That's not what great products need."
 */

/* Skeleton line widths — identical in every card = cookie-cutter */
const LINE_WIDTHS = [0.55, 0.75, 0.4, 0.65, 0.35, 0.8, 0.5];

/* "COPY" stamp rotation per card for visual interest */
const STAMP_ROTATIONS = [-12, -8, -15, -6, -10, -14, -9];

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Opening zoom-in (frames 0-30) ─────────────────────── */
  const cameraZoom = interpolate(frame, [0, 40], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Conveyor belt of identical app screens (7 cards) ───── */
  const conveyorXBase = interpolate(frame, [0, 150], [180, -1400], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  /* ── Conveyor deceleration beat at "ask for." (frame 57) ── */
  const conveyorPause = interpolate(frame, [55, 60, 68, 75], [1, 0.3, 0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Apply pause to conveyor ─────────────────────────────── */
  const conveyorX = conveyorXBase * conveyorPause + conveyorXBase * (1 - conveyorPause) * 0.95;

  /* ── Factory rail beneath cards ─────────────────────────── */
  const railX = interpolate(frame, [0, 150], [0, -600]);

  /* ── Stamp appears on cards as they pass center (~frame 20+) */
  const stampReveal = interpolate(frame, [15, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Glitch at ~frame 88 (synced to "That's not what great
       products need" at frame 94 — builds in the pause) ───── */
  const glitch = interpolate(frame, [85, 93, 100, 116], [0, 1, 0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── RGB split channels during glitch ──────────────────── */
  const rgbSplit = glitch * 8;

  /* ── Particle burst at peak glitch (frames 93-120) ──────── */
  const burstProgress = interpolate(frame, [93, 122], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const burstOpacity = interpolate(frame, [93, 100, 122], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Accent line reveals after glitch ──────────────────── */
  const lineWidth = interpolate(frame, [102, 135], [0, 280], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  const lineGlow = interpolate(frame, [102, 118, 135], [0, 1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Exit ──────────────────────────────────────────────── */
  const exitFade = interpolate(frame, [132, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Background grid pulse ─────────────────────────────── */
  const gridOpacity = interpolate(frame, [0, 20], [0, 0.06], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        opacity: exitFade,
        overflow: "hidden",
        transform: `scale(${cameraZoom})`,
      }}
    >
      {/* ── Perspective grid background ──────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${theme.colors.textPrimary}${Math.round(gridOpacity * 255).toString(16).padStart(2, "0")} 1px, transparent 1px),
            linear-gradient(90deg, ${theme.colors.textPrimary}${Math.round(gridOpacity * 255).toString(16).padStart(2, "0")} 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: "perspective(600px) rotateX(55deg)",
          transformOrigin: "50% 100%",
          opacity: gridOpacity > 0 ? 1 : 0,
        }}
      />

      {/* ── Ambient glow following conveyor ──────────────── */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "40%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}0a 0%, transparent 60%)`,
          filter: "blur(40px)",
        }}
      />

      {/* ── Factory assembly rail ─────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${theme.colors.border}, ${theme.colors.border}, transparent)`,
        }}
      />
      {/* Rail tick marks — move with conveyor */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`tick-${i}`}
          style={{
            position: "absolute",
            bottom: "17.2%",
            left: railX + i * 120,
            width: 1,
            height: 12,
            background: theme.colors.border,
            opacity: 0.4,
          }}
        />
      ))}

      {/* ── Assembly line mockups — 7 identical cards ─────── */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const x = conveyorX + i * 300;
        const gx = glitch * Math.sin(i * 47) * 40;
        const gy = glitch * Math.cos(i * 31) * 20;

        /* Per-card depth: center cards slightly larger */
        const screenCenter = 960;
        const cardCenter = x + 130;
        const distFromCenter = Math.abs(cardCenter - screenCenter);
        const depthScale = interpolate(distFromCenter, [0, 600], [1, 0.88], {
          extrapolateRight: "clamp",
        });
        const depthBlur = interpolate(distFromCenter, [300, 700], [0, 2], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        /* Stamp visibility — appears when card is past 40% screen */
        const stampVisible = cardCenter < screenCenter + 100 ? stampReveal : 0;
        const stampScale = spring({
          frame: Math.max(0, Math.floor(stampVisible * 15)),
          fps,
          config: { damping: 60, mass: 0.3 },
        });

        /* Glitch fracture — cards split apart */
        const fractureY = glitch * Math.sin(i * 73) * 25;
        const fractureRotate = glitch * Math.sin(i * 37) * 12;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + gx,
              top: 145 + gy + fractureY,
              width: 240,
              height: 430,
              borderRadius: 18,
              background: theme.colors.surface,
              border: `1px solid ${glitch > 0.5 ? theme.colors.accent + "66" : theme.colors.border}`,
              transform: `scale(${depthScale}) skewX(${glitch * Math.sin(i * 23) * 10}deg) rotate(${fractureRotate}deg)`,
              boxShadow: glitch > 0.3
                ? `${rgbSplit}px 0 0 ${theme.colors.accent}33, -${rgbSplit}px 0 0 ${theme.colors.blue}33, 0 24px 60px rgba(0,0,0,0.5)`
                : "0 24px 60px rgba(0,0,0,0.35)",
              overflow: "hidden",
              filter: `blur(${depthBlur}px)`,
            }}
          >
            {/* Status bar (3 dots + time) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 14px 6px",
                gap: 5,
              }}
            >
              {[0, 1, 2].map((d) => (
                <div
                  key={d}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: theme.colors.textMuted,
                  }}
                />
              ))}
              <div style={{ flex: 1 }} />
              <div
                style={{
                  width: 28,
                  height: 5,
                  borderRadius: 3,
                  background: theme.colors.textMuted,
                }}
              />
            </div>

            {/* Nav header with hamburger + avatar circle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                gap: 10,
              }}
            >
              {/* Hamburger */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {[0, 1, 2].map((l) => (
                  <div
                    key={l}
                    style={{
                      width: 14,
                      height: 2,
                      borderRadius: 1,
                      background: theme.colors.textMuted,
                    }}
                  />
                ))}
              </div>
              <div style={{ flex: 1 }} />
              {/* Avatar circle */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: theme.colors.border,
                }}
              />
            </div>

            {/* Hero image placeholder */}
            <div
              style={{
                margin: "8px 16px",
                height: 90,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${theme.colors.surfaceLight}, ${theme.colors.border})`,
              }}
            />

            {/* Skeleton content lines */}
            {LINE_WIDTHS.map((w, j) => (
              <div
                key={j}
                style={{
                  margin: `${10 + j * 2}px 16px 0`,
                  height: 6,
                  width: `${w * 100}%`,
                  background: theme.colors.border,
                  borderRadius: 3,
                }}
              />
            ))}

            {/* Two side-by-side buttons */}
            <div
              style={{
                display: "flex",
                gap: 8,
                margin: "auto 16px 20px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 28,
                  borderRadius: 7,
                  background: theme.colors.border,
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: 28,
                  borderRadius: 7,
                  border: `1px solid ${theme.colors.border}`,
                }}
              />
            </div>

            {/* Bottom nav bar */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 36,
                borderTop: `1px solid ${theme.colors.border}`,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "0 20px",
              }}
            >
              {[0, 1, 2, 3].map((n) => (
                <div
                  key={n}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: n === 1 ? "50%" : 3,
                    background: theme.colors.textMuted,
                    opacity: 0.4,
                  }}
                />
              ))}
            </div>

            {/* "COPY" stamp overlay */}
            {stampVisible > 0.5 && (
              <div
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${STAMP_ROTATIONS[i % STAMP_ROTATIONS.length]}deg) scale(${stampScale})`,
                  border: `3px solid ${theme.colors.accent}88`,
                  borderRadius: 6,
                  padding: "6px 18px",
                  opacity: 0.55,
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: theme.colors.accent,
                    letterSpacing: 6,
                    textTransform: "uppercase",
                  }}
                >
                  COPY
                </span>
              </div>
            )}
          </div>
        );
      })}

      {/* ── Glitch scan-line overlay ──────────────────────── */}
      {glitch > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${theme.colors.accent}20 2px, ${theme.colors.accent}20 3px)`,
            opacity: glitch,
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* ── RGB channel split bands ──────────────────────── */}
      {glitch > 0.3 && (
        <>
          <div
            style={{
              position: "absolute",
              top: `${35 + Math.sin(frame * 0.7) * 12}%`,
              left: 0,
              right: 0,
              height: 3,
              background: theme.colors.accent,
              opacity: glitch * 0.6,
              filter: "blur(1px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: `${55 + Math.cos(frame * 0.9) * 8}%`,
              left: 0,
              right: 0,
              height: 2,
              background: theme.colors.blue,
              opacity: glitch * 0.4,
              filter: "blur(1px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: `${70 + Math.sin(frame * 1.1) * 6}%`,
              left: 0,
              right: 0,
              height: 2,
              background: theme.colors.green,
              opacity: glitch * 0.3,
              filter: "blur(2px)",
            }}
          />
        </>
      )}

      {/* ── Particle burst on glitch ─────────────────────── */}
      {burstOpacity > 0 &&
        Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const radius = burstProgress * 350;
          const px = 960 + Math.cos(angle) * radius;
          const py = 400 + Math.sin(angle) * radius;
          return (
            <div
              key={`p-${i}`}
              style={{
                position: "absolute",
                left: px,
                top: py,
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: i % 3 === 0 ? theme.colors.accent : i % 3 === 1 ? theme.colors.blue : theme.colors.textMuted,
                opacity: burstOpacity * (0.5 + Math.random() * 0.01),
                filter: "blur(1px)",
              }}
            />
          );
        })}

      {/* ── Vignette flash on glitch peak ────────────────── */}
      {glitch > 0.6 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at center, transparent 40%, ${theme.colors.accent}15 100%)`,
            opacity: glitch,
          }}
        />
      )}

      {/* ── Accent underline with glow — "something better" cue */}
      <div
        style={{
          position: "absolute",
          bottom: "14%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: theme.colors.accent,
            borderRadius: 2,
            boxShadow: lineGlow > 0
              ? `0 0 ${20 * lineGlow}px ${8 * lineGlow}px ${theme.colors.accent}44`
              : "none",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
