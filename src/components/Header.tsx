import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Header = () => {
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Departments", href: "/staff" },
    { label: "Programs", href: "/programs" },
    { label: "Documents", href: "/documents" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="py-2 border-b">
          <div className="flex justify-end space-x-4 text-gray-600 text-sm">
            <a href="/contact" className="hover:text-gray-900">Contact Us</a>
            <a href="/documents" className="hover:text-gray-900">RTI</a>
            <a href="https://pgrs.ap.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">Grievance</a>
          </div>
        </div>
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <img src="/placeholder.svg" alt="Logo" className="h-16 w-16" />
            <div className="text-gray-900">
              <h1 className="text-xl font-bold">MPDO Office</h1>
              <p className="text-sm text-gray-600">Kuppam Mandal</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.label}>
                    <a href={item.href} className="w-full">
                      {item.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  );
};