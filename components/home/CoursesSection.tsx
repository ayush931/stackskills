"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight } from 'lucide-react';

export default function CoursesSection() {
  const courses = [
    { grade: "4-5", title: "Visual Programming", icon: "🎮", color: "bg-pink-100 text-pink-600" },
    { grade: "6-7", title: "Scratch & Logic", icon: "🧩", color: "bg-blue-100 text-blue-600" },
    { grade: "8-9", title: "Python Basics", icon: "🐍", color: "bg-green-100 text-green-600" },
    { grade: "9-10", title: "Web Development", icon: "🌐", color: "bg-purple-100 text-purple-600" },
    { grade: "All", title: "Robotics & IoT", icon: "🤖", color: "bg-orange-100 text-orange-600" },
    { grade: "All", title: "AI & Machine Learning", icon: "🧠", color: "bg-red-100 text-red-600" },
  ];

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-orange-100 text-orange-600">Courses</Badge>
          <h2 className="text-4xl font-bold text-black">Learn by Grade Level</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Structured learning paths designed for students from classes 4 to 10
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-2 hover:border-orange-200 cursor-pointer group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={course.color}>Class {course.grade}</Badge>
                  <div className="text-3xl group-hover:animate-bounce">{course.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-black group-hover:text-orange-500 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600">
                  Interactive lessons designed for grade {course.grade} students with hands-on projects and assignments.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>12 weeks</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
