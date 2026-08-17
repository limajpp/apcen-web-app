import { RadioGroup } from "@/components/ui/radio-group";
import Header from "../Header";
import { SlideOptionRadio } from "../Slide/SlideLabel/SlideOptionRadio";
import useAuth from "@/hooks/useAuth";
import ProgressBar from "../ProgressBar";
import type { Dispatch, SetStateAction } from "react";

interface GoalsContentProps {
  headerText?: string;
  footerPrimaryText?: string;
  footerSecondaryText?: string;
  selectedGoal: string;
  setSelectedGoal: Dispatch<SetStateAction<string>>;
}

export default function GoalsContent({
  headerText = "Defina metas diárias de análise:",
  footerPrimaryText = "Sua meta é sempre dividida na sequência:",
  footerSecondaryText = "Sempre que uma meta é atingida a seguinte é incrementada em 50%",
  selectedGoal,
  setSelectedGoal,
}: GoalsContentProps) {
  const { user } = useAuth();

  const handleRadioToggle = (value: string) => {
    if (value === selectedGoal) {
      setSelectedGoal("");
      return;
    }
    setSelectedGoal(value);
  };

  return (
    <div className="flex flex-col items-start m-auto w-128.5 gap-12">
      <div className="flex flex-col items-start gap-8 w-full">
        <Header
          className="flex flex-col justify-center items-start gap-12"
          userName={user?.username}
          text={headerText}
        />
        <RadioGroup
          value={selectedGoal}
          onValueChange={setSelectedGoal}
          className="grid grid-cols-3 gap-x-6 gap-y-4 w-full"
        >
          <SlideOptionRadio
            onClick={() => handleRadioToggle("100")}
            id="100"
            value="100"
            letter="100"
            label="ao dia"
          />
          <SlideOptionRadio
            onClick={() => handleRadioToggle("150")}
            id="150"
            value="150"
            letter="150"
            label="ao dia"
          />
          <SlideOptionRadio
            onClick={() => handleRadioToggle("225")}
            id="225"
            value="225"
            letter="225"
            label="ao dia"
          />
          <SlideOptionRadio
            onClick={() => handleRadioToggle("338")}
            id="338"
            value="338"
            letter="338"
            label="ao dia"
          />
          <SlideOptionRadio
            onClick={() => handleRadioToggle("507")}
            id="507"
            value="507"
            letter="507"
            label="ao dia"
          />
          <SlideOptionRadio
            onClick={() => handleRadioToggle("761")}
            id="761"
            value="761"
            letter="761"
            label="ao dia"
          />
        </RadioGroup>
      </div>
      <div className="flex flex-col items-center gap-4 w-full">
        <h3 className="text-[#2A59A9] text-[18px]">{footerPrimaryText}</h3>
        <ProgressBar isFullyFilled />
        <p className="max-w-89.5 text-[#2A59A9] text-[14px] text-center">
          {footerSecondaryText}
        </p>
      </div>
    </div>
  );
}
