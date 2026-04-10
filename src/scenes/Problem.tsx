import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";
import { GeometricBg } from "../components/GeometricBg";
import { RobotGuide } from "../components/RobotGuide";

/**
 * PROBLEM — 5–16.5s (345 frames)
 * Racing character (instead of dot) hits walls and decelerates.
 *
 * VO cues (local frames):
 *   11  "You're a founder"
 *   50  "or a product lead"
 *   97  "trying to move fast."
 *  158  "Technical complexity slows you down."
 *  252  "The wrong build partner slows you down even more."
 */

const DEBRIS_COUNT = 12;

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const entryFade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const exitFade = interpolate(frame, [315, 345], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /* ── Racing character X position ────────────────────────── */
  const charX = interpolate(frame, [0, 60, 97, 158, 252, 345], [5, 25, 42, 52, 60, 62], { extrapolateRight: "clamp" });

  /* ── Character speed for animation ──────────────────────── */
  const charSpeed = interpolate(frame, [0, 60, 97, 158, 252, 345], [90, 85, 70, 30, 15, 5], { extrapolateRight: "clamp" });

  /* ── Character running animation — leg movement ─────────── */
  const runCycle = Math.sin(frame * (charSpeed / 20)) * (charSpeed / 100);
  const legAngle = runCycle * 25;

  /* ── Speed lines fade as character slows ───────────────── */
  const speedOpacity = interpolate(frame, [0, 97, 200], [0.8, 0.4, 0], { extrapolateRight: "clamp" });

  /* ── Grid track marks ──────────────────────────────────── */
  const gridScroll = interpolate(frame, [0, 345], [0, -400]);

  /* ── Founder + product lead labels ─────────────────────── */
  const founderReveal = interpolate(frame, [11, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) });
  const leadReveal = interpolate(frame, [50, 69], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) });
  const labelsFade = interpolate(frame, [85, 105], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /* ── Walls ─────────────────────────────────────────────── */
  const wall1 = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) });
  const wall2 = interpolate(frame, [244, 264], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) });

  /* ── Impact shake ──────────────────────────────────────── */
  const shake1 = frame >= 158 && frame < 172 ? Math.sin(frame * 2.5) * interpolate(frame, [158, 172], [6, 0], { extrapolateRight: "clamp" }) : 0;
  const shake2 = frame >= 252 && frame < 270 ? Math.sin(frame * 2.5) * interpolate(frame, [252, 270], [8, 0], { extrapolateRight: "clamp" }) : 0;

  /* ── Impact flash ──────────────────────────────────────── */
  const flash1 = interpolate(frame, [158, 162, 168], [0, 0.3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const flash2 = interpolate(frame, [252, 256, 264], [0, 0.4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /* ── Debris ────────────────────────────────────────────── */
  const debris1P = interpolate(frame, [158, 190], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const debris1Op = interpolate(frame, [158, 165, 190], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const debris2P = interpolate(frame, [252, 288], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const debris2Op = interpolate(frame, [252, 260, 288], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /* ── Progress bar ──────────────────────────────────────── */
  const progressWidth = interpolate(frame, [0, 97, 158, 252, 345], [5, 45, 45, 38, 30], { extrapolateRight: "clamp" });
  const progressColor = frame < 158 ? theme.colors.green : frame < 252 ? "#eab308" : theme.colors.accent;

  /* ── Warning pulse ─────────────────────────────────────── */
  const warningPulse = frame > 260 ? interpolate(frame % 25, [0, 12, 25], [0.12, 0.4, 0.12]) : 0;

  const breathe = Math.sin(frame * Math.PI / 30);
  const breatheY = breathe * 2;

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg, fontFamily: theme.font,
        opacity: Math.min(entryFade, exitFade), overflow: "hidden",
        transform: `translateX(${shake1 + shake2}px)`,
      }}
    >
      <GeometricBg frame={frame} opacity={0.03} />

      {/* ── Speedometer gauge (top-right) ────────────────── */}
      <div style={{
        position: "absolute", top: 50, right: 60,
        display: "flex", flexDirection: "column", alignItems: "center",
        transform: `translateY(${breatheY}px)`,
        opacity: interpolate(frame, [5, 25], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        <svg width="80" height="50" viewBox="0 0 80 50">
          <path d="M 10 45 A 35 35 0 0 1 70 45" fill="none" stroke={theme.colors.border} strokeWidth="3" strokeLinecap="round" />
          <path d="M 10 45 A 35 35 0 0 1 70 45" fill="none"
            stroke={charSpeed > 50 ? theme.colors.green : charSpeed > 25 ? "#eab308" : theme.colors.accent}
            strokeWidth="3" strokeLinecap="round" strokeDasharray="110" strokeDashoffset={110 - (charSpeed / 100) * 110} />
          {(() => {
            const a = interpolate(charSpeed, [0, 100], [180, 0]);
            const r = (a * Math.PI) / 180;
            return <line x1="40" y1="45" x2={40 + Math.cos(r) * 28} y2={45 - Math.sin(r) * 28}
              stroke={theme.colors.textPrimary} strokeWidth="2" strokeLinecap="round" />;
          })()}
        </svg>
        <span style={{ fontSize: 22, fontWeight: 800, color: theme.colors.textMuted, letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>Velocity</span>
      </div>

      {/* ── Labels: Founder + Product Lead (bigger with person icons) ─── */}
      {founderReveal > 0 && (
        <div style={{
          position: "absolute", top: "26%", left: "8%",
          display: "flex", alignItems: "center", gap: 16,
          opacity: founderReveal * labelsFade, transform: `translateY(${breatheY}px)`,
        }}>
          <svg width="52" height="52" viewBox="0 0 52 52" style={{ filter: `drop-shadow(0 0 10px ${theme.colors.accent}44)` }}>
            <circle cx="26" cy="14" r="10" fill={theme.colors.accent} opacity="0.7" />
            <path d="M6 48 Q6 30 26 26 Q46 30 46 48" fill={theme.colors.accent} opacity="0.5" />
          </svg>
          <span style={{ fontSize: 36, fontWeight: 900, color: theme.colors.textPrimary, letterSpacing: 3, textTransform: "uppercase" }}>Founder</span>
        </div>
      )}
      {leadReveal > 0 && (
        <div style={{
          position: "absolute", top: "26%", right: "8%",
          display: "flex", alignItems: "center", gap: 16,
          opacity: leadReveal * labelsFade, transform: `translateY(${breatheY}px)`,
        }}>
          <svg width="52" height="52" viewBox="0 0 52 52" style={{ filter: `drop-shadow(0 0 10px ${theme.colors.blue}44)` }}>
            <circle cx="26" cy="14" r="10" fill={theme.colors.blue} opacity="0.7" />
            <path d="M6 48 Q6 30 26 26 Q46 30 46 48" fill={theme.colors.blue} opacity="0.5" />
            {/* Briefcase */}
            <rect x="14" y="32" width="24" height="14" rx="3" fill={theme.colors.blue} opacity="0.3" />
          </svg>
          <span style={{ fontSize: 36, fontWeight: 900, color: theme.colors.textPrimary, letterSpacing: 3, textTransform: "uppercase" }}>Product Lead</span>
        </div>
      )}

      {/* ── Grid track ───────────────────────────────────── */}
      <div style={{ position: "absolute", top: "42%", left: "5%", right: "5%", height: "16%", overflow: "hidden", opacity: 0.25 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", top: 0, left: gridScroll + i * 70, width: 1, height: "100%", background: theme.colors.border }} />
        ))}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: theme.colors.border }} />
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: theme.colors.border }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: theme.colors.border }} />
      </div>

      {/* ── Main track line ──────────────────────────────── */}
      <div style={{ position: "absolute", top: "50%", left: "5%", right: "5%", height: 2, background: `linear-gradient(90deg, ${theme.colors.accent}66, ${theme.colors.border})` }} />

      {/* ── Speed Lines ──────────────────────────────────── */}
      {[0, 1, 2, 3, 4].map((i) => {
        const lineLen = interpolate(charSpeed, [0, 100], [0.5, 4 - i * 0.5]);
        return (
          <div key={i} style={{
            position: "absolute", top: `${47 + (i - 2) * 2}%`,
            left: `${Math.max(5, charX - 3 - i * 1.5)}%`, width: `${lineLen}%`, height: 2,
            background: `linear-gradient(90deg, transparent, ${theme.colors.accent})`,
            opacity: speedOpacity * (1 - i * 0.15), borderRadius: 1,
          }} />
        );
      })}

      {/* ── Running character (replaces dot/orb) ─────────── */}
      <div style={{ position: "absolute", top: "50%", left: `${charX}%`, transform: "translate(-50%, -50%)" }}>
        <svg width="60" height="80" viewBox="0 0 60 80" style={{
          filter: `drop-shadow(0 0 ${20 * (charSpeed / 100)}px ${theme.colors.accent}66)`,
        }}>
          {/* Head */}
          <circle cx="30" cy="12" r="10" fill={theme.colors.accent} opacity="0.9" />
          {/* Eyes */}
          <circle cx="26" cy="10" r="2" fill={theme.colors.bg} />
          <circle cx="34" cy="10" r="2" fill={theme.colors.bg} />
          {/* Body */}
          <rect x="20" y="22" width="20" height="24" rx="5" fill={theme.colors.accent} opacity="0.8" />
          {/* Arms */}
          <line x1="20" y1="28" x2={10 + runCycle * 5} y2={40 - Math.abs(runCycle) * 8}
            stroke={theme.colors.accent} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          <line x1="40" y1="28" x2={50 - runCycle * 5} y2={40 + Math.abs(runCycle) * 8}
            stroke={theme.colors.accent} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          {/* Left leg */}
          <line x1="25" y1="46" x2={25 + Math.sin((legAngle * Math.PI) / 180) * 12}
            y2={46 + Math.cos((legAngle * Math.PI) / 180) * 20}
            stroke={theme.colors.accent} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          {/* Right leg */}
          <line x1="35" y1="46" x2={35 - Math.sin((legAngle * Math.PI) / 180) * 12}
            y2={46 + Math.cos((legAngle * Math.PI) / 180) * 20}
            stroke={theme.colors.accent} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          {/* Speed cap / hair blown back when fast */}
          {charSpeed > 40 && (
            <path d={`M20 8 Q${15 - charSpeed * 0.08} 5 ${12 - charSpeed * 0.1} 10`}
              fill="none" stroke={theme.colors.accentSoft} strokeWidth="2" opacity="0.6" />
          )}
        </svg>
      </div>

      {/* ── Wall 1: Complexity ────────────────────────────── */}
      <div style={{
        position: "absolute", top: "22%", left: "55%", width: 6, height: `${56 * wall1}%`,
        background: `linear-gradient(to bottom, ${theme.colors.accent}cc, ${theme.colors.accent}22)`, borderRadius: 3,
      }} />
      {wall1 > 0.5 && (
        <div style={{ position: "absolute", top: "5%", left: "52%", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: wall1 }}>
          <div style={{ position: "relative", width: 130, height: 130 }}>
            <svg width="130" height="130" viewBox="0 0 130 130" style={{ filter: `drop-shadow(0 0 16px ${theme.colors.textMuted}33)` }}>
              <g style={{ transform: `rotate(${frame * 1.2}deg)`, transformOrigin: "55px 55px" }}>
                <circle cx="55" cy="55" r="28" fill="none" stroke={theme.colors.textMuted} strokeWidth="3" />
                <circle cx="55" cy="55" r="12" fill={theme.colors.textMuted} opacity="0.6" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
                  const rad = (a * Math.PI) / 180;
                  return <rect key={a} x={55 + Math.cos(rad) * 30 - 5} y={55 + Math.sin(rad) * 30 - 5}
                    width="10" height="10" rx="2" fill={theme.colors.textMuted} opacity="0.7"
                    transform={`rotate(${a} ${55 + Math.cos(rad) * 30} ${55 + Math.sin(rad) * 30})`} />;
                })}
              </g>
              <g style={{ transform: `rotate(${-frame * 1.8}deg)`, transformOrigin: "100px 95px" }}>
                <circle cx="100" cy="95" r="18" fill="none" stroke={theme.colors.accent} strokeWidth="2.5" opacity="0.7" />
                <circle cx="100" cy="95" r="7" fill={theme.colors.accent} opacity="0.5" />
              </g>
            </svg>
          </div>
          <span style={{ fontSize: 26, fontWeight: 900, color: theme.colors.textMuted, letterSpacing: 4, textTransform: "uppercase" }}>Complexity</span>
        </div>
      )}

      {/* ── Wall 2: Wrong Partner ────────────────────────── */}
      <div style={{
        position: "absolute", top: "20%", left: "72%", width: 6, height: `${60 * wall2}%`,
        background: `linear-gradient(to bottom, ${theme.colors.accent}, ${theme.colors.accent}22)`, borderRadius: 3,
      }} />
      {wall2 > 0.5 && (
        <div style={{ position: "absolute", top: "3%", left: "70%", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: wall2 }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ filter: `drop-shadow(0 0 16px ${theme.colors.accent}44)` }}>
            <path d="M60 10 L110 100 L10 100 Z" fill="none" stroke={theme.colors.accent} strokeWidth="3" strokeLinejoin="round" opacity="0.6" />
            <rect x="56" y="45" width="8" height="28" rx="4" fill={theme.colors.accent} opacity="0.9" />
            <circle cx="60" cy="82" r="5" fill={theme.colors.accent} opacity="0.9" />
          </svg>
          <span style={{ fontSize: 26, fontWeight: 900, color: theme.colors.textMuted, letterSpacing: 4, textTransform: "uppercase" }}>Wrong partner</span>
        </div>
      )}

      {/* ── Debris particles ─────────────────────────────── */}
      {debris1Op > 0 && Array.from({ length: DEBRIS_COUNT }).map((_, i) => {
        const angle = (i / DEBRIS_COUNT) * Math.PI - Math.PI / 2;
        const speed = 30 + (i % 3) * 20;
        return <div key={`d1-${i}`} style={{
          position: "absolute", top: `${50 + Math.sin(angle) * speed * debris1P * 0.5}%`,
          left: `calc(55% + ${Math.cos(angle) * speed * debris1P}px)`,
          width: 3, height: 3, borderRadius: "50%", background: theme.colors.accent,
          opacity: debris1Op * 0.5,
        }} />;
      })}
      {debris2Op > 0 && Array.from({ length: DEBRIS_COUNT }).map((_, i) => {
        const angle = (i / DEBRIS_COUNT) * Math.PI - Math.PI / 2;
        const speed = 40 + (i % 4) * 18;
        return <div key={`d2-${i}`} style={{
          position: "absolute", top: `${50 + Math.sin(angle) * speed * debris2P * 0.5}%`,
          left: `calc(72% + ${Math.cos(angle) * speed * debris2P}px)`,
          width: 3, height: 3, borderRadius: "50%", background: theme.colors.accent,
          opacity: debris2Op * 0.5,
        }} />;
      })}

      {/* ── Impact flash ─────────────────────────────────── */}
      {(flash1 > 0 || flash2 > 0) && (
        <div style={{ position: "absolute", inset: 0, background: theme.colors.accent, opacity: Math.max(flash1, flash2), mixBlendMode: "overlay" }} />
      )}

      {/* ── Progress bar ─────────────────────────────────── */}
      <div style={{
        position: "absolute", bottom: 50, left: "10%", right: "10%", height: 3,
        background: theme.colors.surface, borderRadius: 2, overflow: "hidden",
        opacity: interpolate(frame, [10, 30], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        <div style={{ width: `${progressWidth}%`, height: "100%", background: progressColor, borderRadius: 2 }} />
      </div>
      <span style={{
        position: "absolute", bottom: 60, left: "10%", fontSize: 22, fontWeight: 800,
        color: theme.colors.textMuted, letterSpacing: 2, textTransform: "uppercase",
        opacity: interpolate(frame, [10, 30], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>Progress</span>

      {/* Warning border pulse */}
      <div style={{ position: "absolute", inset: 0, border: `2px solid ${theme.colors.accent}`, opacity: warningPulse }} />

      <RobotGuide frame={frame} x={88} y={3} scale={0.6} expression={frame > 158 ? "thinking" : "neutral"} />
    </AbsoluteFill>
  );
};
