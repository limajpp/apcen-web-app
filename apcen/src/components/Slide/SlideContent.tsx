import ProgressBar from "../ProgressBar";
import Slide from "./Slide";
import SlideHeader from "./SlideHeader";
import SlideLabeling from "./SlideLabeling";
import SlideConfirmationDialog from "./SlideConfirmationDialog";
import { Card } from "../ui/card";
import useAuth from "@/hooks/useAuth";

export default function SlideContent() {
  const { user } = useAuth();

  return (
    <Card className="bg-transparent ring-0 flex flex-col w-full max-w-lg gap-6 border-none shadow-none p-0">
      <SlideHeader
        userName={user?.username}
        className="flex flex-col justify-center items-start gap-2"
      />
      {/* Fetch image url from backend later... */}
      <ProgressBar className="w-full h-4 rounded-[32px] bg-[#A9C2E8]" />
      <Slide
        className="relative w-full h-98 rounded-[16px] overflow-hidden shrink-0"
        imageUrl="/images/dummySlide.png"
      />
      <SlideLabeling />
      <SlideConfirmationDialog
        confirmationText="Deseja concluir o questionário?"
        cancelButtonText="Cancelar"
        actionButtonText="Finalizar"
      />
    </Card>
  );
}
