import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";

interface SlideOptionCheckboxProps {
  id: string;
  letter?: string;
  label: string;
  checked: boolean;
  onClick: () => void;
}

export function SlideOptionCheckbox({
  id,
  letter,
  label,
  checked,
  onClick,
}: SlideOptionCheckboxProps) {
  return (
    <Label
      className={`flex flex-row justify-start items-center min-w-33.5 h-12 py-2 px-4 gap-3 rounded-[8px] bg-[#2A59A9] cursor-pointer transition-shadow ${
        checked ? "ring-2 ring-[#F9F3EA]" : ""
      }`}
      htmlFor={id}
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      <Checkbox
        id={id}
        checked={checked}
        className="w-6 h-6 shrink-0 border-2 border-solid rounded-none! border-[#F9F3EA]! bg-transparent! data-[state=checked]:bg-transparent! data-[state=checked]:text-[#F9F3EA]! data-[state=checked]:border-[#F9F3EA]! [&_svg]:w-4 [&_svg]:h-4 [&_svg]:stroke-[3px]"
      />
      <div className="flex items-center gap-2 text-[#FFFFFF] font-clother">
        {letter ? (
          <span className="text-[24px] font-bold">{letter}</span>
        ) : null}
        <span className="text-[14px]">{label}</span>
      </div>
    </Label>
  );
}
