'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import headerLogo from '../../images/logo.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SchoolRegistrationForm } from '@/components/forms/SchoolRegistration';
import { StudentRegistrationForm } from '@/components/forms/StudentRegistration';
import { OrganizationRegistrationForm } from '@/components/forms/OrganizationRegistration';

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={headerLogo} alt="header-logo" height={100} width={200} />
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
              <Link href="/start-learning">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Register Your Account</h1>
            <p className="text-gray-600">Choose your account type and fill in the details</p>
          </div>

          <Tabs defaultValue="school" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger
                value="school"
                className="data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-md transition-all duration-200"
              >
                School
              </TabsTrigger>
              <TabsTrigger
                value="student"
                className="data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-md transition-all duration-200"
              >
                Student
              </TabsTrigger>
              <TabsTrigger
                value="organization"
                className="data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-md transition-all duration-200"
              >
                Organization
              </TabsTrigger>
            </TabsList>

            <TabsContent value="school">
              <SchoolRegistrationForm />
            </TabsContent>

            <TabsContent value="student">
              <StudentRegistrationForm />
            </TabsContent>

            <TabsContent value="organization">
              <OrganizationRegistrationForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
