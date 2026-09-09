import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import OpenSeadragon from "openseadragon";

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
      });
      viewer.addHandler("open", () => {
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
    }, [imageUrl]);

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

    return <div ref={containerRef} className="w-full h-full" />;
  },
);

SlideViewer.displayName = "SlideViewer";
export default SlideViewer;
