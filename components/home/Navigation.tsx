'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logoHeader from '../../images/logo.png';

interface NavigationProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export default function Navigation({
  isMobileMenuOpen,
  toggleMobileMenu,
  closeMobileMenu,
}: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Image src={logoHeader} alt="header-logo" height={100} width={200} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-gray-700 hover:text-orange-500 transition-colors">
              Courses
            </Link>
            <a href="#pricing" className="text-gray-700 hover:text-orange-500 transition-colors">
              Pricing
            </a>
            <Link href="/about" className="text-gray-700 hover:text-orange-500 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-500 transition-colors">
              Contact
            </Link>
            <Link
              href={'/register'}
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Register
            </Link>
            <Link href="/start-learning">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
                Start Learning
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link
                href="/courses"
                className="text-gray-700 hover:text-orange-500 transition-colors px-4 py-2 hover:bg-orange-50 rounded-lg"
                onClick={closeMobileMenu}
              >
                Courses
              </Link>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-orange-500 transition-colors px-4 py-2 hover:bg-orange-50 rounded-lg"
                onClick={closeMobileMenu}
              >
                Pricing
              </a>
              <Link
                href="/about"
                className="text-gray-700 hover:text-orange-500 transition-colors px-4 py-2 hover:bg-orange-50 rounded-lg"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-orange-500 transition-colors px-4 py-2 hover:bg-orange-50 rounded-lg"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              <Link
                href="/register"
                className="text-gray-700 hover:text-orange-500 transition-colors px-4 py-2 hover:bg-orange-50 rounded-lg"
                onClick={closeMobileMenu}
              >
                Register
              </Link>
              <Link href="/start-learning" onClick={closeMobileMenu}>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3">
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
