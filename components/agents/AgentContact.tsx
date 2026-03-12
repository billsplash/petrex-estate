import Image from 'next/image';
import { Phone, MessageCircle, Mail, Building2 } from 'lucide-react';
import { Agent } from '@/lib/types';
import { whatsappLink } from '@/lib/utils';

interface AgentContactProps {
  agent: Agent;
  propertyTitle?: string;
}

export default function AgentContact({ agent, propertyTitle }: AgentContactProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-gray-800 mb-4">Contact Agent</h3>

      <div className="flex items-center gap-4 mb-5">
        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
          <Image
            src={agent.avatar_url || 'https://picsum.photos/seed/default/200/200'}
            alt={agent.full_name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{agent.full_name}</p>
          <p className="text-secondary text-sm">{agent.agency_name}</p>
          {agent.listings_count !== undefined && (
            <p className="text-gray-500 text-xs">{agent.listings_count} listings</p>
          )}
        </div>
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
          href={whatsappLink(agent.whatsapp || agent.phone, propertyTitle)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 rounded-lg font-medium hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
        </a>

        <a
          href={`mailto:${agent.full_name.toLowerCase().replace(' ', '.')}@petrexestate.com`}
          className="w-full flex items-center justify-center gap-2 border border-primary text-primary py-2.5 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
        >
          <Mail className="h-4 w-4" />
          Send Email
        </a>

        {agent.agency_name && (
          <div className="flex items-center gap-2 text-gray-500 text-sm pt-1">
            <Building2 className="h-4 w-4 shrink-0" />
            <span>{agent.agency_name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
