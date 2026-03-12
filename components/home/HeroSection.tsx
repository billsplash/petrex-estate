'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { NIGERIAN_CITIES } from '@/lib/utils';

export default function HeroSection() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (type) params.set('type', type);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://picsum.photos/seed/hero/1920/1080)' }}
      />
      {/* Blue overlay */}
      <div className="absolute inset-0 bg-primary/80" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Find Your Dream Home <br className="hidden sm:block" />
          <span className="text-accent">in Nigeria</span>
        </h1>
        <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
          Discover thousands of verified properties across Lagos, Abuja, Port Harcourt and beyond.
          Your perfect property is just a search away.
        </p>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
        >
          {/* Location */}
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 lg:col-span-1">
            <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 text-sm text-gray-700 bg-transparent focus:outline-none"
            >
              <option value="">All Locations</option>
              {NIGERIAN_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 lg:col-span-1">
            <Home className="h-4 w-4 text-gray-400 shrink-0" />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="flex-1 text-sm text-gray-700 bg-transparent focus:outline-none"
            >
              <option value="">Property Type</option>
              {['apartment', 'duplex', 'land', 'commercial', 'office', 'bungalow', 'mansion'].map(
                (t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Min Price */}
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 lg:col-span-1">
            <DollarSign className="h-4 w-4 text-gray-400 shrink-0" />
            <input
              type="number"
              placeholder="Min Price (₦)"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="flex-1 text-sm text-gray-700 bg-transparent focus:outline-none placeholder-gray-400"
            />
          </div>

          {/* Max Price */}
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 lg:col-span-1">
            <DollarSign className="h-4 w-4 text-gray-400 shrink-0" />
            <input
              type="number"
              placeholder="Max Price (₦)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="flex-1 text-sm text-gray-700 bg-transparent focus:outline-none placeholder-gray-400"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="lg:col-span-1 bg-primary text-white rounded-lg px-6 py-2.5 font-semibold flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </form>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-white">
          {[
            { value: '2,500+', label: 'Properties Listed' },
            { value: '1,200+', label: 'Happy Clients' },
            { value: '36', label: 'States Covered' },
            { value: '50+', label: 'Expert Agents' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-accent">{stat.value}</div>
              <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
