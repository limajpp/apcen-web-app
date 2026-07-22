import ProgressBar from "../ProgressBar";
import Slide from "./SlideView/Slide";
import SlideHeader from "./SlideHeader";
import SlideLabeling from "./SlideLabel/SlideLabeling";

import { Card } from "@/components/ui/card";

import type { User } from "@/store/auth";

interface ActiveSlideSessionProps {
  user: User | null;
}

export default function ActiveSlideSession({ user }: ActiveSlideSessionProps) {
  return (
    <div className="flex flex-row items-center">
      <Card className="bg-transparent ring-0 flex flex-col w-full max-w-lg gap-6 border-none shadow-none p-0">
        <SlideHeader
          userName={user?.username}
          className="flex flex-col justify-center items-start gap-2"
        />
        {/* Fetch image url from backend later... */}
        <ProgressBar />
        <Slide
          className="relative w-full h-98 rounded-[16px] overflow-hidden shrink-0"
          imageUrl="https://drive.google.com/thumbnail?id=1fJ0yimv5jrlDdWttnIa059xQH41oPIIo&sz=w1000"
        />
        <SlideLabeling />
      </Card>
    </div>
  );
}
