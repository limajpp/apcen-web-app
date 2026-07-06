import ProgressBar from "../ProgressBar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Slide from "./Slide";
import SlideHeader from "./SlideHeader";
import SlideLabeling from "./SlideLabeling";
import { ChevronRight } from "lucide-react";

export default function SlideContent() {
  return (
    <Card className="bg-transparent ring-0 flex flex-col w-full max-w-lg gap-6 border-none shadow-none p-0">
      <SlideHeader className="flex flex-col justify-center items-start gap-2" />
      {/* Fetch image url from backend later... */}
      <ProgressBar className="w-full h-4 rounded-[32px] bg-[#A9C2E8]" />
      <Slide
        className="relative w-full h-98 rounded-[16px] overflow-hidden shrink-0"
        imageUrl="/images/dummySlide.png"
      />
      <SlideLabeling />
      <Button
        size="icon"
        className="ml-auto flex items-center justify-center mt-4 p-4 h-8 w-8 rounded-full bg-[#2A59A9] hover:bg-[#2A59A9] cursor-pointer shrink-0"
      >
        <ChevronRight className="text-[#F9F3EA]" />
      </Button>
    </Card>
  );
}
