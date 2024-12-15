import { ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Important Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://panchayat.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ministry of Panchayati Raj
                  </a>
                </li>
                <li>
                  <a
                    href="https://egramswaraj.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    eGramSwaraj
                  </a>
                </li>
                <li>
                  <a
                    href="https://nrega.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    NREGA National Portal
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Important Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://rd.ap.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Rural Development
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ap.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    AP Government Portal
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.niti.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    NITI Aayog
                  </a>
                </li>
                <li>
                  <a
                    href="https://digitalpanchayat.ap.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Digital Panchayat AP
                  </a>
                </li>
                <li>
                  <a
                    href="https://appanchayats.ap.gov.in/APPRPortal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    AP Panchayat Portal
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-4 border-t border-gray-800 text-center text-sm">
          <div className="flex justify-center space-x-4 mb-4">
            <a 
              href="/documents" 
              className="hover:text-primary flex items-center gap-2"
            >
              <Info className="h-4 w-4" />
              RTI
            </a>
            <a 
              href="https://pgrs.ap.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Grievance
            </a>
          </div>
          <p>© 2024 MPDO Office Kuppam Mandal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};