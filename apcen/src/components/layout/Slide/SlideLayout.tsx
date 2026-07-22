import SlideContent from "@/components/Slide/SlideContent";
import BaseLayout from "../BaseLayout";
import SlideConfirmationDialog from "@/components/Slide/SlideConfirmationDialog";

export default function SlideLayout() {
  return (
    <BaseLayout className="h-full w-full">
      <div className="flex-1 w-full overflow-y-auto scrollbar-hide">
        <div className="flex flex-col items-center justify-center min-h-full p-4 md:p-10">
          <div className="grid grid-cols-3 w-full max-w-6xl items-center">
            <div className="col-start-2 flex justify-center">
              <SlideContent />
            </div>
            <div className="col-start-3 flex justify-center pl-8 md:pl-26">
              <SlideConfirmationDialog
                confirmationText="Deseja concluir o questionário?"
                cancelButtonText="Cancelar"
                actionButtonText="Finalizar"
              />
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
