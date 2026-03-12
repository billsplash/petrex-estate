'use client';

import { useState, useEffect } from 'react';
import { Property, SearchFilters } from '@/lib/types';
import { mockProperties } from '@/lib/mock-data';

export function useProperties(filters?: SearchFilters) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...mockProperties];
      if (filters?.location) {
        filtered = filtered.filter(
          (p) =>
            p.city.toLowerCase().includes(filters.location!.toLowerCase()) ||
            p.state.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      if (filters?.type) {
        filtered = filtered.filter((p) => p.type === filters.type);
      }
      if (filters?.status) {
        filtered = filtered.filter((p) => p.status === filters.status);
      }
      if (filters?.minPrice) {
        filtered = filtered.filter((p) => p.price >= filters.minPrice!);
      }
      if (filters?.maxPrice) {
        filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
      }
      if (filters?.bedrooms) {
        filtered = filtered.filter((p) => p.bedrooms >= filters.bedrooms!);
      }
      if (filters?.keyword) {
        const kw = filters.keyword.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(kw) ||
            p.description.toLowerCase().includes(kw) ||
            p.address.toLowerCase().includes(kw)
        );
      }
      setProperties(filtered);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [
    filters?.location,
    filters?.type,
    filters?.status,
    filters?.minPrice,
    filters?.maxPrice,
    filters?.bedrooms,
    filters?.keyword,
  ]);

  return { properties, loading, error };
}
