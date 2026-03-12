'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

const tabs = ['Request Info', 'Schedule Inspection', 'Mortgage Inquiry'] as const;
type Tab = (typeof tabs)[number];

const typeMap: Record<Tab, 'info' | 'inspection' | 'mortgage'> = {
  'Request Info': 'info',
  'Schedule Inspection': 'inspection',
  'Mortgage Inquiry': 'mortgage',
};

interface InquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

export default function InquiryForm({ propertyId, propertyTitle }: InquiryFormProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Request Info');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, property_id: propertyId, type: typeMap[activeTab] }),
      });
      setSubmitted(true);
      reset();
    } catch {
      // fail silently for demo
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
        <h3 className="font-bold text-green-800 text-lg mb-2">Inquiry Sent!</h3>
        <p className="text-green-600 text-sm mb-4">
          Our agent will contact you shortly about &quot;{propertyTitle}&quot;.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-primary font-medium hover:underline text-sm"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs sm:text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
        <div>
          <input
            {...register('name')}
            placeholder="Your Full Name *"
            className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Email Address *"
            className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register('phone')}
            type="tel"
            placeholder="Phone Number *"
            className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <textarea
            {...register('message')}
            rows={4}
            placeholder={
              activeTab === 'Request Info'
                ? 'I would like more information about this property...'
                : activeTab === 'Schedule Inspection'
                ? 'I would like to schedule a viewing on...'
                : 'I need information about mortgage options for this property...'
            }
            className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {submitting ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  );
}
