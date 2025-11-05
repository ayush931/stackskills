"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code2, Play, BookOpen, Trophy, Target, Lightbulb, Rocket } from 'lucide-react';

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  return (
    <section className="relative pt-20 pb-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden min-h-screen mt-12">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`gap-8 flex flex-col space-y-8 ${isVisible ? 'animate-in slide-in-from-left-5 duration-1000' : 'opacity-0'}`}>
            <div className="space-y-4">
              <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100">
                🚀 Partnered with Codementum
              </Badge>
              <h1 className="text-3xl lg:text-5xl font-serif font-bold text-black leading-tight">
                Learn Coding & STEM the
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Smart Way</span>
              </h1>
              <p className="text-md lg:text-lg text-gray-600 font-serif leading-relaxed">
                Join thousands of students from classes 4-10 learning coding, technology, and STEM subjects through interactive and fun methods.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/start-learning">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <Play className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" className="border-2 border-gray-300 px-8 py-6 text-lg font-semibold rounded-xl hover:border-orange-500 hover:text-orange-500 transition-all duration-300">
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Courses
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-black">5000+</div>
                <div className="text-sm text-gray-600">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">50+</div>
                <div className="text-sm text-gray-600">Expert Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          <div className={`relative ${isVisible ? 'animate-in slide-in-from-right-5 duration-1000' : 'opacity-0'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Code2 className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-black">Python Programming</div>
                        <div className="text-sm text-gray-500">Class 6-10</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-600">Active</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-black">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 rounded-xl p-4 text-center">
                      <Trophy className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <div className="font-semibold text-black">12 Badges</div>
                      <div className="text-xs text-gray-600">Earned</div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <div className="font-semibold text-black">8 Projects</div>
                      <div className="text-xs text-gray-600">Completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-bounce animation-delay-1000">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
