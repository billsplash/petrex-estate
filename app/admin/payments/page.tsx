import { Metadata } from 'next';
import { formatPrice } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Payments | Admin' };

const mockPayments = [
  { id: 'pay-1', user: 'Adebayo Okafor', property: 'Spacious Family Villa', amount: 500000, type: 'booking_fee', status: 'success', date: '2024-03-01' },
  { id: 'pay-2', user: 'Chidinma Eze', property: 'Modern Apartment Lekki', amount: 1000000, type: 'deposit', status: 'success', date: '2024-03-05' },
  { id: 'pay-3', user: 'Emeka Nwosu', property: 'Commercial Office VI', amount: 250000, type: 'booking_fee', status: 'pending', date: '2024-03-10' },
  { id: 'pay-4', user: 'Fatima Aliyu', property: 'Duplex in Abuja Gwarinpa', amount: 150000, type: 'subscription', status: 'failed', date: '2024-03-12' },
];

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
        <p className="text-gray-500 text-sm">Track all payment transactions</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['User', 'Property', 'Amount', 'Type', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPayments.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{p.user}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{p.property}</td>
                  <td className="px-4 py-3 font-semibold text-primary">{formatPrice(p.amount)}</td>
                  <td className="px-4 py-3 text-gray-500 capitalize">{p.type.replace('_', ' ')}</td>
                  <td className="px-4 py-3">
                    <Badge variant={p.status === 'success' ? 'green' : p.status === 'pending' ? 'orange' : 'red'}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{new Date(p.date).toLocaleDateString('en-NG')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
