import useAuth from "@/hooks/useAuth";
import ActiveSlideSession from "./ActiveSlideSession";
import SlideSessionResults from "./SlideSessionResults";
import type { LabelFieldsState } from "@/layout/Slide/SlideLayout";
import type { Dispatch, SetStateAction } from "react";

interface SlideContentProps {
  isFinished: boolean;
  hasConflict: boolean;
  imageUrl: string;
  reviewedImages: number;
  totalImages: number;
  labelFields: LabelFieldsState;
  setLabelFields: Dispatch<SetStateAction<LabelFieldsState>>;
}

export default function SlideContent({
  isFinished,
  hasConflict,
  imageUrl,
  reviewedImages,
  totalImages,
  labelFields,
  setLabelFields,
}: SlideContentProps) {
  const { user } = useAuth();

  if (isFinished)
    return (
      <SlideSessionResults
        reviewedImages={reviewedImages}
        totalImages={totalImages}
        hasConflict={hasConflict}
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
