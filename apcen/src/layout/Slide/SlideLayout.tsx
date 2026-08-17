import { useEffect, useState } from "react";
import SlideContent from "@/components/Slide/SlideContent";
import BaseLayout from "../BaseLayout";
import SlideConfirmationDialog from "@/components/Slide/SlideConfirmationDialog";
import { api } from "@/services/api";

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
  const [hasConflict] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [labelFields, setLabelFields] = useState<LabelFieldsState>({
    ganglionarValue: "hasn't",
    layers: {
      mucosa: false,
      muscular: false,
      submucosa: false,
    },
  });

  const totalImages = imagesQueue.length;

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await api.get("/image/me?page=1&limit=100");
        const fetchedImages = response.data.images;

        setImagesQueue(fetchedImages);

        if (fetchedImages.length === 0) {
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

      if (currentIndex < totalImages - 1) {
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
      setIsFinished(true);
    } catch (error) {
      console.error("Failed to save final analysis", error);
    }
  };

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
                hasConflict={hasConflict}
                imageUrl={imagesQueue[currentIndex]?.url}
                reviewedImages={currentIndex}
                totalImages={totalImages}
                labelFields={labelFields}
                setLabelFields={setLabelFields}
              />
            </div>
            {!isFinished ? (
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
