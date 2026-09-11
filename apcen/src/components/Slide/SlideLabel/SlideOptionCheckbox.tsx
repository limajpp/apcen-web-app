import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";

interface SlideOptionCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onClick: () => void;
}

export function SlideOptionCheckbox({
  id,
  label,
  checked,
  onClick,
}: SlideOptionCheckboxProps) {
  return (
    <Label
      htmlFor={id}
      className="flex h-[42px] cursor-pointer items-center gap-2 rounded-[8px] bg-[#2A59A9] p-2 font-clother text-[14px] font-normal text-white"
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      <Checkbox
        id={id}
        checked={checked}
        className="size-[18px] shrink-0 rounded-none! border-2 border-solid border-[#F9F3EA]! bg-transparent! data-[state=checked]:border-[#F9F3EA]! data-[state=checked]:bg-transparent! data-[state=checked]:text-[#F9F3EA]! [&_svg]:size-3 [&_svg]:stroke-[3px]"
      />
      <span>{label}</span>
    </Label>
  );
}
