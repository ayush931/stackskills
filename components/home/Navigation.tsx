'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, BookOpen, Settings, ChevronDown } from 'lucide-react';
import logoHeader from '../../images/logo.png';
import { useAuthStore } from '@/store/authStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

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
  const { isLoggedIn, phone, name, role, logout } = useAuthStore();
  const router = useRouter();
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout-user', { method: 'GET' });
      const result = await response.json();
      if (result.success) {
        logout();
        toast({
          title: 'Logout successfull',
          description: 'Successfully log out from the account',
          variant: 'success'
        })
        router.push('/');
        return;
      }
      else {
        toast({
          title: 'Error',
          description: 'Failed to logout from the account',
          variant: 'destructive'
        })
        return;
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
              Register Level 2
            </Link>

            {/* Show User Dropdown if logged in, otherwise show Register/Login */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{name || phone}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {role === 'ADMIN' ? (
                    <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => router.push('/view-profile')}>
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login-user">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
                  Login
                </Button>
              </Link>
            )}
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
                Register Level 2
              </Link>

              {/* Mobile User Menu */}
              {isLoggedIn ? (
                <Collapsible
                  open={isMobileUserMenuOpen}
                  onOpenChange={setIsMobileUserMenuOpen}
                  className="border-t border-gray-100 mt-2 pt-2"
                >
                  <CollapsibleTrigger asChild>
                    <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-orange-50 rounded-lg transition-colors text-left">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            {name || 'User'}
                          </span>
                          <span className="text-xs text-gray-500">{phone}</span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isMobileUserMenuOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-2 py-2 space-y-1">
                    {role === 'ADMIN' ? (
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 px-4 py-2.5 hover:bg-orange-50 rounded-lg transition-colors text-gray-700"
                        onClick={closeMobileMenu}
                      >
                        <BookOpen className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Dashboard</span>
                      </Link>
                    ) : (
                      <Link
                        href="/view-profile"
                        className="flex items-center space-x-3 px-4 py-2.5 hover:bg-orange-50 rounded-lg transition-colors text-gray-700"
                        onClick={closeMobileMenu}
                      >
                        <User className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">View Profile</span>
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-4 py-2.5 hover:bg-orange-50 rounded-lg transition-colors text-gray-700"
                      onClick={closeMobileMenu}
                    >
                      <Settings className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">Profile Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link href="/login-user" onClick={closeMobileMenu}>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}