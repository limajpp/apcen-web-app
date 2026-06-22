import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import Header from "../../Header";

export default function AuthLayout() {
  return (
    <ResizablePanelGroup className=" h-full w-full" orientation="horizontal">
      <ResizablePanel className="flex flex-col bg-[#F9F3EA]" defaultSize="75%">
        <ResizablePanelGroup orientation="vertical">
          <Header />
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizablePanel className="bg-[#9FC1FE]" defaultSize="25%">
        In Progress...
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
