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
import { ChevronRight, CircleX } from "lucide-react";

interface SlideConfirmationDialogProps {
  confirmationText: string;
  actionButtonText: string;
  cancelButtonText: string;
}

export default function SlideConfirmationDialog({
  confirmationText,
  actionButtonText,
  cancelButtonText,
}: SlideConfirmationDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          className="ml-auto flex items-center justify-center mt-4 h-8 w-8 rounded-full bg-[#2A59A9] hover:bg-[#2A59A9] cursor-pointer shrink-0"
        >
          <ChevronRight className="text-[#F9F3EA]" />
        </Button>
      </AlertDialogTrigger>
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
              <AlertDialogAction className="w-32.75 h-12 p-2 shrink-0 rounded-[8px] bg-[rgba(159,193,254,0.50)]! text-[#3266BD]! hover:bg-[#3266BD]! hover:text-[#FFF]! font-clother text-[16px] cursor-pointer">
                {actionButtonText}
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
