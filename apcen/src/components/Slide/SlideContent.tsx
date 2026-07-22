import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import SlideActiveSession from "./ActiveSlideSession";
import SlideSessionResults from "./SlideSessionResults";
import OpenedConflict from "./Conflitct/OpenedConflict";
import type { ConflictCardProps } from "./Conflitct/ConflictCard";

interface SlideContentProps {
  imageUrl: string;
  reviewedImages: number;
  totalImages: number;
}

export default function SlideContent({
  imageUrl,
  reviewedImages,
  totalImages,
}: SlideContentProps) {
  const { user } = useAuth();
  const [isFinished] = useState<boolean>(false);
  const [hasConflict] = useState<boolean>(false);

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
        hasConflict={hasConflict}
        onOpenConflict={(conflictData) => setOpenedConflict(conflictData)}
      />
    );
  }

  return (
    <SlideActiveSession
      user={user}
      imageUrl={imageUrl}
      reviewedImages={reviewedImages}
      totalImages={totalImages}
    />
  );
}
