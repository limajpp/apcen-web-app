import useAuth from "@/hooks/useAuth";
import ActiveSlideSession from "./ActiveSlideSession";
import SlideSessionResults from "./SlideSessionResults";

interface SlideContentProps {
  isFinished: boolean;
  hasConflict: boolean;
  imageUrl: string;
  reviewedImages: number;
  totalImages: number;
}

export default function SlideContent({
  isFinished,
  hasConflict,
  imageUrl,
  reviewedImages,
  totalImages,
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
    />
  );
}
