'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Phone,
  School,
  BookOpen,
  Calendar,
  Shield,
  ArrowLeft,
  Edit,
  IdCard,
  Loader2,
} from 'lucide-react';
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

export default function ViewProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, userId } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to view your profile',
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
      const response = await fetch('/api/get-user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success && result.data) {
        setProfile(result.data);
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Skeleton className="h-10 w-32" />
          </div>
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-4">Unable to load your profile information</p>
            <Button onClick={() => router.push('/')} className="bg-orange-500 hover:bg-orange-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-gray-700 hover:text-orange-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-6 shadow-lg border-t-4 border-t-orange-500">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Avatar className="h-24 w-24 border-4 border-orange-500">
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-2xl font-bold">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-900">
                      {profile.name}
                    </CardTitle>
                    <CardDescription className="text-lg mt-1">
                      Student Profile
                    </CardDescription>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <Badge
                      variant={profile.role === 'ADMIN' ? 'default' : 'secondary'}
                      className={
                        profile.role === 'ADMIN'
                          ? 'bg-orange-500 hover:bg-orange-600'
                          : 'bg-blue-500 hover:bg-blue-600'
                      }
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      {profile.role}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Details Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <User className="w-5 h-5 mr-2 text-orange-500" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                <User className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Full Name</p>
                  <p className="text-base font-semibold text-gray-900">{profile.name}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Phone Number</p>
                  <p className="text-base font-semibold text-gray-900">{profile.phone}</p>
                </div>
              </div>
              {profile.stackId && (
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <IdCard className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Stack ID</p>
                    <p className="text-base font-semibold text-gray-900 font-mono">
                      {profile.stackId}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <School className="w-5 h-5 mr-2 text-orange-500" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <School className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">School Name</p>
                  <p className="text-base font-semibold text-gray-900">{profile.schoolName}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <BookOpen className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Class</p>
                  <p className="text-base font-semibold text-gray-900">{profile.className}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Member Since</p>
                  <p className="text-base font-semibold text-gray-900">
                    {formatDate(profile.createdAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className="mt-6 shadow-md">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/profile" className="flex-1">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Link href="/courses" className="flex-1">
                <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-50">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Need help? Contact us at support@stackskills.com</p>
        </div>
      </div>
    </div>
  );
}
