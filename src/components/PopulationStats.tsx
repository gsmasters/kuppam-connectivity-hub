import { Card, CardContent } from "@/components/ui/card";

export const PopulationStats = () => {
  const stats = [
    { label: "Total Population", value: "75,432" },
    { label: "Villages", value: "24" },
    { label: "Gram Panchayats", value: "16" },
    { label: "Sachivalayams", value: "12" }
  ];

  return (
    <div className="bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8">Kuppam Mandal Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};