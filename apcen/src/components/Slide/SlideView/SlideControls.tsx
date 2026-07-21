import { Minus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SlideControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export default function SlideControls({
  onZoomIn,
  onZoomOut,
  onReset,
}: SlideControlsProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex justify-center items-center gap-8 bg-[#F9F3EA] rounded-[16px] py-4 px-4.25 shadow-md">
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 rounded-full text-[#2A59A9] hover:bg-[#2A59A9] hover:text-[#F9F3EA] cursor-pointer"
        onClick={onZoomIn}
      >
        <Plus className="w-3 h-3" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 rounded-full text-[#2A59A9] hover:bg-[#2A59A9] hover:text-[#F9F3EA] cursor-pointer"
        onClick={onReset}
      >
        <Search className="w-3 h-3" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 rounded-full text-[#2A59A9] hover:bg-[#2A59A9] hover:text-[#F9F3EA] cursor-pointer"
        onClick={onZoomOut}
      >
        <Minus className="w-3 h-3" />
      </Button>
    </div>
  );
}
