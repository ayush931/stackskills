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
    image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&h=600&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop',
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
  '4': {
    id: 4,
    title: 'Web Development with HTML, CSS & JavaScript',
    grade: '9-10',
    duration: '18 weeks',
    students: '3,800+',
    rating: 4.8,
    level: 'Advanced',
    color: 'bg-purple-500',
    price: '₹7,000/month',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop',
    description:
      'Build responsive websites and web applications using modern web technologies. Learn HTML5, CSS3, and JavaScript to create professional web projects.',
    objectives: [
      'Master HTML5 semantic elements and structure',
      'Create responsive designs with CSS3',
      'Build interactive features with JavaScript',
      'Understand DOM manipulation and events',
    ],
    curriculum: [
      { week: '1-2', title: 'HTML Fundamentals', topics: ['HTML structure', 'Semantic tags', 'Forms & validation'] },
      { week: '3-4', title: 'CSS Basics', topics: ['Selectors', 'Box model', 'Flexbox'] },
      { week: '5-6', title: 'Advanced CSS', topics: ['Grid layout', 'Animations', 'Responsive design'] },
      { week: '7-8', title: 'JavaScript Basics', topics: ['Variables', 'Functions', 'Arrays & objects'] },
      { week: '9-10', title: 'DOM Manipulation', topics: ['Selecting elements', 'Event listeners', 'Dynamic content'] },
      { week: '11-12', title: 'Advanced JavaScript', topics: ['ES6 features', 'Async programming', 'Fetch API'] },
      { week: '13-15', title: 'Web Projects', topics: ['Portfolio site', 'Interactive apps', 'Web games'] },
      { week: '16-18', title: 'Final Project', topics: ['Planning', 'Development', 'Deployment'] },
    ],
    projects: ['Personal Portfolio', 'Interactive Website', 'Web-based Games', 'Todo Application'],
    features: [
      'Modern web development tools',
      'VS Code setup and extensions',
      'Live coding sessions',
      'Certificate upon completion',
      'Portfolio hosting guidance',
      'Job-ready skills training',
    ],
    instructor: {
      name: 'Vikram Singh',
      role: 'Full Stack Developer',
      experience: '15 years in web development',
    },
  },
  '5': {
    id: 5,
    title: 'Robotics & IoT Fundamentals',
    grade: 'All',
    duration: '20 weeks',
    students: '2,100+',
    rating: 4.7,
    level: 'Intermediate',
    color: 'bg-orange-500',
    price: '₹8,000/month',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    description:
      'Explore robotics and Internet of Things with hands-on projects using Arduino and real hardware components.',
    objectives: [
      'Understand robotics and IoT concepts',
      'Program Arduino microcontrollers',
      'Work with sensors and actuators',
      'Build real-world IoT projects',
    ],
    curriculum: [
      { week: '1-2', title: 'Introduction to Robotics', topics: ['Basic concepts', 'Components overview', 'Safety'] },
      { week: '3-4', title: 'Arduino Basics', topics: ['Arduino IDE', 'Digital I/O', 'Analog signals'] },
      { week: '5-6', title: 'Sensors', topics: ['Temperature sensors', 'Motion sensors', 'Light sensors'] },
      { week: '7-8', title: 'Actuators', topics: ['Motors', 'Servos', 'LEDs'] },
      { week: '9-10', title: 'IoT Basics', topics: ['Internet connectivity', 'Cloud platforms', 'Data logging'] },
      { week: '11-13', title: 'Robot Building', topics: ['Chassis design', 'Motor control', 'Navigation'] },
      { week: '14-16', title: 'Advanced Projects', topics: ['Smart home', 'Weather station', 'Line follower'] },
      { week: '17-20', title: 'Capstone Project', topics: ['Design', 'Build', 'Test', 'Present'] },
    ],
    projects: ['Smart Home System', 'Line Following Robot', 'Weather Station', 'Obstacle Avoiding Robot'],
    features: [
      'Arduino kit provided',
      'Hands-on hardware projects',
      'Live demonstrations',
      'Certificate upon completion',
      'Project showcase opportunity',
      'Robotics competition prep',
    ],
    instructor: {
      name: 'Dr. Rajesh Mehta',
      role: 'Robotics Engineer',
      experience: '18 years in robotics & automation',
    },
  },
  '6': {
    id: 6,
    title: 'AI & Machine Learning for Kids',
    grade: 'All',
    duration: '16 weeks',
    students: '1,800+',
    rating: 4.9,
    level: 'Advanced',
    color: 'bg-red-500',
    price: '₹7,500/month',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    description:
      'Introduction to artificial intelligence and machine learning concepts through fun, interactive projects suitable for young learners.',
    objectives: [
      'Understand AI and ML fundamentals',
      'Learn about neural networks',
      'Build AI-powered applications',
      'Explore computer vision and NLP',
    ],
    curriculum: [
      { week: '1-2', title: 'AI Basics', topics: ['What is AI?', 'Types of AI', 'Real-world applications'] },
      { week: '3-4', title: 'Machine Learning Intro', topics: ['Supervised learning', 'Unsupervised learning', 'Training models'] },
      { week: '5-6', title: 'Neural Networks', topics: ['Perceptrons', 'Layers', 'Activation functions'] },
      { week: '7-8', title: 'Computer Vision', topics: ['Image recognition', 'Object detection', 'Teachable Machine'] },
      { week: '9-10', title: 'Natural Language', topics: ['Text classification', 'Sentiment analysis', 'Chatbots'] },
      { week: '11-12', title: 'ML Tools', topics: ['Scratch ML', 'TensorFlow Playground', 'Google Colab'] },
      { week: '13-14', title: 'AI Projects', topics: ['Face recognition', 'Voice commands', 'Game AI'] },
      { week: '15-16', title: 'Final Project', topics: ['AI app development', 'Testing', 'Presentation'] },
    ],
    projects: ['Chatbot Creation', 'Image Recognition App', 'Prediction Models', 'Voice-controlled Game'],
    features: [
      'No-code ML tools',
      'Interactive AI demos',
      'Live expert sessions',
      'Certificate upon completion',
      'AI project portfolio',
      'Future tech exposure',
    ],
    instructor: {
      name: 'Dr. Sneha Gupta',
      role: 'AI Research Scientist',
      experience: '10 years in AI/ML research',
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
              <Card className="p-0 bg-white shadow-2xl border-2 border-gray-100 overflow-hidden">
                <div className="relative w-full h-64 sm:h-80">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className={`absolute inset-0 ${course.color} opacity-10`}></div>
                </div>
                <div className="p-8 space-y-4">
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
