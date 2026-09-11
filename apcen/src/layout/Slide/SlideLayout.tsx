import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import SlideContent from "@/components/Slide/SlideContent";
import BaseLayout from "../BaseLayout";
import SlideConfirmationDialog from "@/components/Slide/SlideConfirmationDialog";
import {
  api,
  buildImagePreviewUrl,
  fetchSlideQueue,
  type SlideQueueImage,
} from "@/services/api";
import useAuth from "@/hooks/useAuth";
import { emptyAnalysisResult } from "@/lib/analysis/types";
import { uiCopy } from "@/lib/analysis/labels";
import type { AnalysisResultState } from "@/lib/analysis/types";
import { fieldSectionId } from "@/lib/analysis/fields";
import {
  getFirstIncompleteFieldId,
  isComplete,
  toCreateResultPayload,
} from "@/lib/analysis/validation";

type Image = SlideQueueImage;

const PAGE_SIZE = 100;

function cycleProgress(count: number, target: number) {
  if (target <= 0) return 0;
  const remainder = count % target;
  return remainder === 0 && count > 0 ? target : remainder;
}

export default function SlideLayout() {
  const [imagesQueue, setImagesQueue] = useState<Image[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [goalDone, setGoalDone] = useState<boolean>(false);
  const [goalNoticeSeen, setGoalNoticeSeen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [labelFields, setLabelFields] =
    useState<AnalysisResultState>(emptyAnalysisResult);
  const [showMissing, setShowMissing] = useState<boolean>(false);
  const [reviewedCount, setReviewedCount] = useState<number>(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const totalImages = imagesQueue.length;
  const hasMorePages = page < totalPages;
  const dailyGoal = user?.goal ?? totalImages;
  const goalTarget =
    totalPages <= 1 && totalImages > 0
      ? Math.min(dailyGoal, totalImages)
      : dailyGoal;
  const goalProgress = cycleProgress(reviewedCount, goalTarget);
  const showGoalNotice = goalDone && !goalNoticeSeen && !isFinished;
  const formComplete = isComplete(labelFields);

  const fetchImagesPage = async (pageToFetch: number) => {
    const { images, page: fetchedPage, totalPages: fetchedTotalPages } =
      await fetchSlideQueue(isAdmin, pageToFetch, PAGE_SIZE);

    setPage(fetchedPage);
    setTotalPages(fetchedTotalPages);

    return images;
  };

  useEffect(() => {
    async function fetchInitialImages() {
      try {
        const { images, page: fetchedPage, totalPages: fetchedTotalPages } =
          await fetchSlideQueue(isAdmin, 1, PAGE_SIZE);

        setPage(fetchedPage);
        setTotalPages(fetchedTotalPages);
        setImagesQueue(images);

        if (images.length === 0) {
          setIsFinished(true);
        }
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchInitialImages();
  }, [isAdmin]);

  const resetLabelFields = () => {
    setLabelFields(emptyAnalysisResult);
    setShowMissing(false);
  };

  const focusFirstIncompleteField = () => {
    const fieldId = getFirstIncompleteFieldId(labelFields);
    if (!fieldId) return;

    setShowMissing(true);
    document
      .getElementById(fieldSectionId(fieldId))
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const markGoalIfReached = (reviewed: number) => {
    if (user && user.goal && reviewed >= dailyGoal) {
      setGoalDone(true);
    }
  };

  const countReviewed = () => {
    const reviewed = reviewedCount + 1;
    setReviewedCount(reviewed);
    return reviewed;
  };

  const advance = () => {
    setCurrentIndex((prev) => prev + 1);
    resetLabelFields();
  };

  const submitCurrentSlide = async () => {
    try {
      await api.post(isAdmin ? "/verdict" : "/analysis", {
        imageId: imagesQueue[currentIndex].id,
        result: toCreateResultPayload(labelFields),
      });
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) return;
      throw error;
    }
  };

  const handleNext = async () => {
    if (isSubmitting) return;
    if (!isComplete(labelFields)) {
      focusFirstIncompleteField();
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await submitCurrentSlide();

      markGoalIfReached(countReviewed());

      if (currentIndex < totalImages - 1) {
        advance();
        return;
      }

      if (hasMorePages) {
        const nextImages = await fetchImagesPage(page + 1);

        if (nextImages.length > 0) {
          setImagesQueue((prev) => [...prev, ...nextImages]);
          advance();
          return;
        }
      }

      setIsFinished(true);
    } catch (error) {
      console.error("Failed to save analysis", error);
      setSubmitError(uiCopy.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = async () => {
    if (isSubmitting) return;
    if (!isComplete(labelFields)) {
      focusFirstIncompleteField();
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await submitCurrentSlide();

      markGoalIfReached(countReviewed());

      setIsFinished(true);
    } catch (error) {
      console.error("Failed to save final analysis", error);
      setSubmitError(uiCopy.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueAfterGoal = () => setGoalNoticeSeen(true);

  const isFinalImage = currentIndex === totalImages - 1 && !hasMorePages;

  if (isLoading) {
    return (
      <BaseLayout className="h-full w-full">
        <div className="flex items-center justify-center h-full w-full">
          <span className="font-clother text-[20px] text-[#3266BD]">
            Carregando lâminas...
          </span>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout className="h-full w-full">
      <div className="flex-1 w-full overflow-y-auto scrollbar-hide flex flex-col">
        <div className="flex flex-1 w-full min-h-full relative">
          <div className="grid grid-cols-[1fr_auto_1fr] w-full items-stretch">
            <div />
            <div className="flex justify-center items-center py-4 md:py-10">
              <SlideContent
                isFinished={isFinished}
                imageUrl={
                  imagesQueue[currentIndex]
                    ? buildImagePreviewUrl(imagesQueue[currentIndex].storageKey)
                    : ""
                }
                showMissing={showMissing}
                submitError={submitError}
                goalProgress={goalProgress}
                goalTarget={goalTarget}
                labelFields={labelFields}
                setLabelFields={setLabelFields}
                goalDone={goalDone}
                showGoalNotice={showGoalNotice}
                onContinueAfterGoal={handleContinueAfterGoal}
              />
            </div>
            {!isFinished && !showGoalNotice ? (
              <div className="flex items-stretch justify-center">
                <SlideConfirmationDialog
                  confirmationText="Deseja concluir o questionário?"
                  cancelButtonText="Cancelar"
                  actionButtonText="Finalizar"
                  requireDialog={isFinalImage}
                  blocked={!formComplete}
                  disabled={isSubmitting}
                  onNext={handleNext}
                  onFinish={handleFinish}
                />
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
