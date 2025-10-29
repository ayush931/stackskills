// filepath: /home/ayush/code/stackskills/components/forms/StudentRegistrationForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function StudentRegistrationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    school: "",
    grade: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    parentName: "",
    parentPhone: "",
    parentEmail: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show loading toast
    toast({
      title: "⏳ Submitting Registration...",
      description: "Please wait while we process your student registration.",
      variant: "loading" as any,
    });

    try {
      const response = await fetch("/api/student-register", {
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
          description: result.message || "Your student registration has been submitted successfully. Check your email for confirmation.",
          variant: "success" as any,
        });

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          gender: "",
          school: "",
          grade: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          parentName: "",
          parentPhone: "",
          parentEmail: ""
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter your full name"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
          <input
            type="date"
            required
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">School Name *</label>
          <input
            type="text"
            required
            value={formData.school}
            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter school name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Class *</label>
          <input
            type="text"
            required
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., 10th, 12th"
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
            placeholder="Enter your address"
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
          "Register Student"
        )}
      </Button>
    </form>
  );
}