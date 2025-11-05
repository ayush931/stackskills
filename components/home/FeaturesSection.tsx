'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Users, Clock, Trophy } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-orange-500" />,
      title: 'STEM Focus',
      desc: 'Complete STEM education for future-ready skills',
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: 'Expert Teachers',
      desc: 'Learn from certified and experienced instructors',
    },
    {
      icon: <Clock className="w-8 h-8 text-green-500" />,
      title: 'Flexible Schedule',
      desc: 'Learn at your own pace with recorded sessions',
    },
    {
      icon: <Trophy className="w-8 h-8 text-purple-500" />,
      title: 'Certificates',
      desc: 'Get recognized certificates upon course completion',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-orange-100 text-orange-600">Why Choose Us</Badge>
          <h2 className="text-4xl font-bold text-black">Everything Kids Need to Succeed</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-orange-200"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
