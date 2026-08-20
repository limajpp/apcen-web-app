import { useEffect, useState } from "react";
import GoalsContent from "@/components/Goals/GoalsContent";
import BaseLayout from "../BaseLayout";
import SlideConfirmationDialog from "../../components/Slide/SlideConfirmationDialog";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function GoalsLayout() {
  const [selectedGoal, setSelectedGoal] = useState<string>("100");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.goal) navigate("/slide-analysis");
  }, []);

  const handleSetGoal = async () => {
    try {
      await api.patch("/user/me", {
        goal: Number(selectedGoal),
      });
      navigate("/slide-analysis");
    } catch (error) {
      console.error(error);
    }
  };

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
                confirmationText="Tem certeza? Essa meta só será definida uma vez."
                cancelButtonText="Voltar"
                actionButtonText="Confirmar"
                disabled={selectedGoal === ""}
                onFinish={handleSetGoal}
              />
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
