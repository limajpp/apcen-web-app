import arrowNext from "@/assets/Arrow_Next.svg";
import arrowNextHover from "@/assets/Arrow_Next_Hover.svg";
import arrowNextDisabled from "@/assets/Arrow_Next_Disabled.svg";
import type { ComponentProps } from "react";

type SlideArrowProps = Omit<ComponentProps<"button">, "children" | "type"> & {
  direction: "back" | "next";
  dimmed?: boolean;
};

export default function SlideArrow({
  direction,
  dimmed = false,
  disabled = false,
  className = "",
  ...props
}: SlideArrowProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={direction === "next" ? "Próxima lâmina" : "Lâmina anterior"}
      className={`group relative h-[552px] w-[58px] shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#2A59A9] ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${direction === "back" ? "-scale-x-100" : ""} ${className}`}
      {...props}
    >
      <img
        src={disabled ? arrowNextDisabled : arrowNext}
        alt=""
        className={`absolute inset-0 size-full ${
          disabled ? "" : "group-hover:opacity-0"
        } ${dimmed && !disabled ? "opacity-40" : ""}`}
      />
      {disabled ? null : (
        <img
          src={arrowNextHover}
          alt=""
          className="absolute inset-0 size-full opacity-0 group-hover:opacity-100"
        />
      )}
    </button>
  );
}
