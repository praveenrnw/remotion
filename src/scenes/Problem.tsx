import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";

/**
 * PROBLEM — 5–16.5s (345 frames)
 * Visual metaphor: a racing indicator hits walls and decelerates.
 * Features: HUD dashboard, particle trail, speedometer, debris on impact.
 *
 * VO cues (local frames):
 *   11  "You're a founder"
 *   50  "or a product lead"
 *   97  "trying to move fast."
 *  158  "Technical complexity slows you down."
 *  252  "The wrong build partner slows you down"
 *  304  "even more."
 */

/* Debris particles generated on wall impact */
const DEBRIS_COUNT = 12;

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();

  /* ── Scene transitions ──────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const exitFade = interpolate(frame, [315, 345], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Racing orb — fast then decelerating ────────────────── */
  const orbX = interpolate(
    frame,
    [0, 60, 97, 158, 252, 345],
    [5, 25, 42, 52, 60, 62],
    { extrapolateRight: "clamp" },
  );
  const orbGlow = interpolate(frame, [0, 97, 200, 300], [1, 0.8, 0.4, 0.15], {
    extrapolateRight: "clamp",
  });

  /* ── Orb speed for HUD gauge ────────────────────────────── */
  const orbSpeed = interpolate(
    frame,
    [0, 60, 97, 158, 252, 345],
    [90, 85, 70, 30, 15, 5],
    { extrapolateRight: "clamp" },
  );

  /* ── Speed lines behind orb (fade as it slows) ──────────── */
  const speedOpacity = interpolate(frame, [0, 97, 200], [0.8, 0.4, 0], {
    extrapolateRight: "clamp",
  });

  /* ── Particle trail behind orb ──────────────────────────── */
  const trailOpacity = interpolate(frame, [0, 97, 250], [0.6, 0.3, 0], {
    extrapolateRight: "clamp",
  });

  /* ── Grid track marks ──────────────────────────────────── */
  const gridScroll = interpolate(frame, [0, 345], [0, -400]);

  /* ── Wall 1: Complexity — appears at ~frame 150
       (VO "Technical complexity" hits at frame 158) ─────── */
  const wall1 = interpolate(frame, [150, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Wall 2: Wrong partner — appears at ~frame 244
       (VO "wrong build partner" hits at frame 252) ────── */
  const wall2 = interpolate(frame, [244, 264], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Founder + product lead label reveals ─────────────── */
  const founderReveal = interpolate(frame, [11, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  const leadReveal = interpolate(frame, [50, 69], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });
  const labelsFade = interpolate(frame, [85, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Impact shake on wall hits ──────────────────────────── */
  const shake1 = frame >= 158 && frame < 172
    ? Math.sin(frame * 2.5) * interpolate(frame, [158, 172], [6, 0], { extrapolateRight: "clamp" })
    : 0;
  const shake2 = frame >= 252 && frame < 270
    ? Math.sin(frame * 2.5) * interpolate(frame, [252, 270], [8, 0], { extrapolateRight: "clamp" })
    : 0;

  /* ── Impact flash ──────────────────────────────────────── */
  const flash1 = interpolate(frame, [158, 162, 168], [0, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flash2 = interpolate(frame, [252, 256, 264], [0, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Debris particles on wall 1 hit ────────────────────── */
  const debris1Progress = interpolate(frame, [158, 190], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const debris1Opacity = interpolate(frame, [158, 165, 190], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Debris particles on wall 2 hit ────────────────────── */
  const debris2Progress = interpolate(frame, [252, 288], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const debris2Opacity = interpolate(frame, [252, 260, 288], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Progress bar at bottom ────────────────────────────── */
  const progressWidth = interpolate(
    frame,
    [0, 97, 158, 252, 345],
    [5, 45, 45, 38, 30],
    { extrapolateRight: "clamp" },
  );
  const progressColor = frame < 158
    ? theme.colors.green
    : frame < 252
      ? "#eab308"
      : theme.colors.accent;

  /* ── Warning pulse after second wall ────────────────────── */
  const warningPulse = frame > 260
    ? interpolate(frame % 25, [0, 12, 25], [0.12, 0.4, 0.12])
    : 0;

  /* ── Continuous 2-second breathing cycle ─────────────────── */
  const breathe = Math.sin(frame * Math.PI / 30);
  const breatheY = breathe * 2;

  /* ── Crack lines on walls after impact ─────────────────── */
  const crack1 = interpolate(frame, [158, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const crack2 = interpolate(frame, [252, 272], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        opacity: Math.min(entryFade, exitFade),
        overflow: "hidden",
        transform: `translateX(${shake1 + shake2}px)`,
      }}
    >
      {/* ── HUD corner brackets ──────────────────────────── */}
      {/* Top-left */}
      <div style={{ position: "absolute", top: 30, left: 30 }}>
        <div style={{ width: 40, height: 2, background: theme.colors.border }} />
        <div style={{ width: 2, height: 40, background: theme.colors.border }} />
      </div>
      {/* Top-right */}
      <div style={{ position: "absolute", top: 30, right: 30 }}>
        <div style={{ width: 40, height: 2, background: theme.colors.border, marginLeft: "auto" }} />
        <div style={{ width: 2, height: 40, background: theme.colors.border, marginLeft: "auto" }} />
      </div>
      {/* Bottom-left */}
      <div style={{ position: "absolute", bottom: 30, left: 30 }}>
        <div style={{ width: 2, height: 40, background: theme.colors.border }} />
        <div style={{ width: 40, height: 2, background: theme.colors.border }} />
      </div>
      {/* Bottom-right */}
      <div style={{ position: "absolute", bottom: 30, right: 30 }}>
        <div style={{ width: 2, height: 40, background: theme.colors.border, marginLeft: "auto" }} />
        <div style={{ width: 40, height: 2, background: theme.colors.border, marginLeft: "auto" }} />
      </div>

      {/* ── Speedometer gauge (top-right) ────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 50,
          right: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translateY(${breatheY}px)`,
          opacity: interpolate(frame, [5, 25], [0, 0.8], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <svg width="80" height="50" viewBox="0 0 80 50">
          {/* Gauge arc background */}
          <path
            d="M 10 45 A 35 35 0 0 1 70 45"
            fill="none"
            stroke={theme.colors.border}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Gauge arc filled */}
          <path
            d="M 10 45 A 35 35 0 0 1 70 45"
            fill="none"
            stroke={orbSpeed > 50 ? theme.colors.green : orbSpeed > 25 ? "#eab308" : theme.colors.accent}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="110"
            strokeDashoffset={110 - (orbSpeed / 100) * 110}
          />
          {/* Needle */}
          {(() => {
            const needleAngle = interpolate(orbSpeed, [0, 100], [180, 0]);
            const rad = (needleAngle * Math.PI) / 180;
            const nx = 40 + Math.cos(rad) * 28;
            const ny = 45 - Math.sin(rad) * 28;
            return (
              <line
                x1="40"
                y1="45"
                x2={nx}
                y2={ny}
                stroke={theme.colors.textPrimary}
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })()}
        </svg>
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: theme.colors.textMuted,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          Velocity
        </span>
      </div>

      {/* ── Radial glow following orb ────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${orbX}% 50%, ${theme.colors.accent}0c 0%, transparent 40%)`,
        }}
      />
      {/* ── "Founder" + "Product Lead" — subtle icons below the track line ──── */}
      {founderReveal > 0 && (
        <div
          style={{
            position: "absolute",
            top: "58%",
            left: "12%",
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: founderReveal * labelsFade,
            transform: `translateY(${breatheY}px)`,
          }}
        >
          {/* Small person icon */}
          <svg width="28" height="28" viewBox="0 0 28 28"
            style={{ filter: `drop-shadow(0 0 6px ${theme.colors.textSecondary}44)` }}
          >
            <circle cx="14" cy="8" r="5" fill={theme.colors.textSecondary} opacity="0.7" />
            <path d="M4 26 Q4 16 14 14 Q24 16 24 26" fill={theme.colors.textSecondary} opacity="0.6" />
          </svg>
          <span
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: theme.colors.textSecondary,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Founder
          </span>
        </div>
      )}
      {leadReveal > 0 && (
        <div
          style={{
            position: "absolute",
            top: "58%",
            left: "55%",
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: leadReveal * labelsFade,
            transform: `translateY(${breatheY}px)`,
          }}
        >
          {/* Small briefcase icon */}
          <svg width="28" height="24" viewBox="0 0 28 24"
            style={{ filter: `drop-shadow(0 0 6px ${theme.colors.textSecondary}44)` }}
          >
            <path d="M9 5 L9 2 Q9 0 11 0 L17 0 Q19 0 19 2 L19 5" fill="none" stroke={theme.colors.textSecondary} strokeWidth="1.5" />
            <rect x="2" y="5" width="24" height="16" rx="3" fill={theme.colors.textSecondary} opacity="0.7" />
            <rect x="11" y="11" width="6" height="4" rx="1" fill={theme.colors.bg} opacity="0.4" />
          </svg>
          <span
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: theme.colors.textSecondary,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Product Lead
          </span>
        </div>
      )}
      {/* ── Grid track lines ─────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "5%",
          right: "5%",
          height: "16%",
          overflow: "hidden",
          opacity: 0.25,
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: gridScroll + i * 70,
              width: 1,
              height: "100%",
              background: theme.colors.border,
            }}
          />
        ))}
        {/* Horizontal grid lines */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: theme.colors.border }} />
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: theme.colors.border }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: theme.colors.border }} />
      </div>

      {/* ── Main track line ──────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "5%",
          right: "5%",
          height: 2,
          background: `linear-gradient(90deg, ${theme.colors.accent}66, ${theme.colors.border})`,
        }}
      />

      {/* ── Particle trail behind orb ────────────────────── */}
      {trailOpacity > 0 &&
        Array.from({ length: 8 }).map((_, i) => {
          const trailDelay = i * 3;
          const trailFrame = Math.max(0, frame - trailDelay);
          const trailX = interpolate(
            trailFrame,
            [0, 60, 97, 158, 252, 345],
            [5, 25, 42, 52, 60, 62],
            { extrapolateRight: "clamp" },
          );
          return (
            <div
              key={`trail-${i}`}
              style={{
                position: "absolute",
                top: `${49.5 + Math.sin(i * 1.7) * 1.5}%`,
                left: `${trailX}%`,
                transform: "translate(-50%, -50%)",
                width: 6 - i * 0.5,
                height: 6 - i * 0.5,
                borderRadius: "50%",
                background: theme.colors.accent,
                opacity: trailOpacity * (1 - i * 0.12),
                filter: "blur(1px)",
              }}
            />
          );
        })}

      {/* ── Speed Lines (enhanced) ────────────────────────── */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const lineLen = interpolate(orbSpeed, [0, 100], [0.5, 4 - i * 0.4]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${47 + (i - 2.5) * 2}%`,
              left: `${Math.max(5, orbX - 3 - i * 1.5)}%`,
              width: `${lineLen}%`,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${theme.colors.accent})`,
              opacity: speedOpacity * (1 - i * 0.12),
              borderRadius: 1,
            }}
          />
        );
      })}

      {/* ── Racing orb with enhanced glow ────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${orbX}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 50,
            height: 50,
            borderRadius: "50%",
            border: `1px solid ${theme.colors.accent}33`,
            opacity: orbGlow,
          }}
        />
        {/* Core */}
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 35%, ${theme.colors.accentSoft}, ${theme.colors.accent})`,
            boxShadow: `0 0 ${40 * orbGlow}px ${20 * orbGlow}px ${theme.colors.accent}55`,
          }}
        />
      </div>

      {/* ── Wall 1: Complexity ────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "55%",
          width: 6,
          height: `${56 * wall1}%`,
          background: `linear-gradient(to bottom, ${theme.colors.accent}cc, ${theme.colors.accent}22)`,
          borderRadius: 3,
        }}
      />
      {/* Crack lines on wall 1 */}
      {crack1 > 0 && (
        <svg
          style={{
            position: "absolute",
            top: "40%",
            left: "54.5%",
            width: 40,
            height: 60,
            opacity: crack1 * 0.6,
          }}
          viewBox="0 0 40 60"
        >
          <polyline points="20,0 15,15 8,25 12,35 5,50" fill="none" stroke={theme.colors.accent} strokeWidth="1.5" />
          <polyline points="20,0 28,18 35,30" fill="none" stroke={theme.colors.accent} strokeWidth="1" />
        </svg>
      )}
      {wall1 > 0.5 && (
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "52%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            opacity: wall1,
          }}
        >
          {/* Large animated interlocking gears */}
          <div style={{ position: "relative", width: 130, height: 130 }}>
            <svg width="130" height="130" viewBox="0 0 130 130"
              style={{ filter: `drop-shadow(0 0 16px ${theme.colors.textMuted}33)` }}
            >
              {/* Main gear */}
              <g style={{ transform: `rotate(${frame * 1.2}deg)`, transformOrigin: "55px 55px" }}>
                <circle cx="55" cy="55" r="28" fill="none" stroke={theme.colors.textMuted} strokeWidth="3" />
                <circle cx="55" cy="55" r="12" fill={theme.colors.textMuted} opacity="0.6" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
                  const rad = (a * Math.PI) / 180;
                  return (
                    <rect key={a} x={55 + Math.cos(rad) * 30 - 5} y={55 + Math.sin(rad) * 30 - 5}
                      width="10" height="10" rx="2" fill={theme.colors.textMuted} opacity="0.7"
                      transform={`rotate(${a} ${55 + Math.cos(rad) * 30} ${55 + Math.sin(rad) * 30})`}
                    />
                  );
                })}
              </g>
              {/* Small gear */}
              <g style={{ transform: `rotate(${-frame * 1.8}deg)`, transformOrigin: "100px 95px" }}>
                <circle cx="100" cy="95" r="18" fill="none" stroke={theme.colors.accent} strokeWidth="2.5" opacity="0.7" />
                <circle cx="100" cy="95" r="7" fill={theme.colors.accent} opacity="0.5" />
                {[0, 60, 120, 180, 240, 300].map((a) => {
                  const rad = (a * Math.PI) / 180;
                  return (
                    <rect key={a} x={100 + Math.cos(rad) * 20 - 4} y={95 + Math.sin(rad) * 20 - 4}
                      width="8" height="8" rx="2" fill={theme.colors.accent} opacity="0.5"
                      transform={`rotate(${a} ${100 + Math.cos(rad) * 20} ${95 + Math.sin(rad) * 20})`}
                    />
                  );
                })}
              </g>
            </svg>
            {/* Warning pulse ring */}
            <div style={{
              position: "absolute", top: "50%", left: "42%",
              transform: "translate(-50%, -50%)",
              width: 100 + breathe * 8, height: 100 + breathe * 8,
              borderRadius: "50%", border: `2px solid ${theme.colors.accent}44`,
              opacity: 0.3 + breathe * 0.15,
            }} />
          </div>
          <span style={{
            fontSize: 26, fontWeight: 900,
            color: theme.colors.textMuted, letterSpacing: 4,
            textTransform: "uppercase", textAlign: "center",
          }}>
            Complexity
          </span>
        </div>
      )}

      {/* ── Debris 1 ─────────────────────────────────────── */}
      {debris1Opacity > 0 &&
        Array.from({ length: DEBRIS_COUNT }).map((_, i) => {
          const angle = (i / DEBRIS_COUNT) * Math.PI - Math.PI / 2;
          const speed = 30 + (i % 3) * 20;
          const dx = Math.cos(angle) * speed * debris1Progress;
          const dy = Math.sin(angle) * speed * debris1Progress;
          return (
            <div
              key={`d1-${i}`}
              style={{
                position: "absolute",
                top: `${50 + dy * 0.5}%`,
                left: `calc(55% + ${dx}px)`,
                width: 3,
                height: 3,
                borderRadius: i % 2 === 0 ? "50%" : 1,
                background: theme.colors.accent,
                opacity: debris1Opacity * (0.4 + (i % 3) * 0.2),
                transform: `rotate(${i * 30 + debris1Progress * 180}deg)`,
              }}
            />
          );
        })}

      {/* ── Wall 2: Wrong Partner ─────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "72%",
          width: 6,
          height: `${60 * wall2}%`,
          background: `linear-gradient(to bottom, ${theme.colors.accent}, ${theme.colors.accent}22)`,
          borderRadius: 3,
        }}
      />
      {/* Crack lines on wall 2 */}
      {crack2 > 0 && (
        <svg
          style={{
            position: "absolute",
            top: "38%",
            left: "71.5%",
            width: 50,
            height: 70,
            opacity: crack2 * 0.7,
          }}
          viewBox="0 0 50 70"
        >
          <polyline points="25,0 20,12 10,22 15,35 8,48 12,60" fill="none" stroke={theme.colors.accent} strokeWidth="1.5" />
          <polyline points="25,0 32,15 40,28 36,42" fill="none" stroke={theme.colors.accent} strokeWidth="1" />
          <polyline points="10,22 2,30" fill="none" stroke={theme.colors.accent} strokeWidth="1" />
        </svg>
      )}
      {wall2 > 0.5 && (
        <div
          style={{
            position: "absolute",
            top: "3%",
            left: "70%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            opacity: wall2,
          }}
        >
          {/* Large animated broken link / warning icon */}
          <div style={{ position: "relative", width: 120, height: 120 }}>
            <svg width="120" height="120" viewBox="0 0 120 120"
              style={{
                transform: `scale(${1 + Math.sin(frame * 0.15) * 0.04})`,
                filter: `drop-shadow(0 0 16px ${theme.colors.accent}44)`,
              }}
            >
              {/* Outer warning triangle */}
              <path d="M60 10 L110 100 L10 100 Z" fill="none" stroke={theme.colors.accent} strokeWidth="3" strokeLinejoin="round" opacity="0.6" />
              {/* Inner warning triangle */}
              <path d="M60 30 L95 90 L25 90 Z" fill={`${theme.colors.accent}15`} stroke={theme.colors.accent} strokeWidth="1.5" strokeLinejoin="round" opacity="0.4" />
              {/* Exclamation mark */}
              <rect x="56" y="45" width="8" height="28" rx="4" fill={theme.colors.accent} opacity="0.9" />
              <circle cx="60" cy="82" r="5" fill={theme.colors.accent} opacity="0.9" />
              {/* Crack lines */}
              <line x1="35" y1="85" x2="20" y2="100" stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.3" />
              <line x1="85" y1="85" x2="100" y2="100" stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.3" />
            </svg>
            {/* Pulsing danger ring */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 110 + breathe * 10, height: 110 + breathe * 10,
              borderRadius: "50%", border: `2px solid ${theme.colors.accent}`,
              opacity: 0.15 + Math.sin(frame * 0.12) * 0.1,
            }} />
          </div>
          <span style={{
            fontSize: 26, fontWeight: 900,
            color: theme.colors.textMuted, letterSpacing: 4,
            textTransform: "uppercase", textAlign: "center",
          }}>
            Wrong partner
          </span>
        </div>
      )}

      {/* ── Debris 2 ─────────────────────────────────────── */}
      {debris2Opacity > 0 &&
        Array.from({ length: DEBRIS_COUNT }).map((_, i) => {
          const angle = (i / DEBRIS_COUNT) * Math.PI - Math.PI / 2;
          const speed = 40 + (i % 4) * 18;
          const dx = Math.cos(angle) * speed * debris2Progress;
          const dy = Math.sin(angle) * speed * debris2Progress;
          return (
            <div
              key={`d2-${i}`}
              style={{
                position: "absolute",
                top: `${50 + dy * 0.5}%`,
                left: `calc(72% + ${dx}px)`,
                width: 3 + (i % 2),
                height: 3 + (i % 2),
                borderRadius: i % 3 === 0 ? "50%" : 1,
                background: i % 2 === 0 ? theme.colors.accent : theme.colors.accentSoft,
                opacity: debris2Opacity * (0.3 + (i % 3) * 0.2),
                transform: `rotate(${i * 25 + debris2Progress * 220}deg)`,
              }}
            />
          );
        })}

      {/* ── Impact flash overlay ──────────────────────────── */}
      {(flash1 > 0 || flash2 > 0) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: theme.colors.accent,
            opacity: Math.max(flash1, flash2),
            mixBlendMode: "overlay",
          }}
        />
      )}

      {/* ── Progress bar at bottom ────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: "10%",
          right: "10%",
          height: 3,
          background: theme.colors.surface,
          borderRadius: 2,
          overflow: "hidden",
          opacity: interpolate(frame, [10, 30], [0, 0.7], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            width: `${progressWidth}%`,
            height: "100%",
            background: progressColor,
            borderRadius: 2,
            transition: "background 0.3s",
          }}
        />
      </div>
      {/* Progress label */}
      <span
        style={{
          position: "absolute",
          bottom: 60,
          left: "10%",
          fontSize: 22,
          fontWeight: 800,
          color: theme.colors.textMuted,
          letterSpacing: 2,
          textTransform: "uppercase",
          opacity: interpolate(frame, [10, 30], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Progress
      </span>

      {/* ── Warning border pulse ──────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: `2px solid ${theme.colors.accent}`,
          opacity: warningPulse,
        }}
      />
    </AbsoluteFill>
  );
};
