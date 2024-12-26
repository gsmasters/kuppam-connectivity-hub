import { Phone, Mail, Building } from "lucide-react";

export const ContactBar = () => {
  const contacts = [
    { icon: <Phone className="h-4 w-4" />, text: "94910 71391" },
    { icon: <Mail className="h-4 w-4" />, text: "kuppam.brgf@gmail.com" },
    { icon: <Building className="h-4 w-4" />, text: "MPDO Office, Kuppam Mandal" }
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#E9C46A] text-black z-50 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[slide_20s_linear_infinite]">
        {/* Duplicate the contacts to create a seamless loop */}
        {[...contacts, ...contacts].map((contact, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 px-6 py-2"
          >
            {contact.icon}
            <span>{contact.text}</span>
            <span className="px-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};