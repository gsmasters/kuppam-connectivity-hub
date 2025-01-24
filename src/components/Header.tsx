import React from "react";
import { Link } from "react-router-dom";
import { NotificationTicker } from "./NotificationTicker";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Programs", href: "/programs" },
    { name: "Staff Directory", href: "/staff-directory" }
  ];

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Open navigation menu">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:hidden">
        <nav aria-label="Mobile navigation" role="navigation">
          <div className="flex flex-col space-y-3 mt-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200 text-base font-medium transform hover:scale-105"
                aria-current={item.href === window.location.pathname ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="bg-white shadow-sm border-b border-gray-100" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2" aria-label="MPDO Office Kuppam - Home">
                <img
                  src="/lovable-uploads/0ca6e276-4d20-48ee-8b76-4e09222c5632.png"
                  alt="Panchayati Raj Logo"
                  className="h-12 w-auto transition-transform duration-300 hover:scale-110"
                  width="48"
                  height="48"
                />
              </Link>
            </div>
            <nav className="hidden sm:flex items-center space-x-1" aria-label="Main navigation" role="navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-300 text-sm font-medium transform hover:scale-110"
                  aria-current={item.href === window.location.pathname ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-6 pr-4">
            <Link 
              to="/" 
              className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#DD4814] via-[#E9C46A] to-[#F4A261] text-transparent bg-clip-text hover:opacity-90 transition-all duration-300 transform hover:scale-105 tracking-wide font-sans"
              aria-label="KUPPAM MPDO"
            >
              KUPPAM MPDO
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};