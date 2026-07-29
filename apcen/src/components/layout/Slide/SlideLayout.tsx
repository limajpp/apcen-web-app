import { useState } from "react";
import SlideContent from "@/components/Slide/SlideContent";
import BaseLayout from "../BaseLayout";
import SlideConfirmationDialog from "@/components/Slide/SlideConfirmationDialog";

// Mocking a set of images to test the behavior...
const MOCK_IMAGES = [
  "https://drive.google.com/thumbnail?id=1fJ0yimv5jrlDdWttnIa059xQH41oPIIo&sz=w1000",
  "https://picsum.photos/seed/apcen1/1000/800",
  "https://picsum.photos/seed/apcen2/1000/800",
  "https://picsum.photos/seed/apcen3/1000/800",
  "https://picsum.photos/seed/apcen4/1000/800",
  "https://picsum.photos/seed/apcen5/1000/800",
  "https://picsum.photos/seed/apcen6/1000/800",
  "https://picsum.photos/seed/apcen7/1000/800",
  "https://picsum.photos/seed/apcen8/1000/800",
  "https://picsum.photos/seed/apcen9/1000/800",
];

export default function SlideLayout() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [hasConflict] = useState<boolean>(false);
  const totalImages = MOCK_IMAGES.length;

  const handleNext = () => {
    if (currentIndex < totalImages - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const isLastImage = currentIndex === totalImages - 1;

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
                imageUrl={MOCK_IMAGES[currentIndex]}
                reviewedImages={currentIndex + 1}
                totalImages={totalImages}
              />
            </div>
            {!isFinished ? (
              <div className="flex items-stretch justify-center">
                <SlideConfirmationDialog
                  setIsFinished={setIsFinished}
                  confirmationText="Deseja concluir o questionário?"
                  cancelButtonText="Cancelar"
                  actionButtonText="Finalizar"
                  isLastImage={isLastImage}
                  onNext={handleNext}
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
