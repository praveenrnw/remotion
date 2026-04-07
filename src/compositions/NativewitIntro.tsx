import { Sequence, AbsoluteFill } from "remotion";
import { BrandIntro } from "../scenes/BrandIntro";
import { HeroStatement } from "../scenes/HeroStatement";
import { Services } from "../scenes/Services";
import { Stats } from "../scenes/Stats";
import { Process } from "../scenes/Process";
import { Outro } from "../scenes/Outro";

/**
 * Scene durations in frames (all at 30 fps).
 *
 *   Scene            Frames   Seconds
 *   ─────────────    ──────   ───────
 *   BrandIntro         90       3.0
 *   HeroStatement      90       3.0
 *   Services          150       5.0
 *   Stats             120       4.0
 *   Process           120       4.0
 *   Outro             120       4.0
 *                    ────      ────
 *   Total             690      23.0
 */
export const SCENE_DURATIONS = {
  brandIntro: 90,
  heroStatement: 90,
  services: 150,
  stats: 120,
  process: 120,
  outro: 120,
} as const;

export const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce(
  (sum, d) => sum + d,
  0,
);

export const NativewitIntro: React.FC = () => {
  let offset = 0;
  const seq = (duration: number) => {
    const from = offset;
    offset += duration;
    return from;
  };

  const brandFrom = seq(SCENE_DURATIONS.brandIntro);
  const heroFrom = seq(SCENE_DURATIONS.heroStatement);
  const servicesFrom = seq(SCENE_DURATIONS.services);
  const statsFrom = seq(SCENE_DURATIONS.stats);
  const processFrom = seq(SCENE_DURATIONS.process);
  const outroFrom = seq(SCENE_DURATIONS.outro);

  return (
    <AbsoluteFill>
      <Sequence from={brandFrom} durationInFrames={SCENE_DURATIONS.brandIntro}>
        <BrandIntro />
      </Sequence>

      <Sequence from={heroFrom} durationInFrames={SCENE_DURATIONS.heroStatement}>
        <HeroStatement />
      </Sequence>

      <Sequence from={servicesFrom} durationInFrames={SCENE_DURATIONS.services}>
        <Services />
      </Sequence>

      <Sequence from={statsFrom} durationInFrames={SCENE_DURATIONS.stats}>
        <Stats />
      </Sequence>

      <Sequence from={processFrom} durationInFrames={SCENE_DURATIONS.process}>
        <Process />
      </Sequence>

      <Sequence from={outroFrom} durationInFrames={SCENE_DURATIONS.outro}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
