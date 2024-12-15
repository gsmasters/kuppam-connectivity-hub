import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface AdminLayoutProps {
  children?: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        {children || <Outlet />}
      </div>
    </div>
  );
};