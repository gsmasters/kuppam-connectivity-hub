import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Staff = () => {
  const staffList = [
    {
      name: "P.SAI LAHARI",
      position: "MPDO",
      mobile: "9491071391",
    },
    {
      name: "L VIJAYDATH",
      position: "EOPRD",
      mobile: "9440237609",
    },
    // Add more staff members as needed
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Staff Directory</h1>
        <div className="grid gap-6">
          {staffList.map((staff, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm border"
            >
              <h3 className="text-xl font-semibold text-gray-900">{staff.name}</h3>
              <p className="text-gray-600 mt-2">{staff.position}</p>
              <p className="text-gray-600 mt-1">Contact: {staff.mobile}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Staff;