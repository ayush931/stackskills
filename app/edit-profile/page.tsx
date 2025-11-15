'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Loader2, User, Phone, School, BookOpen, Shield } from 'lucide-react';
import Link from 'next/link';

interface UserProfile {
  id: string;
  name: string;
  phone: string;
  schoolName: string;
  className: string;
  role: 'USER' | 'ADMIN';
  stackId: string | null;
  createdAt: string;
}

export default function ProfileEditPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, role, setAuth } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    schoolName: '',
    className: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    schoolName: '',
    className: '',
  });

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to edit your profile',
        variant: 'destructive',
      });
      router.push('/login-user');
      return;
    }

    fetchProfile();
  }, [isLoggedIn, router]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);

      // Use different API endpoint based on role
      const apiEndpoint = role === 'ADMIN' ? '/api/get-admin' : '/api/get-user';

      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success && result.data) {
        setProfile(result.data);
        setFormData({
          name: result.data.name || '',
          phone: result.data.phone || '',
          schoolName: result.data.schoolName || '',
          className: result.data.className || '',
        });
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Failed to fetch profile',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while fetching your profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      phone: '',
      schoolName: '',
      className: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'School name is required';
    } else if (formData.schoolName.trim().length < 2) {
      newErrors.schoolName = 'School name must be at least 2 characters';
    }

    if (!formData.className.trim()) {
      newErrors.className = 'Class is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch('/api/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success!',
          description: 'Your profile has been updated successfully',
          variant: 'success',
        });

        // Update auth store with new data
        if (result.data) {
          setAuth(result.data.id, result.data.phone, result.data.role, result.data.name);
        }

        // Redirect based on role
        setTimeout(() => {
          if (role === 'ADMIN') {
            router.push('/');
          } else {
            router.push('/view-profile');
          }
        }, 1500);
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Failed to update profile',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while updating your profile',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getBackLink = () => {
    return role === 'ADMIN' ? '/' : '/view-profile';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-8 w-48 mb-6" />
          <Card className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href={getBackLink()}
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {role === 'ADMIN' ? 'Dashboard' : 'Profile'}
        </Link>

        {/* Edit Profile Form */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
                <CardDescription className="text-orange-50">
                  Update your personal and academic information
                </CardDescription>
              </div>
              {profile && (
                <Badge
                  variant={profile.role === 'ADMIN' ? 'default' : 'secondary'}
                  className={
                    profile.role === 'ADMIN'
                      ? 'bg-white text-orange-600 hover:bg-orange-50'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }
                >
                  <Shield className="w-3 h-3 mr-1" />
                  {profile.role}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center">
                  <User className="w-4 h-4 mr-2 text-orange-500" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-orange-500" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                  className={`${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>

              {/* School Name Field */}
              <div className="space-y-2">
                <Label htmlFor="schoolName" className="text-sm font-medium flex items-center">
                  <School className="w-4 h-4 mr-2 text-orange-500" />
                  School Name
                </Label>
                <Input
                  id="schoolName"
                  name="schoolName"
                  type="text"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  placeholder="Enter your school name"
                  className={`${errors.schoolName ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.schoolName && <p className="text-sm text-red-600">{errors.schoolName}</p>}
              </div>

              {/* Class Field */}
              <div className="space-y-2">
                <Label htmlFor="className" className="text-sm font-medium flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-orange-500" />
                  Class
                </Label>
                <Input
                  id="className"
                  name="className"
                  type="text"
                  value={formData.className}
                  onChange={handleInputChange}
                  placeholder="Enter your class (e.g., 8th, 9th)"
                  className={`${errors.className ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.className && <p className="text-sm text-red-600">{errors.className}</p>}
              </div>

              {/* Read-only Stack ID */}
              {profile?.stackId && (
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <Label className="text-sm font-medium text-gray-600">Stack ID (Read-only)</Label>
                  <p className="text-lg font-mono font-semibold text-gray-900">{profile.stackId}</p>
                  <p className="text-xs text-gray-500">Your unique identifier cannot be changed</p>
                </div>
              )}

              {/* Role Information */}
              {profile && (
                <div
                  className={`space-y-2 p-4 rounded-lg border-l-4 ${
                    profile.role === 'ADMIN'
                      ? 'bg-orange-50 border-orange-500'
                      : 'bg-blue-50 border-blue-500'
                  }`}
                >
                  <Label className="text-sm font-medium text-gray-600">Account Type</Label>
                  <p className="text-lg font-semibold">
                    {profile.role === 'ADMIN' ? '🛡️ Administrator' : '👤 User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {profile.role === 'ADMIN'
                      ? 'You have full access to the admin dashboard'
                      : 'Standard user account with access to courses'}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(getBackLink())}
                  disabled={isSaving}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
