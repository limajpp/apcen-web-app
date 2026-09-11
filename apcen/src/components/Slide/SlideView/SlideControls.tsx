import { Minus, Plus, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SlideControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

const controlClass =
  "size-[30px] cursor-pointer rounded-full text-[#2A59A9] hover:bg-[#2A59A9] hover:text-[#F9F3EA] [&_svg]:size-[22px]!";

export default function SlideControls({
  onZoomIn,
  onZoomOut,
  onReset,
}: SlideControlsProps) {
  return (
    <div className="absolute bottom-8 left-1/2 inline-flex h-[70px] w-[212px] -translate-x-1/2 items-center justify-center gap-10 rounded-[20px] bg-[#F9F3EA]">
      <Button
        size="icon"
        variant="ghost"
        aria-label="Aproximar"
        className={controlClass}
        onClick={onZoomIn}
      >
        <Plus />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        aria-label="Restaurar zoom"
        className={controlClass}
        onClick={onReset}
      >
        <ZoomOut />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        aria-label="Afastar"
        className={controlClass}
        onClick={onZoomOut}
      >
        <Minus />
      </Button>
    </div>
  );
}
