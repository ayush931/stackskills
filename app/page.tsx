"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code as Code2, Cpu, Rocket, Star, Users, Clock, CircleCheck as CheckCircle, ArrowRight, Play, BookOpen, Zap, Trophy, Monitor, Heart, Target, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import logoHeader from '../images/logo.png';
import logoFooter from '../images/logo1.png';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image src={logoHeader} alt='header-logo' height={100} width={200} />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/courses" className="text-gray-700 hover:text-orange-500 transition-colors">Courses</Link>
              <a href="#pricing" className="text-gray-700 hover:text-orange-500 transition-colors">Pricing</a>
              <Link href="/about" className="text-gray-700 hover:text-orange-500 transition-colors">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-500 transition-colors">Contact</Link>
              <Link href={"/register"} className="text-gray-700 hover:text-orange-500 transition-colors">Register</Link>
              <Link href="/start-learning">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible ? 'animate-in slide-in-from-left-5 duration-1000' : 'opacity-0'}`}>
              <div className="space-y-4">
                <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100">
                  🚀 Partnered with Codementum
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
                  Learn Coding & STEM the
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Smart Way</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
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

      {/* Partnership Section */}
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

      {/* Courses Section */}
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
            {[
              { grade: "4-5", title: "Visual Programming", icon: "🎮", color: "bg-pink-100 text-pink-600" },
              { grade: "6-7", title: "Scratch & Logic", icon: "🧩", color: "bg-blue-100 text-blue-600" },
              { grade: "8-9", title: "Python Basics", icon: "🐍", color: "bg-green-100 text-green-600" },
              { grade: "9-10", title: "Web Development", icon: "🌐", color: "bg-purple-100 text-purple-600" },
              { grade: "All", title: "Robotics & IoT", icon: "🤖", color: "bg-orange-100 text-orange-600" },
              { grade: "All", title: "AI & Machine Learning", icon: "🧠", color: "bg-red-100 text-red-600" },
            ].map((course, index) => (
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-600">Pricing</Badge>
            <h2 className="text-4xl font-bold text-black">Choose Your Learning Path</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible plans designed to fit every student's learning style and schedule
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Self Learning Plan */}
            <Card className="p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-orange-300 bg-white">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black">Self Learning</h3>
                      <Badge className="mt-1 bg-orange-100 text-orange-600">SSJR</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-orange-500">₹5000</div>
                    <div className="text-gray-500">/month</div>
                  </div>
                </div>

                <p className="text-gray-600 text-lg">
                  🚀 Learn Coding, Tech & More in the Smartest Way
                </p>

                <div className="space-y-4">
                  {[
                    { icon: <Monitor className="w-5 h-5 text-green-500" />, text: "Study at home using our platform" },
                    { icon: <Clock className="w-5 h-5 text-green-500" />, text: "1 Hr Masterclass every weekend" },
                    { icon: <Users className="w-5 h-5 text-green-500" />, text: "Doubt support: 9 AM - 9 PM" },
                    { icon: <CheckCircle className="w-5 h-5 text-green-500" />, text: "Access of portal" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {feature.icon}
                      <span className="text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold rounded-xl">
                  Get Started
                </Button>
              </div>
            </Card>

            {/* Live Classes Plan */}
            <Card className="p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-black bg-black text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-semibold">
                Popular
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Live Classes</h3>
                      <Badge className="mt-1 bg-gray-700 text-gray-300">SSJR</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">₹7000</div>
                    <div className="text-gray-300">/month</div>
                  </div>
                </div>

                <p className="text-gray-300 text-lg">
                  Elevate your brand with 25 design projects per month, premium templates, and priority support. Ideal for rapidly growing businesses.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: <Users className="w-5 h-5 text-green-400" />, text: "Learn directly from our expert teachers" },
                    { icon: <Clock className="w-5 h-5 text-green-400" />, text: "MWF / TTS 45-min classes" },
                    { icon: <Users className="w-5 h-5 text-green-400" />, text: "Doubt support: 9 AM - 9 PM" },
                    { icon: <Star className="w-5 h-5 text-green-400" />, text: "1.5 Hr Masterclass every weekend" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {feature.icon}
                      <span className="text-gray-200">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-white hover:bg-gray-100 text-black py-3 text-lg font-semibold rounded-xl">
                  Start Live Classes
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-600">Why Choose Us</Badge>
            <h2 className="text-4xl font-bold text-black">Everything Kids Need to Succeed</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Cpu className="w-8 h-8 text-orange-500" />, title: "STEM Focus", desc: "Complete STEM education for future-ready skills" },
              { icon: <Users className="w-8 h-8 text-blue-500" />, title: "Expert Teachers", desc: "Learn from certified and experienced instructors" },
              { icon: <Clock className="w-8 h-8 text-green-500" />, title: "Flexible Schedule", desc: "Learn at your own pace with recorded sessions" },
              { icon: <Trophy className="w-8 h-8 text-purple-500" />, title: "Certificates", desc: "Get recognized certificates upon course completion" },
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-orange-200">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Start Your Coding Journey?
            </h2>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Join thousands of students already learning with StackSkills. Start your free trial today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/start-learning">
                <Button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-white text-black hover:bg-white hover:text-orange-500 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Image src={logoFooter} alt='footer-logo' height={100} width={200} />
              </div>
              <p className="text-gray-400">
                Empowering young minds with coding and STEM education for a brighter future.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/courses" className="block text-gray-400 hover:text-white transition-colors">Courses</Link>
                <a href="#pricing" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">About Us</Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Courses</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Python Programming</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Web Development</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Robotics</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">AI & ML</a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <p className="text-gray-400">Doubt Support: 9 AM - 9 PM</p>
                <p className="text-gray-400">Email: support@stackskills.in</p>
                <p className="text-gray-400">Phone: +91 9876543210</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 StackSkills.in. All rights reserved. Powered by Codementum.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}