import { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Heart, Bell, Plus } from 'lucide-react';
import { mockProperties } from '@/lib/mock-data';
import PropertyCard from '@/components/properties/PropertyCard';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  const myListings = mockProperties.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">My Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage your properties and inquiries</p>
        </div>
        <Link
          href="/dashboard/post-property"
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Post a Property
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Building2, label: 'My Listings', value: '3', color: 'text-primary' },
          { icon: Heart, label: 'Saved Properties', value: '7', color: 'text-red-500' },
          { icon: Bell, label: 'New Inquiries', value: '2', color: 'text-orange-500' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
            <Icon className={`h-8 w-8 ${color}`} />
            <div>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-5">My Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {myListings.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}
