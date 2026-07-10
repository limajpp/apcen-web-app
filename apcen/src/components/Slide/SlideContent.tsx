import ProgressBar from "../ProgressBar";
import Slide from "./SlideView/Slide";
import SlideHeader from "./SlideHeader";
import SlideLabeling from "./SlideLabel/SlideLabeling";
import SlideConfirmationDialog from "./SlideConfirmationDialog";
import { Card } from "../ui/card";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import checkBigSvg from "@/assets/Check_Big.svg";

export default function SlideContent() {
  const { user } = useAuth();
  const [isFinished] = useState<boolean>(false);

  return (
    <>
      {!isFinished ? (
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
      ) : (
        <div className="flex flex-col items-center w-123 h-74.5 gap-6">
          <div className="flex justify-center items-center shrink-0 aspect-square w-25 h-25 p-5.75 rounded-[80px] bg-[#FFF]">
            <span className="w-13.5 h-13.5 shrink-0 aspect-square">
              <img src={checkBigSvg} alt="" />
            </span>
          </div>
          <div className="flex flex-col items-center gap-8 self-stretch">
            <div className="flex flex-col items-center w-123 gap-6">
              <h2 className="font-clother text-[24px] text-[#3266BD]">
                Questionário finalizado com sucesso!
              </h2>
              <ProgressBar className="w-full h-4 rounded-[32px] bg-[#A9C2E8]" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="font-clother text-[18px] text-[#2A59A9]">
              Aguardando resultados dos demais usuários.
            </h3>
            <p className="font-clother text-[16px] text-[#3266BD]">
              Consulte a página novamente mais tarde para conferir as respostas.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
