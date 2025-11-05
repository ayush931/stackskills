'use client';

import React from 'react';
import Link from 'next/link';
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
  CheckCircle,
  Video,
  FileText,
  Award,
  Calendar,
} from 'lucide-react';
import Image from 'next/image';
import headerLogo from '../../../images/logo.png';

const coursesData = {
  '1': {
    id: 1,
    title: 'Visual Programming with Scratch',
    grade: '4-5',
    duration: '12 weeks',
    students: '2,500+',
    rating: 4.9,
    level: 'Beginner',
    color: 'bg-pink-500',
    price: '₹5,000/month',
    description:
      'Learn programming concepts through fun visual blocks and create your own games and animations. Perfect for young learners starting their coding journey.',
    objectives: [
      'Understand basic programming concepts like loops, conditions, and variables',
      'Create interactive stories and animations',
      'Develop problem-solving and logical thinking skills',
      'Build simple games from scratch',
    ],
    curriculum: [
      {
        week: '1-2',
        title: 'Introduction to Scratch',
        topics: ['Interface overview', 'Basic blocks', 'Sprites and costumes'],
      },
      {
        week: '3-4',
        title: 'Motion and Looks',
        topics: ['Movement commands', 'Coordinate system', 'Costume changes'],
      },
      {
        week: '5-6',
        title: 'Events and Control',
        topics: ['Event handlers', 'Loops', 'Conditions'],
      },
      {
        week: '7-8',
        title: 'Variables and Lists',
        topics: ['Creating variables', 'Score tracking', 'Using lists'],
      },
      {
        week: '9-10',
        title: 'Game Development',
        topics: ['Sprite interactions', 'Collision detection', 'Game logic'],
      },
      {
        week: '11-12',
        title: 'Final Projects',
        topics: ['Project planning', 'Implementation', 'Presentation'],
      },
    ],
    projects: [
      'Animated Birthday Card',
      'Catch the Falling Objects Game',
      'Interactive Story with Choices',
      'Maze Runner Game',
    ],
    features: [
      '24/7 access to course materials',
      'Live weekend masterclasses',
      'Doubt support 9 AM - 9 PM',
      'Certificate upon completion',
      'Project portfolio',
      'Parent progress reports',
    ],
    instructor: {
      name: 'Priya Sharma',
      role: 'Senior Scratch Instructor',
      experience: '8 years teaching kids',
    },
  },
  '2': {
    id: 2,
    title: 'Scratch Advanced & Logic Building',
    grade: '6-7',
    duration: '14 weeks',
    students: '3,200+',
    rating: 4.8,
    level: 'Intermediate',
    color: 'bg-blue-500',
    price: '₹5,500/month',
    description:
      'Advanced Scratch programming with complex logic, algorithms, and interactive projects designed for intermediate learners.',
    objectives: [
      'Master advanced Scratch blocks and techniques',
      'Understand complex algorithms and data structures',
      'Create sophisticated games and applications',
      'Learn debugging and optimization techniques',
    ],
    curriculum: [
      {
        week: '1-2',
        title: 'Advanced Scratch Techniques',
        topics: ['Custom blocks', 'Cloning', 'Advanced motion'],
      },
      {
        week: '3-4',
        title: 'Algorithms Basics',
        topics: ['Sorting algorithms', 'Search patterns', 'Optimization'],
      },
      {
        week: '5-6',
        title: 'Data Structures',
        topics: ['Lists and arrays', 'Stack operations', 'Queue implementation'],
      },
      {
        week: '7-8',
        title: 'Game AI',
        topics: ['Enemy behavior', 'Pathfinding', 'Decision making'],
      },
      {
        week: '9-11',
        title: 'Complex Projects',
        topics: ['Multi-level games', 'Score systems', 'Save/load features'],
      },
      {
        week: '12-14',
        title: 'Capstone Project',
        topics: ['Project design', 'Development', 'Testing & deployment'],
      },
    ],
    projects: [
      'Platform Jumper Game',
      'Quiz Application with Database',
      'Calculator with Memory',
      'Interactive Adventure Game',
    ],
    features: [
      'Advanced project-based learning',
      'Algorithm workshops',
      'Code review sessions',
      'Certificate upon completion',
      'GitHub portfolio setup',
      'Monthly coding challenges',
    ],
    instructor: {
      name: 'Rahul Kumar',
      role: 'Lead Scratch Developer',
      experience: '10 years in EdTech',
    },
  },
  '3': {
    id: 3,
    title: 'Python Programming Fundamentals',
    grade: '8-9',
    duration: '16 weeks',
    students: '4,100+',
    rating: 4.9,
    level: 'Intermediate',
    color: 'bg-green-500',
    price: '₹6,000/month',
    description:
      'Learn Python programming from basics to advanced concepts with real-world projects and professional coding practices.',
    objectives: [
      'Master Python syntax and core concepts',
      'Work with data structures and algorithms',
      'Build real-world applications',
      'Understand object-oriented programming',
    ],
    curriculum: [
      {
        week: '1-2',
        title: 'Python Basics',
        topics: ['Variables & data types', 'Operators', 'Input/output'],
      },
      { week: '3-4', title: 'Control Flow', topics: ['If-else', 'Loops', 'Functions'] },
      {
        week: '5-6',
        title: 'Data Structures',
        topics: ['Lists', 'Tuples', 'Dictionaries', 'Sets'],
      },
      {
        week: '7-8',
        title: 'File Handling',
        topics: ['Reading files', 'Writing files', 'JSON data'],
      },
      {
        week: '9-10',
        title: 'OOP Concepts',
        topics: ['Classes & objects', 'Inheritance', 'Polymorphism'],
      },
      {
        week: '11-12',
        title: 'Libraries & Modules',
        topics: ['Standard library', 'Third-party packages', 'pip'],
      },
      {
        week: '13-16',
        title: 'Projects',
        topics: ['Web scraping', 'Data analysis', 'Game development'],
      },
    ],
    projects: [
      'Calculator Application',
      'Text-based Adventure Game',
      'To-Do List Manager',
      'Web Scraper & Data Analyzer',
    ],
    features: [
      'Industry-standard Python IDE setup',
      'GitHub integration',
      'Live coding sessions',
      'Certificate upon completion',
      'Interview preparation',
      'Career guidance sessions',
    ],
    instructor: {
      name: 'Anita Patel',
      role: 'Python Expert',
      experience: '12 years in software development',
    },
  },
};

