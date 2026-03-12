import { Metadata } from 'next';
import AgentCard from '@/components/agents/AgentCard';
import { mockAgents } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Our Agents',
  description: 'Meet the Petrex Estate team of expert property agents across Nigeria.',
};

export default function AgentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary mb-3">Our Expert Agents</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our team of experienced real estate professionals is ready to guide you through every step
          of your property journey across Nigeria.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
