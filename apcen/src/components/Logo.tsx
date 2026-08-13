import logo from "@/assets/logo.svg";

export default function Logo() {
  return (
    <div className="flex flex-row justify-center items-center h-fit w-fit py-1.75 px-4.75 gap-[8.78px]">
      <img src={logo} alt="" aria-hidden="true" />
      <h1 className="font-gunter text-[28.646px] text-[#2A59A9] leading-none mt-1">
        APCEN
      </h1>
    </div>
  );
}
