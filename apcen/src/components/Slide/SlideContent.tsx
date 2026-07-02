import { Card } from "../ui/card";
import SlideHeader from "./SlideHeader";

export default function SlideContent() {
  return (
    <Card className="bg-transparent ring-0 flex flex-col m-auto w-md gap-8 border-none shadow-none">
      <SlideHeader className="flex flex-col justify-center items-start gap-2" />
    </Card>
  );
}
