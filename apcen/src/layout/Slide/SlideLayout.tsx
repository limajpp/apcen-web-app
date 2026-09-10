import { useEffect, useState } from "react";
import SlideContent from "@/components/Slide/SlideContent";
import BaseLayout from "../BaseLayout";
import SlideConfirmationDialog from "@/components/Slide/SlideConfirmationDialog";
import { api, buildImagePreviewUrl } from "@/services/api";
import useAuth from "@/hooks/useAuth";
import { emptyAnalysisResult } from "@/lib/analysis/types";
import type { AnalysisResultState } from "@/lib/analysis/types";
import { fieldSectionId } from "@/lib/analysis/fields";
import {
  getFirstIncompleteFieldId,
  isComplete,
  toCreateResultPayload,
} from "@/lib/analysis/validation";

type Image = {
  id: string;
  blade: string;
  storageKey: string;
  hasConflict: boolean;
  createdAt: string;
};

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
  const [highlightedFieldId, setHighlightedFieldId] = useState<string | null>(
    null,
  );
  const [reviewedCount, setReviewedCount] = useState<number>(0);
  const { user } = useAuth();
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
    const response = await api.get(
      `/image/me?page=${pageToFetch}&limit=${PAGE_SIZE}`,
    );
    const {
      images,
      page: fetchedPage,
      totalPages: fetchedTotalPages,
    } = response.data;

    setPage(fetchedPage);
    setTotalPages(fetchedTotalPages);

    return images as Image[];
  };

  useEffect(() => {
    async function fetchInitialImages() {
      try {
        const images = await fetchImagesPage(1);

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
  }, []);

  const resetLabelFields = () => {
    setLabelFields(emptyAnalysisResult);
    setHighlightedFieldId(null);
  };

  const focusFirstIncompleteField = () => {
    const fieldId = getFirstIncompleteFieldId(labelFields);
    if (!fieldId) return;

    setHighlightedFieldId(fieldId);
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

  const saveCurrentAnalysis = async () => {
    await api.post("/analysis", {
      imageId: imagesQueue[currentIndex].id,
      result: toCreateResultPayload(labelFields),
    });
  };

  const handleNext = async () => {
    if (!isComplete(labelFields)) {
      focusFirstIncompleteField();
      return;
    }

    try {
      await saveCurrentAnalysis();

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
    }
  };

  const handleFinish = async () => {
    if (!isComplete(labelFields)) {
      focusFirstIncompleteField();
      return;
    }

    try {
      await saveCurrentAnalysis();

      markGoalIfReached(countReviewed());

      setIsFinished(true);
    } catch (error) {
      console.error("Failed to save final analysis", error);
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
                highlightedFieldId={highlightedFieldId}
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
