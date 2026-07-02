interface SlideHeaderProps {
  className: string;
}

export default function SlideHeader({ className }: SlideHeaderProps) {
  return (
    <div className={className}>
      {/* Display username by fetching it from backend later... */}
      <h2 className="text-[#2A59A9] font-clother text-2xl font-bold">
        Olá, Usuário01!
      </h2>
      <p className="text-[#2A59A9] font-clother text-[18px]">
        Identifique as opções na lâmina:
      </p>
    </div>
  );
}
