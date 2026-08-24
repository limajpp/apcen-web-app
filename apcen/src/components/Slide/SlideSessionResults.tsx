import ProgressBar from "../ProgressBar";
import checkBigSvg from "@/assets/Check_Big.svg";

interface SlideSessionResultsProps {
  isFinished: boolean;
  goalDone: boolean;
  slidesAvailable: boolean;
  onContinue?: () => void;
}

export default function SlideSessionResults({
  isFinished,
  goalDone,
  slidesAvailable,
  onContinue,
}: SlideSessionResultsProps) {
  const isGoalPause = goalDone && !isFinished;
  const isGoalMetAndNoSlides = isFinished && goalDone && !slidesAvailable;
  const isGoalMet = isGoalPause || isGoalMetAndNoSlides;

  return (
    <div className="flex flex-col items-center w-fit gap-6">
      <div className="flex justify-center items-center shrink-0 aspect-square w-25 h-25 p-5.75 rounded-[80px] bg-[#FFF]">
        <img src={checkBigSvg} alt="" />
      </div>
      <div className="flex flex-col items-center gap-8 self-stretch">
        <div className="flex flex-col items-center w-full max-w-lg gap-6">
          <h2 className="font-clother text-[24px] text-[#3266BD]">
            {isGoalMet
              ? "Meta diária atingida com sucesso!"
              : "Questionário finalizado com sucesso!"}
          </h2>
          {!isGoalMet && <ProgressBar isFullyFilled />}
        </div>
        {isGoalPause && (
          <div className="flex flex-col items-center w-fit">
            <button
              type="button"
              onClick={onContinue}
              className="font-clother text-[18px] text-[#2A59A9] underline whitespace-nowrap cursor-pointer"
            >
              Clique aqui para adiantar a próxima meta
            </button>
          </div>
        )}
        {isGoalMetAndNoSlides && (
          <div className="flex flex-col items-center w-fit gap-2 text-center">
            <h3 className="font-clother text-[18px] text-[#2A59A9]">
              Aguarde a adição de novas lâminas
            </h3>
            <p className="font-clother text-[16px] text-[#3266BD] whitespace-nowrap">
              Consulte a página novamente mais tarde para conferir novas
              questões.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
