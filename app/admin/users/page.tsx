import { Metadata } from 'next';
import Image from 'next/image';
import { mockAgents } from '@/lib/mock-data';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Manage Users | Admin' };

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
        <p className="text-gray-500 text-sm">Manage registered agents and buyers</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['User', 'Role', 'Agency', 'Listings', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockAgents.map(agent => (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image src={agent.avatar_url} alt={agent.full_name} fill className="object-cover" sizes="32px" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{agent.full_name}</p>
                        <p className="text-gray-400 text-xs">{agent.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge variant="blue">{agent.role}</Badge></td>
                  <td className="px-4 py-3 text-gray-600">{agent.agency_name}</td>
                  <td className="px-4 py-3 font-semibold text-primary">{agent.listings_count ?? 0}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(agent.created_at).toLocaleDateString('en-NG')}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 transition-colors">Suspend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
