import React from "react";
import { Link } from "react-router-dom";
import { NotificationTicker } from "./NotificationTicker";

export const Header = () => {
  const navigation = [
    { name: "About Us", href: "/about-us" },
    { name: "Departments", href: "/departments" },
    { name: "Programs", href: "/" }
  ];

  return (
    <>
      <header className="bg-white shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <Link 
                  to="/" 
                  className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors duration-200"
                >
                  KUPPAM MPDO
                </Link>
              </div>
              <nav className="hidden sm:flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-4 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>
      <NotificationTicker />
    </>
  );
};