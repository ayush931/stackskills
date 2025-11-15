'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Code as Code2,
  ArrowLeft,
  Clock,
  Users,
  Star,
  Play,
  BookOpen,
  Trophy,
  Target,
  Cpu,
  Gamepad2,
  Globe,
  Brain,
  Zap,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import headerLogo from '../../images/logo.png';

const courses = [
  {
    id: 1,
    title: 'Visual Programming with Scratch',
    grade: '4-5',
    duration: '12 weeks',
    students: '2.5k+',
    rating: 4.9,
    level: 'Beginner',
    icon: <Gamepad2 className="w-8 h-8" />,
    color: 'bg-pink-500',
    description:
      'Learn programming concepts through fun visual blocks and create your own games and animations.',
    topics: ['Block-based coding', 'Game creation', 'Animation basics', 'Logic building'],
    projects: ['Interactive stories', 'Simple games', 'Animated characters'],
    image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=250&fit=crop',
  },
  {
    id: 2,
    title: 'Scratch Advanced & Logic Building',
    grade: '6-7',
    duration: '14 weeks',
    students: '3.2k+',
    rating: 4.8,
    level: 'Intermediate',
    icon: <Code2 className="w-8 h-8" />,
    color: 'bg-blue-500',
    description:
      'Advanced Scratch programming with complex logic, algorithms, and interactive projects.',
    topics: ['Advanced blocks', 'Algorithms', 'Variables & lists', 'Complex animations'],
    projects: ['Quiz games', 'Calculator', 'Interactive stories'],
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=250&fit=crop',
  },
  {
    id: 3,
    title: 'Python Programming Fundamentals',
    grade: '8-9',
    duration: '16 weeks',
    students: '4.1k+',
    rating: 4.9,
    level: 'Intermediate',
    icon: <Code2 className="w-8 h-8" />,
    color: 'bg-green-500',
    description:
      'Learn Python programming from basics to advanced concepts with real-world projects.',
    topics: ['Python syntax', 'Data structures', 'Functions', 'Object-oriented programming'],
    projects: ['Calculator app', 'Text-based games', 'Data analysis'],
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
  },
  {
    id: 4,
    title: 'Web Development with HTML, CSS & JavaScript',
    grade: '9-10',
    duration: '18 weeks',
    students: '3.8k+',
    rating: 4.8,
    level: 'Advanced',
    icon: <Globe className="w-8 h-8" />,
    color: 'bg-purple-500',
    description: 'Build responsive websites and web applications using modern web technologies.',
    topics: ['HTML5 & CSS3', 'JavaScript ES6+', 'Responsive design', 'DOM manipulation'],
    projects: ['Personal portfolio', 'Interactive websites', 'Web games'],
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=250&fit=crop',
  },
  {
    id: 5,
    title: 'Robotics & IoT Fundamentals',
    grade: 'All',
    duration: '20 weeks',
    students: '2.1k+',
    rating: 4.7,
    level: 'Intermediate',
    icon: <Cpu className="w-8 h-8" />,
    color: 'bg-orange-500',
    description:
      'Explore robotics and Internet of Things with hands-on projects and real hardware.',
    topics: ['Arduino programming', 'Sensors & actuators', 'IoT concepts', 'Robot building'],
    projects: ['Smart home system', 'Line following robot', 'Weather station'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
  },
  {
    id: 6,
    title: 'AI & Machine Learning for Kids',
    grade: 'All',
    duration: '16 weeks',
    students: '1.8k+',
    rating: 4.9,
    level: 'Advanced',
    icon: <Brain className="w-8 h-8" />,
    color: 'bg-red-500',
    description:
      'Introduction to artificial intelligence and machine learning concepts through fun projects.',
    topics: ['AI basics', 'Machine learning', 'Neural networks', 'Computer vision'],
    projects: ['Chatbot creation', 'Image recognition', 'Prediction models'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
  },
];

const filters = [
  { label: 'All Grades', value: 'all' },
  { label: 'Class 4-5', value: '4-5' },
  { label: 'Class 6-7', value: '6-7' },
  { label: 'Class 8-9', value: '8-9' },
  { label: 'Class 9-10', value: '9-10' },
];

export default function CoursesPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);

  const filteredCourses = courses.filter(
    (course) =>
      selectedFilter === 'all' || course.grade === selectedFilter || course.grade === 'All'
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={headerLogo} alt="Header-logo" height={100} width={200} />
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-orange-100 text-orange-600">🎓 Explore Our Courses</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-black">
              Choose Your Learning
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {' '}
                Adventure
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover coding, STEM, and technology courses designed specifically for students from
              classes 4-10. Start your journey into the world of programming and innovation!
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? 'default' : 'outline'}
                className={`${
                  selectedFilter === filter.value
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'hover:border-orange-500 hover:text-orange-500'
                }`}
                onClick={() => setSelectedFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <Card
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border-2 hover:border-orange-200 cursor-pointer group"
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <div className="relative">
                    <div className="h-48 relative overflow-hidden bg-gray-200">
                      {/* Course Image */}
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className={`absolute inset-0 ${course.color} opacity-20`}></div>
                      <div className="absolute top-4 left-4">
                        <div
                          className={`w-12 h-12 ${course.color} rounded-xl flex items-center justify-center text-white shadow-lg backdrop-blur-sm bg-white/10`}
                        >
                          {course.icon}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 backdrop-blur-sm text-gray-700 shadow-md">
                          Class {course.grade}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Badge className={`${course.color} text-white shadow-md`}>
                          {course.level}
                        </Badge>
                      </div>
                      {hoveredCourse === course.id && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-all">
                          <Button className="bg-white text-black hover:bg-gray-100 shadow-lg">
                            <Play className="w-4 h-4 mr-2" />
                            Preview Course
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-black group-hover:text-orange-500 transition-colors mb-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-black mb-2">What you'll learn:</h4>
                          <div className="flex flex-wrap gap-1">
                            {course.topics.slice(0, 3).map((topic, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                            {course.topics.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{course.topics.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-gray-600">Certificate included</span>
                        </div>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                          Enroll Now
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Start Your Coding Journey?
            </h2>
            <p className="text-xl text-orange-100">
              Choose any course and begin learning with our expert instructors today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/start-learning">
                <Button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-2 border-white text-black hover:bg-white hover:text-orange-500 px-8 py-3 text-lg font-semibold"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
