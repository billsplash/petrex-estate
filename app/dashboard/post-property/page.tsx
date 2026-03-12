'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { NIGERIAN_STATES, NIGERIAN_CITIES } from '@/lib/utils';

const schema = z.object({
  title: z.string().min(5, 'Title required'),
  description: z.string().min(20, 'Description too short'),
  type: z.enum(['apartment', 'duplex', 'land', 'commercial', 'office', 'bungalow', 'mansion']),
  status: z.enum(['for_sale', 'for_rent']),
  price: z.number().positive('Price must be positive'),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  size_sqm: z.number().positive('Size required'),
  address: z.string().min(3, 'Address required'),
  city: z.string().min(1, 'City required'),
  state: z.string().min(1, 'State required'),
});

type FormData = z.infer<typeof schema>;

const STEPS = ['Basic Info', 'Details', 'Location'];

export default function PostPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { bedrooms: 0, bathrooms: 0, status: 'for_sale', type: 'apartment' },
  });

  const nextStep = async () => {
    let valid = false;
    if (step === 0) valid = await trigger(['title', 'description', 'type', 'status']);
    else if (step === 1) valid = await trigger(['price', 'bedrooms', 'bathrooms', 'size_sqm']);
    else valid = true;
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = async (data: FormData) => {
    console.log('Property submitted:', data);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Property Submitted!</h2>
        <p className="text-gray-500 mb-6">
          Your listing will be reviewed and published within 24 hours.
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold text-primary mb-2">Post Your Property</h1>
      <p className="text-gray-500 text-sm mb-8">Fill in the details to list your property</p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                i <= step
                  ? 'bg-primary border-primary text-white'
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm font-medium hidden sm:block ${
                i <= step ? 'text-primary' : 'text-gray-400'
              }`}
            >
              {s}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-8 ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          {/* Step 0: Basic Info */}
          {step === 0 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Title *
                </label>
                <input
                  {...register('title')}
                  placeholder="e.g. 3-Bedroom Apartment in Lekki"
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  placeholder="Describe the property in detail..."
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type *
                  </label>
                  <select
                    {...register('type')}
                    className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {[
                      'apartment',
                      'duplex',
                      'land',
                      'commercial',
                      'office',
                      'bungalow',
                      'mansion',
                    ].map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Listing Type *
                  </label>
                  <select
                    {...register('status')}
                    className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="for_sale">For Sale</option>
                    <option value="for_rent">For Rent</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Step 1: Details */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦) *</label>
                <input
                  {...register('price', { valueAsNumber: true })}
                  type="number"
                  placeholder="e.g. 45000000"
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <input
                    {...register('bedrooms', { valueAsNumber: true })}
                    type="number"
                    min={0}
                    className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                  <input
                    {...register('bathrooms', { valueAsNumber: true })}
                    type="number"
                    min={0}
                    className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size (sqm) *
                  </label>
                  <input
                    {...register('size_sqm', { valueAsNumber: true })}
                    type="number"
                    min={0}
                    className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.size_sqm && (
                    <p className="text-red-500 text-xs mt-1">{errors.size_sqm.message}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input
                  {...register('address')}
                  placeholder="e.g. 15 Admiralty Way, Lekki"
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <select
                    {...register('city')}
                    className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select City</option>
                    {NIGERIAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <select
                    {...register('state')}
                    className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select State</option>
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0}
            className="flex items-center gap-2 px-5 py-2.5 border rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-secondary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-secondary-600 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Listing'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
