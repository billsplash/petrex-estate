import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import { mockAgents } from '@/lib/mock-data';
import { whatsappLink } from '@/lib/utils';

export default function AgentsSection() {
  const agents = mockAgents.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-2">Meet Our Agents</h2>
          <p className="text-gray-600">Expert professionals ready to help you find the perfect property</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={agent.avatar_url}
                  alt={agent.full_name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <h3 className="font-bold text-lg text-primary">{agent.full_name}</h3>
              <p className="text-secondary text-sm font-medium mb-1">{agent.agency_name}</p>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{agent.bio}</p>
              <p className="text-gray-600 text-sm mb-4">
                {agent.listings_count} active listings
              </p>
              <div className="flex gap-2 justify-center">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center gap-1 bg-primary text-white text-sm px-3 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </a>
                <a
                  href={whatsappLink(agent.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-green-500 text-white text-sm px-3 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/agents"
            className="inline-block border-2 border-primary text-primary px-6 py-2.5 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            View All Agents
          </Link>
        </div>
      </div>
    </section>
  );
}
