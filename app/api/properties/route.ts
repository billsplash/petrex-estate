import { NextResponse } from 'next/server';
import { mockProperties } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let properties = [...mockProperties];

  const location = searchParams.get('location');
  const type = searchParams.get('type');
  const status = searchParams.get('status');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const featured = searchParams.get('featured');

  if (location) {
    properties = properties.filter(
      (p) =>
        p.city.toLowerCase().includes(location.toLowerCase()) ||
        p.state.toLowerCase().includes(location.toLowerCase())
    );
  }
  if (type) properties = properties.filter((p) => p.type === type);
  if (status) properties = properties.filter((p) => p.status === status);
  if (minPrice) properties = properties.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) properties = properties.filter((p) => p.price <= Number(maxPrice));
  if (featured === 'true') properties = properties.filter((p) => p.featured);

  return NextResponse.json({ data: properties, total: properties.length });
}
