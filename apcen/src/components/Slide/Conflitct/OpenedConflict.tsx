import { Button } from "../../ui/button";
import Slide from "../SlideView/Slide";

import type { ConflictCardProps } from "./ConflictCard";

import arrowLeftSm from "@/assets/Arrow_Left_SM.svg";
import userCircle from "@/assets/User_Circle.svg";

export interface OpenedConflictProps extends Omit<ConflictCardProps, "onOpen"> {
  onClose: () => void;
}

export default function OpenedConflict({
  userName,
  answers,
  onClose,
}: OpenedConflictProps) {
  return (
    <div className="flex flex-col w-lg gap-8">
      <div className="flex flex-col gap-4 self-stretch">
        <Button
          onClick={onClose}
          variant="ghost"
          className="w-fit p-2 hover:bg-transparent"
        >
          <img src={arrowLeftSm} className="cursor-pointer" alt="Voltar" />
        </Button>
        <div className="flex justify-center items-center w-fit py-2 px-4 gap-2 rounded-full bg-[#B4D4ED]">
          <img src={userCircle} alt="" className="w-5 h-5" />
          <h4 className="font-clother font-bold text-[14px] text-[#2A59A9]">
            {userName}
          </h4>
        </div>
        <div className="flex flex-col self-stretch gap-2 p-1">
          <h3 className="font-clother text-[18px] font-bold text-[#2A59A9]">
            Respostas:
          </h3>
          {answers.length > 0 && (
            <ul>
              {answers.map((answer, index) => {
                return (
                  <li
                    key={index}
                    className="font-clother text-[#2A59A9] text-[14px]"
                  >
                    {answer}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <Slide
        className="relative w-full h-98 rounded-[16px] overflow-hidden shrink-0"
        imageUrl="/images/dummySlide.png"
      />
    </div>
  );
}
