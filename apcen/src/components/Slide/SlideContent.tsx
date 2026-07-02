import { Card } from "../ui/card";
import Slide from "../layout/Slide/Slide";
import SlideHeader from "./SlideHeader";

export default function SlideContent() {
  return (
    <Card className="bg-transparent ring-0 flex flex-col m-auto w-lg gap-4 border-none shadow-none">
      <SlideHeader className="flex flex-col justify-center items-start gap-2" />
      {/* Fetch image url from backend later... */}
      <Slide
        className="relative w-lg h-98 rounded-[16px] overflow-hidden"
        imageUrl="/images/dummySlide.png"
      />
    </Card>
  );
}
