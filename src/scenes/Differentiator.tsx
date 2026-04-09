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
  const { fps } = useVideoConfig();

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
            width="150"
            height="150"
            viewBox="0 0 150 150"
            style={{
              transform: `rotate(${frame * 0.6}deg)`,
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
            fontSize: 13,
            fontWeight: 700,
            color: theme.colors.accent,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          How we think
        </span>
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
          width="700"
          height="400"
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
            y="55"
            textAnchor="middle"
            fill={theme.colors.accent}
            fontSize="11"
            fontWeight="700"
            letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.25, 0.4], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          >
            API GATEWAY
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
            y="195"
            textAnchor="middle"
            fill={theme.colors.blue}
            fontSize="11"
            fontWeight="700"
            letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.35, 0.5], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          >
            FRONTEND
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
            y="195"
            textAnchor="middle"
            fill={theme.colors.green}
            fontSize="11"
            fontWeight="700"
            letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.35, 0.5], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          >
            BACKEND
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
            y="195"
            textAnchor="middle"
            fill="#8b5cf6"
            fontSize="11"
            fontWeight="700"
            letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.35, 0.5], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          >
            SERVICES
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
            fontSize="10"
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
            fontSize: 13,
            fontWeight: 700,
            color: theme.colors.textMuted,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: phase2,
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
        {/* Collaboration desk / table line */}
        <div
          style={{
            position: "absolute",
            top: "52%",
            left: "50%",
            transform: "translateX(-50%)",
            width: interpolate(
              spring({ frame: frame - 290, fps, config: { damping: 80 } }),
              [0, 1],
              [0, 300],
            ),
            height: 3,
            background: `linear-gradient(90deg, transparent, ${theme.colors.border}, transparent)`,
            borderRadius: 2,
          }}
        />

        {/* Two people side by side = partnership */}
        <div style={{ display: "flex", alignItems: "center", gap: 40, zIndex: 1 }}>
          {/* Person 1 (you) — slides in from left */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateX(${interpolate(
                spring({ frame: frame - 288, fps, config: { damping: 60 } }),
                [0, 1],
                [-30, 0],
              )}px)`,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: theme.colors.textSecondary,
                boxShadow: `0 0 20px ${theme.colors.textSecondary}22`,
              }}
            />
            <div
              style={{
                width: 54,
                height: 50,
                borderRadius: "0 0 27px 27px",
                background: theme.colors.textSecondary,
                marginTop: 6,
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: theme.colors.textMuted,
                letterSpacing: 2,
                marginTop: 8,
                textTransform: "uppercase",
              }}
            >
              You
            </span>
          </div>

          {/* Handshake / equals with pulse */}
          <div
            style={{
              position: "relative",
              fontSize: 48,
              fontWeight: 800,
              color: theme.colors.accent,
              opacity: spring({ frame: frame - 296, fps, config: { damping: 80 } }),
            }}
          >
            =
            {/* Pulse ring on equals */}
            <div
              style={{
                position: "absolute",
                inset: -12,
                borderRadius: "50%",
                border: `1px solid ${theme.colors.accent}`,
                opacity: 0.15 + Math.sin(frame * 0.08) * 0.1,
              }}
            />
          </div>

          {/* Person 2 (us) — slides in from right */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateX(${interpolate(
                spring({ frame: frame - 288, fps, config: { damping: 60 } }),
                [0, 1],
                [30, 0],
              )}px)`,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: theme.colors.accent,
                boxShadow: `0 0 20px ${theme.colors.accent}33`,
              }}
            />
            <div
              style={{
                width: 54,
                height: 50,
                borderRadius: "0 0 27px 27px",
                background: theme.colors.accent,
                marginTop: 6,
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: theme.colors.accent,
                letterSpacing: 2,
                marginTop: 8,
                textTransform: "uppercase",
              }}
            >
              NativeWit
            </span>
          </div>
        </div>

        {/* Speech bubble from co-founder side */}
        {frame >= 330 && (
          <div
            style={{
              position: "absolute",
              top: "24%",
              right: "30%",
              opacity: spring({ frame: frame - 330, fps, config: { damping: 80 } }),
              transform: `scale(${interpolate(
                spring({ frame: frame - 330, fps, config: { damping: 60 } }),
                [0, 1],
                [0.6, 1],
              )})`,
            }}
          >
            <div
              style={{
                padding: "10px 18px",
                borderRadius: 12,
                border: `1px solid ${theme.colors.accent}33`,
                background: `${theme.colors.surface}`,
                fontSize: 20,
                color: theme.colors.accent,
                fontWeight: 700,
              }}
            >
              ?
            </div>
            {/* Bubble tail */}
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: `8px solid ${theme.colors.surface}`,
                marginLeft: 20,
              }}
            />
          </div>
        )}

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
            const qProgress = spring({
              frame: frame - qDelay,
              fps,
              config: { damping: 60, mass: 0.4 },
            });

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

      {/* ═══ PHASE 4: AI neural network ═══ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: phase4,
        }}
      >
        <svg
          width="600"
          height="400"
          viewBox="0 0 600 400"
          fill="none"
        >
          {/* Neural network — 3 layers of nodes */}
          {/* Layer 1 */}
          {[100, 200, 300].map((y) => (
            <circle
              key={`l1-${y}`}
              cx="100"
              cy={y}
              r="14"
              fill={`${theme.colors.blue}${Math.round(networkPulse * 100)
                .toString(16)
                .padStart(2, "0")}`}
              stroke={theme.colors.blue}
              strokeWidth="2"
            />
          ))}
          {/* Layer 2 */}
          {[80, 160, 240, 320].map((y) => (
            <circle
              key={`l2-${y}`}
              cx="300"
              cy={y}
              r="14"
              fill={`${theme.colors.accent}${Math.round(networkPulse * 80)
                .toString(16)
                .padStart(2, "0")}`}
              stroke={theme.colors.accent}
              strokeWidth="2"
            />
          ))}
          {/* Layer 3 */}
          {[150, 250].map((y) => (
            <circle
              key={`l3-${y}`}
              cx="500"
              cy={y}
              r="14"
              fill={`${theme.colors.green}${Math.round(networkPulse * 100)
                .toString(16)
                .padStart(2, "0")}`}
              stroke={theme.colors.green}
              strokeWidth="2"
            />
          ))}
          {/* Connection lines L1→L2 */}
          {[100, 200, 300].map((y1) =>
            [80, 160, 240, 320].map((y2) => (
              <line
                key={`c1-${y1}-${y2}`}
                x1="114"
                y1={y1}
                x2="286"
                y2={y2}
                stroke={theme.colors.border}
                strokeWidth="1"
                opacity={networkPulse * 0.5}
              />
            )),
          )}
          {/* Connection lines L2→L3 */}
          {[80, 160, 240, 320].map((y1) =>
            [150, 250].map((y2) => (
              <line
                key={`c2-${y1}-${y2}`}
                x1="314"
                y1={y1}
                x2="486"
                y2={y2}
                stroke={theme.colors.border}
                strokeWidth="1"
                opacity={networkPulse * 0.5}
              />
            )),
          )}
          {/* Traveling data dots on L1→L2 connections */}
          {frame > 495 && [100, 200, 300].map((y1) => {
            const targetY = [80, 160, 240, 320][Math.floor((frame + y1) / 20) % 4];
            const dotX = 114 + dataFlowT * (286 - 114);
            const dotY = y1 + dataFlowT * (targetY - y1);
            return (
              <circle
                key={`df1-${y1}`}
                cx={dotX}
                cy={dotY}
                r="3"
                fill={theme.colors.accent}
                opacity={networkPulse * 0.7}
              />
            );
          })}
          {/* Traveling data dots on L2→L3 connections */}
          {frame > 510 && [80, 240].map((y1) => {
            const targetY2 = y1 < 200 ? 150 : 250;
            const dotX2 = 314 + dataFlowT * (486 - 314);
            const dotY2 = y1 + dataFlowT * (targetY2 - y1);
            return (
              <circle
                key={`df2-${y1}`}
                cx={dotX2}
                cy={dotY2}
                r="3"
                fill={theme.colors.green}
                opacity={networkPulse * 0.6}
              />
            );
          })}
        </svg>

        {/* "AI" badge */}
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: theme.colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 800,
              color: theme.colors.bg,
            }}
          >
            AI
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: theme.colors.textMuted,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Embedded in every layer
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
