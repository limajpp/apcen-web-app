import ProgressBar from "../ProgressBar";
import Slide from "./SlideView/Slide";
import SlideHeader from "./SlideHeader";
import SlideLabeling from "./SlideLabel/SlideLabeling";
import SlideConfirmationDialog from "./SlideConfirmationDialog";
import { Card } from "../ui/card";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import checkBigSvg from "@/assets/Check_Big.svg";
import { Badge } from "../ui/badge";
import userCircleSvg from "@/assets/User_Circle.svg";
import { Button } from "../ui/button";

export default function SlideContent() {
  const { user } = useAuth();
  const [isFinished] = useState<boolean>(true);
  const [hasConflict] = useState<boolean>(true);

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
            {!hasConflict ? (
              <>
                <h3 className="font-clother text-[18px] text-[#2A59A9]">
                  Aguardando resultados dos demais usuários.
                </h3>
                <p className="font-clother text-[16px] text-[#3266BD]">
                  Consulte a página novamente mais tarde para conferir as
                  respostas.
                </p>
              </>
            ) : (
              <div className="flex flex-col items-start w-157.5 gap-4">
                <h3 className="font-clother font-bold text-[24px] text-[#2A59A9]">
                  Respostas em conflito:
                </h3>
                <div className="flex flex-col items-start self-stretch gap-6">
                  {/* Fetch conflicted slide data from backend later... */}
                  <div className="flex flex-col items-start self-stretch gap-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#9FC1FE] text-[#2A59A9] font-clother font-bold text-[12px] rounded-[8px] px-2 py-4 border-none shadow-none">
                        Lâmina 20260512133131
                      </Badge>
                      <Badge className="bg-[#9FC1FE] text-[#2A59A9] font-clother font-bold text-[12px] rounded-[8px] px-2 py-4 border-none shadow-none">
                        Patch_y2048_x26624
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 self-stretch">
                    <Card className="flex flex-col items-center bg-[#FFF] border-none shadow-[4px_4px_4px_0_rgba(14,32,62,0.10)] ring-0 w-48.5 gap-4 p-4 rounded-[16px]">
                      <div className="flex justify-center items-center py-1.5 px-3 gap-2 rounded-full bg-[#B4D4ED]">
                        <img src={userCircleSvg} alt="" className="w-5 h-5" />
                        <h4 className="font-clother font-bold text-[16px] text-[#2A59A9]">
                          Usuario01
                        </h4>
                      </div>
                      {/* Fetch answer image url from backend later... */}
                      <img
                        src="/images/dummySlide.png"
                        alt="Recorte da lâmina analisada"
                        className="w-40 h-40 object-cover rounded-[16px]"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <h3 className="font-clother font-bold text-[16px] text-[#2A59A9]">
                          Respostas
                        </h3>
                        {/* Fetch this user's answers from backend later... */}
                        <ul className="flex flex-col items-center gap-1 list-none p-0 m-0">
                          <li className="font-clother text-[12px] text-[#3266BD] text-center">
                            Tem célula ganglionar
                          </li>
                          <li className="font-clother text-[12px] text-[#3266BD] text-center">
                            Camadas Muscosa e Muscular
                          </li>
                        </ul>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        className="font-clother font-bold text-[14px] text-[#2A59A9] hover:text-[#2A59A9] hover:bg-transparent p-0 h-auto cursor-pointer"
                        // TODO: open full answer detail later...
                      >
                        Ver mais
                      </Button>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
