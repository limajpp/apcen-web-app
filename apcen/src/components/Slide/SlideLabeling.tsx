import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function SlideLabeling() {
  return (
    <Card className="bg-transparent ring-0 flex flex-col m-auto w-lg gap-4 border-none shadow-none">
      <h3>Selecione as opções corretas:</h3>
      <div>
        <h4>Tem célula ganglionar?</h4>
        <RadioGroup className="flex flex-row">
          <Label htmlFor="has">
            <RadioGroupItem value="has" />
            <div>
              <span>X </span>
              <span>Tem</span>
            </div>
          </Label>
          <Label htmlFor="has-not">
            <RadioGroupItem value="has-not" />
            <div>
              <span>Y </span>
              <span>Não Tem</span>
            </div>
          </Label>
        </RadioGroup>
      </div>
      <div>
        <h4>Quais camadas aparecem?</h4>
        <div className="flex flex-row">
          <Label htmlFor="mucosa">
            <Checkbox />
            <div>
              <span>A </span>
              <span>Mucosa</span>
            </div>
          </Label>
          <Label htmlFor="muscular">
            <Checkbox />
            <div>
              <span>B </span>
              <span>Muscular</span>
            </div>
          </Label>
          <Label htmlFor="submucosa">
            <Checkbox />
            <div>
              <span>C </span>
              <span>Submuscosa</span>
            </div>
          </Label>
        </div>
      </div>
    </Card>
  );
}
