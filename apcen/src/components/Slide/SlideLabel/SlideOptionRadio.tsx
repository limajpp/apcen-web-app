import { Label } from "../../ui/label";
import { RadioGroupItem } from "../../ui/radio-group";

interface SlideOptionRadioProps {
  id: string;
  value: string;
  label: string;
}

export function SlideOptionRadio({ id, value, label }: SlideOptionRadioProps) {
  return (
    <Label
      htmlFor={id}
      className="flex h-[42px] cursor-pointer items-center gap-2 rounded-[8px] bg-[#2A59A9] p-2 font-clother text-[14px] font-normal text-white"
    >
      <RadioGroupItem
        value={value}
        id={id}
        className="size-6 shrink-0 border-2 border-solid border-[#F9F3EA]! bg-transparent! [&_[data-slot=radio-group-indicator]>span]:size-3 [&_[data-slot=radio-group-indicator]>span]:bg-[#F9F3EA]"
      />
      <span>{label}</span>
    </Label>
  );
}
