import SlideFieldSection from "./SlideFieldSection";
import {
  analysisFields,
  visibleFields,
  type FieldId,
} from "@/lib/analysis/fields";
import { uiCopy } from "@/lib/analysis/labels";
import { answeredCount } from "@/lib/analysis/validation";
import type { AnalysisResultState } from "@/lib/analysis/types";
import type { Dispatch, SetStateAction } from "react";

interface SlideLabelingProps {
  labelFields: AnalysisResultState;
  setLabelFields: Dispatch<SetStateAction<AnalysisResultState>>;
  showMissing: boolean;
  allowedFieldIds?: readonly FieldId[];
}

export default function SlideLabeling({
  labelFields,
  setLabelFields,
  showMissing,
  allowedFieldIds,
}: SlideLabelingProps) {
  const fields = visibleFields(labelFields, allowedFieldIds);

  return (
    <section className="flex w-full flex-col gap-2">
      <div className="flex items-start justify-between gap-8">
        <h3 className="font-clother text-[18px] text-[#2A59A9]">
          {uiCopy.heading}
        </h3>
        <span
          data-testid="answered-badge"
          className="flex w-17 shrink-0 items-center justify-center rounded-[26px] bg-[#9FC1FE]/50 px-2 py-1 font-clother text-[16px] text-[#2A59A9]"
        >
          {uiCopy.answeredBadge(
            answeredCount(labelFields, allowedFieldIds),
            fields.length,
          )}
        </span>
      </div>
      <div className="analysis-scroll h-137.5 w-full overflow-y-auto rounded-[16px] border-4 border-[#9FC1FE]/60 bg-[#F9F3EA] p-4">
        <ol className="flex flex-col gap-8">
          {fields.map((field) => (
            <SlideFieldSection
              key={field.id}
              field={field}
              number={analysisFields.indexOf(field) + 1}
              state={labelFields}
              setState={setLabelFields}
              showMissing={showMissing}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
