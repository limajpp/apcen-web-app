import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import OpenSeadragon from "openseadragon";
import { uiCopy } from "@/lib/analysis/labels";

export interface SlideViewerHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
}

interface SlideViewerProps {
  imageUrl: string;
}

const SlideViewer = forwardRef<SlideViewerHandle, SlideViewerProps>(
  ({ imageUrl }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<OpenSeadragon.Viewer | null>(null);
    const [failedUrl, setFailedUrl] = useState<string | null>(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
      if (!containerRef.current) return;
      if (!imageUrl) {
        console.error(
          "No image url to open. The image list response is missing a usable storageKey.",
        );
        return;
      }

      const viewer = OpenSeadragon({
        element: containerRef.current,
        tileSources: {
          type: "image",
          url: imageUrl,
        },
        showNavigationControl: false,
        drawer: "canvas",
        homeFillsViewer: true,
        maxZoomPixelRatio: 4,
        minZoomImageRatio: 0.9,
        visibilityRatio: 1,
        constrainDuringPan: true,
        animationTime: 0.4,
        springStiffness: 10,
        gestureSettingsMouse: {
          clickToZoom: false,
          dblClickToZoom: true,
        },
      });

      viewerRef.current = viewer;
      viewer.addHandler("open-failed", (event) => {
        console.error("Failed to open slide image.", {
          imageUrl,
          message: (event as unknown as { message?: string }).message,
        });
        setFailedUrl(imageUrl);
      });
      viewer.addHandler("open", () => {
        setFailedUrl(null);
        const viewport = viewer.viewport as OpenSeadragon.Viewport & {
          minZoomLevel: number;
        };
        viewport.minZoomLevel = viewport.getHomeZoom();
        viewport.applyConstraints();
      });

      return () => {
        viewer.destroy();
        viewerRef.current = null;
      };
    }, [imageUrl, attempt]);

    useImperativeHandle(ref, () => ({
      zoomIn: () => {
        viewerRef.current?.viewport.zoomBy(1.4).applyConstraints();
      },
      zoomOut: () => {
        viewerRef.current?.viewport.zoomBy(0.7).applyConstraints();
      },
      reset: () => {
        viewerRef.current?.viewport.goHome();
      },
    }));

    const retry = () => {
      setFailedUrl(null);
      setAttempt((current) => current + 1);
    };

    return (
      <div className="relative h-full w-full">
        <div
          ref={containerRef}
          className="h-full w-full [&_.openseadragon-message]:hidden!"
        />
        {failedUrl === imageUrl ? (
          <div
            aria-live="polite"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#F9F3EA] p-6 text-center"
          >
            <p className="font-clother text-[18px] text-[#2A59A9]">
              {uiCopy.imageLoadError}
            </p>
            <button
              type="button"
              onClick={retry}
              className="cursor-pointer rounded-[8px] bg-[#3266BD] px-5 py-3 font-clother text-[16px] text-white hover:bg-[#2A59A9]"
            >
              {uiCopy.retry}
            </button>
          </div>
        ) : null}
      </div>
    );
  },
);

SlideViewer.displayName = "SlideViewer";
export default SlideViewer;
