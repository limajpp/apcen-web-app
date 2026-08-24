import ProgressBar from "../ProgressBar";
import Slide from "./SlideView/Slide";
import Header from "../Header";
import SlideLabeling from "./SlideLabel/SlideLabeling";

import { Card } from "@/components/ui/card";
import type { User } from "@/store/auth";
import type { LabelFieldsState } from "@/layout/Slide/SlideLayout";
import type { Dispatch, SetStateAction } from "react";

interface ActiveSlideSessionProps {
  user: User;
  imageUrl: string;
  goalProgress: number;
  goalTarget: number;
  labelFields: LabelFieldsState;
  setLabelFields: Dispatch<SetStateAction<LabelFieldsState>>;
}

export default function ActiveSlideSession({
  user,
  imageUrl,
  goalProgress,
  goalTarget,
  labelFields,
  setLabelFields,
}: ActiveSlideSessionProps) {
  return (
    <div className="flex flex-row items-center">
      <Card className="bg-transparent ring-0 flex flex-col w-full max-w-lg gap-6 border-none shadow-none p-0">
        <Header
          userName={user?.username}
          className="flex flex-col justify-center items-start gap-2"
          text="Identifique as opções na lâmina:"
        />
        <ProgressBar reviewedImages={goalProgress} totalImages={goalTarget} />
        <Slide
          className="relative w-full h-98 rounded-[16px] overflow-hidden shrink-0"
          imageUrl={imageUrl}
        />
        <SlideLabeling
          labelFields={labelFields}
          setLabelFields={setLabelFields}
        />
      </Card>
    </div>
  );
}
