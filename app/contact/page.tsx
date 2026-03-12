import { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Petrex Estate and Property Managers.',
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary mb-2">Contact Us</h1>
        <p className="text-gray-600">We are here to help you find your perfect property</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Send us a Message</h2>
          <ContactForm />
        </div>

        {/* Contact info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Get in Touch</h2>
            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  label: 'Address',
                  value: '123 Petrex House, Victoria Island, Lagos, Nigeria',
                },
                { icon: Phone, label: 'Phone', value: '+234 800 000 0000' },
                { icon: Mail, label: 'Email', value: 'info@petrexestate.com' },
                { icon: Clock, label: 'Working Hours', value: 'Mon – Sat: 8:00AM – 6:00PM' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="bg-primary-50 p-2.5 rounded-lg shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase">{label}</p>
                    <p className="text-gray-700 text-sm mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348000000000'}?text=Hello, I have a property enquiry`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-500 text-white rounded-2xl p-6 text-center hover:bg-green-600 transition-colors"
          >
            <p className="text-2xl mb-2">💬</p>
            <p className="font-bold text-lg">Chat on WhatsApp</p>
            <p className="text-green-100 text-sm mt-1">We typically respond within minutes</p>
          </a>
        </div>
      </div>
    </div>
  );
}
