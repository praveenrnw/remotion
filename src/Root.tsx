import { Composition } from "remotion";
import {
  NativewitIntro,
  TOTAL_DURATION,
} from "./compositions/NativewitIntro";
import { BrandIntro } from "./scenes/BrandIntro";
import { HeroStatement } from "./scenes/HeroStatement";
import { Services } from "./scenes/Services";
import { Stats } from "./scenes/Stats";
import { Process } from "./scenes/Process";
import { Outro } from "./scenes/Outro";
import { SCENE_DURATIONS } from "./compositions/NativewitIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── Full intro video ───────────────────────────────────── */}
      <Composition
        id="NativewitIntro"
        component={NativewitIntro}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ── Individual scenes (for preview / iteration) ────────── */}
      <Composition
        id="BrandIntro"
        component={BrandIntro}
        durationInFrames={SCENE_DURATIONS.brandIntro}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HeroStatement"
        component={HeroStatement}
        durationInFrames={SCENE_DURATIONS.heroStatement}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Services"
        component={Services}
        durationInFrames={SCENE_DURATIONS.services}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Stats"
        component={Stats}
        durationInFrames={SCENE_DURATIONS.stats}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Process"
        component={Process}
        durationInFrames={SCENE_DURATIONS.process}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Outro"
        component={Outro}
        durationInFrames={SCENE_DURATIONS.outro}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
