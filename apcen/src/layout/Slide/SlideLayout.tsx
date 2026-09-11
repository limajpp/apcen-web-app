import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import SlideContent from "@/components/Slide/SlideContent";
import BaseLayout from "../BaseLayout";
import AnalysisLayout from "../AnalysisLayout";
import type { SlideNavigation } from "@/components/Slide/ActiveSlideSession";
import {
  api,
  type AnalysisResponse,
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

type SavedSlide = {
  analysisId: string;
  fields: AnalysisResultState;
};

type SessionSnapshot = {
  reviewedCount: number;
  goalDone: boolean;
  goalNoticeSeen: boolean;
  draftImageId: string | null;
  draftFields: AnalysisResultState;
};

const sessionStorageKey = (userId: string) => `@Apcen:slide-session:${userId}`;

function readSessionSnapshot(key: string): SessionSnapshot | null {
  const stored = localStorage.getItem(key);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as SessionSnapshot;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

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
  const [loadError, setLoadError] = useState<string | null>(null);
  const [savedSlides, setSavedSlides] = useState<Record<string, SavedSlide>>(
    {},
  );
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const persistedSessionKey = user ? sessionStorageKey(user.id) : null;
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
    const {
      images,
      page: fetchedPage,
      totalPages: fetchedTotalPages,
    } = await fetchSlideQueue(isAdmin, pageToFetch, PAGE_SIZE);

    setPage(fetchedPage);
    setTotalPages(fetchedTotalPages);

    return images;
  };

  const fetchInitialImages = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const {
        images,
        page: fetchedPage,
        totalPages: fetchedTotalPages,
      } = await fetchSlideQueue(isAdmin, 1, PAGE_SIZE);

      setPage(fetchedPage);
      setTotalPages(fetchedTotalPages);
      setImagesQueue(images);
      const snapshot = persistedSessionKey
        ? readSessionSnapshot(persistedSessionKey)
        : null;
      const draftIndex = snapshot?.draftImageId
        ? images.findIndex((image) => image.id === snapshot.draftImageId)
        : -1;

      setCurrentIndex(draftIndex >= 0 ? draftIndex : 0);
      setReviewedCount(snapshot?.reviewedCount ?? 0);
      setGoalDone(snapshot?.goalDone ?? false);
      setGoalNoticeSeen(snapshot?.goalNoticeSeen ?? false);
      if (draftIndex >= 0 && snapshot?.draftFields) {
        setLabelFields(snapshot.draftFields);
      } else {
        setLabelFields(emptyAnalysisResult);
      }

      setIsFinished(images.length === 0);
      if (images.length === 0 && persistedSessionKey) {
        localStorage.removeItem(persistedSessionKey);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setLoadError("Não foi possível carregar as lâminas. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin, persistedSessionKey]);

  useEffect(() => {
    async function loadInitialImages() {
      await fetchInitialImages();
    }

    void loadInitialImages();
  }, [fetchInitialImages]);

  useEffect(() => {
    if (!persistedSessionKey || isLoading || loadError || isFinished) return;

    const currentImage = imagesQueue[currentIndex];
    const snapshot: SessionSnapshot = {
      reviewedCount,
      goalDone,
      goalNoticeSeen,
      draftImageId: currentImage?.id ?? null,
      draftFields: labelFields,
    };

    localStorage.setItem(persistedSessionKey, JSON.stringify(snapshot));
  }, [
    currentIndex,
    goalDone,
    goalNoticeSeen,
    imagesQueue,
    isFinished,
    isLoading,
    labelFields,
    loadError,
    persistedSessionKey,
    reviewedCount,
  ]);

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

  const submitCurrentSlide = async (): Promise<boolean> => {
    const image = imagesQueue[currentIndex];
    if (!image) throw new Error("No slide selected");

    const savedSlide = savedSlides[image.id];
    const result = toCreateResultPayload(labelFields);
    let response: { data: AnalysisResponse };

    try {
      response = savedSlide
        ? await api.patch<AnalysisResponse>(
            `/analysis/${savedSlide.analysisId}`,
            {
              result,
            },
          )
        : await api.post<AnalysisResponse>(isAdmin ? "/verdict" : "/analysis", {
            imageId: image.id,
            result,
          });
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) return true;
      throw error;
    }

    if (!isAdmin) {
      setSavedSlides((previous) => ({
        ...previous,
        [image.id]: { analysisId: response.data.id, fields: labelFields },
      }));
    }

    return !savedSlide;
  };

  const handleBack = () => {
    if (isSubmitting || currentIndex === 0) return;

    const previousImage = imagesQueue[currentIndex - 1];
    const savedSlide = previousImage
      ? savedSlides[previousImage.id]
      : undefined;
    if (!savedSlide) return;

    setCurrentIndex((previous) => previous - 1);
    setLabelFields(savedSlide.fields);
    setShowMissing(false);
    setSubmitError(null);
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
      const isNewSlide = await submitCurrentSlide();

      if (isNewSlide) markGoalIfReached(countReviewed());

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
      if (persistedSessionKey) {
        localStorage.removeItem(persistedSessionKey);
      }
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
      const isNewSlide = await submitCurrentSlide();

      if (isNewSlide) markGoalIfReached(countReviewed());

      setIsFinished(true);
      if (persistedSessionKey) {
        localStorage.removeItem(persistedSessionKey);
      }
    } catch (error) {
      console.error("Failed to save final analysis", error);
      setSubmitError(uiCopy.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueAfterGoal = () => setGoalNoticeSeen(true);

  const isFinalImage = currentIndex === totalImages - 1 && !hasMorePages;

  const navigation: SlideNavigation = {
    canGoBack: !isAdmin && currentIndex > 0,
    onBack: handleBack,
    onNext: handleNext,
    onFinish: handleFinish,
    requireDialog: isFinalImage,
    blocked: !formComplete,
    submitting: isSubmitting,
  };

  const content = (
    <SlideContent
      isFinished={isFinished}
      imageUrl={
        imagesQueue[currentIndex]
          ? buildImagePreviewUrl(imagesQueue[currentIndex].storageKey)
          : ""
      }
      goalProgress={goalProgress}
      goalTarget={goalTarget}
      labelFields={labelFields}
      setLabelFields={setLabelFields}
      showMissing={showMissing}
      submitError={submitError}
      navigation={navigation}
      goalDone={goalDone}
      showGoalNotice={showGoalNotice}
      onContinueAfterGoal={handleContinueAfterGoal}
    />
  );

  if (isLoading) {
    return (
      <AnalysisLayout>
        <div className="flex flex-1 items-center justify-center">
          <span className="font-clother text-[20px] text-[#3266BD]">
            Carregando lâminas...
          </span>
        </div>
      </AnalysisLayout>
    );
  }

  if (loadError) {
    return (
      <BaseLayout className="h-full w-full">
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p role="alert" className="font-clother text-[20px] text-[#C0392B]">
            {loadError}
          </p>
          <button
            type="button"
            onClick={() => void fetchInitialImages()}
            className="rounded-[8px] bg-[#3266BD] px-5 py-3 font-clother text-white hover:bg-[#2A59A9]"
          >
            Tentar novamente
          </button>
        </div>
      </BaseLayout>
    );
  }

  if (isFinished || showGoalNotice) {
    return (
      <BaseLayout className="h-full w-full">
        <div className="flex w-full flex-1 items-center justify-center overflow-y-auto py-10 scrollbar-hide">
          {content}
        </div>
      </BaseLayout>
    );
  }

  return <AnalysisLayout>{content}</AnalysisLayout>;
}
