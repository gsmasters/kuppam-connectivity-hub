import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { StaffSection } from "@/components/staff/StaffSection";
import { RepresentativesSection } from "@/components/staff/RepresentativesSection";

const Staff = () => {
  const departments = [
    {
      title: "Mandal Office Administration",
      staff: [
        {
          name: "P.SAI LAHARI",
          position: "MPDO",
          mobile: "9491071391",
          email: "mpdo@example.com",
          location: "Kuppam"
        },
        {
          name: "L VIJAYDATH",
          position: "EOPRD",
          mobile: "9440237609"
        },
        {
          name: "N. GANGADHARAM",
          position: "ADMINISTRATIVE OFFICER",
          mobile: "9985569187"
        },
        {
          name: "S.A. SHABBEER AHMED",
          position: "SENIOR ASSISTANT",
          mobile: "9494747440"
        },
        {
          name: "E. SESHADRI",
          position: "JUNIOR ASSISTANT",
          mobile: "9494072682"
        },
        {
          name: "B. RAMU NAICK",
          position: "TYPIST",
          mobile: "9966505098"
        }
      ]
    },
    {
      title: "Education Department",
      staff: [
        {
          name: "Shaik Mahaboob Basha",
          position: "Mandal Educational Officer",
          mobile: "9481108991"
        },
        {
          name: "Sri.Rajaram",
          position: "Mandal Educational Officer 2",
          mobile: "9441862325"
        }
      ]
    },
    {
      title: "Engineering Departments",
      staff: [
        {
          name: "Purushotham",
          position: "DEE RWS & S",
          mobile: "9100121835"
        },
        {
          name: "T Guruvareddy",
          position: "DEE PR",
          mobile: "9440044134"
        },
        {
          name: "Venkateswar rao",
          position: "DE- Housing",
          mobile: "7093931002"
        },
        {
          name: "GuruPrasad",
          position: "DE-R & B",
          mobile: "7013222106"
        },
        {
          name: "S.Ganenaik",
          position: "DE - Irrigation",
          mobile: "7901090342"
        }
      ]
    },
    {
      title: "Agriculture & Allied Departments",
      staff: [
        {
          name: "Smt.S.Amruthavalli",
          position: "Mandal Agricultural Officer",
          mobile: "8886612540"
        },
        {
          name: "Dimpul Priya",
          position: "Horticulture Officer",
          mobile: "7731881596"
        },
        {
          name: "Ampaiah",
          position: "Sericulture Officer",
          mobile: "7396166656"
        },
        {
          name: "Kodanda",
          position: "Veterinary Assistant Surgeon",
          mobile: "7981538462"
        }
      ]
    },
    {
      title: "Revenue Department",
      staff: [
        {
          name: "Chittibabu",
          position: "Mandal Revenue Officer",
          mobile: "9491077081"
        },
        {
          name: "Surya Prakesh",
          position: "HDT (Tahsildar Office)",
          mobile: "9573056183"
        }
      ]
    },
    {
      title: "Law Enforcement",
      staff: [
        {
          name: "Eswar Reddy",
          position: "Police CI(Urban)",
          mobile: "9440796737"
        },
        {
          name: "Subba Reddy",
          position: "Police SI",
          mobile: "9440796737"
        },
        {
          name: "Anvesh Naidu",
          position: "Exercise SI",
          mobile: "8187809160"
        }
      ]
    }
  ];

  const electedRepresentatives = {
    MPP: [
      {
        name: "H M Aswini",
        position: "MPP President",
        mobile: "9949408783"
      },
      {
        name: "Suguna",
        position: "MPP Member",
        mobile: "9550133403"
      }
    ],
    ZPTC: [
      {
        name: "A D S Saravana",
        position: "ZPTC Member",
        mobile: "9550300080"
      }
    ],
    Sarpanch: [
      {
        name: "CHINNATHAYEE",
        position: "Sarpanch - ADAVIBUDUGURU",
        mobile: "9440282283"
      },
      {
        name: "L N RAJENDRAN",
        position: "Sarpanch - BRAHMADEVARACHENU",
        mobile: "9553152188"
      },
      {
        name: "M KUMARASWAMY",
        position: "Sarpanch - CHANDAM",
        mobile: "9177305294"
      },
      {
        name: "S PERUMALU",
        position: "Sarpanch - CHEKKUNATHAM",
        mobile: "8309153683"
      },
      {
        name: "KANNAMMA",
        position: "Sarpanch - DASEGOUNURU",
        mobile: "9398631703"
      }
    ],
    MPTC: [
      {
        name: "Munemma",
        position: "MPTC - Mohamadpuram & Devarajapuram",
        mobile: "8978735490"
      },
      {
        name: "Deepa kmar",
        position: "MPTC - Kangundi",
        mobile: "9959816811"
      },
      {
        name: "Mohan",
        position: "MPTC - Nayanuru & Brahmadeavrachenlu",
        mobile: "9786131943"
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LeadershipBanner />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <StaffSection departments={departments} />
          <RepresentativesSection representatives={electedRepresentatives} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Staff;
