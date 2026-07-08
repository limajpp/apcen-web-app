import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type LoadingType = "idle" | "loading" | "success" | "error";

interface LoadingProps {
  className?: string;
  icon?: ReactNode;
  type: LoadingType;
  message: string;
}

export default function Loading({
  className,
  icon,
  type,
  message,
}: LoadingProps) {
  return (
    <div className={className}>
      <div
        className={cn(
          "flex justify-center items-center shrink-0 aspect-square w-10 h-10 p-2 rounded-[80px]",
          (type === "loading" || type === "success") && "bg-[#FFF]",
          type === "error" && "bg-[#C95555]",
        )}
      >
        <span className="w-6 h-6 shrink-0">{icon}</span>
      </div>
      <p
        className="font-clother text-[16px] text-[#2A59A9]"
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  );
}
