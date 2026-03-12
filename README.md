# Petrex Estate and Property Managers

A full-featured, production-ready real estate website built with **Next.js 14**, **Tailwind CSS**, **Supabase**, and **Paystack** — targeting the Nigerian property market.

---

## 🚀 Features

- 🏠 **Property Listings** — Search, filter, and browse properties with photos, prices in ₦, location maps
- 🔍 **Advanced Search** — Filter by location, type, price range, bedrooms, status
- 🗺 **Google Maps Integration** — Interactive property location maps
- 📷 **Image Gallery** — Swiper-powered photo carousel on property detail pages
- 👤 **User Accounts** — Register/login via Supabase Auth, save favorites, post properties
- 🏢 **Agent Profiles** — Agent directory with WhatsApp direct chat
- 📝 **Inquiry Forms** — Request info, schedule inspection, mortgage inquiry
- 💳 **Paystack Payments** — Booking fees, deposits, and agent subscriptions
- 📢 **Blog** — Real estate tips, market updates, buying guides
- 🛡 **Admin Dashboard** — Manage listings, users, payments, and blog posts
- 📱 **PWA** — Installable Progressive Web App with offline support
- 🇳🇬 **Nigeria-focused** — ₦ Naira pricing, Nigerian states/cities, +234 phone numbers

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| PWA | next-pwa |
| Database | Supabase (Postgres) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Maps | Google Maps API / OpenStreetMap embed |
| Payments | Paystack |
| Email | Resend |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Gallery | Swiper |
| Charts | Recharts |
| Deploy | Vercel |

---

## 📁 Project Structure

```
petrex-estate/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── properties/         # Listings + detail
│   ├── agents/             # Agent directory + profile
│   ├── blog/               # Blog listing + detail
│   ├── contact/            # Contact page
│   ├── auth/               # Login + Register
│   ├── dashboard/          # User dashboard + post property
│   ├── admin/              # Admin dashboard + management pages
│   └── api/                # API routes
├── components/             # Reusable React components
│   ├── layout/             # Navbar, Footer
│   ├── home/               # Hero, FeaturedListings, About, Agents, Blog sections
│   ├── properties/         # PropertyCard, SearchFilterBar, Gallery, Map
│   ├── agents/             # AgentCard, AgentContact
│   ├── forms/              # InquiryForm, ContactForm
│   ├── admin/              # AdminSidebar, StatsCards, ListingsTable, EarningsChart
│   └── ui/                 # Button, Badge, LoadingSpinner
├── lib/
│   ├── mock-data.ts        # Sample properties, agents, blog posts (no DB needed)
│   ├── types.ts            # TypeScript interfaces
│   ├── utils.ts            # formatPrice, whatsappLink, slugify, etc.
│   └── supabase/           # Supabase client (browser + server)
├── hooks/                  # useProperties, useAuth, useFavorites
├── public/
│   ├── manifest.json       # PWA manifest
│   └── offline.html        # Offline fallback page
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql
```

---

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/billsplash/petrex-estate.git
cd petrex-estate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Petrex Estate and Property Managers"
NEXT_PUBLIC_WHATSAPP_NUMBER=2348000000000
```

> **Note:** The site works immediately with mock data even without Supabase configured.

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🗄 Supabase Setup

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com) and create a new project.

### 2. Run the database migration

In the Supabase SQL editor, run the contents of:

```
supabase/migrations/001_initial_schema.sql
```

This creates:
- `profiles` — User profiles (linked to Supabase auth)
- `properties` — Property listings
- `property_images` — Property photos
- `inquiries` — Contact/inquiry submissions
- `favorites` — User saved properties
- `posts` — Blog articles
- `payments` — Paystack payment records

Row Level Security (RLS) is enabled on all tables.

### 3. Set up Supabase Storage

Create a storage bucket called `property-images` with public access.

### 4. Enable Google Auth (optional)

In Supabase → Authentication → Providers → Google, enable Google OAuth.

---

## 💳 Paystack Setup

1. Create a [Paystack](https://paystack.com) account
2. Get your public and secret keys from the dashboard
3. Add them to `.env.local`

---

## 🗺 Google Maps Setup

1. Get an API key from [Google Cloud Console](https://console.cloud.google.com)
2. Enable the **Maps JavaScript API** and **Maps Embed API**
3. Add your key to `.env.local` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

> Without an API key, the site falls back to an OpenStreetMap iframe embed.

---

## 📧 Resend Email Setup

1. Create a [Resend](https://resend.com) account
2. Add your API key to `.env.local`
3. Verify your sending domain

---

## 🚢 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository at [vercel.com](https://vercel.com) and add the environment variables in the Vercel project settings.

---

## 🎨 Branding

| Asset | Value |
|---|---|
| Brand Name | Petrex Estate and Property Managers |
| Primary Color | `#1a3c6e` (Deep Blue) |
| Secondary Color | `#2e7d32` (Green) |
| Font | Poppins (Google Fonts) |
| Currency | Nigerian Naira (₦) |
| Phone Format | +234 (Nigeria) |

---

## 📱 PWA

The app is configured as a Progressive Web App. Users can install it on their phone:
- Android: "Add to Home Screen" prompt
- iOS: Share → Add to Home Screen

The service worker provides offline support via `public/offline.html`.

---

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📄 License

Private — Petrex Estate and Property Managers © 2024