export default async function CoursePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = coursesData[id as keyof typeof coursesData];

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Course Not Found</h1>
          <Link href="/courses">
            <Button className="bg-orange-500 hover:bg-orange-600">Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={headerLogo} alt="header-logo" height={100} width={200} />
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/courses">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>All Courses</span>
                </Button>
              </Link>
              <Link href="/start-learning">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Enroll Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Badge className="bg-white text-gray-700">Class {course.grade}</Badge>
                <Badge className={`${course.color} text-white`}>{course.level}</Badge>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                {course.title}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">{course.description}</p>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span>{course.rating}/5</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <Link href="/start-learning">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg">
                    <Play className="w-5 h-5 mr-2" />
                    Start Learning
                  </Button>
                </Link>
                <div className="text-2xl font-bold text-black">{course.price}</div>
              </div>
            </div>

            <div className="relative">
              <Card className="p-8 bg-white shadow-2xl border-2 border-gray-100">
                <div
                  className={`w-full h-48 ${course.color} bg-opacity-20 rounded-lg flex items-center justify-center mb-6`}
                >
                  <BookOpen className={`w-24 h-24 ${course.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-black mb-4">Course Includes:</h3>
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-8">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {course.objectives.map((objective, index) => (
              <Card key={index} className="p-6 border-2 hover:border-orange-200 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{objective}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Course Curriculum</h2>
            <p className="text-gray-600">Structured learning path with hands-on projects</p>
          </div>

          <div className="space-y-4">
            {course.curriculum.map((module, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center text-white font-bold`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-black">{module.title}</h3>
                        <Badge variant="outline">Week {module.week}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {module.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} className="bg-gray-100 text-gray-700">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Video className="w-6 h-6 text-gray-400" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Projects You'll Build</h2>
            <p className="text-gray-600">Apply your skills with real-world projects</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {course.projects.map((project, index) => (
              <Card
                key={index}
                className="p-6 border-2 hover:border-orange-200 transition-all hover:shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black">{project}</h3>
                    <p className="text-sm text-gray-600">Hands-on project</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-black mb-8">Your Instructor</h2>
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-400 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-orange-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black">{course.instructor.name}</h3>
                <p className="text-gray-600">{course.instructor.role}</p>
                <p className="text-sm text-gray-500 mt-1">{course.instructor.experience}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <Trophy className="w-16 h-16 text-white mx-auto" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Ready to Start Learning?</h2>
            <p className="text-xl text-orange-100">
              Join {course.students} students already enrolled in this course!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/start-learning">
                <Button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Enroll Now - {course.price}
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-4 text-lg font-semibold"
                >
                  Have Questions?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
