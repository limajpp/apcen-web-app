import ProgressBar from "../ProgressBar";
import { Card } from "../ui/card";
import Slide from "./Slide";
import SlideHeader from "./SlideHeader";
import SlideLabeling from "./SlideLabeling";

export default function SlideContent() {
  return (
    <Card className="bg-transparent ring-0 flex flex-col m-auto w-lg gap-4 border-none shadow-none">
      <SlideHeader className="flex flex-col justify-center items-start gap-2" />
      {/* Fetch image url from backend later... */}
      <Slide
        className="relative w-lg h-98 rounded-[16px] overflow-hidden"
        imageUrl="/images/dummySlide.png"
      />
      <ProgressBar className="flex-1 h-4 rounded-[32px] bg-[#A9C2E8]" />
      <SlideLabeling />
    </Card>
  );
}
