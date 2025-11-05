// filepath: /home/ayush/code/stackskills/components/forms/OrganizationRegistrationForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function OrganizationRegistrationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactPersonName: '',
    contactPersonDesignation: '',
    contactPersonEmail: '',
    contactPersonPhone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show loading toast
    toast({
      title: '⏳ Submitting Registration...',
      description: 'Please wait while we process your organization registration.',
      variant: 'loading' as any,
    });

    try {
      const response = await fetch('/api/organization-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Success toast
        toast({
          title: '✅ Registration Successful!',
          description:
            result.message ||
            "Your organization registration has been submitted successfully. We'll contact you soon.",
          variant: 'success' as any,
        });

        // Reset form
        setFormData({
          organizationName: '',
          organizationType: '',
          email: '',
          phone: '',
          website: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          contactPersonName: '',
          contactPersonDesignation: '',
          contactPersonEmail: '',
          contactPersonPhone: '',
        });
      } else {
        // Error toast with specific error message from API
        toast({
          title: '❌ Registration Failed',
          description:
            result.error || 'There was an error submitting your registration. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Error toast for network issues
      toast({
        title: '⚠️ Network Error',
        description:
          'Unable to connect to the server. Please check your internet connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization Name *
          </label>
          <input
            type="text"
            required
            value={formData.organizationName}
            onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter organization name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="organization@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            required
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="10-digit number"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="https://www.example.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter office address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter city"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <input
            type="text"
            required
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter state"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
          <input
            type="text"
            required
            pattern="[0-9]{6}"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="6-digit pincode"
          />
        </div>

        <div className="md:col-span-2 border-t pt-6 mt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Person Details</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            required
            value={formData.contactPersonName}
            onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter contact person name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
          <input
            type="text"
            required
            value={formData.contactPersonDesignation}
            onChange={(e) => setFormData({ ...formData, contactPersonDesignation: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., HR Manager, CEO"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.contactPersonEmail}
            onChange={(e) => setFormData({ ...formData, contactPersonEmail: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="contact@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            required
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            value={formData.contactPersonPhone}
            onChange={(e) => setFormData({ ...formData, contactPersonPhone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="10-digit number"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Register Organization'
        )}
      </Button>
    </form>
  );
}
