import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import Header from "../../Header";
import LoginForm from "@/components/Auth/LoginForm";

export default function AuthLayout() {
  return (
    <ResizablePanelGroup className="h-full w-full" orientation="horizontal">
      <ResizablePanel className="flex flex-col bg-[#F9F3EA]" defaultSize="75%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel className="flex flex-col" defaultSize="100%">
            <Header />
            <LoginForm />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizablePanel className="bg-[#9FC1FE]" defaultSize="25%">
        In Progress...
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
