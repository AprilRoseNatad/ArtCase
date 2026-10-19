import { Outlet } from "react-router-dom";
import { Topbar } from "@/components/common/Topbar";
import { Sidebar } from "@/components/common/Sidebar";

export function HomeLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Wrapper */}
      <div className="flex flex-1 flex-col min-w-0">
        <Topbar />

        {/* Page Content Viewport */}
        <main className="flex-1 w-full p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}