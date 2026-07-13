import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";

import userCircleSvg from "@/assets/User_Circle.svg";

interface ConflictCardProps {
  userName: string;
  answers: string[];
}

export default function ConflictCard({ userName, answers }: ConflictCardProps) {
  return (
    <Card className="flex flex-col items-center bg-[#FFF] border-none shadow-[4px_4px_4px_0_rgba(14,32,62,0.10)] ring-0 w-70 gap-5 p-6 rounded-[24px]">
      <div className="flex justify-center items-center py-2 px-4 gap-2 rounded-full bg-[#B4D4ED]">
        <img src={userCircleSvg} alt="" className="w-5 h-5" />
        <h4 className="font-clother font-bold text-[16px] text-[#2A59A9]">
          {userName}
        </h4>
      </div>
      <img
        src="/images/dummySlide.png"
        alt="Recorte da lâmina analisada"
        className="w-36 h-36 object-cover rounded-[16px]"
      />
      <div className="flex flex-col items-center gap-3">
        <h3 className="font-clother font-bold text-[18px] text-[#2A59A9]">
          Respostas
        </h3>
        <ul className="flex flex-col items-center gap-1.5 list-none p-0 m-0">
          {answers.map((answer, index) => (
            <li
              key={index}
              className="font-clother text-[14px] text-[#3266BD] text-center leading-snug"
            >
              {answer}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-2">
        <Button
          type="button"
          variant="ghost"
          className="font-clother font-bold text-[14px] text-[#2A59A9] hover:text-[#2A59A9] hover:bg-transparent p-0 h-auto cursor-pointer"
        >
          Ver mais
        </Button>
      </div>
    </Card>
  );
}
