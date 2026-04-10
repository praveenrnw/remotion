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
import { GeometricBg } from "../components/GeometricBg";
import { RobotGuide } from "../components/RobotGuide";

/**
 * AUTHORITY — 16.5–29.5s (390 frames)
 * VO: "We're Nativewit — product engineering studio specialising in mobile and web.
 *      Five-plus years. Thirty-plus products shipped.
 *      Clients across Australia, the US, and Asia."
 *
 * When "mobile and web" is spoken, brand text shifts left and mobile + desktop mockups animate in.
 */

const MAP_DOTS = [
  { label: "AU", top: 72, left: 80, delay: 281 },
  { label: "US", top: 38, left: 18, delay: 281 },
  { label: "Asia", top: 42, left: 72, delay: 300 },
];

export const Authority: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryFade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const exitFade = interpolate(frame, [360, 390], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /* ── Logo + brand name ──────────────────────────────────── */
  const logoProgress = spring({ frame, fps, config: { damping: 100, mass: 0.5 } });
  const logoScale = interpolate(logoProgress, [0, 1], [0.7, 1]);
  const nameReveal = interpolate(frame, [1, 40], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) });

  const subtitleProgress = spring({ frame: frame - 43, fps, config: { damping: 120 } });

  /* ── Brand text shifts LEFT when "mobile and web" is spoken (frame ~95-108) */
  const brandShiftLeft = interpolate(frame, [95, 125], [0, -320], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Brand lifts up for stats ──────────────────────────── */
  const brandLift = interpolate(frame, [130, 180], [0, -80], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.bezier(0.19, 1, 0.22, 1),
  });

  /* ── Device mockups reveal (frame ~108 = "mobile and web") */
  const phoneMockProgress = spring({ frame: frame - 108, fps, config: { damping: 60, mass: 0.4 } });
  const desktopMockProgress = spring({ frame: frame - 118, fps, config: { damping: 60, mass: 0.4 } });

  /* ── Counter that appears inside phone mockup ─────────── */
  const phoneCount = Math.min(30, Math.floor(interpolate(frame, [125, 170], [0, 30], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const desktopCount = Math.min(15, Math.floor(interpolate(frame, [130, 170], [0, 15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));

  /* ── Stats counters ────────────────────────────────────── */
  const yearsCount = Math.min(5, Math.floor(interpolate(frame, [164, 200], [0, 5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const yearsOpacity = interpolate(frame, [164, 175], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const productsCount = Math.min(30, Math.floor(interpolate(frame, [219, 260], [0, 30], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const productsOpacity = interpolate(frame, [219, 230], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /* ── Map ────────────────────────────────────────────────── */
  const mapOpacity = interpolate(frame, [270, 290], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const breathe = Math.sin(frame * Math.PI / 30);
  const breatheY = breathe * 3;

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg, fontFamily: theme.font, overflow: "hidden",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        opacity: Math.min(entryFade, exitFade),
      }}
    >
      <GeometricBg frame={frame} opacity={0.04} />

      {/* Background glow */}
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.colors.accent}12 0%, transparent 70%)`,
        filter: "blur(60px)", opacity: logoProgress,
      }} />

      {/* ── Brand block ─────────────────────────────────── */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        transform: `translateY(${brandLift}px) translateX(${brandShiftLeft}px)`,
      }}>
        {/* Logo */}
        <div style={{ opacity: logoProgress, transform: `scale(${logoScale})`, marginBottom: 20, position: "relative" }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            width: 180, height: 180, borderRadius: "50%",
            border: `1px solid ${theme.colors.accent}22`, opacity: 0.5 + Math.sin(frame * 0.08) * 0.3,
          }} />
          <div style={{ position: "relative", overflow: "hidden", borderRadius: 8 }}>
            <Img src={staticFile("logo.png")} style={{ width: 130, height: "auto" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)`,
              transform: `translateX(${interpolate(frame, [5, 35], [-100, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
            }} />
          </div>
        </div>

        {/* Brand name */}
        <h1 style={{
          fontSize: 80, fontWeight: 900, color: theme.colors.textPrimary,
          margin: 0, letterSpacing: "-2px",
          clipPath: `inset(0 ${100 - nameReveal}% 0 0)`,
          transform: `translateY(${breatheY * 0.5}px)`,
        }}>
          We're <span style={{ color: theme.colors.accent }}>Nativewit.</span>
        </h1>

        {/* Subtitle */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16, marginTop: 16, opacity: subtitleProgress,
        }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: theme.colors.textSecondary, letterSpacing: 1 }}>
            Product Engineering Studio
          </span>
        </div>
      </div>

      {/* ── Device Mockups (appear right when brand shifts left) ─── */}
      {phoneMockProgress > 0.01 && (
        <div style={{
          position: "absolute", top: "22%", right: "12%",
          display: "flex", alignItems: "flex-end", gap: 30,
        }}>
          {/* Mobile phone mockup */}
          <div style={{
            opacity: phoneMockProgress, transform: `scale(${interpolate(phoneMockProgress, [0, 1], [0.6, 1])}) translateY(${breatheY}px)`,
          }}>
            <div style={{
              width: 120, height: 220, borderRadius: 18, border: `3px solid ${theme.colors.accent}66`,
              background: theme.colors.surface, position: "relative", overflow: "hidden",
              boxShadow: `0 12px 40px rgba(0,0,0,0.4)`,
            }}>
              <div style={{ height: 18, background: theme.colors.accent, opacity: 0.7 }} />
              {/* Content lines */}
              {[0.6, 0.8, 0.5, 0.7].map((w, j) => (
                <div key={j} style={{ margin: `${6 + j}px 8px 0`, height: 5, width: `${w * 100}%`, background: theme.colors.border, borderRadius: 3 }} />
              ))}
              {/* Count inside phone */}
              <div style={{
                position: "absolute", bottom: 28, left: 0, right: 0,
                textAlign: "center", fontSize: 28, fontWeight: 900, color: theme.colors.accent, opacity: 0.8,
              }}>{phoneCount}+</div>
              <div style={{
                position: "absolute", bottom: 12, left: 0, right: 0,
                textAlign: "center", fontSize: 9, fontWeight: 800, color: theme.colors.textMuted,
                letterSpacing: 1.5, textTransform: "uppercase",
              }}>Mobile Apps</div>
            </div>
            <div style={{ textAlign: "center", marginTop: 10, fontSize: 16, fontWeight: 800, color: theme.colors.accent, letterSpacing: 2, textTransform: "uppercase" }}>
              MOBILE
            </div>
          </div>

          {/* Desktop mockup */}
          <div style={{
            opacity: desktopMockProgress, transform: `scale(${interpolate(desktopMockProgress, [0, 1], [0.6, 1])}) translateY(${-breatheY}px)`,
          }}>
            <div style={{
              width: 200, height: 140, borderRadius: 10, border: `3px solid ${theme.colors.blue}66`,
              background: theme.colors.surface, position: "relative", overflow: "hidden",
              boxShadow: `0 12px 40px rgba(0,0,0,0.4)`,
            }}>
              <div style={{ height: 14, background: theme.colors.surfaceLight, display: "flex", alignItems: "center", padding: "0 6px", gap: 3 }}>
                {[0, 1, 2].map((d) => (
                  <div key={d} style={{ width: 5, height: 5, borderRadius: "50%", background: d === 0 ? theme.colors.accent : theme.colors.textMuted, opacity: 0.5 }} />
                ))}
              </div>
              {[0.7, 0.5, 0.8].map((w, j) => (
                <div key={j} style={{ margin: `5px 8px 0`, height: 5, width: `${w * 100}%`, background: theme.colors.border, borderRadius: 3 }} />
              ))}
              {/* Count inside desktop */}
              <div style={{
                position: "absolute", bottom: 22, left: 0, right: 0,
                textAlign: "center", fontSize: 24, fontWeight: 900, color: theme.colors.blue, opacity: 0.8,
              }}>{desktopCount}+</div>
              <div style={{
                position: "absolute", bottom: 8, left: 0, right: 0,
                textAlign: "center", fontSize: 9, fontWeight: 800, color: theme.colors.textMuted,
                letterSpacing: 1.5, textTransform: "uppercase",
              }}>Web Apps</div>
            </div>
            {/* Desktop stand */}
            <div style={{ width: 60, height: 20, margin: "0 auto", borderLeft: `2px solid ${theme.colors.border}`, borderRight: `2px solid ${theme.colors.border}`, borderBottom: `2px solid ${theme.colors.border}`, borderRadius: "0 0 8px 8px" }} />
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 16, fontWeight: 800, color: theme.colors.blue, letterSpacing: 2, textTransform: "uppercase" }}>
              WEB
            </div>
          </div>
        </div>
      )}

      {/* ── Stats row ─────────────────────────────────────── */}
      <div style={{
        position: "absolute", top: "62%", display: "flex", gap: 80, alignItems: "center",
        transform: `translateY(${breatheY}px)`,
      }}>
        <div style={{ textAlign: "center", opacity: yearsOpacity }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: theme.colors.accent, lineHeight: 1, letterSpacing: "-1px" }}>{yearsCount}+</div>
          <p style={{ fontSize: 22, color: theme.colors.textMuted, margin: "10px 0 0", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5 }}>Years</p>
        </div>
        <div style={{ textAlign: "center", opacity: productsOpacity }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: theme.colors.accent, lineHeight: 1, letterSpacing: "-1px" }}>{productsCount}+</div>
          <p style={{ fontSize: 22, color: theme.colors.textMuted, margin: "10px 0 0", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5 }}>Products shipped</p>
        </div>
      </div>

      {/* ── World map region circles ──────────────────────── */}
      <div style={{ position: "absolute", inset: 0, opacity: mapOpacity }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 700, height: 700, borderRadius: "50%", border: `2px dashed ${theme.colors.border}`,
          opacity: interpolate(frame, [275, 295], [0, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />

        {MAP_DOTS.map((dot, i) => {
          const dotP = interpolate(frame - dot.delay, [0, 20], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
            easing: Easing.bezier(0.19, 1, 0.22, 1),
          });
          const baseAngle = [0, 120, 240][i];
          const orbitAngle = baseAngle + (frame - dot.delay) * 0.35;
          const orbitRad = (orbitAngle * Math.PI) / 180;
          const orbitRadius = 350;
          const cx = 960 + Math.cos(orbitRad) * orbitRadius;
          const cy = 540 + Math.sin(orbitRad) * orbitRadius;

          return (
            <div key={dot.label}>
              <div style={{
                position: "absolute", left: cx, top: cy,
                transform: `translate(-50%, -50%) scale(${interpolate(dotP, [0, 1], [0.3, 1])})`,
                opacity: dotP,
              }}>
                <div style={{
                  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                  width: 80 + breathe * 6, height: 80 + breathe * 6, borderRadius: "50%",
                  border: `2px solid ${theme.colors.accent}44`, opacity: 0.4,
                }} />
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: `radial-gradient(circle at 40% 40%, ${theme.colors.accent}55, ${theme.colors.accent}22)`,
                  border: `2px solid ${theme.colors.accent}88`, boxShadow: `0 0 24px ${theme.colors.accent}33`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: theme.colors.textPrimary, letterSpacing: 1.5 }}>{dot.label}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Globe icon center */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: `translate(-50%, -50%) scale(${interpolate(frame, [285, 305], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.19, 1, 0.22, 1) })})`,
        }}>
          <svg width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="22" fill="none" stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.4" />
            <ellipse cx="25" cy="25" rx="10" ry="22" fill="none" stroke={theme.colors.accent} strokeWidth="1" opacity="0.3" />
            <line x1="3" y1="25" x2="47" y2="25" stroke={theme.colors.accent} strokeWidth="1" opacity="0.3" />
            <circle cx="25" cy="25" r="4" fill={theme.colors.accent} opacity="0.5" />
          </svg>
        </div>

        {/* Connection lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {MAP_DOTS.map((dot, i) => {
            const dP = interpolate(frame - dot.delay, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            if (dP < 0.5) return null;
            const a = ([0, 120, 240][i] + (frame - dot.delay) * 0.35) * Math.PI / 180;
            const r = 350;
            const ex = 960 + Math.cos(a) * r;
            const ey = 540 + Math.sin(a) * r;
            const mx = 960 + Math.cos(a) * r * 0.5 + Math.sin(a) * 40;
            const my = 540 + Math.sin(a) * r * 0.5 - Math.cos(a) * 40;
            const travelT = ((frame - dot.delay) % 60) / 60;
            const t = travelT;
            const tx = (1 - t) * (1 - t) * 960 + 2 * (1 - t) * t * mx + t * t * ex;
            const ty = (1 - t) * (1 - t) * 540 + 2 * (1 - t) * t * my + t * t * ey;
            return (
              <g key={`conn-${i}`}>
                <path d={`M 960 540 Q ${mx} ${my} ${ex} ${ey}`} fill="none" stroke={theme.colors.accent} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
                <circle cx={tx} cy={ty} r="4" fill={theme.colors.accent}
                  opacity={interpolate(travelT, [0, 0.2, 0.8, 1], [0, 0.8, 0.8, 0])} />
              </g>
            );
          })}
        </svg>
      </div>

      <RobotGuide frame={frame} x={4} y={3} scale={0.65} expression="happy" />
    </AbsoluteFill>
  );
};
