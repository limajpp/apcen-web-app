import infoIcon from "@/assets/Info_Circle.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { progressStage, segmentFills } from "@/lib/analysis/progress";
import { progressLabels, uiCopy } from "@/lib/analysis/labels";

interface AnalysisProgressProps {
  reviewed: number;
  target: number;
}

export default function AnalysisProgress({
  reviewed,
  target,
}: AnalysisProgressProps) {
  const label = progressLabels[progressStage(reviewed, target)];

  return (
    <div className="flex w-full flex-col justify-center gap-2">
      <p className="font-clother text-[18px] font-bold text-[#2A59A9]">
        {label}
      </p>
      <div className="flex w-full items-center gap-2">
        <div
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={target}
          aria-valuenow={Math.min(reviewed, target)}
          className="flex min-w-px flex-1 items-center gap-2"
        >
          {segmentFills(reviewed, target).map((fill, index) => (
            <div
              key={index}
              className="relative h-4 min-w-px flex-1 overflow-clip rounded-[32px] bg-[#9FC1FE]"
            >
              <div
                className="absolute top-0 left-0 h-4 rounded-[10px] bg-[#2A59A9] transition-[width] duration-300"
                style={{ width: `${fill}%` }}
              />
            </div>
          ))}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={uiCopy.progressHelpLabel}
                className="size-6 shrink-0 cursor-help rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#2A59A9] focus-visible:ring-offset-2"
              >
                <img src={infoIcon} alt="" className="size-full" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end">
              {uiCopy.progressHelp}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
