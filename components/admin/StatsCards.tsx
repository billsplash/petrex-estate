import { Building2, CheckCircle, Clock, DollarSign } from 'lucide-react';

const stats = [
  {
    label: 'Total Listings',
    value: '248',
    icon: Building2,
    color: 'bg-blue-50 text-blue-600',
    change: '+12 this month',
  },
  {
    label: 'Approved',
    value: '196',
    icon: CheckCircle,
    color: 'bg-green-50 text-green-600',
    change: '79% approval rate',
  },
  {
    label: 'Pending Review',
    value: '52',
    icon: Clock,
    color: 'bg-orange-50 text-orange-600',
    change: 'Needs attention',
  },
  {
    label: 'Total Earnings',
    value: '₦4.8M',
    icon: DollarSign,
    color: 'bg-emerald-50 text-emerald-600',
    change: '+8% this month',
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
          <div className={`p-3 rounded-xl ${stat.color}`}>
            <stat.icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
