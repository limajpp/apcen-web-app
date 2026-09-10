import { Card } from "../../ui/card";
import SlideFieldSection from "./SlideFieldSection";
import { analysisFields, totalFields } from "@/lib/analysis/fields";
import { uiCopy } from "@/lib/analysis/labels";
import { answeredCount } from "@/lib/analysis/validation";
import type { AnalysisResultState } from "@/lib/analysis/types";
import type { Dispatch, SetStateAction } from "react";

interface SlideLabelingProps {
  labelFields: AnalysisResultState;
  setLabelFields: Dispatch<SetStateAction<AnalysisResultState>>;
  highlightedFieldId: string | null;
}

export default function SlideLabeling({
  labelFields,
  setLabelFields,
  highlightedFieldId,
}: SlideLabelingProps) {
  const answered = answeredCount(labelFields);

  return (
    <Card className="bg-transparent ring-0 flex flex-col w-full rounded-none gap-3 shadow-none p-0 overflow-visible">
      <div className="flex flex-row items-baseline justify-between w-full">
        <h3 className="font-clother text-[18px] text-[#2A59A9]">
          {uiCopy.heading}
        </h3>
        <span
          className={`font-clother text-[14px] ${
            answered === totalFields ? "text-[#2A59A9]" : "text-[#2A59A9]/60"
          }`}
        >
          {uiCopy.answeredCounter(answered, totalFields)}
        </span>
      </div>
      <div className="h-72 w-full overflow-y-auto scrollbar-hide snap-y snap-mandatory flex flex-col">
        {analysisFields.map((field, index) => (
          <SlideFieldSection
            key={field.id}
            field={field}
            index={index}
            state={labelFields}
            setState={setLabelFields}
            highlighted={highlightedFieldId === field.id}
          />
        ))}
      </div>
    </Card>
  );
}
