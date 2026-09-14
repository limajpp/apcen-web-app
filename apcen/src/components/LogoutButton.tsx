import { LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function LogoutButton() {
  const { handleDisconnectUser } = useAuth();

  return (
    <button
      type="button"
      onClick={handleDisconnectUser}
      className="flex cursor-pointer items-center gap-2 rounded-[8px] px-3 py-2 font-clother text-[18px] text-[#2A59A9] outline-none hover:bg-[#9FC1FE]/30 focus-visible:ring-2 focus-visible:ring-[#2A59A9]"
    >
      <LogOut className="size-5" aria-hidden="true" />
      Sair
    </button>
  );
}
