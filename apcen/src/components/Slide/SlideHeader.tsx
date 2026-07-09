interface SlideHeaderProps {
  userName: string | undefined;
  className: string;
}

export default function SlideHeader({ userName, className }: SlideHeaderProps) {
  return (
    <div className={className}>
      <h2 className="text-[#2A59A9] font-clother text-2xl font-bold">
        {userName ? `Olá, ${userName}!` : "Olá!"}
      </h2>
      <p className="text-[#2A59A9] font-clother text-[18px]">
        Identifique as opções na lâmina:
      </p>
    </div>
  );
}
