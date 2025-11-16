'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Search,
  BookOpen,
  ArrowLeft,
  AlertCircle,
  Compass,
  Mail,
} from 'lucide-react';
import Image from 'next/image';
import headerLogo from '../images/logo.png';

const quickLinks = [
  {
    icon: <Home className="w-5 h-5" />,
    title: 'Home',
    description: 'Return to homepage',
    href: '/',
    color: 'bg-orange-500',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Courses',
    description: 'Browse our courses',
    href: '/courses',
    color: 'bg-blue-500',
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: 'Start Learning',
    description: 'Begin your journey',
    href: '/start-learning',
    color: 'bg-green-500',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: 'Contact',
    description: 'Get in touch',
    href: '/contact',
    color: 'bg-purple-500',
  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={headerLogo} alt="StackSkills Logo" height={100} width={200} />
            </Link>
            <Link href="/">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full">
          {/* Error Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative">
                <div className="text-9xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  404
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-2">
                <AlertCircle className="w-8 h-8 text-orange-500" />
                <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Oops! The page you're looking for doesn't exist. It might have been moved or
                deleted.
              </p>
            </div>

            <Badge className="bg-orange-100 text-orange-600 text-base px-4 py-2">
              <Compass className="w-4 h-4 mr-2" />
              Let's get you back on track
            </Badge>
          </div>

          {/* Quick Links Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-orange-200 cursor-pointer group">
                  <div
                    className={`w-12 h-12 ${link.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform`}
                  >
                    {link.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </Card>
              </Link>
            ))}
          </div>

          {/* Search Suggestion */}
          <Card className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Can't find what you're looking for?
                </h2>
                <p className="text-gray-600 mb-6">
                  Try searching for courses, or contact our support team for assistance.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Browse Courses
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Need help? Contact us at{' '}
              <a
                href="mailto:support@stackskills.in"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                support@stackskills.in
              </a>{' '}
              or call{' '}
              <a
                href="tel:+919876543210"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                +91 9876543210
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
