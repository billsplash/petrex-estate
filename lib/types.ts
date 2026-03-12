export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  status: 'for_sale' | 'for_rent' | 'sold';
  type: 'apartment' | 'duplex' | 'land' | 'commercial' | 'office' | 'bungalow' | 'mansion';
  bedrooms: number;
  bathrooms: number;
  size_sqm: number;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  agent_id: string;
  approved: boolean;
  featured: boolean;
  views: number;
  images?: PropertyImage[];
  agent?: Agent;
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface Agent {
  id: string;
  full_name: string;
  avatar_url: string;
  phone: string;
  whatsapp: string;
  role: 'buyer' | 'agent' | 'admin';
  bio: string;
  agency_name: string;
  listings_count?: number;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  author_id: string;
  author?: Agent;
  published: boolean;
  category?: string;
  created_at: string;
}

export interface Inquiry {
  id: string;
  property_id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'info' | 'inspection' | 'mortgage';
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  property_id: string;
  amount: number;
  type: 'booking_fee' | 'deposit' | 'subscription';
  status: 'pending' | 'success' | 'failed';
  paystack_ref: string;
  created_at: string;
}

export interface SearchFilters {
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  status?: string;
  keyword?: string;
}
