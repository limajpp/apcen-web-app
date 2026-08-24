import useAuth from "@/hooks/useAuth";
import ActiveSlideSession from "./ActiveSlideSession";
import SlideSessionResults from "./SlideSessionResults";
import type { LabelFieldsState } from "@/layout/Slide/SlideLayout";
import type { Dispatch, SetStateAction } from "react";

interface SlideContentProps {
  isFinished: boolean;
  imageUrl: string;
  goalProgress: number;
  goalTarget: number;
  labelFields: LabelFieldsState;
  setLabelFields: Dispatch<SetStateAction<LabelFieldsState>>;
  goalDone: boolean;
  slidesAvailable: boolean;
  showGoalNotice: boolean;
  onContinueAfterGoal: () => void;
}

export default function SlideContent({
  isFinished,
  imageUrl,
  goalProgress,
  goalTarget,
  labelFields,
  setLabelFields,
  goalDone,
  slidesAvailable,
  showGoalNotice,
  onContinueAfterGoal,
}: SlideContentProps) {
  const { user } = useAuth();

  if (isFinished || showGoalNotice)
    return (
      <SlideSessionResults
        isFinished={isFinished}
        goalDone={goalDone}
        slidesAvailable={slidesAvailable}
        onContinue={onContinueAfterGoal}
      />
    );

  return (
    <ActiveSlideSession
      user={user}
      imageUrl={imageUrl}
      goalProgress={goalProgress}
      goalTarget={goalTarget}
      labelFields={labelFields}
      setLabelFields={setLabelFields}
    />
  );
}
