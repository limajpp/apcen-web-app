import SlideContent from "@/components/Slide/SlideContent";
import BaseLayout from "../BaseLayout";

export default function SlideLayout() {
  return (
    <BaseLayout className="h-full w-full">
      <div className="flex-1 w-full overflow-y-auto scrollbar-hide">
        <div className="flex flex-col items-center justify-center min-h-full p-4 md:p-10">
          <SlideContent />
        </div>
      </div>
    </BaseLayout>
  );
}
