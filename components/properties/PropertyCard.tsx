import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Bed, Bath, Maximize, MessageCircle } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatPrice, whatsappLink } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface PropertyCardProps {
  property: Property;
}

function statusBadge(status: Property['status']) {
  if (status === 'for_sale') return <Badge variant="blue">For Sale</Badge>;
  if (status === 'for_rent') return <Badge variant="green">For Rent</Badge>;
  return <Badge variant="gray">Sold</Badge>;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const primaryImage =
    property.images?.find((img) => img.is_primary)?.url ||
    property.images?.[0]?.url ||
    'https://picsum.photos/seed/placeholder/800/600';

  const agentPhone = property.agent?.whatsapp || property.agent?.phone || '';

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
      {/* Image */}
      <Link href={`/properties/${property.slug}`} className="relative block overflow-hidden h-52">
        <Image
          src={primaryImage}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3">{statusBadge(property.status)}</div>
        {property.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="orange">Featured</Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xl font-bold text-primary mb-1">{formatPrice(property.price)}</div>
        <Link
          href={`/properties/${property.slug}`}
          className="font-semibold text-gray-800 hover:text-primary transition-colors line-clamp-1 mb-1"
        >
          {property.title}
        </Link>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">
            {property.address}, {property.city}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-gray-600 text-sm mb-4">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {property.bathrooms} Baths
            </span>
          )}
          {property.size_sqm > 0 && (
            <span className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              {property.size_sqm}sqm
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <Link
            href={`/properties/${property.slug}`}
            className="flex-1 text-center bg-primary text-white text-sm font-semibold py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            View Details
          </Link>
          {agentPhone && (
            <a
              href={whatsappLink(agentPhone, property.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-green-500 text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
