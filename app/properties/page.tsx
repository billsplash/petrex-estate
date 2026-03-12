'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchFilterBar from '@/components/properties/SearchFilterBar';
import PropertyCard from '@/components/properties/PropertyCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useProperties } from '@/hooks/useProperties';
import { SearchFilters } from '@/lib/types';

function PropertiesContent() {
  const searchParams = useSearchParams();

  const filters: SearchFilters = {
    location: searchParams.get('location') || undefined,
    type: searchParams.get('type') || undefined,
    status: searchParams.get('status') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined,
    keyword: searchParams.get('keyword') || undefined,
  };

  const { properties, loading } = useProperties(filters);

  return (
    <div>
      <SearchFilterBar />

      {loading ? (
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No properties match your criteria.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 text-sm mb-4">{properties.length} properties found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Properties</h1>
        <p className="text-gray-500 mt-1">Browse all available properties across Nigeria</p>
      </div>
      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <PropertiesContent />
      </Suspense>
    </div>
  );
}
