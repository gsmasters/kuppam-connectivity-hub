import { Phone, Mail, Building } from "lucide-react";

export const ContactBar = () => {
  const contacts = [
    { icon: <Phone className="h-3 w-3 sm:h-4 sm:w-4" />, text: "94910 71391" },
    { icon: <Mail className="h-3 w-3 sm:h-4 sm:w-4" />, text: "kuppam.brgf@gmail.com" },
    { icon: <Building className="h-3 w-3 sm:h-4 sm:w-4" />, text: "MPDO Office, Kuppam Mandal" }
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#E9C46A] text-black z-50 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[slide_20s_linear_infinite]">
        {[...contacts, ...contacts].map((contact, index) => (
          <div
            key={index}
            className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-1.5 sm:py-2"
          >
            {contact.icon}
            <span className="text-xs sm:text-sm">{contact.text}</span>
            <span className="px-2 sm:px-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};