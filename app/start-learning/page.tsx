"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code as Code2, ArrowLeft, User, Mail, Phone, Calendar, GraduationCap, Target, CircleCheck as CheckCircle, Star, Play, BookOpen, Users, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import headerLogo from '../../images/logo.png';

const learningPaths = [
  {
    id: 1,
    title: "Beginner Path",
    subtitle: "Perfect for Classes 4-6",
    description: "Start your coding journey with visual programming and basic concepts",
    courses: ["Visual Programming", "Scratch Basics", "Logic Building"],
    duration: "6 months",
    color: "bg-green-500",
    icon: <Play className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Intermediate Path",
    subtitle: "Ideal for Classes 7-8",
    description: "Advance to text-based programming and real-world applications",
    courses: ["Python Fundamentals", "Web Basics", "Project Building"],
    duration: "8 months",
    color: "bg-blue-500",
    icon: <Code2 className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Advanced Path",
    subtitle: "Designed for Classes 9-10",
    description: "Master advanced concepts and build professional projects",
    courses: ["Full Stack Development", "AI/ML Basics", "Advanced Projects"],
    duration: "10 months",
    color: "bg-purple-500",
    icon: <GraduationCap className="w-6 h-6" />
  }
];

const steps = [
  {
    step: 1,
    title: "Choose Your Path",
    description: "Select the learning path that matches your grade and experience level",
    icon: <Target className="w-8 h-8 text-orange-500" />
  },
  {
    step: 2,
    title: "Free Trial",
    description: "Start with a 7-day free trial to explore our platform and teaching style",
    icon: <Play className="w-8 h-8 text-blue-500" />
  },
  {
    step: 3,
    title: "Learn & Build",
    description: "Follow structured lessons, complete projects, and get expert guidance",
    icon: <BookOpen className="w-8 h-8 text-green-500" />
  },
  {
    step: 4,
    title: "Get Certified",
    description: "Earn certificates and showcase your skills to the world",
    icon: <CheckCircle className="w-8 h-8 text-purple-500" />
  }
];

export default function StartLearningPage() {
  const [selectedPath, setSelectedPath] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    experience: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPath) {
      setSubmitStatus({ type: 'error', message: 'Please select a learning path' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          learningPathId: selectedPath
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Registration successful! Check your email for confirmation.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          grade: '',
          experience: ''
        });
        setSelectedPath(null);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit registration. Please try again.'
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={headerLogo} height={100} width={200} alt='header-logo' />
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

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-orange-100 text-orange-600">
              🚀 Start Your Journey
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-black">
              Begin Your Coding
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Adventure</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your learning path, start with a free trial, and join thousands of students 
              already mastering coding and STEM skills with StackSkills.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started is easy! Follow these simple steps to begin your coding journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={step.step} className="p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-orange-200">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Choose Your Learning Path</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the path that best matches your current grade and coding experience level.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {learningPaths.map((path) => (
              <Card
                key={path.id}
                className={`p-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border-2 ${
                  selectedPath === path.id ? 'border-orange-500 bg-orange-50' : 'hover:border-orange-200'
                }`}
                onClick={() => setSelectedPath(path.id)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${path.color} rounded-xl flex items-center justify-center text-white`}>
                      {path.icon}
                    </div>
                    {selectedPath === path.id && (
                      <CheckCircle className="w-6 h-6 text-orange-500" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-black mb-1">{path.title}</h3>
                    <Badge className="bg-gray-100 text-gray-600 mb-3">{path.subtitle}</Badge>
                    <p className="text-gray-600 mb-4">{path.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-semibold text-black">{path.duration}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-black mb-2">Included Courses:</h4>
                      <div className="space-y-1">
                        {path.courses.map((course, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Start Your Free Trial</h2>
            <p className="text-gray-600">
              Fill out the form below to begin your 7-day free trial. No credit card required!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <GraduationCap className="w-4 h-4 inline mr-2" />
                    Current Grade
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Select your grade</option>
                    <option value="4">Class 4</option>
                    <option value="5">Class 5</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Code2 className="w-4 h-4 inline mr-2" />
                    Coding Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Select your experience</option>
                    <option value="none">No experience</option>
                    <option value="beginner">Beginner (some basics)</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                {submitStatus && (
                  <div className={`p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedPath || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Start Free Trial'}
                </Button>

                {!selectedPath && !submitStatus && (
                  <p className="text-sm text-red-500 text-center">
                    Please select a learning path above to continue
                  </p>
                )}
              </form>
            </Card>

            {/* Benefits */}
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
                <h3 className="text-xl font-bold text-black mb-4">What's Included in Your Free Trial</h3>
                <div className="space-y-3">
                  {[
                    "Access to all course materials",
                    "Live interactive sessions",
                    "1-on-1 doubt support",
                    "Project-based learning",
                    "Expert instructor guidance",
                    "Certificate upon completion"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <h3 className="text-xl font-bold text-black mb-4">Why Choose StackSkills?</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-6 h-6 text-blue-500" />
                    <div>
                      <div className="font-semibold text-black">5000+ Happy Students</div>
                      <div className="text-sm text-gray-600">Join our growing community</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-6 h-6 text-yellow-500" />
                    <div>
                      <div className="font-semibold text-black">4.9/5 Rating</div>
                      <div className="text-sm text-gray-600">Highly rated by students</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-green-500" />
                    <div>
                      <div className="font-semibold text-black">Flexible Schedule</div>
                      <div className="text-sm text-gray-600">Learn at your own pace</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}