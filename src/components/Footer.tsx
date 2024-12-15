import { ExternalLink, Info, MessageSquare } from "lucide-react";
import { FooterLink } from "./footer/FooterLink";
import { FooterSection } from "./footer/FooterSection";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FooterSection title="Important Links">
            <FooterLink href="https://panchayat.gov.in/" icon={ExternalLink}>
              Ministry of Panchayati Raj
            </FooterLink>
            <FooterLink href="https://egramswaraj.gov.in/" icon={ExternalLink}>
              eGramSwaraj
            </FooterLink>
            <FooterLink href="https://nrega.nic.in/" icon={ExternalLink}>
              NREGA National Portal
            </FooterLink>
          </FooterSection>

          <FooterSection title="Government Portals">
            <FooterLink href="https://rd.ap.gov.in/" icon={ExternalLink}>
              Rural Development
            </FooterLink>
            <FooterLink href="https://www.ap.gov.in/" icon={ExternalLink}>
              AP Government Portal
            </FooterLink>
            <FooterLink href="https://www.niti.gov.in/" icon={ExternalLink}>
              NITI Aayog
            </FooterLink>
            <FooterLink href="https://digitalpanchayat.ap.gov.in/" icon={ExternalLink}>
              Digital Panchayat AP
            </FooterLink>
            <FooterLink href="https://appanchayats.ap.gov.in/APPRPortal/" icon={ExternalLink}>
              AP Panchayat Portal
            </FooterLink>
          </FooterSection>

          <FooterSection title="Quick Links">
            <FooterLink href="/documents" icon={Info} external={false}>
              RTI
            </FooterLink>
            <FooterLink href="https://pgrs.ap.gov.in/" icon={MessageSquare}>
              Grievance
            </FooterLink>
          </FooterSection>
        </div>
      </div>
    </footer>
  );
};