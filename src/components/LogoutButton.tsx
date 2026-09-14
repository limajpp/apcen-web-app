import { CircleX, LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export default function LogoutButton() {
  const { handleDisconnectUser } = useAuth();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-[8px] px-3 py-2 font-clother text-[18px] text-[#2A59A9] outline-none hover:bg-[#9FC1FE]/30 focus-visible:ring-2 focus-visible:ring-[#2A59A9]"
        >
          <LogOut className="size-5" aria-hidden="true" />
          Sair
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent
        aria-describedby={undefined}
        overlayClassName="w-full bg-[#111140]/50"
        className="left-1/2 flex w-lg max-w-lg! flex-col items-center gap-2 rounded-[16px] bg-white p-3 ring-0"
      >
        <AlertDialogCancel asChild>
          <button
            type="button"
            aria-label="Cancelar"
            className="ml-auto flex size-6 cursor-pointer items-center justify-center bg-transparent text-[#2A59A9]"
          >
            <CircleX className="size-6 stroke-[2px]" />
          </button>
        </AlertDialogCancel>
        <div className="flex w-full flex-col items-center gap-6 p-4">
          <AlertDialogTitle className="text-center font-clother text-[24px] font-normal text-[#3266BD]">
            Deseja sair da aplicação?
          </AlertDialogTitle>
          <div className="flex items-center gap-12 p-4">
            <AlertDialogCancel className="h-12 w-32.75 cursor-pointer rounded-[8px] border-0 bg-[#9FC1FE]/30! font-clother text-[16px] text-[#3266BD]! shadow-none hover:bg-[#9FC1FE]/50!">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDisconnectUser}
              className="h-12 w-32.75 cursor-pointer rounded-[8px] bg-[#3266BD]! font-clother text-[16px] font-bold text-white! hover:bg-[#2A59A9]!"
            >
              Sair
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
