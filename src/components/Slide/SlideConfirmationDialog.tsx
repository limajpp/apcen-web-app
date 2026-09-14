import { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import SlideArrow from "./SlideView/SlideArrow";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface SlideConfirmationDialogProps {
  confirmationText: string;
  actionButtonText: string;
  cancelButtonText: string;
  requireDialog?: boolean;
  disabled?: boolean;
  blocked?: boolean;
  onNext?: () => void;
  onFinish?: () => void;
}

export default function SlideConfirmationDialog({
  confirmationText,
  actionButtonText,
  cancelButtonText,
  requireDialog = true,
  disabled = false,
  blocked = false,
  onNext,
  onFinish,
}: SlideConfirmationDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || event.repeat || isDialogOpen || disabled)
        return;
      if (document.querySelector('[role="alertdialog"]')) return;

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
  }, [isDialogOpen, disabled]);

  const ActionButton = (
    <SlideArrow
      id="slide-confirmation-trigger"
      direction="next"
      disabled={disabled}
      dimmed={blocked}
      onClick={!requireDialog || blocked ? onNext : undefined}
    />
  );

  if (!requireDialog || blocked) return ActionButton;

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>{ActionButton}</AlertDialogTrigger>
      <AlertDialogContent
        overlayClassName="w-full bg-[#111140]/50"
        className="left-1/2 flex w-lg max-w-lg! flex-col items-center gap-2 rounded-[16px] bg-white p-3 ring-0"
      >
        <AlertDialogCancel asChild>
          <button
            type="button"
            aria-label={cancelButtonText}
            className="ml-auto flex size-6 cursor-pointer items-center justify-center bg-transparent text-[#2A59A9]"
          >
            <CircleX className="size-6 stroke-[2px]" />
          </button>
        </AlertDialogCancel>
        <div className="flex w-full flex-col items-center gap-6 p-4">
          <AlertDialogTitle className="text-center font-clother text-[24px] font-normal text-[#3266BD]">
            {confirmationText}
          </AlertDialogTitle>
          <div className="flex items-center gap-12 p-4">
            <AlertDialogCancel className="h-12 w-32.75 cursor-pointer rounded-[8px] border-0 bg-[#9FC1FE]/30! font-clother text-[16px] text-[#3266BD]! shadow-none hover:bg-[#9FC1FE]/50!">
              {cancelButtonText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onFinish}
              className="h-12 w-32.75 cursor-pointer rounded-[8px] bg-[#3266BD]! font-clother text-[16px] font-bold text-white! hover:bg-[#2A59A9]!"
            >
              {actionButtonText}
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
