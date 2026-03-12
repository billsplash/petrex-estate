import { Metadata } from 'next';
import StatsCards from '@/components/admin/StatsCards';
import EarningsChart from '@/components/admin/EarningsChart';
import ListingsTable from '@/components/admin/ListingsTable';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm">Overview of Petrex Estate platform</p>
      </div>
      <StatsCards />
      <EarningsChart />
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Listings</h2>
        <ListingsTable />
      </div>
    </div>
  );
}
