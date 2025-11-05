"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Users, Heart } from 'lucide-react';

export default function PartnershipSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-orange-100 text-orange-600">Partnership</Badge>
          <h2 className="text-3xl font-bold text-black">Powered by Codementum</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've partnered with Codementum to bring you world-class coding education and resources.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-orange-200">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Interactive Platform</h3>
            <p className="text-gray-600">Learn with hands-on coding exercises and real-time feedback</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-orange-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Expert Teachers</h3>
            <p className="text-gray-600">Learn from certified instructors with years of experience</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-orange-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Kid-Friendly</h3>
            <p className="text-gray-600">Designed specifically for young learners aged 9-16</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
