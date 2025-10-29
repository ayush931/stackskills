// filepath: /home/ayush/code/stackskills/components/forms/SchoolRegistrationForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function SchoolRegistrationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolEmail: "",
    district: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    board: "",
    authorizedPersonName: "",
    authorizedPersonEmail: "",
    designation: "",
    phoneNo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show loading toast
    toast({
      title: "⏳ Submitting Registration...",
      description: "Please wait while we process your school registration.",
      variant: "loading" as any,
    });

    try {
      const response = await fetch("/api/school-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Success toast
        toast({
          title: "✅ Registration Successful!",
          description: result.message || "Your school registration has been submitted successfully. We'll contact you soon.",
          variant: "success" as any,
        });

        // Reset form
        setFormData({
          schoolName: "",
          schoolEmail: "",
          district: "",
          street: "",
          city: "",
          state: "",
          pincode: "",
          board: "",
          authorizedPersonName: "",
          authorizedPersonEmail: "",
          designation: "",
          phoneNo: "",
        });
      } else {
        // Error toast with specific error message from API
        toast({
          title: "❌ Registration Failed",
          description: result.error || "There was an error submitting your registration. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      // Error toast for network issues
      toast({
        title: "⚠️ Network Error",
        description: "Unable to connect to the server. Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">School Name *</label>
          <input
            type="text"
            required
            value={formData.schoolName}
            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter school name"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">School Email *</label>
          <input
            type="text"
            required
            value={formData.schoolEmail}
            onChange={(e) => setFormData({ ...formData, schoolEmail: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="school@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
          <input
            type="text"
            required
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter district"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Board *</label>
          <input
            type="text"
            required
            value={formData.board}
            onChange={(e) => setFormData({ ...formData, board: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter board name (e.g., CBSE, ICSE, State Board)"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
          <input
            type="text"
            required
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter street address"
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Authorized Person Details</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            required
            value={formData.authorizedPersonName}
            onChange={(e) => setFormData({ ...formData, authorizedPersonName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
          <input
            type="text"
            required
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., Principal, Director"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.authorizedPersonEmail}
            onChange={(e) => setFormData({ ...formData, authorizedPersonEmail: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="person@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            required
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            value={formData.phoneNo}
            onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
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
          "Register School"
        )}
      </Button>
    </form>
  );
}