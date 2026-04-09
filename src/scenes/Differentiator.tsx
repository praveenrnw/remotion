import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";

/**
 * DIFFERENTIATOR — 44–65.5s (645 frames)
 * 4 visual phases: blueprint, co-founder, hard questions, AI network.
 * No VO text on screen — visual metaphors only.
 *
 * VO cues (local frames):
 *   0   "What makes us different isn't the tech stack"
 * 134   "We design the architecture before writing a line of code"
 * 286   "We work like a co-founder, not a contractor"
 * 340   "We ask the hard questions early"
 * 485   "With AI embedded in every layer"
 * 563   "we move faster without cutting corners"
 */

export const Differentiator: React.FC = () => {
  const frame = useCurrentFrame();

  /* ── Scene transitions ──────────────────────────────────── */
  const entryFade = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const exitFade = interpolate(frame, [615, 645], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Slow-moving accent line (cinematic pace) ──────────── */
  const lineY = interpolate(frame, [0, 645], [8, 92], {
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Phase visibility helpers ──────────────────────────── */
  /* Phase 1: "how we think" — VO ends at ~f106, extend visibility */
  const phase1 = interpolate(frame, [0, 30, 125, 150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  /* Phase 2: "architecture before code" — VO at f134 */
  const phase2 = interpolate(frame, [138, 168, 270, 300], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase3 = interpolate(frame, [286, 316, 470, 500], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase4 = interpolate(frame, [485, 515, 610, 645], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Blueprint line draw progress (phase 2) ────────────── */
  const blueprintDraw = interpolate(frame, [138, 260], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Question → Checkmark morph (phase 3) ──────────────── */
  const questionToCheck = interpolate(frame, [360, 400], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── AI network pulse (phase 4) ─────────────────────────── */
  const networkPulse = frame > 485
    ? 0.5 + Math.sin((frame - 485) * 0.1) * 0.5
    : 0;

  /* ── Traveling data dots on network connections ──────────── */
  const dataFlowT = frame > 495
    ? ((frame - 495) % 40) / 40
    : 0;

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
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 65% 45%, ${theme.colors.accent}08 0%, transparent 50%)`,
        }}
      />

      {/* Subtle floating code particles */}
      {Array.from({ length: 6 }).map((_, i) => {
        const px = 12 + (i * 43) % 76;
        const py = 8 + (i * 61) % 84;
        const drift = Math.sin((frame + i * 50) * 0.02) * 10;
        return (
          <div
            key={`cp-${i}`}
            style={{
              position: "absolute",
              top: `${py}%`,
              left: `${px}%`,
              fontSize: 10,
              fontFamily: "monospace",
              color: theme.colors.textMuted,
              opacity: 0.08,
              transform: `translateY(${drift}px)`,
              userSelect: "none",
            }}
          >
            {["{ }", "</>", "fn()", "[ ]", "=>", "0x"][i]}
          </div>
        );
      })}

      {/* Slow-moving left accent line */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: `${lineY}%`,
          width: 3,
          height: 100,
          background: `linear-gradient(to bottom, ${theme.colors.accent}, transparent)`,
          borderRadius: 2,
        }}
      />

      {/* ═══ PHASE 1: "How we think" — Brain/gear icon ═══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: phase1,
        }}
      >
        {/* "What makes us different" title — appears first */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            opacity: interpolate(frame, [0, 15, 50, 70], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <svg width="120" height="120" viewBox="0 0 90 90"
            style={{
              transform: `rotate(${frame * 0.5}deg) scale(${1 + breathe * 0.04})`,
              filter: `drop-shadow(0 0 16px ${theme.colors.accent}44)`,
            }}
          >
            <polygon points="45,2 58,32 88,45 58,58 45,88 32,58 2,45 32,32"
              fill="none" stroke={theme.colors.accent} strokeWidth="2.5" />
            <polygon points="45,14 54,34 74,45 54,56 45,76 36,56 16,45 36,34"
              fill={`${theme.colors.accent}33`} />
            <circle cx="45" cy="45" r="8" fill={theme.colors.accent} opacity="0.7" />
          </svg>
          <span
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: theme.colors.accent,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            What makes us different
          </span>
        </div>

        {/* "How we think" gear — fades in after title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: interpolate(frame, [55, 80], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `scale(${interpolate(frame, [55, 80], [0.85, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            })})`,
          }}
        >
        {/* Concentric ripple rings */}
        {[0, 1, 2].map((i) => {
          const rippleT = interpolate(
            (frame + i * 30) % 90,
            [0, 90],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return (
            <div
              key={`ripple-${i}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -55%)",
                width: 120 + rippleT * 200,
                height: 120 + rippleT * 200,
                borderRadius: "50%",
                border: `1px solid ${theme.colors.accent}`,
                opacity: interpolate(rippleT, [0, 0.3, 1], [0, 0.12, 0]),
              }}
            />
          );
        })}

        {/* Rotating gear outline — larger, more detailed */}
        <div
          style={{
            width: 150,
            height: 150,
            position: "relative",
            marginBottom: 32,
          }}
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 150 150"
            style={{
              transform: `rotate(${frame * 0.5}deg)`,
            }}
          >
            {/* Outer gear teeth */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i / 16) * Math.PI * 2;
              const x = 75 + Math.cos(angle) * 62;
              const y = 75 + Math.sin(angle) * 62;
              return (
                <rect
                  key={i}
                  x={x - 5}
                  y={y - 5}
                  width="10"
                  height="10"
                  rx="2"
                  fill={`${theme.colors.accent}55`}
                  transform={`rotate(${(i / 16) * 360} ${x} ${y})`}
                />
              );
            })}
            {/* Outer ring */}
            <circle cx="75" cy="75" r="52" fill="none" stroke={`${theme.colors.accent}44`} strokeWidth="3" />
            {/* Inner ring with dash animation */}
            <circle
              cx="75"
              cy="75"
              r="32"
              fill="none"
              stroke={theme.colors.accent}
              strokeWidth="2.5"
              strokeDasharray="12 6"
              strokeDashoffset={frame * 0.4}
            />
            {/* Brain-like inner nodes */}
            {[0, 72, 144, 216, 288].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const nx = 75 + Math.cos(rad) * 20;
              const ny = 75 + Math.sin(rad) * 20;
              const nodeOp = interpolate(frame, [10 + i * 8, 20 + i * 8], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <g key={`bn-${i}`}>
                  <circle cx={nx} cy={ny} r="4" fill={theme.colors.accent} opacity={nodeOp} />
                  {/* Connect to next node */}
                  <line
                    x1={nx}
                    y1={ny}
                    x2={75 + Math.cos(((deg + 72) * Math.PI) / 180) * 20}
                    y2={75 + Math.sin(((deg + 72) * Math.PI) / 180) * 20}
                    stroke={theme.colors.accent}
                    strokeWidth="1.5"
                    opacity={nodeOp * 0.5}
                  />
                </g>
              );
            })}
            {/* Core pulsing dot */}
            <circle
              cx="75"
              cy="75"
              r={8 + Math.sin(frame * 0.12) * 2}
              fill={theme.colors.accent}
              opacity={0.8 + Math.sin(frame * 0.12) * 0.2}
            />
          </svg>
        </div>

        {/* Orbiting concept icons */}
        {[
          { angle: 0, icon: "💡", size: 18 },
          { angle: 90, icon: "◆", size: 14 },
          { angle: 180, icon: "⚡", size: 16 },
          { angle: 270, icon: "✦", size: 14 },
        ].map(({ angle, icon, size }, i) => {
          const rad = ((angle + frame * 0.6) * Math.PI) / 180;
          const orbitR = 90;
          const iconOp = interpolate(frame, [15 + i * 10, 30 + i * 10], [0, 0.7], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={`orbit-${i}`}
              style={{
                position: "absolute",
                top: `calc(50% - 30px + ${Math.sin(rad) * orbitR}px)`,
                left: `calc(50% + ${Math.cos(rad) * orbitR}px)`,
                fontSize: size,
                opacity: iconOp,
                userSelect: "none",
                filter: `drop-shadow(0 0 4px ${theme.colors.accent}66)`,
              }}
            >
              {icon}
            </div>
          );
        })}

        {/* Radiating thought lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const lineOp = interpolate(
            (frame + deg) % 60,
            [0, 15, 60],
            [0, 0.15, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const rad = (deg * Math.PI) / 180;
          return (
            <div
              key={`ray-${deg}`}
              style={{
                position: "absolute",
                top: `calc(50% - 30px + ${Math.sin(rad) * 105}px)`,
                left: `calc(50% + ${Math.cos(rad) * 105}px)`,
                width: 25,
                height: 2,
                background: theme.colors.accent,
                borderRadius: 1,
                opacity: lineOp,
                transform: `rotate(${deg}deg)`,
              }}
            />
          );
        })}

        <span
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: theme.colors.accent,
            letterSpacing: 4,
            textTransform: "uppercase",
            transform: `translateY(${breatheY}px)`,
            marginTop: 40,
          }}
        >
          How we think
        </span>
        </div>
      </div>

      {/* ═══ PHASE 2: Blueprint wireframe ═══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: phase2,
        }}
      >
        {/* Blueprint grid background */}
        <svg
          style={{ position: "absolute", inset: 0 }}
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          fill="none"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`vg-${i}`}
              x1={i * 100}
              y1="0"
              x2={i * 100}
              y2="1080"
              stroke={theme.colors.accent}
              strokeWidth="0.5"
              opacity={0.04}
            />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={`hg-${i}`}
              x1="0"
              y1={i * 100}
              x2="1920"
              y2={i * 100}
              stroke={theme.colors.accent}
              strokeWidth="0.5"
              opacity={0.04}
            />
          ))}
        </svg>

        <svg
          width="900"
          height="520"
          viewBox="0 0 700 400"
          fill="none"
        >
          {/* Architecture boxes with fill animation */}
          {/* Top box: API Gateway */}
          <rect
            x="250"
            y="20"
            width="200"
            height="60"
            rx="8"
            fill={`${theme.colors.accent}${Math.round(interpolate(blueprintDraw, [0.3, 0.5], [0, 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke={theme.colors.accent}
            strokeWidth="2"
            strokeDasharray="400"
            strokeDashoffset={400 - blueprintDraw * 400}
          />
          {/* Box label */}
          <text
            x="350"
            y="48"
            textAnchor="middle"
            fill={theme.colors.accent}
            fontSize="14"
            fontWeight="700"
            letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.25, 0.4], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          >
            API GATEWAY
          </text>
          {/* Gateway icon */}
          <text
            x="350"
            y="70"
            textAnchor="middle"
            fill={theme.colors.accent}
            fontSize="20"
            opacity={interpolate(blueprintDraw, [0.3, 0.45], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          >
            ⚡
          </text>

          {/* Left box: Frontend */}
          <rect
            x="50"
            y="160"
            width="160"
            height="60"
            rx="8"
            fill={`${theme.colors.blue}${Math.round(interpolate(blueprintDraw, [0.4, 0.6], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke={theme.colors.blue}
            strokeWidth="2"
            strokeDasharray="380"
            strokeDashoffset={380 - blueprintDraw * 380}
          />
          <text
            x="130"
            y="188"
            textAnchor="middle"
            fill={theme.colors.blue}
            fontSize="14"
            fontWeight="700"
            letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.35, 0.5], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          >
            FRONTEND
          </text>
          {/* React icon */}
          <text
            x="130"
            y="210"
            textAnchor="middle"
            fill={theme.colors.blue}
            fontSize="20"
            opacity={interpolate(blueprintDraw, [0.4, 0.55], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          >
            ◇
          </text>

          {/* Middle box: Backend */}
          <rect
            x="270"
            y="160"
            width="160"
            height="60"
            rx="8"
            fill={`${theme.colors.green}${Math.round(interpolate(blueprintDraw, [0.4, 0.6], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke={theme.colors.green}
            strokeWidth="2"
            strokeDasharray="380"
            strokeDashoffset={380 - blueprintDraw * 380}
          />
          <text
            x="350"
            y="188"
            textAnchor="middle"
            fill={theme.colors.green}
            fontSize="14"
            fontWeight="700"
            letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.35, 0.5], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          >
            BACKEND
          </text>
          {/* Server icon */}
          <text
            x="350"
            y="210"
            textAnchor="middle"
            fill={theme.colors.green}
            fontSize="20"
            opacity={interpolate(blueprintDraw, [0.4, 0.55], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          >
            ⚙
          </text>

          {/* Right box: Services */}
          <rect
            x="490"
            y="160"
            width="160"
            height="60"
            rx="8"
            fill={`#8b5cf6${Math.round(interpolate(blueprintDraw, [0.4, 0.6], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="380"
            strokeDashoffset={380 - blueprintDraw * 380}
          />
          <text
            x="570"
            y="188"
            textAnchor="middle"
            fill="#8b5cf6"
            fontSize="14"
            fontWeight="700"
            letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.35, 0.5], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          >
            SERVICES
          </text>
          {/* Cloud icon */}
          <text
            x="570"
            y="210"
            textAnchor="middle"
            fill="#8b5cf6"
            fontSize="20"
            opacity={interpolate(blueprintDraw, [0.4, 0.55], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          >
            ☁
          </text>

          {/* Connecting lines with endpoint dots */}
          <line
            x1="350"
            y1="80"
            x2="130"
            y2="160"
            stroke={theme.colors.border}
            strokeWidth="1.5"
            strokeDasharray="300"
            strokeDashoffset={300 - blueprintDraw * 300}
          />
          <line
            x1="350"
            y1="80"
            x2="350"
            y2="160"
            stroke={theme.colors.border}
            strokeWidth="1.5"
            strokeDasharray="80"
            strokeDashoffset={80 - blueprintDraw * 80}
          />
          <line
            x1="350"
            y1="80"
            x2="570"
            y2="160"
            stroke={theme.colors.border}
            strokeWidth="1.5"
            strokeDasharray="300"
            strokeDashoffset={300 - blueprintDraw * 300}
          />

          {/* Connection endpoint dots */}
          {[[350, 80], [130, 160], [350, 160], [570, 160]].map(([cx, cy], i) => (
            <circle
              key={`ep-${i}`}
              cx={cx}
              cy={cy}
              r="4"
              fill={theme.colors.accent}
              opacity={interpolate(blueprintDraw, [0.3, 0.5], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
          ))}

          {/* Data flow dots on connections */}
          {blueprintDraw > 0.5 && [
            { x1: 350, y1: 80, x2: 130, y2: 160, offset: 0 },
            { x1: 350, y1: 80, x2: 350, y2: 160, offset: 15 },
            { x1: 350, y1: 80, x2: 570, y2: 160, offset: 30 },
          ].map(({ x1, y1, x2, y2, offset }, i) => {
            const flowT = ((frame - 180 + offset) % 50) / 50;
            const fOp = interpolate(flowT, [0, 0.2, 0.8, 1], [0, 0.6, 0.6, 0]);
            return (
              <circle
                key={`flow-${i}`}
                cx={x1 + flowT * (x2 - x1)}
                cy={y1 + flowT * (y2 - y1)}
                r="3"
                fill={theme.colors.accent}
                opacity={fOp}
              />
            );
          })}

          {/* Bottom DB cylinder */}
          <ellipse
            cx="350"
            cy="310"
            rx="60"
            ry="15"
            stroke={theme.colors.textMuted}
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset={200 - blueprintDraw * 200}
          />
          <line
            x1="290"
            y1="310"
            x2="290"
            y2="340"
            stroke={theme.colors.textMuted}
            strokeWidth="1.5"
            opacity={blueprintDraw}
          />
          <line
            x1="410"
            y1="310"
            x2="410"
            y2="340"
            stroke={theme.colors.textMuted}
            strokeWidth="1.5"
            opacity={blueprintDraw}
          />
          <ellipse
            cx="350"
            cy="340"
            rx="60"
            ry="15"
            stroke={theme.colors.textMuted}
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset={200 - blueprintDraw * 200}
          />
          <text
            x="350"
            y="330"
            textAnchor="middle"
            fill={theme.colors.textMuted}
            fontSize="16"
            fontWeight="700"
            letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.6, 0.75], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          >
            DATABASE
          </text>
          <line
            x1="350"
            y1="220"
            x2="350"
            y2="295"
            stroke={theme.colors.border}
            strokeWidth="1.5"
            strokeDasharray="80"
            strokeDashoffset={80 - blueprintDraw * 80}
          />

          {/* Data flow dot to DB */}
          {blueprintDraw > 0.6 && (() => {
            const dbFlowT = ((frame - 200) % 60) / 60;
            const dbOp = interpolate(dbFlowT, [0, 0.2, 0.8, 1], [0, 0.5, 0.5, 0]);
            return (
              <circle
                cx={350}
                cy={220 + dbFlowT * 75}
                r="3"
                fill={theme.colors.green}
                opacity={dbOp}
              />
            );
          })()}
        </svg>
        <span
          style={{
            position: "absolute",
            bottom: "12%",
            fontSize: 24,
            fontWeight: 800,
            color: theme.colors.textMuted,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: phase2,
            transform: `translateY(${breatheY}px)`,
          }}
        >
          Architecture first
        </span>
      </div>

      {/* ═══ PHASE 3: Co-founder + ? → ✓ ═══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          opacity: phase3,
        }}
      >
        {/* Partnership Venn diagram */}
        <div style={{ position: "relative", width: 660, height: 360, zIndex: 1 }}>
          {/* Left circle — YOU */}
          <div
            style={{
              position: "absolute",
              left: 30,
              top: 30,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: `${theme.colors.textSecondary}10`,
              border: `3px solid ${theme.colors.textSecondary}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: interpolate(frame, [288, 310], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.19, 1, 0.22, 1),
              }),
              transform: `translateX(${interpolate(
                interpolate(frame, [288, 310], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) }),
                [0, 1],
                [40, 0],
              )}px)`,
            }}
          >
            <span
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: theme.colors.textSecondary,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginLeft: -60,
              }}
            >
              YOU
            </span>
          </div>

          {/* Right circle — NATIVEWIT */}
          <div
            style={{
              position: "absolute",
              left: 330,
              top: 30,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: `${theme.colors.accent}10`,
              border: `3px solid ${theme.colors.accent}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: interpolate(frame, [288, 310], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.19, 1, 0.22, 1),
              }),
              transform: `translateX(${interpolate(
                interpolate(frame, [288, 310], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) }),
                [0, 1],
                [-40, 0],
              )}px)`,
            }}
          >
            <span
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: theme.colors.accent,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginRight: -60,
              }}
            >
              NATIVEWIT
            </span>
          </div>

          {/* Overlap glow — synergy zone */}
          <div
            style={{
              position: "absolute",
              left: 270,
              top: 60,
              width: 120,
              height: 240,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.colors.accent}30, transparent)`,
              opacity: interpolate(frame, [310, 335], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />

          {/* Synergy handshake icon in overlap */}
          <div
            style={{
              position: "absolute",
              left: 295,
              top: 135,
              opacity: interpolate(frame, [320, 340], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `scale(${1 + breathe * 0.05})`,
            }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60">
              {/* Handshake */}
              <path d="M8 35 L20 25 L30 30 L40 25 L52 35" fill="none"
                stroke={theme.colors.accent} strokeWidth="3" strokeLinecap="round" />
              <circle cx="20" cy="25" r="3" fill={theme.colors.accent} opacity="0.7" />
              <circle cx="40" cy="25" r="3" fill={theme.colors.accent} opacity="0.7" />
              {/* Sparkle */}
              <circle cx="30" cy="18" r="2" fill={theme.colors.accent}
                opacity={0.5 + Math.sin(frame * 0.15) * 0.5} />
            </svg>
          </div>
        </div>

        {/* Question marks morphing into checkmarks with burst */}
        <div style={{ display: "flex", gap: 40, zIndex: 1 }}>
          {[0, 1, 2].map((i) => {
            const qDelay = 345 + i * 20;
            const localMorph = interpolate(
              frame,
              [qDelay + 22, qDelay + 50],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );
            const qOpacity = 1 - localMorph;
            const cOpacity = localMorph;
            const qProgress = interpolate(
              frame - qDelay,
              [0, 20],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.19, 1, 0.22, 1),
              },
            );

            /* Burst ring on checkmark appearance */
            const burstScale = interpolate(localMorph, [0, 0.5, 1], [0.3, 1.3, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const burstOp = interpolate(localMorph, [0, 0.3, 0.8], [0, 0.4, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  width: 56,
                  height: 56,
                  position: "relative",
                  opacity: qProgress,
                }}
              >
                {/* Burst ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: -8,
                    borderRadius: "50%",
                    border: `2px solid ${theme.colors.green}`,
                    opacity: burstOp,
                    transform: `scale(${burstScale})`,
                  }}
                />
                {/* Question mark — bounces in */}
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 38,
                    fontWeight: 800,
                    color: theme.colors.textMuted,
                    opacity: qOpacity,
                    transform: `rotate(${interpolate(qOpacity, [0, 1], [-15, 0])}deg)`,
                  }}
                >
                  ?
                </span>
                {/* Checkmark with scale bounce */}
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 38,
                    fontWeight: 800,
                    color: theme.colors.green,
                    opacity: cOpacity,
                    transform: `scale(${interpolate(cOpacity, [0, 0.5, 1], [0.3, 1.15, 1])})`,
                    filter: cOpacity > 0.5 ? `drop-shadow(0 0 8px ${theme.colors.green}44)` : "none",
                  }}
                >
                  ✓
                </span>
                {/* Spark particles on morph */}
                {localMorph > 0.2 && localMorph < 0.9 && [0, 1, 2, 3].map((s) => {
                  const sparkAngle = (s / 4) * Math.PI * 2;
                  const sparkDist = localMorph * 24;
                  return (
                    <div
                      key={`spark-${s}`}
                      style={{
                        position: "absolute",
                        top: `calc(50% + ${Math.sin(sparkAngle) * sparkDist}px)`,
                        left: `calc(50% + ${Math.cos(sparkAngle) * sparkDist}px)`,
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: theme.colors.green,
                        opacity: interpolate(localMorph, [0.2, 0.5, 0.9], [0, 0.8, 0]),
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ PHASE 4: AI embedded in every layer — Layer stack ═══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          opacity: phase4,
        }}
      >
        {/* Vertical layer stack */}
        {[
          { label: "FRONTEND", color: theme.colors.blue, icon: "UI" },
          { label: "BACKEND", color: theme.colors.green, icon: "API" },
          { label: "DATA", color: "#8b5cf6", icon: "DB" },
          { label: "INFRA", color: theme.colors.accent, icon: "OPS" },
        ].map((layer, i) => {
          const layerDelay = 490 + i * 12;
          const layerProgress = interpolate(frame - layerDelay, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.19, 1, 0.22, 1),
          });
          const layerBreathe = Math.sin((frame + i * 15) * Math.PI / 30) * 2;

          return (
            <div
              key={layer.label}
              style={{
                width: 700,
                height: 80,
                borderRadius: 16,
                background: theme.colors.surface,
                border: `2px solid ${layer.color}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 28px",
                opacity: layerProgress,
                transform: `translateX(${interpolate(layerProgress, [0, 1], [i % 2 === 0 ? -50 : 50, 0])}px) translateY(${layerBreathe}px)`,
                boxShadow: `0 4px 20px ${layer.color}15`,
              }}
            >
              {/* Layer icon */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${layer.color}22`,
                    border: `2px solid ${layer.color}55`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 900,
                    color: layer.color,
                    letterSpacing: 1,
                  }}
                >
                  {layer.icon}
                </div>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: theme.colors.textSecondary,
                    letterSpacing: 3,
                  }}
                >
                  {layer.label}
                </span>
              </div>

              {/* AI badge embedded in each layer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: interpolate(frame - (layerDelay + 15), [0, 15], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: layer.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 900,
                    color: theme.colors.bg,
                  }}
                >
                  AI
                </div>
                {/* Sparkle dots */}
                {[0, 1, 2].map((s) => {
                  const sparkAngle = ((frame * 3 + s * 120 + i * 45) % 360) * (Math.PI / 180);
                  return (
                    <div
                      key={s}
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: layer.color,
                        opacity: 0.4 + Math.sin(frame * 0.1 + s) * 0.3,
                        transform: `translate(${Math.cos(sparkAngle) * 8}px, ${Math.sin(sparkAngle) * 8}px)`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Data flow lines between layers */}
        {frame > 535 && [0, 1, 2].map((i) => {
          const flowT = ((frame - 535 + i * 12) % 30) / 30;
          return (
            <div
              key={`flow-${i}`}
              style={{
                position: "absolute",
                left: "50%",
                top: `${33 + i * 9 + flowT * 6}%`,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: theme.colors.accent,
                opacity: interpolate(flowT, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0]),
                transform: "translateX(-50%)",
              }}
            />
          );
        })}

        {/* Bottom label */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: theme.colors.textMuted,
              letterSpacing: 4,
              textTransform: "uppercase",
              transform: `translateY(${breatheY}px)`,
            }}
          >
            Embedded in every layer
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
