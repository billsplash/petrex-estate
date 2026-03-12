import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { Phone, MessageCircle, Building2, Calendar } from 'lucide-react';
import { mockAgents, mockProperties } from '@/lib/mock-data';
import { whatsappLink } from '@/lib/utils';
import PropertyCard from '@/components/properties/PropertyCard';
import { format } from 'date-fns';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return mockAgents.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const agent = mockAgents.find((a) => a.id === id);
  if (!agent) return { title: 'Agent Not Found' };
  return { title: agent.full_name, description: agent.bio };
}

export default async function AgentProfilePage({ params }: Props) {
  const { id } = await params;
  const agent = mockAgents.find((a) => a.id === id);
  if (!agent) notFound();

  const listings = mockProperties.filter((p) => p.agent_id === agent.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center lg:col-span-1">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-5">
            <Image
              src={agent.avatar_url}
              alt={agent.full_name}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <h1 className="text-2xl font-bold text-primary mb-1">{agent.full_name}</h1>
          <p className="text-secondary font-medium mb-4">{agent.agency_name}</p>
          <p className="text-gray-600 text-sm mb-6">{agent.bio}</p>

          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-6">
            <Building2 className="h-4 w-4" />
            {listings.length} active listings
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mb-6">
            <Calendar className="h-4 w-4" />
            Joined {format(new Date(agent.created_at), 'MMMM yyyy')}
          </div>

          <div className="space-y-3">
            <a
              href={`tel:${agent.phone}`}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              {agent.phone}
            </a>
            <a
              href={whatsappLink(agent.whatsapp || agent.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Listings */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Listings by {agent.full_name}
          </h2>
          {listings.length === 0 ? (
            <p className="text-gray-500">No listings found for this agent.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {listings.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
