import { Card } from "../ui/card";
import { RadioGroup } from "../ui/radio-group";
import { SlideOptionRadio } from "./SlideOptionRadio";
import { SlideOptionCheckbox } from "./SlideOptionCheckbox";

export default function SlideLabeling() {
  return (
    <Card className="bg-transparent ring-0 flex flex-col w-full gap-8 border-none shadow-none p-0">
      <h3 className="font-clother text-[18px] text-[#2A59A9]">
        Selecione as opções corretas:
      </h3>
      <div className="flex flex-col items-start gap-4 w-full">
        <h4 className="font-clother text-[16px] text-[#2A59A9]">
          Tem célula ganglionar?
        </h4>
        <RadioGroup className="flex flex-row flex-wrap gap-4 w-full">
          <SlideOptionRadio id="has" value="has" letter="X" label="Tem" />
          <SlideOptionRadio
            id="does-not-have"
            value="does-not-have"
            letter="Y"
            label="Não tem"
          />
        </RadioGroup>
      </div>
      <div className="flex flex-col items-start gap-4 w-full">
        <h4 className="font-clother text-[16px] text-[#2A59A9]">
          Quais camadas aparecem?
        </h4>
        <div className="flex flex-row flex-wrap gap-4 w-full">
          <SlideOptionCheckbox id="mucosa" letter="A" label="Mucosa" />
          <SlideOptionCheckbox id="muscular" letter="B" label="Muscular" />
          <SlideOptionCheckbox id="submucosa" letter="C" label="Submucosa" />
        </div>
      </div>
    </Card>
  );
}
