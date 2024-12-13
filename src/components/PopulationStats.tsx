import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Users, User, Percent } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const PopulationStats = () => {
  const populationData = [
    { category: 'ST', male: 608, female: 566, total: 1174 },
    { category: 'SC', male: 3990, female: 3938, total: 7928 },
    { category: 'Others', male: 32948, female: 31831, total: 64779 },
  ];

  const totalPopulation = {
    male: 37546,
    female: 36335,
    total: 73881
  };

  const literacyData = [
    { gender: 'Male', count: 19963, percentage: 53.17 },
    { gender: 'Female', count: 14394, percentage: 39.61 },
  ];

  const COLORS = ['#DD4814', '#F4A261', '#E9C46A'];

  const pieData = populationData.map(item => ({
    name: item.category,
    value: item.total
  }));

  return (
    <section className="py-16 bg-gradient-to-r from-amber-500/10 to-amber-600/20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#DD4814]">Population Statistics (Census 2011)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-t-4 border-t-[#DD4814]">
            <CardHeader>
              <Users className="h-8 w-8 text-[#DD4814] mb-2" />
              <CardTitle className="text-lg text-[#DD4814]">Total Population</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPopulation.total.toLocaleString()}</div>
              <div className="text-gray-600 mt-2">
                Male: {totalPopulation.male.toLocaleString()} | Female: {totalPopulation.female.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#DD4814]">
            <CardHeader>
              <User className="h-8 w-8 text-[#DD4814] mb-2" />
              <CardTitle className="text-lg text-[#DD4814]">Population Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#DD4814"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#DD4814]">
            <CardHeader>
              <Percent className="h-8 w-8 text-[#DD4814] mb-2" />
              <CardTitle className="text-lg text-[#DD4814]">Literacy Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">46.50%</div>
              <div className="text-gray-600 mt-2">
                Male: 53.17% | Female: 39.61%
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-t-4 border-t-[#DD4814]">
          <CardHeader>
            <CardTitle className="text-lg text-[#DD4814]">Population by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={populationData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="male" name="Male" fill="#DD4814" />
                <Bar dataKey="female" name="Female" fill="#F4A261" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};