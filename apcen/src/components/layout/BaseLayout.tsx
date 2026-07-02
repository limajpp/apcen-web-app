import type { ReactNode } from "react";
import SupportArt from "../SupportArt";
import { ResizablePanelGroup, ResizablePanel } from "../ui/resizable";

interface BaseLayoutProps {
  className: string;
  children: ReactNode;
}

export default function BaseLayout({ className, children }: BaseLayoutProps) {
  return (
    <ResizablePanelGroup className={className} orientation="horizontal">
      <ResizablePanel className="flex flex-col bg-[#F9F3EA]" defaultSize="75%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel className="flex flex-col" defaultSize="100%">
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizablePanel className="bg-transparent" defaultSize="25%">
        <SupportArt />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
