import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Users, UserRound, Percent, Building2 } from "lucide-react";
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

  const COLORS = ['#E5DEFF', '#FFDEE2', '#D3E4FD'];
  const CHART_COLORS = {
    male: '#D3E4FD',
    female: '#FFDEE2',
  };

  const pieData = populationData.map(item => ({
    name: item.category,
    value: item.total
  }));

  return (
    <section className="py-8 sm:py-16 bg-gradient-to-br from-[#F1F0FB] via-white to-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
          Kuppam Mandal Demographics
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card className="border-t-4 border-t-[#D3E4FD] hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1 sm:space-y-2">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-[#8E9196] mb-1 sm:mb-2" />
              <CardTitle className="text-base sm:text-lg">Total Population</CardTitle>
              <CardDescription className="text-sm">Census 2011</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{totalPopulation.total.toLocaleString()}</div>
              <div className="flex items-center justify-between mt-3 sm:mt-4">
                <div className="flex items-center gap-1 sm:gap-2">
                  <UserRound className="h-4 w-4 sm:h-5 sm:w-5 text-[#D3E4FD]" />
                  <span className="text-xs sm:text-sm text-gray-600">{totalPopulation.male.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <UserRound className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFDEE2]" />
                  <span className="text-xs sm:text-sm text-gray-600">{totalPopulation.female.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#FFDEE2] hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1 sm:space-y-2">
              <UserRound className="h-6 w-6 sm:h-8 sm:w-8 text-[#8E9196] mb-1 sm:mb-2" />
              <CardTitle className="text-base sm:text-lg">Gender Ratio</CardTitle>
              <CardDescription className="text-sm">Females per 1000 Males</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">967</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-2">
                Based on total population
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#E5DEFF] hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1 sm:space-y-2">
              <Percent className="h-6 w-6 sm:h-8 sm:w-8 text-[#8E9196] mb-1 sm:mb-2" />
              <CardTitle className="text-base sm:text-lg">Literacy Rate</CardTitle>
              <CardDescription className="text-sm">Overall</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">46.50%</div>
              <div className="flex items-center justify-between mt-3 sm:mt-4">
                <div className="flex items-center gap-1 sm:gap-2">
                  <UserRound className="h-4 w-4 sm:h-5 sm:w-5 text-[#D3E4FD]" />
                  <span className="text-xs sm:text-sm text-gray-600">53.17%</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <UserRound className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFDEE2]" />
                  <span className="text-xs sm:text-sm text-gray-600">39.61%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#aaadb0] hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1 sm:space-y-2">
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-[#8E9196] mb-1 sm:mb-2" />
              <CardTitle className="text-base sm:text-lg">Population Density</CardTitle>
              <CardDescription className="text-sm">Per Square KM</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">386</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-2">
                Total area: 191.45 sq.km
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-gray-800">Population Distribution</CardTitle>
              <CardDescription className="text-sm">By Category</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#D3E4FD"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-gray-800">Gender Distribution</CardTitle>
              <CardDescription className="text-sm">By Category</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={populationData}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="male" name="Male" fill={CHART_COLORS.male} />
                  <Bar dataKey="female" name="Female" fill={CHART_COLORS.female} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};