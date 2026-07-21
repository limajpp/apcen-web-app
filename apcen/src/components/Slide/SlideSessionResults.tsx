import { Badge } from "../ui/badge";
import ProgressBar from "../ProgressBar";
import ConflictCard from "./Conflitct/ConflictCard";
import type { ConflictCardProps } from "./Conflitct/ConflictCard";
import checkBigSvg from "@/assets/Check_Big.svg";

interface SlideSessionResultsProps {
  hasConflict: boolean;
  onOpenConflict: (conflict: ConflictCardProps) => void;
}

export default function SlideSessionResults({
  hasConflict,
  onOpenConflict,
}: SlideSessionResultsProps) {
  const mockConflicts = Array(5).fill({
    userName: "Usuário 01",
    answers: ["Tem célula ganglionar", "Camadas Muscosa e Muscular"],
  });

  return (
    <div className="flex flex-col items-center w-full gap-10 pb-10">
      <div className="flex justify-center items-center shrink-0 aspect-square w-25 h-25 p-5.75 rounded-[80px] bg-[#FFF]">
        <span className="w-13.5 h-13.5 shrink-0 aspect-square">
          <img src={checkBigSvg} alt="" />
        </span>
      </div>
      <div className="flex flex-col items-center gap-8 self-stretch">
        <div className="flex flex-col items-center w-full max-w-lg gap-6">
          <h2 className="font-clother text-[24px] text-[#3266BD] text-center">
            Questionário finalizado com sucesso!
          </h2>
          <ProgressBar />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 w-full max-w-5xl mt-4">
        {!hasConflict ? (
          <>
            <h3 className="font-clother text-[18px] text-[#2A59A9]">
              Aguardando resultados dos demais usuários.
            </h3>
            <p className="font-clother text-[16px] text-[#3266BD]">
              Consulte a página novamente mais tarde para conferir as respostas.
            </p>
          </>
        ) : (
          <div className="flex flex-col items-start w-full gap-6">
            <h3 className="font-clother font-bold text-[24px] text-[#2A59A9]">
              Respostas em conflito
            </h3>
            {/* Fetch conflicted slide data from backend later... */}
            <div className="flex flex-col items-start self-stretch gap-6">
              <div className="flex flex-col items-start self-stretch gap-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-[#9FC1FE] text-[#2A59A9] font-clother font-bold text-[14px] rounded-[8px] px-3 py-1.5 border-none shadow-none">
                    Lâmina 20260512133131
                  </Badge>
                  <Badge className="bg-[#9FC1FE] text-[#2A59A9] font-clother font-bold text-[14px] rounded-[8px] px-3 py-1.5 border-none shadow-none">
                    Patch_y2048_x26624
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] justify-items-center sm:justify-items-start gap-6 self-stretch w-full">
                {mockConflicts.map((conflict, index) => (
                  <ConflictCard
                    key={index}
                    userName={conflict.userName}
                    answers={conflict.answers}
                    onOpen={() => onOpenConflict(conflict)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
