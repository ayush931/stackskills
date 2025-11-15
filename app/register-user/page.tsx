'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, User, Phone, Lock, School, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import headerLogo from '../../images/logo.png';

export default function RegisterUserPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    className: '',
    schoolName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.className ||
      !formData.schoolName
    ) {
      toast({
        title: '❌ Missing Fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: '❌ Password Mismatch',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (formData.phone.length !== 10) {
      toast({
        title: '❌ Invalid Phone',
        description: 'Phone number must be 10 digits',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    toast({
      title: '⏳ Creating Account...',
      description: 'Please wait while we register your account.',
      variant: 'loading',
    });

    try {
      const response = await fetch('/api/auth/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: '✅ Registration Successful!',
          description: 'Welcome to StackSkills! Redirecting to dashboard...',
          variant: 'success',
        });

        // Set auth state
        if (result.data) {
          setAuth(result.data.id, result.data.phone, result.data.role, result.data.name);
        }

        // Reset form
        setFormData({
          name: '',
          phone: '',
          password: '',
          confirmPassword: '',
          className: '',
          schoolName: '',
        });

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        toast({
          title: '❌ Registration Failed',
          description: result.message || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: '❌ Error',
        description: 'Failed to connect to server. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
        className: '',
        schoolName: '',
      });
    }
  };

  const classes = [
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
    'College',
    'Graduate',
    'Working Professional',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={headerLogo} alt="StackSkills Logo" height={100} width={200} />
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
              <Link href="/login-user">
                <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
                  Already have an account? Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600">Join StackSkills and start your learning journey</p>
          </div>

          <Card className="p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="10-digit phone number"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              {/* School Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <School className="w-4 h-4 inline mr-2" />
                  School/College Name *
                </label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter your school/college name"
                  required
                />
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Class/Grade *
                </label>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select your class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Create a strong password"
                  minLength={6}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Re-enter your password"
                  minLength={6}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>

              {/* Login Link */}
              <p className="text-center text-gray-600 mt-4">
                Already have an account?{' '}
                <Link
                  href="/login-user"
                  className="text-orange-600 hover:text-orange-700 font-semibold"
                >
                  Login here
                </Link>
              </p>
            </form>
          </Card>

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-semibold text-gray-900 mb-2">All Courses</h3>
              <p className="text-sm text-gray-600">Access to complete course library</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-3">👨‍🏫</div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Sessions</h3>
              <p className="text-sm text-gray-600">Interactive classes with experts</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-semibold text-gray-900 mb-2">Certificates</h3>
              <p className="text-sm text-gray-600">Get certified on completion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
