import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Settings, 
  ChevronUp 
} from "lucide-react";

interface AdminLayoutProps {
  children?: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            <h1 className="text-xl font-semibold">MPDO Admin</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/admin/settings")}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content with Scroll Area */}
      <ScrollArea className="flex-1 h-[calc(100vh-4rem)]">
        <main className="container mx-auto py-6 px-4">
          {children || <Outlet />}
        </main>
      </ScrollArea>

      {/* Footer with Scroll to Top */}
      <footer className="sticky bottom-0 border-t bg-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm text-gray-600">
            © 2024 MPDO Admin Dashboard
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="rounded-full hover:bg-gray-100"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
};