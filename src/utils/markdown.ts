import { interpolate as remotionInterpolate } from "remotion";

/**
 * Converts inline markdown bold (**text**) and italic (*text*) to JSX-ready
 * plain strings. For full markdown, integrate a library like `marked` or
 * `react-markdown`.
 */
export function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1") // bold
    .replace(/\*(.+?)\*/g, "$1") // italic
    .replace(/`(.+?)`/g, "$1") // inline code
    .replace(/#+\s/g, ""); // headings
}

/**
 * Maps `frame` from [0, durationFrames] to [0, 1], clamped.
 * Thin wrapper around Remotion's `interpolate` with sensible defaults.
 */
export function interpolateProgress(
  frame: number,
  durationFrames: number,
  options?: { delay?: number },
): number {
  const delay = options?.delay ?? 0;
  return remotionInterpolate(frame, [delay, delay + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/**
 * Returns an eased opacity value for a fade-in animation.
 * @param frame        current frame
 * @param startFrame   frame at which fade begins (default 0)
 * @param durationFrames  frames over which to fade in (default 20)
 */
export function fadeIn(
  frame: number,
  startFrame = 0,
  durationFrames = 20,
): number {
  return interpolateProgress(frame - startFrame, durationFrames);
}
