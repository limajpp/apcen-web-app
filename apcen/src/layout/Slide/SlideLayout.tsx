import { useEffect, useState } from "react";
import SlideContent from "@/components/Slide/SlideContent";
import BaseLayout from "../BaseLayout";
import SlideConfirmationDialog from "@/components/Slide/SlideConfirmationDialog";
import { api, buildImagePreviewUrl } from "@/services/api";
import useAuth from "@/hooks/useAuth";

type Image = {
  id: string;
  blade: string;
  storageKey: string;
  hasConflict: boolean;
  createdAt: string;
};

export type GanglionarState = "has" | "hasn't";

export type LayersState = {
  mucosa: boolean;
  muscular: boolean;
  submucosa: boolean;
};

export type LabelFieldsState = {
  ganglionarValue: GanglionarState;
  layers: LayersState;
};

const PAGE_SIZE = 100;

export default function SlideLayout() {
  const [imagesQueue, setImagesQueue] = useState<Image[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [goalDone, setGoalDone] = useState<boolean>(false);
  const [goalNoticeSeen, setGoalNoticeSeen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [labelFields, setLabelFields] = useState<LabelFieldsState>({
    ganglionarValue: "hasn't",
    layers: {
      mucosa: false,
      muscular: false,
      submucosa: false,
    },
  });
  const { user } = useAuth();
  const totalImages = imagesQueue.length;
  const goalTarget = user?.goal ?? totalImages;
  const hasMorePages = page < totalPages;
  const goalProgress = goalTarget > 0 ? currentIndex % goalTarget : 0;
  const showGoalNotice = goalDone && !goalNoticeSeen && !isFinished;

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

  const resetLabelFields = () =>
    setLabelFields({
      ganglionarValue: "hasn't",
      layers: { mucosa: false, muscular: false, submucosa: false },
    });

  const markGoalIfReached = (reviewedCount: number) => {
    if (user && user.goal && reviewedCount >= goalTarget) {
      setGoalDone(true);
    }
  };

  const advance = () => {
    setCurrentIndex((prev) => prev + 1);
    resetLabelFields();
  };

  const saveCurrentAnalysis = async () => {
    const apiResult =
      labelFields.ganglionarValue === "has" ? "healthy" : "sickness";

    await api.post("/analysis", {
      imageId: imagesQueue[currentIndex].id,
      result: apiResult,
    });
  };

  const handleNext = async () => {
    try {
      await saveCurrentAnalysis();

      markGoalIfReached(currentIndex + 1);

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
    try {
      await saveCurrentAnalysis();

      markGoalIfReached(currentIndex + 1);

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
