import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle, Star } from 'lucide-react';
import { Agent } from '@/lib/types';
import { whatsappLink } from '@/lib/utils';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center">
      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
        <Image
          src={agent.avatar_url || 'https://picsum.photos/seed/default/200/200'}
          alt={agent.full_name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <h3 className="font-bold text-lg text-primary">{agent.full_name}</h3>
      <p className="text-secondary text-sm font-medium mb-1">{agent.agency_name}</p>
      <div className="flex items-center gap-1 text-accent mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
      </div>
      <p className="text-gray-500 text-sm line-clamp-3 mb-4">{agent.bio}</p>
      <p className="text-gray-600 text-sm mb-5 font-medium">
        {agent.listings_count ?? 0} listings
      </p>
      <div className="flex gap-2 w-full">
        <a
          href={`tel:${agent.phone}`}
          className="flex-1 flex items-center justify-center gap-1 bg-primary text-white text-sm py-2 rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <a
          href={whatsappLink(agent.whatsapp || agent.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white text-sm py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
      <Link
        href={`/agents/${agent.id}`}
        className="mt-3 w-full text-center border border-primary text-primary text-sm py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
      >
        View Profile
      </Link>
    </div>
  );
}
