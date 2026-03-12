import { formatPrice } from '@/lib/utils';
import { mockProperties } from '@/lib/mock-data';
import Badge from '@/components/ui/Badge';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function ListingsTable() {
  const properties = mockProperties.slice(0, 8);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Property', 'Type', 'Price', 'Status', 'Date', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {properties.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-800 line-clamp-1">{p.title}</p>
                    <p className="text-gray-400 text-xs">
                      {p.city}, {p.state}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 capitalize">{p.type}</td>
                <td className="px-4 py-3 font-semibold text-primary">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  {p.approved ? (
                    <Badge variant="green">Approved</Badge>
                  ) : (
                    <Badge variant="orange">Pending</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {new Date(p.created_at).toLocaleDateString('en-NG')}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-green-600 hover:bg-green-50 rounded">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
