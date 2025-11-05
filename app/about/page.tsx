'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Code as Code2,
  ArrowLeft,
  Users,
  Target,
  Award,
  Heart,
  Lightbulb,
  Rocket,
  Star,
  CircleCheck as CheckCircle,
  Globe,
  BookOpen,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import headerLogo from '../../images/logo.png';

const team = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Founder & CEO',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    description: 'Former Google engineer with 15+ years in EdTech',
    expertise: ['AI/ML', 'Product Strategy', 'EdTech Innovation'],
  },
  {
    name: 'Rahul Kumar',
    role: 'Head of Curriculum',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    description: 'Ex-Microsoft developer, passionate about teaching kids',
    expertise: ['Python', 'Web Development', 'Curriculum Design'],
  },
  {
    name: 'Anita Patel',
    role: 'Lead Instructor',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    description: '10+ years teaching experience, child psychology expert',
    expertise: ['Scratch', 'Robotics', 'Child Psychology'],
  },
  {
    name: 'Vikram Singh',
    role: 'Technology Director',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    description: 'Full-stack developer, platform architecture specialist',
    expertise: ['Platform Development', 'System Architecture', 'DevOps'],
  },
];

const values = [
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: 'Student-First Approach',
    description:
      "Every decision we make is centered around what's best for our students' learning journey.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    title: 'Innovation in Learning',
    description:
      'We constantly innovate our teaching methods to make learning engaging and effective.',
  },
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: 'Community Building',
    description:
      'We foster a supportive community where students learn from each other and grow together.',
  },
  {
    icon: <Target className="w-8 h-8 text-green-500" />,
    title: 'Goal-Oriented Learning',
    description:
      'We help students set and achieve clear, measurable learning goals through structured programs.',
  },
];

const achievements = [
  { number: '5000+', label: 'Students Taught', icon: <Users className="w-6 h-6" /> },
  { number: '50+', label: 'Expert Instructors', icon: <Award className="w-6 h-6" /> },
  { number: '95%', label: 'Success Rate', icon: <Trophy className="w-6 h-6" /> },
  { number: '4.9/5', label: 'Student Rating', icon: <Star className="w-6 h-6" /> },
];

const milestones = [
  {
    year: '2020',
    title: 'StackSkills Founded',
    description: 'Started with a vision to make coding accessible to every child in India',
  },
  {
    year: '2021',
    title: 'Partnership with Codementum',
    description: 'Joined forces with Codementum to enhance our curriculum and reach',
  },
  {
    year: '2022',
    title: '1000+ Students Milestone',
    description: 'Reached our first major milestone of teaching 1000+ students',
  },
  {
    year: '2023',
    title: 'National Recognition',
    description: "Awarded 'Best EdTech Platform for Kids' by Education Excellence Awards",
  },
  {
    year: '2024',
    title: '5000+ Students & Growing',
    description: 'Expanded to serve 5000+ students across India with 95% success rate',
  },
];

export default function AboutPage() {
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
              <Link href="/">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
              <Link href="/start-learning">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-orange-100 text-orange-600">🌟 About StackSkills</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-black">
              Empowering Young Minds with
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {' '}
                Technology
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to make coding and STEM education accessible, engaging, and
              effective for every child. Partnered with Codementum, we're building the future of
              education.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To democratize coding and STEM education by making it accessible, affordable, and
                  engaging for students from classes 4-10. We believe every child deserves the
                  opportunity to learn the skills that will shape their future.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-black mb-4">Our Vision</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become India's leading EdTech platform for young learners, creating a
                  generation of confident, creative, and capable digital natives who can solve
                  tomorrow's challenges.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <Card
                      key={index}
                      className="p-4 text-center hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2 text-orange-500">
                        {achievement.icon}
                      </div>
                      <div className="text-2xl font-bold text-black">{achievement.number}</div>
                      <div className="text-sm text-gray-600">{achievement.label}</div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do and shape how we interact with our students,
              parents, and the broader community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-orange-200"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From a small startup to India's trusted EdTech platform for young learners.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                  >
                    <Card className="p-6 hover:shadow-lg transition-all duration-300">
                      <Badge className="bg-orange-100 text-orange-600 mb-2">{milestone.year}</Badge>
                      <h3 className="text-xl font-bold text-black mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our passionate team of educators, developers, and child psychology experts work
              together to create the best learning experience for your child.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
                  <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                    <Users className="w-12 h-12 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black mb-1">{member.name}</h3>
                <Badge className="bg-orange-100 text-orange-600 mb-3">{member.role}</Badge>
                <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.expertise.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Our Partnership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're proud to partner with Codementum to bring world-class coding education to Indian
              students.
            </p>
          </div>

          <Card className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black">Codementum Partnership</h3>
                    <Badge className="bg-orange-100 text-orange-600">Global EdTech Leader</Badge>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Through our strategic partnership with Codementum, we leverage their proven
                  curriculum, advanced learning platform, and global expertise to deliver
                  exceptional coding education tailored for Indian students.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'World-class curriculum',
                    'Advanced learning platform',
                    'Global best practices',
                    'Continuous innovation',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                      <Code2 className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-black">Codementum</h4>
                    <p className="text-gray-600">
                      Leading global platform for coding education with presence in 50+ countries
                    </p>
                    <div className="flex justify-center space-x-4 text-sm text-gray-500">
                      <div className="text-center">
                        <div className="font-bold text-black">1M+</div>
                        <div>Students</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-black">50+</div>
                        <div>Countries</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-black">10+</div>
                        <div>Years</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Join Our Learning Community?
            </h2>
            <p className="text-xl text-orange-100">
              Become part of the StackSkills family and give your child the gift of coding and STEM
              education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/start-learning">
                <Button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3 text-lg font-semibold"
                >
                  View Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
