import { ExternalLink, Info, MessageSquare } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary border-b border-primary/20 pb-2">Important Links</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://panchayat.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center group transition-colors duration-200"
                  >
                    <ExternalLink className="h-5 w-5 mr-3 group-hover:text-primary transition-colors duration-200" />
                    <span>Ministry of Panchayati Raj</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://egramswaraj.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center group transition-colors duration-200"
                  >
                    <ExternalLink className="h-5 w-5 mr-3 group-hover:text-primary transition-colors duration-200" />
                    <span>eGramSwaraj</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://nrega.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center group transition-colors duration-200"
                  >
                    <ExternalLink className="h-5 w-5 mr-3 group-hover:text-primary transition-colors duration-200" />
                    <span>NREGA National Portal</span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary border-b border-primary/20 pb-2">Important Links</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://rd.ap.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center group transition-colors duration-200"
                  >
                    <ExternalLink className="h-5 w-5 mr-3 group-hover:text-primary transition-colors duration-200" />
                    <span>Rural Development</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ap.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center group transition-colors duration-200"
                  >
                    <ExternalLink className="h-5 w-5 mr-3 group-hover:text-primary transition-colors duration-200" />
                    <span>AP Government Portal</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.niti.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center group transition-colors duration-200"
                  >
                    <ExternalLink className="h-5 w-5 mr-3 group-hover:text-primary transition-colors duration-200" />
                    <span>NITI Aayog</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://digitalpanchayat.ap.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center group transition-colors duration-200"
                  >
                    <ExternalLink className="h-5 w-5 mr-3 group-hover:text-primary transition-colors duration-200" />
                    <span>Digital Panchayat AP</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://appanchayats.ap.gov.in/APPRPortal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center group transition-colors duration-200"
                  >
                    <ExternalLink className="h-5 w-5 mr-3 group-hover:text-primary transition-colors duration-200" />
                    <span>AP Panchayat Portal</span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary border-b border-primary/20 pb-2">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="/documents" 
                    className="hover:text-primary flex items-center group transition-colors duration-200"
                  >
                    <Info className="h-5 w-5 mr-3 group-hover:text-primary transition-colors duration-200" />
                    <span>RTI</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://pgrs.ap.gov.in/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-primary flex items-center group transition-colors duration-200"
                  >
                    <MessageSquare className="h-5 w-5 mr-3 group-hover:text-primary transition-colors duration-200" />
                    <span>Grievance</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-4 border-t border-gray-800 text-center text-sm">
          <p>© 2024 MPDO Office Kuppam Mandal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};