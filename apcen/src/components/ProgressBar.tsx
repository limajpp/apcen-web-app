import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  className?: string;
}

export default function ProgressBar({ className }: ProgressBarProps) {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (value >= 100) return;

    const interval = setInterval(() => {
      setValue((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="flex justify-center items-center w-full h-10 pt-2.75 pb-2.5 px-3.75 gap-6.25">
      <Progress
        value={value}
        max={100}
        className={className}
        indicatorClassName="bg-[#9FC1FE]"
      />
      <span className="text-[#2A59A9] font-clother text-[16px]">{value}%</span>
    </div>
  );
}
