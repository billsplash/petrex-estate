'use client';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title: string;
}

export default function PropertyMap({ latitude, longitude, title }: PropertyMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (apiKey) {
    // Use Google Maps embed when API key is available
    const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=15`;
    return (
      <div className="rounded-xl overflow-hidden h-64">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src={src}
          title={`Map of ${title}`}
        />
      </div>
    );
  }

  // Fallback: OpenStreetMap embed (no API key needed)
  const osmSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className="rounded-xl overflow-hidden h-64 border border-gray-200">
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        src={osmSrc}
        title={`Map of ${title}`}
        style={{ border: 0 }}
      />
    </div>
  );
}
