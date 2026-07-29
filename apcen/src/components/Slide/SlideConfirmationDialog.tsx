import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { CircleX } from "lucide-react";
import chevronRight from "@/assets/Chevron_Right.svg";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

interface SlideConfirmationDialogProps {
  setIsFinished: Dispatch<SetStateAction<boolean>>;
  confirmationText: string;
  actionButtonText: string;
  cancelButtonText: string;
  isLastImage: boolean;
  onNext: () => void;
}

export default function SlideConfirmationDialog({
  setIsFinished,
  confirmationText,
  actionButtonText,
  cancelButtonText,
  isLastImage,
  onNext,
}: SlideConfirmationDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || event.repeat || isDialogOpen) return;

      const triggerButton = document.getElementById(
        "slide-confirmation-trigger",
      );

      if (triggerButton instanceof HTMLButtonElement) {
        event.preventDefault();
        triggerButton.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDialogOpen]);

  const ActionButton = (
    <Button
      id="slide-confirmation-trigger"
      type="button"
      variant="ghost"
      className="flex items-center justify-center w-full h-full rounded-none bg-transparent hover:bg-transparent border-none shadow-none cursor-pointer shrink-0 p-0 outline-none focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
      onClick={!isLastImage ? onNext : undefined}
    >
      <img src={chevronRight} alt="" />
    </Button>
  );
  if (!isLastImage) return ActionButton;

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>{ActionButton}</AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col justify-center items-center w-lg pt-2.5 pr-3 pb-2.25 pl-2.75">
        <div className="flex flex-col items-center gap-2 shrink-0 w-122.25">
          <AlertDialogCancel className="ml-auto" asChild>
            <Button
              className="flex bg-transparent border-none shadow-none hover:bg-transparent w-6 h-6 cursor-pointer"
              variant="ghost"
              size="icon"
            >
              <CircleX className="h-4.5 w-4.5 stroke-[2px] text-[#2A59A9]" />
            </Button>
          </AlertDialogCancel>
          <div className="flex flex-col justify-center items-center self-stretch p-4 gap-6">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-clother text-[24px] text-[#3266BD]">
                {confirmationText}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex items-center w-85.5 p-4 gap-12">
              <AlertDialogCancel className="w-32.75 h-12 p-2 shrink-0 rounded-[8px] bg-[rgba(159,193,254,0.50)]! text-[#3266BD]! hover:bg-[#3266BD]! hover:text-[#FFF]! font-clother text-[16px] cursor-pointer">
                {cancelButtonText}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => setIsFinished(true)}
                className="w-32.75 h-12 p-2 shrink-0 rounded-[8px] bg-[rgba(159,193,254,0.50)]! text-[#3266BD]! hover:bg-[#3266BD]! hover:text-[#FFF]! font-clother text-[16px] cursor-pointer"
              >
                {actionButtonText}
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
