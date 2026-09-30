interface HeaderProps {
  userName: string | undefined;
  className?: string;
  text: string;
}

export default function Header({
  userName,
  className = "flex flex-col justify-center items-start",
  text,
}: HeaderProps) {
  return (
    <div className={className}>
      <h2 className="text-[#2A59A9] font-clother text-2xl font-bold">
        {`Olá, ${userName ? userName : "Usuário"}!`}
      </h2>
      <p className="text-[#2A59A9] font-clother text-[18px]">{text}</p>
    </div>
  );
}
