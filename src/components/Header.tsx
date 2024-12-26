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
    { name: "Staff Directory", href: "/staff-directory" },
    { name: "Government Portals", href: "/government-portals" }
  ];

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="h-8 w-8 text-gray-900" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:hidden">
        <div className="flex flex-col space-y-4 mt-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="px-4 py-3 rounded-md text-gray-900 hover:text-primary hover:bg-gray-100 transition-all duration-200 text-lg font-semibold transform hover:scale-105"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <img
                    src="/lovable-uploads/0ca6e276-4d20-48ee-8b76-4e09222c5632.png"
                    alt="Panchayati Raj Logo"
                    className="h-16 w-auto transition-transform duration-300 hover:scale-110"
                  />
                </Link>
              </div>
              <nav className="hidden sm:flex items-center space-x-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-4 py-3 rounded-md text-gray-900 hover:text-primary hover:bg-gray-100 transition-all duration-300 text-base font-semibold transform hover:scale-105"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-6 pr-4">
              <Link 
                to="/" 
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#DD4814] via-[#E9C46A] to-[#F4A261] text-transparent bg-clip-text hover:opacity-90 transition-all duration-300 transform hover:scale-105 tracking-wide font-sans"
              >
                KUPPAM MPDO
              </Link>
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
      <NotificationTicker />
    </>
  );
};