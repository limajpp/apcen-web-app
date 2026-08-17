import { useState } from "react";
import GoalsContent from "@/components/Goals/GoalsContent";
import BaseLayout from "../BaseLayout";
import SlideConfirmationDialog from "../../components/Slide/SlideConfirmationDialog";

export default function GoalsLayout() {
  const [selectedGoal, setSelectedGoal] = useState<string>("100");

  return (
    <BaseLayout className="h-full w-full">
      <div className="flex-1 w-full overflow-y-auto scrollbar-hide flex flex-col">
        <div className="flex flex-1 w-full min-h-full relative">
          <div className="grid grid-cols-[1fr_auto_1fr] w-full items-stretch">
            <div />
            <div className="flex justify-center items-center">
              <GoalsContent
                selectedGoal={selectedGoal}
                setSelectedGoal={setSelectedGoal}
              />
            </div>
            <div className="flex items-stretch justify-center">
              <SlideConfirmationDialog
                confirmationText="Tem certeza das suas escolhas?"
                cancelButtonText="Voltar"
                actionButtonText="Confirmar"
                disabled={selectedGoal === ""}
                onFinish={() => {
                  console.log("Meta confirmada:", selectedGoal);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
