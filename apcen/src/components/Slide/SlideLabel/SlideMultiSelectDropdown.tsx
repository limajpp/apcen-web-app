import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { SlideOptionCheckbox } from "./SlideOptionCheckbox";
import type { FieldDescriptor } from "@/lib/analysis/fields";
import { noneOptionLabels, uiCopy } from "@/lib/analysis/labels";
import type { AnalysisResultState } from "@/lib/analysis/types";
import {
  isNoneSelected,
  isValueSelected,
  selectedCount,
} from "@/lib/analysis/state";

interface SlideMultiSelectDropdownProps {
  field: FieldDescriptor;
  state: AnalysisResultState;
  labelFor: (value: string) => string;
  onToggleValue: (value: string) => void;
  onSelectNone: () => void;
}

export default function SlideMultiSelectDropdown({
  field,
  state,
  labelFor,
  onToggleValue,
  onSelectNone,
}: SlideMultiSelectDropdownProps) {
  const count = selectedCount(state, field);
  const noneChecked = field.allowNone && isNoneSelected(state, field);
  const triggerText = noneChecked
    ? noneOptionLabels[field.id]
    : count === 0
      ? uiCopy.dropdownEmpty
      : uiCopy.dropdownCount(count);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex flex-row justify-between items-center w-full max-w-md h-12 py-2 px-4 gap-3 rounded-[8px] bg-[#2A59A9] cursor-pointer text-[#FFFFFF] font-clother text-[14px] outline-none focus-visible:ring-2 focus-visible:ring-[#F9F3EA]"
        >
          <span>{triggerText}</span>
          <ChevronDown className="w-5 h-5 shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-72 overflow-y-auto scrollbar-hide bg-[#F9F3EA] border-[#2A59A9]/20 p-2">
        <div className="flex flex-col gap-2">
          {field.allowNone ? (
            <SlideOptionCheckbox
              id={`${field.id}-none`}
              label={noneOptionLabels[field.id]}
              checked={Boolean(noneChecked)}
              onClick={onSelectNone}
            />
          ) : null}
          {field.options.map((value) => (
            <SlideOptionCheckbox
              key={value}
              id={`${field.id}-${value}`}
              label={labelFor(value)}
              checked={isValueSelected(state, field, value)}
              onClick={() => onToggleValue(value)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
