import React from "react";
import { Link } from "react-router-dom";
import { NotificationTicker } from "./NotificationTicker";

/**
 * Header Component
 * Main navigation header with integrated notification ticker
 * Features:
 * - Responsive navigation menu
 * - Integrated notification ticker below nav
 * - Clean, modern design
 */
export const Header = () => {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Departments", href: "/departments" }
  ];

  return (
    <header className="bg-white shadow">
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">MyApp</Link>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Notification Ticker */}
      <div className="relative w-full overflow-hidden">
        <NotificationTicker />
      </div>
    </header>
  );
};