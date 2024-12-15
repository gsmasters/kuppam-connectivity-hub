import { LucideIcon } from "lucide-react";

interface FooterLinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  external?: boolean;
}

export const FooterLink = ({ href, icon: Icon, children, external = true }: FooterLinkProps) => {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="hover:text-primary flex items-center group transition-colors duration-200"
      >
        <Icon className="h-5 w-5 mr-3 group-hover:text-primary transition-colors duration-200" />
        <span>{children}</span>
      </a>
    </li>
  );
};