import { Card } from "../../ui/card";
import { RadioGroup } from "../../ui/radio-group";
import { SlideOptionRadio } from "./SlideOptionRadio";
import { SlideOptionCheckbox } from "./SlideOptionCheckbox";
import type {
  GanglionarState,
  LabelFieldsState,
  LayersState,
} from "@/layout/Slide/SlideLayout";
import type { Dispatch, SetStateAction } from "react";

interface SlideLabelingProps {
  labelFields: LabelFieldsState;
  setLabelFields: Dispatch<SetStateAction<LabelFieldsState>>;
}

export default function SlideLabeling({
  labelFields,
  setLabelFields,
}: SlideLabelingProps) {
  const handleRadioToggle = (value: GanglionarState) => {
    if (labelFields.ganglionarValue === value) {
      setLabelFields((prev) => ({
        ...prev,
        ganglionarValue: "hasn't",
      }));
    } else {
      setLabelFields((prev) => ({
        ...prev,
        ganglionarValue: value,
      }));
    }
  };

  const handleCheckboxToggle = (id: keyof LayersState) => {
    setLabelFields((prev) => ({
      ...prev,
      layers: {
        ...prev.layers,
        [id]: !prev.layers[id],
      },
    }));
  };

  return (
    <Card className="bg-transparent ring-0 flex flex-col w-full rounded-none gap-8 shadow-none p-0">
      <h3 className="font-clother text-[18px] text-[#2A59A9]">
        Selecione as opções corretas:
      </h3>
      <div className="flex flex-col items-start gap-4 w-full">
        <h4 className="font-clother text-[16px] text-[#2A59A9]">
          Tem célula ganglionar?
        </h4>
        <RadioGroup className="flex flex-row flex-wrap gap-4 w-full">
          <SlideOptionRadio
            id="has"
            value="has"
            letter="X"
            label="Tem"
            onClick={() => handleRadioToggle("has")}
          />
          <SlideOptionRadio
            id="hasn't"
            value="hasn't"
            letter="Y"
            label="Não tem"
            onClick={() => handleRadioToggle("hasn't")}
          />
        </RadioGroup>
      </div>
      <div className="flex flex-col items-start gap-4 w-full">
        <h4 className="font-clother text-[16px] text-[#2A59A9]">
          Quais camadas aparecem?
        </h4>
        <div className="flex flex-row flex-wrap gap-4 w-full">
          <SlideOptionCheckbox
            id="mucosa"
            letter="A"
            label="Mucosa"
            checked={labelFields.layers.mucosa}
            onClick={() => handleCheckboxToggle("mucosa")}
          />
          <SlideOptionCheckbox
            id="muscular"
            letter="B"
            label="Muscular"
            checked={labelFields.layers.muscular}
            onClick={() => handleCheckboxToggle("muscular")}
          />
          <SlideOptionCheckbox
            id="submucosa"
            letter="C"
            label="Submucosa"
            checked={labelFields.layers.submucosa}
            onClick={() => handleCheckboxToggle("submucosa")}
          />
        </div>
      </div>
    </Card>
  );
}
