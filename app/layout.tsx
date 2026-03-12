import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export const metadata: Metadata = {
  title: {
    default: 'Petrex Estate and Property Managers',
    template: '%s | Petrex Estate',
  },
  description:
    'Find your dream property in Nigeria. Buy, rent, and sell properties across Lagos, Abuja, Port Harcourt and all 36 states.',
  keywords: ['real estate nigeria', 'properties for sale lagos', 'rent apartment abuja', 'nigerian property'],
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: 'Petrex Estate and Property Managers',
  },
};

export const viewport: Viewport = {
  themeColor: '#1a3c6e',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
