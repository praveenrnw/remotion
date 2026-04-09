import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

export const BrandIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Animations ──────────────────────────────────────────── */

  // Logo scales in
  const logoProgress = spring({ frame, fps, config: { damping: 60, mass: 0.8 } });
  const logoScale = interpolate(logoProgress, [0, 1], [0.6, 1]);

  // Glow pulse behind logo
  const glowOpacity = interpolate(
    frame,
    [10, 35, 60, 85],
    [0, 0.4, 0.25, 0.35],
    { extrapolateRight: "clamp" },
  );

  // Company name fades in and settles
  const nameProgress = spring({
    frame: frame - 18,
    fps,
    config: { damping: 100 },
  });
  const nameY = interpolate(nameProgress, [0, 1], [16, 0]);

  // Subtitle slides up
  const subProgress = spring({
    frame: frame - 32,
    fps,
    config: { damping: 100 },
  });
  const subY = interpolate(subProgress, [0, 1], [12, 0]);

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Radial glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}33 0%, transparent 70%)`,
          opacity: glowOpacity,
          filter: "blur(40px)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: logoProgress,
          transform: `scale(${logoScale})`,
          marginBottom: 28,
        }}
      >
        <Img
          src={staticFile("logo.png")}
          style={{ width: 220, height: "auto" }}
        />
      </div>

      {/* Company name */}
      <h1
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: theme.colors.textPrimary,
          margin: 0,
          opacity: nameProgress,
          transform: `translateY(${nameY}px)`,
          letterSpacing: 1,
        }}
      >
        Nativewit
        <span style={{ color: theme.colors.accent }}> Technologies</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 26,
          fontWeight: 600,
          color: theme.colors.textSecondary,
          margin: "18px 0 0",
          opacity: subProgress,
          transform: `translateY(${subY}px)`,
          letterSpacing: 2.5,
          textTransform: "uppercase",
        }}
      >
        Product Engineering Studio
      </p>
    </AbsoluteFill>
  );
};
