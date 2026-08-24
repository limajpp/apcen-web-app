import { useEffect, useState } from "react";
import SlideContent from "@/components/Slide/SlideContent";
import BaseLayout from "../BaseLayout";
import SlideConfirmationDialog from "@/components/Slide/SlideConfirmationDialog";
import { api } from "@/services/api";
import useAuth from "@/hooks/useAuth";

type Image = {
  id: string;
  blade: string;
  url: string;
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

export default function SlideLayout() {
  const [imagesQueue, setImagesQueue] = useState<Image[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [goalDone, setGoalDone] = useState<boolean>(false);
  const [goalNoticeSeen, setGoalNoticeSeen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [slidesAvailable, setSlidesAvailable] = useState<boolean>(true);
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
  const goalTarget = user.goal ? Math.min(user.goal, totalImages) : totalImages;
  const goalProgress = goalTarget > 0 ? currentIndex % goalTarget : 0;
  const showGoalNotice = goalDone && !goalNoticeSeen && !isFinished;

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await api.get("/image/me?page=1&limit=100");
        const { images, page, totalPages } = response.data;

        setImagesQueue(images);

        setSlidesAvailable(page < totalPages);

        if (images.length === 0) {
          setIsFinished(true);
        }
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, []);

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

      const reviewedCount = currentIndex + 1;
      const hasMoreSlides = currentIndex < totalImages - 1;

      if (user.goal && reviewedCount >= goalTarget) {
        setGoalDone(true);
      }

      if (hasMoreSlides) {
        setCurrentIndex((prev) => prev + 1);

        setLabelFields({
          ganglionarValue: "hasn't",
          layers: { mucosa: false, muscular: false, submucosa: false },
        });
      }
    } catch (error) {
      console.error("Failed to save analysis", error);
    }
  };

  const handleFinish = async () => {
    try {
      await saveCurrentAnalysis();

      if (user.goal && currentIndex + 1 >= goalTarget) {
        setGoalDone(true);
      }

      setIsFinished(true);
    } catch (error) {
      console.error("Failed to save final analysis", error);
    }
  };

  const handleContinueAfterGoal = () => setGoalNoticeSeen(true);

  const isLastImage = currentIndex === totalImages - 1;

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
                imageUrl={imagesQueue[currentIndex]?.url}
                goalProgress={goalProgress}
                goalTarget={goalTarget}
                labelFields={labelFields}
                setLabelFields={setLabelFields}
                goalDone={goalDone}
                slidesAvailable={slidesAvailable}
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
                  requireDialog={isLastImage}
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
