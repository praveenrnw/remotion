import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

const STEPS = [
  { num: "01", title: "Discover", body: "We dig into your business goals, user needs, and technical constraints. Real conversations about what success looks like." },
  { num: "02", title: "Architect", body: "System architecture, data models, and API contracts — before writing a line of code. This is where most agencies cut corners." },
  { num: "03", title: "Build", body: "Iterative 2-week sprints. You see working software every cycle, not a big reveal at the end." },
  { num: "04", title: "Launch & Scale", body: "App Store submissions, production monitoring, and post-launch optimization. The relationship doesn't end at deployment." },
];

export const Process: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelProgress = spring({ frame, fps, config: { damping: 120 } });
  const headProgress = spring({ frame: frame - 5, fps, config: { damping: 100 } });
  const headY = interpolate(headProgress, [0, 1], [24, 0]);

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        padding: "80px 100px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Section label */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: theme.colors.accent,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: labelProgress,
          marginBottom: 12,
        }}
      >
        How we work
      </span>

      {/* Section heading */}
      <h2
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: theme.colors.textPrimary,
          margin: "0 0 56px",
          opacity: headProgress,
          transform: `translateY(${headY}px)`,
        }}
      >
        From first call to App Store
      </h2>

      {/* Steps */}
      <div style={{ display: "flex", gap: 24, flex: 1, alignItems: "flex-start" }}>
        {STEPS.map((step, i) => {
          const delay = 16 + i * 12;
          const stepProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 100 },
          });
          const stepY = interpolate(stepProgress, [0, 1], [24, 0]);

          // Connecting line between steps
          const lineProgress =
            i < STEPS.length - 1
              ? spring({ frame: frame - (delay + 6), fps, config: { damping: 80 } })
              : 0;

          return (
            <div
              key={step.num}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                opacity: stepProgress,
                transform: `translateY(${stepY}px)`,
                position: "relative",
              }}
            >
              {/* Step number circle */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: theme.colors.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 20,
                }}
              >
                {step.num}
              </div>

              {/* Connecting line */}
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: 24,
                    left: 56,
                    width: `calc(100% - 32px)`,
                    height: 2,
                    background: theme.colors.surfaceLight,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${interpolate(lineProgress as number, [0, 1], [0, 100])}%`,
                      height: "100%",
                      background: theme.colors.accent,
                    }}
                  />
                </div>
              )}

              <h3
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: theme.colors.textPrimary,
                  margin: "0 0 10px",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: theme.colors.textSecondary,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {step.body}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
