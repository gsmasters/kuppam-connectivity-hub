import { Building, Mail, Phone, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600">
      <div className="container mx-auto px-4">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Us</h3>
              <div className="space-y-3">
                <p className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  94910 71391
                </p>
                <p className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  kuppam.brgf@gmail.com
                </p>
                <p className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  MPDO Office, Kuppam Mandal
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="hover:text-white/80 flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#staff" className="hover:text-white/80 flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Staff Directory
                  </a>
                </li>
                <li>
                  <a href="#programs" className="hover:text-white/80 flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Programs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Important Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://meekosam.ap.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/80 flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Grievance Portal
                  </a>
                </li>
                <li>
                  <a href="#rti" className="hover:text-white/80 flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    RTI Information
                  </a>
                </li>
                <li>
                  <a href="#news" className="hover:text-white/80 flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Latest News
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-4 border-t border-gray-200 text-center text-sm">
          <p>© 2024 MPDO Office Kuppam Mandal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};