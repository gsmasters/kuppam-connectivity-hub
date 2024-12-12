import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building, Phone, Mail } from "lucide-react";

const Staff = () => {
  const departmentStaff = {
    "Administration": [
      {
        name: "P.SAI LAHARI",
        position: "MPDO",
        mobile: "9491071391",
        email: "kuppam.brgf@gmail.com"
      },
      {
        name: "L VIJAYDATH",
        position: "EOPRD",
        mobile: "9440237609",
        email: "kuppam.eoprd@gmail.com"
      }
    ],
    "Engineering": [
      {
        name: "K. RAMESH",
        position: "Engineering Consultant",
        mobile: "9876543210",
        email: "kuppam.eng@gmail.com"
      }
    ],
    "Welfare": [
      {
        name: "M. LAKSHMI",
        position: "Welfare Officer",
        mobile: "9876543211",
        email: "kuppam.welfare@gmail.com"
      }
    ],
    "Agriculture": [
      {
        name: "R. KRISHNA",
        position: "Agriculture Extension Officer",
        mobile: "9876543212",
        email: "kuppam.agri@gmail.com"
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Staff Directory</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(departmentStaff).map(([department, staff]) => (
            <div key={department} className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Building className="mr-2 h-5 w-5 text-gray-600" />
                  {department}
                </h2>
              </div>
              <ScrollArea className="h-[300px] p-4">
                <div className="space-y-4">
                  {staff.map((member, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 mt-1">{member.position}</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-gray-600 flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {member.mobile}
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {member.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Staff;