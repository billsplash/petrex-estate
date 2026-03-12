import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const highlights = [
  'Over 10 years of experience in Nigerian real estate',
  'Verified listings across all 36 states',
  'Professional agents ready to assist you',
  'Secure payment processing via Paystack',
];

export default function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="text-secondary font-semibold mb-2 uppercase tracking-wide text-sm">
              About Petrex Estate
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6 leading-tight">
              Your Trusted Partner in Nigerian Real Estate
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Petrex Estate and Property Managers is Nigeria&apos;s leading real estate platform,
              connecting buyers, renters, sellers, and agents across every state. Whether you&apos;re
              looking for a luxury home in Lekki or a commercial space in Abuja, we have the right
              property for you.
            </p>
            <ul className="space-y-3 mb-8">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Learn More About Us
            </Link>
          </div>

          {/* Right */}
          <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://picsum.photos/seed/about/800/600"
              alt="About Petrex Estate"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
