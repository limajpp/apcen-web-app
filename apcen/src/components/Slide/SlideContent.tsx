import { useState, type Dispatch, type SetStateAction } from "react";
import useAuth from "@/hooks/useAuth";
import ActiveSlideSession from "./ActiveSlideSession";
import SlideSessionResults from "./SlideSessionResults";
import OpenedConflict from "./Conflitct/OpenedConflict";
import type { ConflictCardProps } from "./Conflitct/ConflictCard";

interface SlideContentProps {
  isFinished: boolean;
  setIsFinished: Dispatch<SetStateAction<boolean>>;
  hasConflict: boolean;
  setHasConflict: Dispatch<SetStateAction<boolean>>;
  imageUrl: string;
  reviewedImages: number;
  totalImages: number;
}

export default function SlideContent({
  isFinished,
  setIsFinished,
  hasConflict,
  setHasConflict,
  imageUrl,
  reviewedImages,
  totalImages,
}: SlideContentProps) {
  const { user } = useAuth();

  const [openedConflict, setOpenedConflict] =
    useState<ConflictCardProps | null>(null);

  if (isFinished) {
    if (openedConflict) {
      return (
        <OpenedConflict
          userName={openedConflict.userName}
          answers={openedConflict.answers}
          onClose={() => setOpenedConflict(null)}
        />
      );
    }

    return (
      <SlideSessionResults
        reviewedImages={reviewedImages}
        totalImages={totalImages}
        hasConflict={hasConflict}
        onOpenConflict={(conflictData) => setOpenedConflict(conflictData)}
      />
    );
  }

  return (
    <ActiveSlideSession
      user={user}
      imageUrl={imageUrl}
      reviewedImages={reviewedImages}
      totalImages={totalImages}
    />
  );
}
