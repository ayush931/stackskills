"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code as Code2, ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageCircle, CircleHelp as HelpCircle, Users } from 'lucide-react';
import Link from 'next/link';

const contactMethods = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone Support",
    description: "Speak directly with our support team",
    contact: "+91 9876543210",
    availability: "9 AM - 9 PM (Mon-Sun)",
    color: "bg-green-500"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Support",
    description: "Send us your queries anytime",
    contact: "support@stackskills.in",
    availability: "24/7 Response",
    color: "bg-blue-500"
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Live Chat",
    description: "Get instant help through chat",
    contact: "Available on website",
    availability: "9 AM - 9 PM (Mon-Sun)",
    color: "bg-purple-500"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Office Address",
    description: "Visit our headquarters",
    contact: "Bangalore, Karnataka, India",
    availability: "10 AM - 6 PM (Mon-Fri)",
    color: "bg-orange-500"
  }
];

const faqs = [
  {
    question: "What age group is StackSkills suitable for?",
    answer: "StackSkills is designed for students from classes 4-10 (ages 9-16). Our curriculum is age-appropriate and progressively structured."
  },
  {
    question: "Do I need any prior coding experience?",
    answer: "No prior experience is required! We start from the very basics and gradually build up to advanced concepts based on your grade level."
  },
  {
    question: "What devices do I need for the classes?",
    answer: "You'll need a computer/laptop with internet connection. We support Windows, Mac, and Chromebooks. Tablets can be used for some activities."
  },
  {
    question: "How does the free trial work?",
    answer: "Our 7-day free trial gives you full access to our platform, live classes, and support. No credit card required to start."
  },
  {
    question: "Can I switch between Self Learning and Live Classes?",
    answer: "Yes! You can upgrade or change your plan anytime. Our team will help you transition smoothly between different learning modes."
  },
  {
    question: "Do you provide certificates?",
    answer: "Yes, we provide certificates upon successful completion of each course. These certificates showcase the skills learned and projects completed."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Thank you for contacting us! We will get back to you within 24 hours.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit form. Please try again.'
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
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
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                StackSkills.in
              </span>
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
      <section className="pt-20 pb-12 bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-orange-100 text-orange-600">
              💬 Get in Touch
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-black">
              We're Here to
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Help You</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our courses, pricing, or platform? Our friendly support team is 
              ready to assist you. Reach out to us anytime!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Multiple Ways to Reach Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the method that works best for you. We're committed to providing quick and helpful responses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-orange-200">
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                <div className="space-y-2">
                  <div className="font-semibold text-black">{method.contact}</div>
                  <div className="text-sm text-gray-500 flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {method.availability}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-black mb-4">Send Us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
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
                        Email Address *
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      >
                        <option value="">Select inquiry type</option>
                        <option value="course-info">Course Information</option>
                        <option value="pricing">Pricing & Plans</option>
                        <option value="technical-support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter message subject"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your message here..."
                      required
                    ></textarea>
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
                    disabled={isSubmitting}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </div>

            {/* FAQ Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-black mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600">
                  Find quick answers to common questions about StackSkills.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="overflow-hidden">
                    <button
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-black pr-4">{faq.question}</h3>
                        <HelpCircle className={`w-5 h-5 text-orange-500 transform transition-transform ${
                          expandedFaq === index ? 'rotate-180' : ''
                        }`} />
                      </div>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              <Card className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-2">Still have questions?</h3>
                    <p className="text-gray-600 mb-4">
                      Our support team is here to help! Don't hesitate to reach out through any of the contact methods above.
                    </p>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Support Hours</h2>
                <p className="text-orange-100 mb-6">
                  We're committed to providing timely support when you need it most.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5" />
                    <span>Phone & Chat: 9 AM - 9 PM (Mon-Sun)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5" />
                    <span>Email: 24/7 (Response within 24 hours)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5" />
                    <span>Office Visits: 10 AM - 6 PM (Mon-Fri)</span>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="inline-block bg-white/20 rounded-2xl p-6">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-orange-100">Email Support</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}