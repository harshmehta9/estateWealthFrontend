
import { Building2, Users, FileText, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Properties', value: '156', icon: Building2, color: 'bg-blue-500' },
  { label: 'Active Users', value: '2,451', icon: Users, color: 'bg-green-500' },
  { label: 'Blog Posts', value: '45', icon: FileText, color: 'bg-yellow-500' },
  { label: 'Monthly Views', value: '15,245', icon: TrendingUp, color: 'bg-purple-500' },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add more dashboard content here */}
    </div>
  );
}