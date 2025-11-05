'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Join thousands of students already learning with StackSkills. Start your free trial
            today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start-learning">
              <Button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-2 border-white text-black hover:bg-white hover:text-orange-500 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
