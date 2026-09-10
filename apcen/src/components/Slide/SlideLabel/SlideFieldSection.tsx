import { Check } from "lucide-react";
import { RadioGroup } from "../../ui/radio-group";
import { SlideOptionRadio } from "./SlideOptionRadio";
import { SlideOptionCheckbox } from "./SlideOptionCheckbox";
import SlideMultiSelectDropdown from "./SlideMultiSelectDropdown";
import {
  fieldSectionId,
  letterFor,
  totalFields,
  type FieldDescriptor,
} from "@/lib/analysis/fields";
import {
  fieldTitles,
  noneOptionLabels,
  optionLabels,
  perFieldOptionLabels,
} from "@/lib/analysis/labels";
import {
  isNoneSelected,
  isValueSelected,
  setNoneValue,
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
  highlighted: boolean;
}

export default function SlideFieldSection({
  field,
  index,
  state,
  setState,
  highlighted,
}: SlideFieldSectionProps) {
  const answered = isFieldAnswered(state, field);

  const labelFor = (value: string) =>
    perFieldOptionLabels[field.id]?.[value] ?? optionLabels[value] ?? value;

  const handleSingle = (value: string) =>
    setState((prev) => setSingleValue(prev, field.id, value));

  const handleToggle = (value: string) =>
    setState((prev) => toggleMultiValue(prev, field, value));

  const handleNone = () =>
    setState((prev) =>
      isNoneSelected(prev, field)
        ? ({ ...prev, [field.id]: null } as AnalysisResultState)
        : setNoneValue(prev, field.id),
    );

  return (
    <section
      id={fieldSectionId(field.id)}
      className="snap-start shrink-0 min-h-full flex flex-col items-start gap-4 w-full pb-4"
    >
      <div className="flex flex-row items-center gap-3">
        <span
          className={`flex items-center justify-center shrink-0 h-7 px-2.5 rounded-full font-clother text-[13px] transition-colors ${
            answered
              ? "bg-[#2A59A9] text-[#F9F3EA]"
              : highlighted
                ? "bg-[#C0392B] text-[#F9F3EA]"
                : "bg-[rgba(159,193,254,0.50)] text-[#2A59A9]"
          }`}
        >
          {index + 1}/{totalFields}
        </span>
        <h4 className="font-clother text-[16px] text-[#2A59A9]">
          {fieldTitles[field.id]}
        </h4>
        {answered ? (
          <Check className="w-4 h-4 text-[#2A59A9] stroke-[3px]" />
        ) : null}
      </div>
      {field.control === "dropdown" ? (
        <SlideMultiSelectDropdown
          field={field}
          state={state}
          labelFor={labelFor}
          onToggleValue={handleToggle}
          onSelectNone={handleNone}
        />
      ) : field.kind === "single" ? (
        <RadioGroup
          className="flex flex-row flex-wrap gap-4 w-full"
          value={(state[field.id] as string | null) ?? ""}
          onValueChange={handleSingle}
        >
          {field.options.map((value, optionIndex) => (
            <SlideOptionRadio
              key={value}
              id={`${field.id}-${value}`}
              value={value}
              letter={letterFor(optionIndex)}
              label={labelFor(value)}
            />
          ))}
        </RadioGroup>
      ) : (
        <div className="flex flex-row flex-wrap gap-4 w-full">
          {field.options.map((value, optionIndex) => (
            <SlideOptionCheckbox
              key={value}
              id={`${field.id}-${value}`}
              letter={letterFor(optionIndex)}
              label={labelFor(value)}
              checked={isValueSelected(state, field, value)}
              onClick={() => handleToggle(value)}
            />
          ))}
          {field.allowNone ? (
            <SlideOptionCheckbox
              id={`${field.id}-none`}
              letter={letterFor(field.options.length)}
              label={noneOptionLabels[field.id]}
              checked={isNoneSelected(state, field)}
              onClick={handleNone}
            />
          ) : null}
        </div>
      )}
    </section>
  );
}
