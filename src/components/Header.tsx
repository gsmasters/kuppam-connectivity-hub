import React from "react";
import { Link } from "react-router-dom";
import { NotificationTicker } from "./NotificationTicker";

export const Header = () => {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Departments", href: "/departments" }
  ];

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0">
                <Link to="/" className="text-xl font-bold">MPDO Office</Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex">
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
      </header>
      <NotificationTicker />
    </>
  );
};