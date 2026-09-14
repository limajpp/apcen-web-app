import useAuth from "@/hooks/useAuth";
import ActiveSlideSession, { type SlideNavigation } from "./ActiveSlideSession";
import SlideSessionResults from "./SlideSessionResults";
import type { AnalysisResultState } from "@/lib/analysis/types";
import type { Dispatch, SetStateAction } from "react";

interface SlideContentProps {
  isFinished: boolean;
  imageUrl: string;
  goalProgress: number;
  goalTarget: number;
  labelFields: AnalysisResultState;
  setLabelFields: Dispatch<SetStateAction<AnalysisResultState>>;
  showMissing: boolean;
  submitError: string | null;
  navigation: SlideNavigation;
  goalDone: boolean;
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
  showMissing,
  submitError,
  navigation,
  goalDone,
  showGoalNotice,
  onContinueAfterGoal,
}: SlideContentProps) {
  const { user } = useAuth();

  if (isFinished || showGoalNotice)
    return (
      <SlideSessionResults
        isFinished={isFinished}
        goalDone={goalDone}
        userName={user?.username}
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
      showMissing={showMissing}
      submitError={submitError}
      navigation={navigation}
    />
  );
}
