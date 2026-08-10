function ProgressPiece({
  value,
  fillPercentage,
}: {
  value: number;
  fillPercentage: number;
}) {
  const backgroundStyle = {
    background: `linear-gradient(to right, #2A59A9 ${fillPercentage}%, #9FC1FE ${fillPercentage}%)`,
  };
  const textColor = fillPercentage >= 50 ? "text-[#F9F3EA]" : "text-[#3266BD]";

  return (
    <div
      className="flex items-center justify-center w-6 h-6 rounded-[47.143px]"
      style={backgroundStyle}
    >
      <span
        className={`mb-px font-clother text-[16px] leading-none ${textColor}`}
      >
        {value}
      </span>
    </div>
  );
}

export default function ProgressBar({
  reviewedImages,
  totalImages,
}: {
  reviewedImages: number;
  totalImages: number;
}) {
  const TOTAL_PIECES = 10;
  const imagesPerPiece = totalImages / TOTAL_PIECES;

  return (
    <div className="flex justify-center items-center w-full h-10 pt-2.75 pb-2.5 px-3.75 gap-6.25">
      {Array.from({ length: TOTAL_PIECES }, (_, index) => {
        const value = index + 1;
        const pieceStart = index * imagesPerPiece;
        const pieceEnd = value * imagesPerPiece;
        let fillPercentage = 0;

        if (reviewedImages >= pieceEnd) {
          fillPercentage = 100;
        } else if (reviewedImages > pieceStart) {
          fillPercentage =
            ((reviewedImages - pieceStart) / imagesPerPiece) * 100;
        }

        return (
          <ProgressPiece
            key={index}
            value={value}
            fillPercentage={fillPercentage}
          />
        );
      })}
    </div>
  );
}
