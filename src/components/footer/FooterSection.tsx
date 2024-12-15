import { ReactNode } from "react";

interface FooterSectionProps {
  title: string;
  children: ReactNode;
}

export const FooterSection = ({ title, children }: FooterSectionProps) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-primary border-b border-primary/20 pb-2">
        {title}
      </h3>
      <ul className="space-y-4">
        {children}
      </ul>
    </div>
  );
};