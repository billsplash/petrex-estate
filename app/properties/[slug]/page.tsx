import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MapPin, Bed, Bath, Maximize, Eye, Calendar, CheckCircle } from 'lucide-react';
import { mockProperties } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import PropertyGallery from '@/components/properties/PropertyGallery';
import PropertyMap from '@/components/properties/PropertyMap';
import AgentContact from '@/components/agents/AgentContact';
import InquiryForm from '@/components/forms/InquiryForm';
import Badge from '@/components/ui/Badge';
import { format } from 'date-fns';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockProperties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = mockProperties.find((p) => p.slug === slug);
  if (!property) return { title: 'Property Not Found' };
  return {
    title: property.title,
    description: property.description?.slice(0, 160),
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = mockProperties.find((p) => p.slug === slug);
  if (!property) notFound();

  const statusVariant =
    property.status === 'for_sale' ? 'blue' : property.status === 'for_rent' ? 'green' : 'gray';
  const statusLabel =
    property.status === 'for_sale'
      ? 'For Sale'
      : property.status === 'for_rent'
      ? 'For Rent'
      : 'Sold';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <Badge variant={statusVariant}>{statusLabel}</Badge>
          <span className="text-gray-400 capitalize text-sm">{property.type}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">{property.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {property.address}, {property.city}, {property.state}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {property.views} views
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Listed {format(new Date(property.created_at), 'MMM dd, yyyy')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <PropertyGallery images={property.images || []} title={property.title} />

          <div className="bg-white rounded-xl p-5 shadow-sm flex flex-wrap gap-6 items-center">
            <div>
              <p className="text-3xl font-bold text-primary">{formatPrice(property.price)}</p>
              {property.status === 'for_rent' && (
                <p className="text-gray-400 text-sm">per year</p>
              )}
            </div>
            <div className="flex flex-wrap gap-5 text-gray-600">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1.5">
                  <Bed className="h-5 w-5 text-primary" />
                  {property.bedrooms} Bedrooms
                </span>
              )}
              {property.bathrooms > 0 && (
                <span className="flex items-center gap-1.5">
                  <Bath className="h-5 w-5 text-primary" />
                  {property.bathrooms} Bathrooms
                </span>
              )}
              {property.size_sqm > 0 && (
                <span className="flex items-center gap-1.5">
                  <Maximize className="h-5 w-5 text-primary" />
                  {property.size_sqm} sqm
                </span>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-bold text-lg text-gray-800 mb-3">About this Property</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {property.amenities.length > 0 && (
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h2 className="font-bold text-lg text-gray-800 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle className="h-4 w-4 text-secondary shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-bold text-lg text-gray-800 mb-4">Location</h2>
            <PropertyMap
              latitude={property.latitude}
              longitude={property.longitude}
              title={property.title}
            />
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {property.agent && (
            <AgentContact agent={property.agent} propertyTitle={property.title} />
          )}
          <InquiryForm propertyId={property.id} propertyTitle={property.title} />
        </div>
      </div>
    </div>
  );
}
