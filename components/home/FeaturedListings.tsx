import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { mockProperties } from '@/lib/mock-data';
import PropertyCard from '@/components/properties/PropertyCard';

export default function FeaturedListings() {
  const featured = mockProperties.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">Featured Properties</h2>
            <p className="text-gray-600">Hand-picked premium properties for you</p>
          </div>
          <Link
            href="/properties"
            className="hidden sm:flex items-center gap-1 text-primary font-semibold hover:underline"
          >
            View All Properties <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
          >
            View All Properties <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
