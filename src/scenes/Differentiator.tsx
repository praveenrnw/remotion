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
 * DIFFERENTIATOR — 44–65.5s (645 frames)
 * 4 visual phases with rich infographics and animations.
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

  const entryFade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const exitFade = interpolate(frame, [615, 645], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const lineY = interpolate(frame, [0, 645], [8, 92], { easing: Easing.bezier(0.19, 1, 0.22, 1) });

  const phase1 = interpolate(frame, [0, 30, 125, 150], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase2 = interpolate(frame, [138, 168, 270, 300], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase3 = interpolate(frame, [286, 316, 470, 500], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase4 = interpolate(frame, [485, 515, 610, 645], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const blueprintDraw = interpolate(frame, [138, 260], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  const questionToCheck = interpolate(frame, [360, 400], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  const breathe = Math.sin(frame * Math.PI / 30);
  const breatheY = breathe * 3;

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg, fontFamily: theme.font,
        opacity: Math.min(entryFade, exitFade), overflow: "hidden",
      }}
    >
      <GeometricBg frame={frame} opacity={0.03} />

      {/* Slow-moving left accent line */}
      <div style={{ position: "absolute", left: 80, top: `${lineY}%`, width: 3, height: 100, background: `linear-gradient(to bottom, ${theme.colors.accent}, transparent)`, borderRadius: 2 }} />

      {/* ═══ PHASE 1: "How we think" — Brain/gear icon ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: phase1 }}>
        {/* Title */}
        <div style={{
          position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", gap: 28,
          opacity: interpolate(frame, [0, 15, 50, 70], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          <svg width="120" height="120" viewBox="0 0 90 90" style={{
            transform: `rotate(${frame * 0.5}deg) scale(${1 + breathe * 0.04})`,
            filter: `drop-shadow(0 0 16px ${theme.colors.accent}44)`,
          }}>
            <polygon points="45,2 58,32 88,45 58,58 45,88 32,58 2,45 32,32" fill="none" stroke={theme.colors.accent} strokeWidth="2.5" />
            <polygon points="45,14 54,34 74,45 54,56 45,76 36,56 16,45 36,34" fill={`${theme.colors.accent}33`} />
            <circle cx="45" cy="45" r="8" fill={theme.colors.accent} opacity="0.7" />
          </svg>
          <span style={{ fontSize: 42, fontWeight: 900, color: theme.colors.accent, letterSpacing: 4, textTransform: "uppercase" }}>
            What makes us different
          </span>
        </div>

        {/* Gear + "How we think" */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          opacity: interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(frame, [55, 80], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) })})`,
        }}>
          <div style={{ width: 150, height: 150, position: "relative", marginBottom: 32 }}>
            <svg width="200" height="200" viewBox="0 0 150 150" style={{ transform: `rotate(${frame * 0.5}deg)` }}>
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i / 16) * Math.PI * 2;
                const x = 75 + Math.cos(angle) * 62;
                const y = 75 + Math.sin(angle) * 62;
                return <rect key={i} x={x - 5} y={y - 5} width="10" height="10" rx="2"
                  fill={`${theme.colors.accent}55`} transform={`rotate(${(i / 16) * 360} ${x} ${y})`} />;
              })}
              <circle cx="75" cy="75" r="52" fill="none" stroke={`${theme.colors.accent}44`} strokeWidth="3" />
              <circle cx="75" cy="75" r="32" fill="none" stroke={theme.colors.accent} strokeWidth="2.5" strokeDasharray="12 6" strokeDashoffset={frame * 0.4} />
              {[0, 72, 144, 216, 288].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const nodeOp = interpolate(frame, [10 + i * 8, 20 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return (
                  <g key={i}>
                    <circle cx={75 + Math.cos(rad) * 20} cy={75 + Math.sin(rad) * 20} r="4" fill={theme.colors.accent} opacity={nodeOp} />
                    <line x1={75 + Math.cos(rad) * 20} y1={75 + Math.sin(rad) * 20}
                      x2={75 + Math.cos(((deg + 72) * Math.PI) / 180) * 20} y2={75 + Math.sin(((deg + 72) * Math.PI) / 180) * 20}
                      stroke={theme.colors.accent} strokeWidth="1.5" opacity={nodeOp * 0.5} />
                  </g>
                );
              })}
              <circle cx="75" cy="75" r={8 + Math.sin(frame * 0.12) * 2} fill={theme.colors.accent} opacity={0.8} />
            </svg>
          </div>
          <span style={{ fontSize: 36, fontWeight: 900, color: theme.colors.accent, letterSpacing: 4, textTransform: "uppercase", transform: `translateY(${breatheY}px)` }}>
            How we think
          </span>
        </div>
      </div>

      {/* ═══ PHASE 2: Blueprint wireframe + infographics ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: phase2 }}>
        {/* Blueprint grid */}
        <svg style={{ position: "absolute", inset: 0 }} width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`vg-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="1080" stroke={theme.colors.accent} strokeWidth="0.5" opacity={0.04} />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`hg-${i}`} x1="0" y1={i * 100} x2="1920" y2={i * 100} stroke={theme.colors.accent} strokeWidth="0.5" opacity={0.04} />
          ))}
        </svg>

        <svg width="900" height="520" viewBox="0 0 700 400" fill="none">
          {/* Top: API Gateway */}
          <rect x="250" y="20" width="200" height="60" rx="8"
            fill={`${theme.colors.accent}${Math.round(interpolate(blueprintDraw, [0.3, 0.5], [0, 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke={theme.colors.accent} strokeWidth="2" strokeDasharray="400" strokeDashoffset={400 - blueprintDraw * 400} />
          <text x="350" y="48" textAnchor="middle" fill={theme.colors.accent} fontSize="14" fontWeight="700" letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.25, 0.4], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>API GATEWAY</text>

          {/* Frontend */}
          <rect x="50" y="160" width="160" height="60" rx="8"
            fill={`${theme.colors.blue}${Math.round(interpolate(blueprintDraw, [0.4, 0.6], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke={theme.colors.blue} strokeWidth="2" strokeDasharray="380" strokeDashoffset={380 - blueprintDraw * 380} />
          <text x="130" y="188" textAnchor="middle" fill={theme.colors.blue} fontSize="14" fontWeight="700" letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.35, 0.5], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>FRONTEND</text>

          {/* Backend */}
          <rect x="270" y="160" width="160" height="60" rx="8"
            fill={`${theme.colors.green}${Math.round(interpolate(blueprintDraw, [0.4, 0.6], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke={theme.colors.green} strokeWidth="2" strokeDasharray="380" strokeDashoffset={380 - blueprintDraw * 380} />
          <text x="350" y="188" textAnchor="middle" fill={theme.colors.green} fontSize="14" fontWeight="700" letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.35, 0.5], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>BACKEND</text>

          {/* Services */}
          <rect x="490" y="160" width="160" height="60" rx="8"
            fill={`#8b5cf6${Math.round(interpolate(blueprintDraw, [0.4, 0.6], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toString(16).padStart(2, "0")}`}
            stroke="#8b5cf6" strokeWidth="2" strokeDasharray="380" strokeDashoffset={380 - blueprintDraw * 380} />
          <text x="570" y="188" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="700" letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.35, 0.5], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>SERVICES</text>

          {/* Connecting lines */}
          <line x1="350" y1="80" x2="130" y2="160" stroke={theme.colors.border} strokeWidth="1.5" strokeDasharray="300" strokeDashoffset={300 - blueprintDraw * 300} />
          <line x1="350" y1="80" x2="350" y2="160" stroke={theme.colors.border} strokeWidth="1.5" strokeDasharray="80" strokeDashoffset={80 - blueprintDraw * 80} />
          <line x1="350" y1="80" x2="570" y2="160" stroke={theme.colors.border} strokeWidth="1.5" strokeDasharray="300" strokeDashoffset={300 - blueprintDraw * 300} />

          {/* Endpoint dots */}
          {[[350, 80], [130, 160], [350, 160], [570, 160]].map(([cx, cy], i) => (
            <circle key={`ep-${i}`} cx={cx} cy={cy} r="4" fill={theme.colors.accent}
              opacity={interpolate(blueprintDraw, [0.3, 0.5], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          ))}

          {/* Data flow dots */}
          {blueprintDraw > 0.5 && [
            { x1: 350, y1: 80, x2: 130, y2: 160, offset: 0 },
            { x1: 350, y1: 80, x2: 350, y2: 160, offset: 15 },
            { x1: 350, y1: 80, x2: 570, y2: 160, offset: 30 },
          ].map(({ x1, y1, x2, y2, offset }, i) => {
            const flowT = ((frame - 180 + offset) % 50) / 50;
            return <circle key={`flow-${i}`} cx={x1 + flowT * (x2 - x1)} cy={y1 + flowT * (y2 - y1)} r="3" fill={theme.colors.accent}
              opacity={interpolate(flowT, [0, 0.2, 0.8, 1], [0, 0.6, 0.6, 0])} />;
          })}

          {/* DB */}
          <ellipse cx="350" cy="310" rx="60" ry="15" stroke={theme.colors.textMuted} strokeWidth="1.5" strokeDasharray="200" strokeDashoffset={200 - blueprintDraw * 200} />
          <line x1="290" y1="310" x2="290" y2="340" stroke={theme.colors.textMuted} strokeWidth="1.5" opacity={blueprintDraw} />
          <line x1="410" y1="310" x2="410" y2="340" stroke={theme.colors.textMuted} strokeWidth="1.5" opacity={blueprintDraw} />
          <ellipse cx="350" cy="340" rx="60" ry="15" stroke={theme.colors.textMuted} strokeWidth="1.5" strokeDasharray="200" strokeDashoffset={200 - blueprintDraw * 200} />
          <text x="350" y="370" textAnchor="middle" fill={theme.colors.textMuted} fontSize="16" fontWeight="700" letterSpacing="2"
            opacity={interpolate(blueprintDraw, [0.6, 0.75], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>DATABASE</text>
          <line x1="350" y1="220" x2="350" y2="295" stroke={theme.colors.border} strokeWidth="1.5" strokeDasharray="80" strokeDashoffset={80 - blueprintDraw * 80} />
        </svg>

        {/* Label */}
        <div style={{ position: "absolute", bottom: "10%", display: "flex", alignItems: "center", gap: 14, opacity: phase2, transform: `translateY(${breatheY}px)` }}>
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect x="2" y="2" width="28" height="28" rx="4" fill="none" stroke={theme.colors.accent} strokeWidth="2" opacity="0.6" />
            <line x1="2" y1="12" x2="30" y2="12" stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.4" />
            <line x1="12" y1="2" x2="12" y2="30" stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.4" />
            <circle cx="22" cy="22" r="5" fill={theme.colors.accent} opacity="0.5" />
          </svg>
          <span style={{ fontSize: 28, fontWeight: 900, color: theme.colors.accent, letterSpacing: 4, textTransform: "uppercase" }}>Architecture first</span>
        </div>
      </div>

      {/* ═══ PHASE 3: Co-founder + Hard Questions ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40, opacity: phase3 }}>
        {/* Partnership Venn diagram with infographic icons */}
        <div style={{ position: "relative", width: 700, height: 400, zIndex: 1 }}>
          {/* Left circle — YOU */}
          <div style={{
            position: "absolute", left: 30, top: 30, width: 300, height: 300, borderRadius: "50%",
            background: `${theme.colors.textSecondary}10`, border: `3px solid ${theme.colors.textSecondary}44`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            opacity: interpolate(frame, [288, 310], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) }),
            transform: `translateX(${interpolate(interpolate(frame, [288, 310], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), [0, 1], [40, 0])}px)`,
          }}>
            {/* Person icon */}
            <svg width="60" height="60" viewBox="0 0 60 60" style={{ marginLeft: -60 }}>
              <circle cx="30" cy="18" r="12" fill={theme.colors.textSecondary} opacity="0.6" />
              <path d="M8 55 Q8 35 30 30 Q52 35 52 55" fill={theme.colors.textSecondary} opacity="0.4" />
            </svg>
            <span style={{ fontSize: 34, fontWeight: 900, color: theme.colors.textSecondary, letterSpacing: 3, textTransform: "uppercase", marginLeft: -60, marginTop: 8 }}>YOU</span>
          </div>

          {/* Right circle — NATIVEWIT */}
          <div style={{
            position: "absolute", left: 370, top: 30, width: 300, height: 300, borderRadius: "50%",
            background: `${theme.colors.accent}10`, border: `3px solid ${theme.colors.accent}44`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            opacity: interpolate(frame, [288, 310], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) }),
            transform: `translateX(${interpolate(interpolate(frame, [288, 310], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), [0, 1], [-40, 0])}px)`,
          }}>
            {/* Code/rocket icon */}
            <svg width="60" height="60" viewBox="0 0 60 60" style={{ marginRight: -60 }}>
              <text x="30" y="28" textAnchor="middle" fill={theme.colors.accent} fontSize="24" fontWeight="900" opacity="0.7">{"</>"}</text>
              <circle cx="30" cy="45" r="8" fill={theme.colors.accent} opacity="0.4" />
            </svg>
            <span style={{ fontSize: 30, fontWeight: 900, color: theme.colors.accent, letterSpacing: 3, textTransform: "uppercase", marginRight: -60, marginTop: 8 }}>NATIVEWIT</span>
          </div>

          {/* Overlap glow + handshake */}
          <div style={{
            position: "absolute", left: 290, top: 60, width: 120, height: 240, borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.colors.accent}30, transparent)`,
            opacity: interpolate(frame, [310, 335], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }} />
          <div style={{
            position: "absolute", left: 320, top: 145,
            opacity: interpolate(frame, [320, 340], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `scale(${1 + breathe * 0.05})`,
          }}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              <path d="M8 35 L20 25 L30 30 L40 25 L52 35" fill="none" stroke={theme.colors.accent} strokeWidth="3" strokeLinecap="round" />
              <circle cx="20" cy="25" r="3" fill={theme.colors.accent} opacity="0.7" />
              <circle cx="40" cy="25" r="3" fill={theme.colors.accent} opacity="0.7" />
              <circle cx="30" cy="18" r="2" fill={theme.colors.accent} opacity={0.5 + Math.sin(frame * 0.15) * 0.5} />
            </svg>
          </div>
        </div>

        {/* Question marks → Checkmarks */}
        <div style={{ display: "flex", gap: 40, zIndex: 1 }}>
          {[0, 1, 2].map((i) => {
            const qDelay = 345 + i * 20;
            const localMorph = interpolate(frame, [qDelay + 22, qDelay + 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const qP = interpolate(frame - qDelay, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) });

            return (
              <div key={i} style={{ width: 56, height: 56, position: "relative", opacity: qP }}>
                <div style={{
                  position: "absolute", inset: -8, borderRadius: "50%", border: `2px solid ${theme.colors.green}`,
                  opacity: interpolate(localMorph, [0, 0.3, 0.8], [0, 0.4, 0]),
                  transform: `scale(${interpolate(localMorph, [0, 0.5, 1], [0.3, 1.3, 1])})`,
                }} />
                <span style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 38, fontWeight: 800, color: theme.colors.textMuted, opacity: 1 - localMorph,
                }}>?</span>
                <span style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 38, fontWeight: 800, color: theme.colors.green, opacity: localMorph,
                  transform: `scale(${interpolate(localMorph, [0, 0.5, 1], [0.3, 1.15, 1])})`,
                  filter: localMorph > 0.5 ? `drop-shadow(0 0 8px ${theme.colors.green}44)` : "none",
                }}>✓</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ PHASE 4: AI embedded in every layer ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, opacity: phase4 }}>
        {[
          { label: "FRONTEND", color: theme.colors.blue },
          { label: "BACKEND", color: theme.colors.green },
          { label: "DATA", color: "#8b5cf6" },
          { label: "INFRA", color: theme.colors.accent },
        ].map((layer, i) => {
          const layerDelay = 490 + i * 12;
          const layerP = interpolate(frame - layerDelay, [0, 20], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1),
          });
          const layerB = Math.sin((frame + i * 15) * Math.PI / 30) * 2;
          const aiBadge = interpolate(frame - (layerDelay + 15), [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const scanT = ((frame - layerDelay + i * 20) % 80) / 80;

          return (
            <div key={layer.label} style={{
              width: 700, height: 80, borderRadius: 16, background: theme.colors.surface,
              border: `2px solid ${layer.color}44`, display: "flex", alignItems: "center",
              justifyContent: "space-between", padding: "0 28px", opacity: layerP,
              transform: `translateX(${interpolate(layerP, [0, 1], [i % 2 === 0 ? -50 : 50, 0])}px) translateY(${layerB}px)`,
              boxShadow: `0 4px 20px ${layer.color}15`, position: "relative", overflow: "hidden",
            }}>
              {aiBadge > 0.5 && (
                <div style={{
                  position: "absolute", top: 0, left: `${interpolate(scanT, [0, 1], [-10, 110])}%`,
                  width: 40, height: "100%",
                  background: `linear-gradient(90deg, transparent, ${layer.color}12, transparent)`,
                }} />
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: `${layer.color}22`,
                  border: `2px solid ${layer.color}55`, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    {i === 0 && <>
                      <rect x="2" y="3" width="20" height="18" rx="3" fill="none" stroke={layer.color} strokeWidth="2" />
                      <line x1="2" y1="9" x2="22" y2="9" stroke={layer.color} strokeWidth="1.5" />
                    </>}
                    {i === 1 && <>
                      <rect x="4" y="2" width="16" height="7" rx="2" fill="none" stroke={layer.color} strokeWidth="2" />
                      <rect x="4" y="11" width="16" height="7" rx="2" fill="none" stroke={layer.color} strokeWidth="2" />
                    </>}
                    {i === 2 && <>
                      <ellipse cx="12" cy="6" rx="8" ry="4" fill="none" stroke={layer.color} strokeWidth="2" />
                      <line x1="4" y1="6" x2="4" y2="18" stroke={layer.color} strokeWidth="2" />
                      <line x1="20" y1="6" x2="20" y2="18" stroke={layer.color} strokeWidth="2" />
                      <ellipse cx="12" cy="18" rx="8" ry="4" fill="none" stroke={layer.color} strokeWidth="2" />
                    </>}
                    {i === 3 && <path d="M6 18h12a5 5 0 10-2-9.8A7 7 0 104 15a4 4 0 002 3z" fill="none" stroke={layer.color} strokeWidth="2" />}
                  </svg>
                </div>
                <span style={{ fontSize: 22, fontWeight: 800, color: theme.colors.textSecondary, letterSpacing: 3 }}>{layer.label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: aiBadge }}>
                <svg width="28" height="28" viewBox="0 0 28 28" style={{ transform: `scale(${1 + Math.sin((frame + i * 20) * 0.1) * 0.08})` }}>
                  <circle cx="4" cy="8" r="2.5" fill={layer.color} opacity="0.6" />
                  <circle cx="4" cy="20" r="2.5" fill={layer.color} opacity="0.6" />
                  <circle cx="14" cy="6" r="2.5" fill={layer.color} opacity="0.8" />
                  <circle cx="14" cy="14" r="2.5" fill={layer.color} />
                  <circle cx="14" cy="22" r="2.5" fill={layer.color} opacity="0.8" />
                  <circle cx="24" cy="14" r="3" fill={layer.color} />
                  <line x1="6.5" y1="8" x2="11.5" y2="6" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                  <line x1="6.5" y1="8" x2="11.5" y2="14" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                  <line x1="6.5" y1="20" x2="11.5" y2="14" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                  <line x1="6.5" y1="20" x2="11.5" y2="22" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                  <line x1="16.5" y1="6" x2="21.5" y2="14" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                  <line x1="16.5" y1="14" x2="21.5" y2="14" stroke={layer.color} strokeWidth="1" opacity="0.5" />
                  <line x1="16.5" y1="22" x2="21.5" y2="14" stroke={layer.color} strokeWidth="1" opacity="0.4" />
                </svg>
                <div style={{
                  padding: "6px 14px", borderRadius: 8, background: `${layer.color}22`, border: `1.5px solid ${layer.color}66`,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ fontSize: 15, fontWeight: 900, color: layer.color, letterSpacing: 1.5 }}>AI</span>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%", background: layer.color,
                    opacity: 0.5 + Math.sin((frame + i * 15) * 0.15) * 0.5,
                    boxShadow: `0 0 6px ${layer.color}`,
                  }} />
                </div>
              </div>
            </div>
          );
        })}

        {/* Energy flow between layers */}
        {frame > 535 && (
          <svg style={{ position: "absolute", left: "50%", top: "26%", transform: "translateX(-50%)", width: 20, height: "48%", pointerEvents: "none" }} viewBox="0 0 20 520">
            <line x1="10" y1="0" x2="10" y2="520" stroke={theme.colors.accent} strokeWidth="1" opacity="0.1" />
            {[0, 1, 2, 3].map((d) => {
              const dotT = ((frame - 535 + d * 30) % 90) / 90;
              return <circle key={d} cx="10" cy={dotT * 520} r="4" fill={theme.colors.accent}
                opacity={interpolate(dotT, [0, 0.15, 0.85, 1], [0, 0.7, 0.7, 0])} />;
            })}
          </svg>
        )}

        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="30" height="30" viewBox="0 0 30 30" style={{ transform: `translateY(${breatheY}px)` }}>
            <rect x="6" y="6" width="18" height="18" rx="3" fill="none" stroke={theme.colors.accent} strokeWidth="2" opacity="0.6" />
            <circle cx="15" cy="15" r="4" fill={theme.colors.accent} opacity="0.5" />
          </svg>
          <span style={{ fontSize: 28, fontWeight: 900, color: theme.colors.textMuted, letterSpacing: 4, textTransform: "uppercase", transform: `translateY(${breatheY}px)` }}>
            Embedded in every layer
          </span>
        </div>
      </div>

      <RobotGuide frame={frame} x={4} y={3} scale={0.6}
        expression={frame < 150 ? "thinking" : frame < 300 ? "neutral" : frame < 485 ? "happy" : "waving"} />
    </AbsoluteFill>
  );
};
