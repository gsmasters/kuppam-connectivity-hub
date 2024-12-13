import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DepartmentCard } from "@/components/departments/DepartmentCard";
import { ElectedRepresentatives } from "@/components/departments/ElectedRepresentatives";
import { LeadershipBanner } from "@/components/LeadershipBanner";

const Staff = () => {
  const departments = [
    {
      title: "Administration",
      staff: [
        {
          name: "John Doe",
          position: "MPDO",
          mobile: "+91 9876543210",
          email: "mpdo@example.com",
          location: "Kuppam"
        },
        {
          name: "Jane Smith",
          position: "Extension Officer",
          mobile: "+91 9876543211",
          email: "eo@example.com"
        }
      ]
    },
    {
      title: "Engineering",
      staff: [
        {
          name: "Robert Johnson",
          position: "AE",
          mobile: "+91 9876543212",
          location: "Kuppam"
        },
        {
          name: "Sarah Williams",
          position: "Technical Assistant",
          mobile: "+91 9876543213"
        }
      ]
    },
    {
      title: "Welfare",
      staff: [
        {
          name: "Michael Brown",
          position: "Welfare Officer",
          mobile: "+91 9876543214",
          email: "welfare@example.com"
        },
        {
          name: "Emily Davis",
          position: "Assistant Officer",
          mobile: "+91 9876543215"
        }
      ]
    }
  ];

  const electedRepresentatives = {
    MPP: [
      {
        name: "David Wilson",
        position: "MPP President",
        mobile: "+91 9876543216"
      }
    ],
    ZPTC: [
      {
        name: "Lisa Anderson",
        position: "ZPTC Member",
        mobile: "+91 9876543217"
      }
    ],
    Sarpanch: [
      {
        name: "Mark Thompson",
        position: "Sarpanch - Village 1",
        mobile: "+91 9876543218"
      },
      {
        name: "Anna Martinez",
        position: "Sarpanch - Village 2",
        mobile: "+91 9876543219"
      }
    ],
    MPTC: [
      {
        name: "James Lee",
        position: "MPTC Member - Division 1",
        mobile: "+91 9876543220"
      },
      {
        name: "Susan Clark",
        position: "MPTC Member - Division 2",
        mobile: "+91 9876543221"
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LeadershipBanner />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Departments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <DepartmentCard
              key={index}
              title={dept.title}
              staff={dept.staff}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Elected Representatives</h2>
        <ElectedRepresentatives data={electedRepresentatives} />
      </main>
      <Footer />
    </div>
  );
};

export default Staff;