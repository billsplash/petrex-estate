import { Metadata } from 'next';
import ListingsTable from '@/components/admin/ListingsTable';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Manage Listings | Admin' };

export default function AdminListingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Listings Management</h1>
          <p className="text-gray-500 text-sm">Approve, edit, or remove property listings</p>
        </div>
        <Link href="/dashboard/post-property" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors">
          <Plus className="h-4 w-4" /> Add Listing
        </Link>
      </div>
      <ListingsTable />
    </div>
  );
}
