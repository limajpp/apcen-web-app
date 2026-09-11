import AnalysisProgress from "./AnalysisProgress";
import Slide from "./SlideView/Slide";
import Header from "../Header";
import SlideLabeling from "./SlideLabel/SlideLabeling";

import { Card } from "@/components/ui/card";
import { type User } from "@/lib/jwt/jwt.types";
import type { AnalysisResultState } from "@/lib/analysis/types";
import type { Dispatch, SetStateAction } from "react";

interface ActiveSlideSessionProps {
  user: User | null;
  imageUrl: string;
  goalProgress: number;
  goalTarget: number;
  labelFields: AnalysisResultState;
  setLabelFields: Dispatch<SetStateAction<AnalysisResultState>>;
  highlightedFieldId: string | null;
  submitError: string | null;
}

export default function ActiveSlideSession({
  user,
  imageUrl,
  goalProgress,
  goalTarget,
  labelFields,
  setLabelFields,
  highlightedFieldId,
  submitError,
}: ActiveSlideSessionProps) {
  return (
    <div className="flex flex-row items-center">
      <Card className="bg-transparent ring-0 flex flex-col w-full max-w-lg gap-6 border-none shadow-none p-0 overflow-visible">
        <Header
          userName={user?.username}
          className="flex flex-col justify-center items-start gap-2 shrink-0"
          text="Identifique as opções na lâmina:"
        />
        <div className="shrink-0 w-full">
          <AnalysisProgress reviewed={goalProgress} target={goalTarget} />
        </div>
        <Slide
          className="relative w-full h-98 rounded-[16px] overflow-hidden shrink-0"
          imageUrl={imageUrl}
        />
        {submitError ? (
          <p
            role="alert"
            className="w-full shrink-0 rounded-[8px] bg-[#C0392B]/10 px-4 py-3 font-clother text-[14px] text-[#C0392B]"
          >
            {submitError}
          </p>
        ) : null}
        <SlideLabeling
          labelFields={labelFields}
          setLabelFields={setLabelFields}
          highlightedFieldId={highlightedFieldId}
        />
      </Card>
    </div>
  );
}
