export type ProgressStage = "start" | "nearHalf" | "pastHalf" | "nearEnd" | "last";

export const PROGRESS_SEGMENTS = 4;

export function progressStage(reviewed: number, target: number): ProgressStage {
  if (target <= 0) return "start";
  if (reviewed >= target - 1) return "last";

  const ratio = reviewed / target;
  if (ratio < 0.25) return "start";
  if (ratio < 0.5) return "nearHalf";
  if (ratio < 0.75) return "pastHalf";
  return "nearEnd";
}

export function segmentFills(reviewed: number, target: number): number[] {
  const ratio = target > 0 ? Math.min(reviewed / target, 1) : 0;

  return Array.from({ length: PROGRESS_SEGMENTS }, (_, index) =>
    Math.round(
      Math.min(Math.max(ratio * PROGRESS_SEGMENTS - index, 0), 1) * 100,
    ),
  );
}
