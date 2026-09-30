import { RadioGroup } from "../../ui/radio-group";
import { SlideOptionRadio } from "./SlideOptionRadio";
import { SlideOptionCheckbox } from "./SlideOptionCheckbox";
import { fieldSectionId, type FieldDescriptor } from "@/lib/analysis/fields";
import {
  fieldTitles,
  optionLabels,
  perFieldOptionLabels,
} from "@/lib/analysis/labels";
import {
  isValueSelected,
  setSingleValue,
  toggleMultiValue,
} from "@/lib/analysis/state";
import { isFieldAnswered } from "@/lib/analysis/validation";
import type { AnalysisResultState } from "@/lib/analysis/types";
import type { Dispatch, SetStateAction } from "react";

interface SlideFieldSectionProps {
  field: FieldDescriptor;
  index: number;
  state: AnalysisResultState;
  setState: Dispatch<SetStateAction<AnalysisResultState>>;
  showMissing: boolean;
}

export default function SlideFieldSection({
  field,
  index,
  state,
  setState,
  showMissing,
}: SlideFieldSectionProps) {
  const missing =
    showMissing && field.required && !isFieldAnswered(state, field);

  const labelFor = (value: string) =>
    perFieldOptionLabels[field.id]?.[value] ?? optionLabels[value] ?? value;

  return (
    <li
      id={fieldSectionId(field.id)}
      className="flex scroll-mt-4 flex-col gap-4"
    >
      <h4
        className={`font-clother text-[16px] ${
          missing ? "text-[#C95555]" : "text-[#2A59A9]"
        }`}
      >
        {`${index + 1}. ${fieldTitles[field.id]}${missing ? "*" : ""}`}
      </h4>
      {field.kind === "single" ? (
        <RadioGroup
          className="flex w-full flex-row flex-wrap gap-2"
          value={(state[field.id] as string | null) ?? ""}
          onValueChange={(value) =>
            setState((prev) => setSingleValue(prev, field.id, value))
          }
        >
          {field.options.map((value) => (
            <SlideOptionRadio
              key={value}
              id={`${field.id}-${value}`}
              value={value}
              label={labelFor(value)}
            />
          ))}
        </RadioGroup>
      ) : (
        <div className="flex w-full flex-row flex-wrap gap-2">
          {field.options.map((value) => (
            <SlideOptionCheckbox
              key={value}
              id={`${field.id}-${value}`}
              label={labelFor(value)}
              checked={isValueSelected(state, field, value)}
              onClick={() =>
                setState((prev) => toggleMultiValue(prev, field, value))
              }
            />
          ))}
        </div>
      )}
    </li>
  );
}
