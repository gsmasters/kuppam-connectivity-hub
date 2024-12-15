import { ReactNode } from "react";

interface FooterSectionProps {
  title: string;
  children: ReactNode;
}

export const FooterSection = ({ title, children }: FooterSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-primary border-b border-primary/20 pb-1">
        {title}
      </h3>
      <ul className="space-y-2">
        {children}
      </ul>
    </div>
  );
};