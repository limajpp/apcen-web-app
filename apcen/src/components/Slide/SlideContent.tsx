import useAuth from "@/hooks/useAuth";
import ActiveSlideSession from "./ActiveSlideSession";
import SlideSessionResults from "./SlideSessionResults";
import type { LabelFieldsState } from "@/layout/Slide/SlideLayout";
import type { Dispatch, SetStateAction } from "react";

interface SlideContentProps {
  isFinished: boolean;
  imageUrl: string;
  reviewedImages: number;
  totalImages: number;
  labelFields: LabelFieldsState;
  setLabelFields: Dispatch<SetStateAction<LabelFieldsState>>;
  goalDone: boolean;
  slidesAvailable: boolean;
}

export default function SlideContent({
  isFinished,
  imageUrl,
  reviewedImages,
  totalImages,
  labelFields,
  setLabelFields,
  goalDone,
  slidesAvailable,
}: SlideContentProps) {
  const { user } = useAuth();

  if (isFinished)
    return (
      <SlideSessionResults
        reviewedImages={reviewedImages}
        totalImages={totalImages}
        goalDone={goalDone}
        slidesAvailable={slidesAvailable}
      />
    );

  return (
    <ActiveSlideSession
      user={user}
      imageUrl={imageUrl}
      reviewedImages={reviewedImages}
      totalImages={totalImages}
      labelFields={labelFields}
      setLabelFields={setLabelFields}
    />
  );
}
