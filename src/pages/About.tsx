import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Baby, GraduationCap, Building2, Users2 } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const About = () => {
  const religionData = [
    { name: "Hindu", value: 84.43 },
    { name: "Muslim", value: 14.33 },
    { name: "Christian", value: 0.96 },
    { name: "Sikh", value: 0.01 },
    { name: "Jain", value: 0.05 },
    { name: "Others", value: 0.01 },
    { name: "No Religion", value: 0.20 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  const populationStats = [
    {
      title: "Total Population (2011)",
      value: "21,963",
      description: "11,091 males, 10,872 females",
      icon: Users
    },
    {
      title: "Children (0-6 years)",
      value: "2,551",
      description: "11.61% of total population",
      icon: Baby
    },
    {
      title: "Literacy Rate",
      value: "83.62%",
      description: "Male: 88.09%, Female: 79.10%",
      icon: GraduationCap
    },
    {
      title: "Houses Under Administration",
      value: "5,186",
      description: "Basic amenities provided",
      icon: Building2
    },
    {
      title: "Working Population",
      value: "8,640",
      description: "6,200 males, 2,440 females",
      icon: Users2
    }
  ];

  const casteData = [
    { name: "SC", value: 14.92 },
    { name: "ST", value: 1.03 },
    { name: "Others", value: 84.05 }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">About Kuppam</h1>
        
        <div className="prose max-w-none mb-8">
          <p className="text-gray-600">
            Kuppam is a Census Town city in the district of Chittoor, Andhra Pradesh. 
            The current estimated population of Kuppam Census Town in 2024 is approximately 31,000.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {populationStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Religious Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={religionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} (${value}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {religionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Caste Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={casteData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8">
                      {casteData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <div className="space-y-4">
                <p>
                  The schedule census of 2021 for Kuppam city was postponed due to COVID-19. 
                  New population census for Kuppam city will be conducted in 2024.
                </p>
                <p>
                  Out of the total working population of 8,640, 89.59% were engaged in Main Work 
                  while 10.41% of total workers were engaged in Marginal Work.
                </p>
                <p>
                  In Kuppam Census Town, Female Sex Ratio is 980 against state average of 993. 
                  The Child Sex Ratio is around 904 compared to Andhra Pradesh state average of 939.
                </p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default About;