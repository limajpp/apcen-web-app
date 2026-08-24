import checkBigSvg from "@/assets/Check_Big.svg";

interface SlideSessionResultsProps {
  isFinished: boolean;
  goalDone: boolean;
  userName: string;
  onContinue?: () => void;
}

export default function SlideSessionResults({
  isFinished,
  goalDone,
  userName,
  onContinue,
}: SlideSessionResultsProps) {
  const isGoalPause = goalDone && !isFinished;

  return (
    <div className="flex flex-col items-center w-fit gap-6">
      <div className="flex justify-center items-center shrink-0 aspect-square w-25 h-25 p-5.75 rounded-[80px] bg-[#FFF]">
        <img src={checkBigSvg} alt="" />
      </div>
      {isGoalPause ? (
        <div className="flex flex-col items-center gap-8 self-stretch">
          <div className="flex flex-col items-center w-full max-w-lg gap-6">
            <h2 className="font-clother text-[24px] text-[#3266BD]">
              Meta diária atingida com sucesso!
            </h2>
          </div>
          <div className="flex flex-col items-center w-fit">
            <button
              type="button"
              onClick={onContinue}
              className="font-clother text-[18px] text-[#2A59A9] underline whitespace-nowrap cursor-pointer"
            >
              Clique aqui para adiantar a próxima meta
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center w-102 gap-6">
          <h2 className="font-clother text-[24px] text-[#3266BD] font-bold">
            Parabéns, {userName}!
          </h2>
          <p className="font-clother text-[24px] text-[#3266BD]">
            Todas as análises foram finalizadas com sucesso!
          </p>
        </div>
      )}
    </div>
  );
}
