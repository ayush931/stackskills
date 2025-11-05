"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoFooter from '../../images/logo1.png';

export default function Footer() {
  return (
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
  );
}
