import screenArt from "@/assets/ScreenArt.svg";

export default function SupportArt() {
  return (
    <img
      className="w-full h-full object-cover"
      src={screenArt}
      alt=""
      aria-hidden="true"
    />
  );
}
