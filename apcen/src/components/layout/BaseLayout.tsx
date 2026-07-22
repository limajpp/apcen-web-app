import type { ReactNode } from "react";
import SupportArt from "../SupportArt";
import { ResizablePanelGroup, ResizablePanel } from "../ui/resizable";
import Header from "../Header";

interface BaseLayoutProps {
  className: string;
  children: ReactNode;
}

export default function BaseLayout({ className, children }: BaseLayoutProps) {
  return (
    <ResizablePanelGroup className={className} orientation="horizontal">
      <ResizablePanel className="flex flex-col bg-[#F9F3EA]" defaultSize="70%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel className="flex flex-col" defaultSize="100%">
            <Header />
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizablePanel className="bg-transparent" defaultSize="30%">
        <SupportArt />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
