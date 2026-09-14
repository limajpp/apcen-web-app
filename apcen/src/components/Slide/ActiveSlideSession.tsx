import Header from "../Header";
import AnalysisProgress from "./AnalysisProgress";
import Slide from "./SlideView/Slide";
import SlideArrow from "./SlideView/SlideArrow";
import SlideLabeling from "./SlideLabel/SlideLabeling";
import SlideConfirmationDialog from "./SlideConfirmationDialog";
import { type User } from "@/lib/jwt/jwt.types";
import type { AnalysisResultState } from "@/lib/analysis/types";
import type { Dispatch, SetStateAction } from "react";

export type SlideNavigation = {
  canGoBack: boolean;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  requireDialog: boolean;
  blocked: boolean;
  submitting: boolean;
  editing: boolean;
};

interface ActiveSlideSessionProps {
  user: User | null;
  imageUrl: string;
  goalProgress: number;
  goalTarget: number;
  labelFields: AnalysisResultState;
  setLabelFields: Dispatch<SetStateAction<AnalysisResultState>>;
  showMissing: boolean;
  submitError: string | null;
  navigation: SlideNavigation;
}

export default function ActiveSlideSession({
  user,
  imageUrl,
  goalProgress,
  goalTarget,
  labelFields,
  setLabelFields,
  showMissing,
  submitError,
  navigation,
}: ActiveSlideSessionProps) {
  return (
    <div className="flex w-full flex-col px-6 pb-10 min-[1512px]:px-17">
      <Header
        userName={user?.username}
        className="mt-3.25 flex flex-col items-start justify-center gap-2"
        text="Identifique as opções na lâmina:"
      />
      <div className="mt-8 w-full pr-6.75 pl-16.75">
        <AnalysisProgress
          reviewed={goalProgress}
          target={goalTarget}
          showBackMarker={navigation.editing}
        />
      </div>
      <div className="mt-16.5 flex w-full flex-col items-start gap-6 xl:flex-row xl:justify-between">
        <div className="mt-8 flex items-center gap-2">
          <SlideArrow
            direction="back"
            disabled={!navigation.canGoBack || navigation.submitting}
            onClick={navigation.onBack}
          />
          <Slide
            className="relative h-138 w-135.75 shrink-0 overflow-hidden rounded-[21px]"
            imageUrl={imageUrl}
          />
          <SlideConfirmationDialog
            confirmationText="Deseja concluir o questionário?"
            cancelButtonText="Cancelar"
            actionButtonText="Finalizar"
            requireDialog={navigation.requireDialog}
            blocked={navigation.blocked}
            disabled={navigation.submitting}
            onNext={navigation.onNext}
            onFinish={navigation.onFinish}
          />
        </div>
        <div className="flex w-full max-w-170 min-w-0 flex-col gap-3 xl:flex-1">
          {submitError ? (
            <p
              role="alert"
              className="w-full rounded-[8px] bg-[#C0392B]/10 px-4 py-3 font-clother text-[14px] text-[#C0392B]"
            >
              {submitError}
            </p>
          ) : null}
          <SlideLabeling
            labelFields={labelFields}
            setLabelFields={setLabelFields}
            showMissing={showMissing}
          />
        </div>
      </div>
    </div>
  );
}
