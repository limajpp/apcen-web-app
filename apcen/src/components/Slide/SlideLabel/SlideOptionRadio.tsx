import { Label } from "../../ui/label";
import { RadioGroupItem } from "../../ui/radio-group";

interface SlideOptionRadioProps {
  id: string;
  value: string;
  letter: string;
  label: string;
  onClick?: () => void;
}

export function SlideOptionRadio({
  id,
  value,
  letter,
  label,
  onClick,
}: SlideOptionRadioProps) {
  return (
    <Label
      className="flex flex-row justify-start items-center min-w-33.5 pr-4 h-12 py-2 px-4 gap-3 rounded-[8px] bg-[#2A59A9] cursor-pointer"
      htmlFor={id}
    >
      <RadioGroupItem
        value={value}
        id={id}
        onClick={onClick}
        className="w-6 h-6 shrink-0 flex items-center justify-center border-2 border-solid rounded-full border-[#F9F3EA]! bg-transparent! [&_[data-slot=radio-group-indicator]>span]:w-3 [&_[data-slot=radio-group-indicator]>span]:h-3 [&_[data-slot=radio-group-indicator]>span]:bg-[#F9F3EA]"
      />
      <div className="flex items-center gap-2 text-[#FFFFFF] font-clother">
        <span className="text-[24px] font-bold">{letter}</span>
        <span className="text-[14px]">{label}</span>
      </div>
    </Label>
  );
}
