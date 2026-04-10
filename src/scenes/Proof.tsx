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
 * PROOF — 29.5–44s (435 frames)
 * Phase 1: Product category infographics (AI tools, Health platform, Finance automation)
 * Phase 2: Real products, real users
 * Phase 3: Weeks, not months
 */

const CATEGORIES = [
  { label: "AI Production Tools", color: "#8b5cf6", delay: 0 },
  { label: "Health Research", color: theme.colors.green, delay: 84 },
  { label: "Financial Automation", color: theme.colors.blue, delay: 185 },
];

export const Proof: React.FC = () => {
  const frame = useCurrentFrame();

  const entryFade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const exitFade = interpolate(frame, [405, 435], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const phase1 = interpolate(frame, [0, 15, 255, 275], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase2 = interpolate(frame, [265, 285, 325, 345], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase3 = interpolate(frame, [335, 355, 405, 435], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const breathe = Math.sin(frame * Math.PI / 30);
  const breatheY = breathe * 3;

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg, fontFamily: theme.font,
        opacity: Math.min(entryFade, exitFade), overflow: "hidden",
      }}
    >
      <GeometricBg frame={frame} opacity={0.04} />

      {/* ═══ PHASE 1: Product Categories ═══ */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: phase1 }}>
        <span style={{
          position: "absolute", top: 60, fontSize: 26, fontWeight: 900,
          color: theme.colors.accent, letterSpacing: 4, textTransform: "uppercase",
          opacity: interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>What we've shipped</span>

        <div style={{ display: "flex", gap: 40, height: "55%", width: "85%", maxWidth: 1600 }}>
          {CATEGORIES.map((cat, i) => {
            const cardP = interpolate(frame - cat.delay, [0, 30], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
              easing: Easing.bezier(0.19, 1, 0.22, 1),
            });
            const cardY = interpolate(cardP, [0, 1], [40, 0]);
            const cardB = Math.sin((frame + i * 20) * Math.PI / 30) * 3;
            const nextD = CATEGORIES[i + 1]?.delay ?? 270;
            const isActive = frame >= cat.delay && frame < nextD;

            return (
              <div key={cat.label} style={{
                flex: 1, background: theme.colors.surface, borderRadius: 24,
                border: `2px solid ${isActive ? cat.color + "66" : theme.colors.border}`,
                opacity: cardP, transform: `translateY(${cardY + cardB}px)`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
                position: "relative", overflow: "hidden",
                boxShadow: isActive ? `0 0 40px ${cat.color}22` : "none",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: `${interpolate(cardP, [0, 1], [0, 100])}%`, height: 4,
                  background: cat.color, borderRadius: "24px 24px 0 0",
                }} />
                {isActive && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 35%, ${cat.color}15 0%, transparent 65%)` }} />}

                {/* ── AI Production Tools infographic ──── */}
                {i === 0 && (
                  <div style={{ position: "relative", width: 160, height: 160 }}>
                    <svg width="160" height="160" viewBox="0 0 160 160" style={{ filter: `drop-shadow(0 0 16px ${cat.color}55)` }}>
                      {/* Neural network nodes */}
                      {[
                        { x: 40, y: 30 }, { x: 120, y: 30 },
                        { x: 20, y: 80 }, { x: 80, y: 80 }, { x: 140, y: 80 },
                        { x: 40, y: 130 }, { x: 120, y: 130 },
                      ].map((n, j) => {
                        const nodeOp = interpolate(frame - cat.delay, [j * 4, j * 4 + 15], [0, 1], {
                          extrapolateLeft: "clamp", extrapolateRight: "clamp",
                        });
                        return (
                          <g key={j}>
                            <circle cx={n.x} cy={n.y} r={8 + (j === 3 ? 4 : 0)} fill={cat.color} opacity={nodeOp * 0.8} />
                            <circle cx={n.x} cy={n.y} r={12 + (j === 3 ? 4 : 0)} fill="none" stroke={cat.color} strokeWidth="1" opacity={nodeOp * 0.3} />
                          </g>
                        );
                      })}
                      {/* Connections */}
                      {[[0, 2], [0, 3], [1, 3], [1, 4], [2, 5], [3, 5], [3, 6], [4, 6]].map(([a, b], j) => {
                        const pts = [
                          { x: 40, y: 30 }, { x: 120, y: 30 },
                          { x: 20, y: 80 }, { x: 80, y: 80 }, { x: 140, y: 80 },
                          { x: 40, y: 130 }, { x: 120, y: 130 },
                        ];
                        const lineOp = interpolate(frame - cat.delay, [10 + j * 3, 20 + j * 3], [0, 0.4], {
                          extrapolateLeft: "clamp", extrapolateRight: "clamp",
                        });
                        return <line key={j} x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y}
                          stroke={cat.color} strokeWidth="1.5" opacity={lineOp} />;
                      })}
                      {/* Data pulse traveling */}
                      {isActive && [0, 1, 2].map((p) => {
                        const pulseT = ((frame + p * 25) % 60) / 60;
                        return <circle key={p} cx={20 + pulseT * 120} cy={80} r="3" fill={cat.color}
                          opacity={interpolate(pulseT, [0, 0.3, 0.7, 1], [0, 0.8, 0.8, 0])} />;
                      })}
                      {/* Center "AI" label */}
                      <text x="80" y="85" textAnchor="middle" fill={cat.color} fontSize="14" fontWeight="900" opacity="0.7">AI</text>
                    </svg>
                  </div>
                )}

                {/* ── Health Research infographic ──── */}
                {i === 1 && (
                  <div style={{ position: "relative", width: 160, height: 160 }}>
                    <svg width="160" height="160" viewBox="0 0 160 160" style={{ filter: `drop-shadow(0 0 16px ${cat.color}55)` }}>
                      {/* Clipboard */}
                      <rect x="35" y="20" width="90" height="120" rx="8" fill={`${cat.color}15`} stroke={cat.color} strokeWidth="2.5" />
                      <rect x="55" y="12" width="50" height="16" rx="8" fill={cat.color} opacity="0.6" />
                      {/* Checklist lines */}
                      {[0, 1, 2, 3].map((l) => {
                        const lineP = interpolate(frame - cat.delay, [l * 12, l * 12 + 20], [0, 1], {
                          extrapolateLeft: "clamp", extrapolateRight: "clamp",
                        });
                        return (
                          <g key={l}>
                            <rect x="50" y={48 + l * 24} width={50 * lineP} height="6" rx="3" fill={cat.color} opacity="0.5" />
                            <circle cx="46" cy={51 + l * 24} r="5" fill="none" stroke={cat.color} strokeWidth="1.5" opacity={lineP * 0.6} />
                            {lineP > 0.8 && <path d={`M43 ${51 + l * 24} L45 ${53 + l * 24} L49 ${48 + l * 24}`}
                              fill="none" stroke={cat.color} strokeWidth="2" strokeLinecap="round" />}
                          </g>
                        );
                      })}
                      {/* Heart with pulse */}
                      <path d="M80 135 C65 125 50 115 50 100 Q50 88 62 88 Q72 88 80 98 Q88 88 98 88 Q110 88 110 100 C110 115 95 125 80 135Z"
                        fill={`${cat.color}30`} stroke={cat.color} strokeWidth="2" opacity="0.7" />
                      {/* ECG pulse line */}
                      <polyline points="35,155 55,155 62,145 68,158 74,155 100,155"
                        fill="none" stroke={cat.color} strokeWidth="2"
                        strokeDasharray="80" strokeDashoffset={interpolate(frame - cat.delay, [0, 50], [80, 0], {
                          extrapolateLeft: "clamp", extrapolateRight: "clamp",
                        })} />
                    </svg>
                  </div>
                )}

                {/* ── Financial Automation infographic ──── */}
                {i === 2 && (
                  <div style={{ position: "relative", width: 160, height: 160 }}>
                    <svg width="160" height="160" viewBox="0 0 160 160" style={{ filter: `drop-shadow(0 0 16px ${cat.color}55)` }}>
                      {/* Rising chart */}
                      {[0.35, 0.5, 0.7, 0.55, 0.85, 0.65, 1].map((h, j) => {
                        const barH = interpolate(frame - cat.delay, [j * 6, j * 6 + 25], [0, h * 90], {
                          extrapolateLeft: "clamp", extrapolateRight: "clamp",
                        });
                        return <rect key={j} x={20 + j * 18} y={140 - barH} width="12" height={barH}
                          fill={j === 6 ? cat.color : `${cat.color}77`} rx="3" />;
                      })}
                      {/* Trend line */}
                      <polyline points="26,120 44,100 62,105 80,80 98,65 116,50 134,30"
                        fill="none" stroke={cat.color} strokeWidth="2.5" opacity="0.7"
                        strokeDasharray="150" strokeDashoffset={interpolate(frame - cat.delay, [10, 60], [150, 0], {
                          extrapolateLeft: "clamp", extrapolateRight: "clamp",
                        })} />
                      {/* Arrow tip */}
                      <polygon points="132,22 140,35 128,37" fill={cat.color} opacity="0.7" />
                      {/* Dollar coins */}
                      {[0, 1, 2].map((c) => {
                        const coinP = interpolate(frame - cat.delay, [30 + c * 10, 45 + c * 10], [0, 1], {
                          extrapolateLeft: "clamp", extrapolateRight: "clamp",
                        });
                        return (
                          <g key={c}>
                            <circle cx={30 + c * 50} cy={20} r={10} fill={`${cat.color}33`} stroke={cat.color} strokeWidth="1.5" opacity={coinP} />
                            <text x={30 + c * 50} y={24} textAnchor="middle" fill={cat.color} fontSize="12" fontWeight="800" opacity={coinP}>$</text>
                          </g>
                        );
                      })}
                      {/* Gear — automation */}
                      <g style={{ transform: `rotate(${frame * 0.8}deg)`, transformOrigin: "140px 140px" }}>
                        <circle cx="140" cy="140" r="12" fill="none" stroke={cat.color} strokeWidth="2" opacity="0.5" />
                        <circle cx="140" cy="140" r="5" fill={cat.color} opacity="0.4" />
                      </g>
                    </svg>
                  </div>
                )}

                <span style={{ fontSize: 28, fontWeight: 900, color: cat.color, letterSpacing: 3, textTransform: "uppercase" }}>{cat.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ PHASE 2: Real Products, Real Users ═══ */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 50, opacity: phase2,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {/* Phone mockup */}
          <div style={{
            width: 160, height: 280, borderRadius: 24,
            border: `3px solid ${theme.colors.border}`, background: theme.colors.surface,
            position: "relative", overflow: "hidden",
            transform: `translateY(${breatheY}px) rotate(-5deg)`,
            boxShadow: `0 20px 50px rgba(0,0,0,0.4)`,
            opacity: interpolate(frame, [271, 290], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            <div style={{ height: 24, background: theme.colors.accent, opacity: 0.8 }} />
            {[0.6, 0.8, 0.5, 0.7, 0.4, 0.9].map((w, j) => (
              <div key={j} style={{ margin: `${8 + j * 2}px 12px 0`, height: 8, width: `${w * 100}%`, background: theme.colors.border, borderRadius: 4 }} />
            ))}
            <div style={{ margin: "12px", height: 60, borderRadius: 8, background: `linear-gradient(135deg, ${theme.colors.accent}22, ${theme.colors.green}22)` }} />
            <div style={{
              position: "absolute", top: 8, right: 8, width: 10, height: 10, borderRadius: "50%",
              background: theme.colors.green, boxShadow: `0 0 8px ${theme.colors.green}`,
              opacity: 0.5 + Math.sin(frame * 0.15) * 0.5,
            }} />
          </div>

          {/* User count */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, transform: `translateY(${breatheY * 0.5}px)` }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const aP = interpolate(frame - (275 + i * 4), [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) });
                return (
                  <div key={i} style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: [theme.colors.accent, theme.colors.green, theme.colors.blue, "#8b5cf6", theme.colors.accent, theme.colors.green][i],
                    opacity: aP * 0.85, transform: `scale(${interpolate(aP, [0, 1], [0.3, 1])})`,
                    border: `3px solid ${theme.colors.bg}`, marginLeft: i > 0 ? -12 : 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="5" fill={theme.colors.bg} opacity="0.7" />
                      <path d="M4 22 C4 16 8 13 12 13 C16 13 20 16 20 22" fill={theme.colors.bg} opacity="0.5" />
                    </svg>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 64, fontWeight: 900, color: theme.colors.accent, lineHeight: 1, letterSpacing: "-2px" }}>
                {Math.min(1000, Math.floor(interpolate(frame, [280, 320], [0, 1000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })))}+
              </div>
              <span style={{ fontSize: 22, fontWeight: 800, color: theme.colors.textMuted, letterSpacing: 3, textTransform: "uppercase" }}>Active Users</span>
            </div>
          </div>

          {/* Desktop mockup */}
          <div style={{
            width: 240, height: 160, borderRadius: 12,
            border: `3px solid ${theme.colors.border}`, background: theme.colors.surface,
            position: "relative", overflow: "hidden",
            transform: `translateY(${-breatheY}px) rotate(3deg)`,
            boxShadow: `0 20px 50px rgba(0,0,0,0.4)`,
            opacity: interpolate(frame, [278, 296], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            <div style={{ height: 18, background: theme.colors.surfaceLight, display: "flex", alignItems: "center", padding: "0 8px", gap: 4 }}>
              {[0, 1, 2].map((d) => (
                <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: d === 0 ? theme.colors.accent : theme.colors.textMuted, opacity: 0.5 }} />
              ))}
            </div>
            <div style={{ display: "flex", height: "calc(100% - 18px)" }}>
              <div style={{ width: 50, background: theme.colors.surfaceLight, opacity: 0.5 }} />
              <div style={{ flex: 1, padding: 8 }}>
                {[0.7, 0.5, 0.8, 0.4].map((w, j) => (
                  <div key={j} style={{ height: 6, width: `${w * 100}%`, background: theme.colors.border, borderRadius: 3, marginTop: 6 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <span style={{ fontSize: 28, fontWeight: 900, color: theme.colors.textSecondary, letterSpacing: 4, textTransform: "uppercase" }}>
          Real products · Real users
        </span>
      </div>

      {/* ═══ PHASE 3: Weeks Not Months ═══ */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 40, opacity: phase3,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
          {/* Calendar */}
          <div style={{
            opacity: interpolate(frame, [340, 355], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `scale(${1 + breathe * 0.03})`,
          }}>
            <svg width="160" height="160" viewBox="0 0 160 160" style={{ filter: `drop-shadow(0 0 20px ${theme.colors.accent}33)` }}>
              <rect x="10" y="30" width="140" height="120" rx="12" fill={theme.colors.surface} stroke={theme.colors.accent} strokeWidth="2.5" />
              <rect x="10" y="30" width="140" height="30" rx="12" fill={theme.colors.accent} opacity="0.8" />
              <rect x="10" y="48" width="140" height="12" fill={theme.colors.accent} opacity="0.8" />
              <rect x="45" y="22" width="6" height="20" rx="3" fill={theme.colors.accent} />
              <rect x="109" y="22" width="6" height="20" rx="3" fill={theme.colors.accent} />
              {Array.from({ length: 5 }).map((_, row) =>
                Array.from({ length: 5 }).map((_, col) => {
                  const dayIdx = row * 5 + col;
                  const dayP = interpolate(frame - 350, [dayIdx * 1.5, dayIdx * 1.5 + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return <rect key={`${row}-${col}`} x={22 + col * 26} y={68 + row * 16} width="16" height="10" rx="2"
                    fill={dayIdx < 5 ? theme.colors.accent : theme.colors.textMuted} opacity={dayP * (dayIdx < 5 ? 0.7 : 0.25)} />;
                })
              )}
              <path d="M30 75 L36 80 L48 68" fill="none" stroke={theme.colors.green} strokeWidth="2.5"
                opacity={interpolate(frame, [365, 375], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
            </svg>
          </div>

          {/* Speed arrows */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {[0, 1, 2].map((a) => {
              const arrowP = interpolate(frame, [355 + a * 8, 370 + a * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) });
              return (
                <svg key={a} width="60" height="30" viewBox="0 0 60 30" opacity={arrowP}>
                  <polygon points="0,5 40,5 40,0 60,15 40,30 40,25 0,25" fill={theme.colors.accent} opacity={0.4 + a * 0.2} />
                </svg>
              );
            })}
          </div>

          {/* Rocket */}
          <div style={{
            opacity: interpolate(frame, [370, 385], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `translateY(${-breatheY * 2}px) rotate(-15deg)`,
          }}>
            <svg width="120" height="150" viewBox="0 0 120 150" style={{ filter: `drop-shadow(0 0 20px ${theme.colors.accent}44)` }}>
              <path d="M60 10 C40 10 30 50 30 90 L90 90 C90 50 80 10 60 10Z" fill={theme.colors.surface} stroke={theme.colors.textSecondary} strokeWidth="2" />
              <path d="M60 10 C50 10 45 30 45 40 L75 40 C75 30 70 10 60 10Z" fill={theme.colors.accent} opacity="0.7" />
              <circle cx="60" cy="55" r="12" fill={theme.colors.blue} opacity="0.5" stroke={theme.colors.textSecondary} strokeWidth="1.5" />
              <path d="M30 75 L15 100 L30 90Z" fill={theme.colors.accent} opacity="0.6" />
              <path d="M90 75 L105 100 L90 90Z" fill={theme.colors.accent} opacity="0.6" />
              <ellipse cx="60" cy={105 + Math.sin(frame * 0.3) * 5} rx="15" ry={20 + Math.sin(frame * 0.4) * 8} fill={theme.colors.accent} opacity="0.6" />
              <ellipse cx="60" cy={108 + Math.sin(frame * 0.35) * 4} rx="8" ry={12 + Math.sin(frame * 0.5) * 5} fill="#eab308" opacity="0.7" />
            </svg>
          </div>
        </div>
        <span style={{ fontSize: 36, fontWeight: 900, color: theme.colors.textSecondary, letterSpacing: 5, textTransform: "uppercase", transform: `translateY(${breatheY}px)` }}>
          Weeks, not months
        </span>
      </div>

      <RobotGuide frame={frame} x={90} y={3} scale={0.6} expression="happy" />
    </AbsoluteFill>
  );
};
