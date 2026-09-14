import { useRef } from "react";
import SlideControls from "./SlideControls";
import SlideViewer, { type SlideViewerHandle } from "./SlideViewer";

interface SlideProps {
  className: string;
  imageUrl: string;
}

export default function Slide({ className, imageUrl }: SlideProps) {
  const viewerRef = useRef<SlideViewerHandle>(null);

  return (
    <div className={className}>
      <SlideViewer ref={viewerRef} imageUrl={imageUrl} />
      <SlideControls
        onZoomIn={() => viewerRef.current?.zoomIn()}
        onZoomOut={() => viewerRef.current?.zoomOut()}
        onReset={() => viewerRef.current?.reset()}
      />
    </div>
  );
}
