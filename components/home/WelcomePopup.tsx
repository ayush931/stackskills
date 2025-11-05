"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Rocket, BookOpen } from 'lucide-react';
import popupImage from '../../images/popupImage.png';

interface WelcomePopupProps {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
}

export default function WelcomePopup({ showPopup, setShowPopup }: WelcomePopupProps) {
  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="sm:max-w-[95vw] md:max-w-[900px] lg:max-w-[1000px] p-0 overflow-hidden border-0 bg-transparent shadow-2xl">
        <div className="relative w-full bg-white rounded-2xl overflow-hidden">
          {/* Decorative gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-500 opacity-10 pointer-events-none"></div>

          {/* Main Content Wrapper */}
          <div className="relative">
            {/* Animated gradient top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 animate-pulse"></div>

            {/* Image Container with enhanced styling */}
            <div className="relative w-full p-4 sm:p-6">
              <div className="relative rounded-xl overflow-hidden shadow-2xl ring-4 ring-orange-500/20 hover:ring-orange-500/40 transition-all duration-300">
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none"></div>

                {/* Main Popup Image */}
                <Image
                  src={popupImage}
                  alt="Welcome to StackSkills"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />

                {/* Subtle vignette effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Enhanced Action Buttons Section */}
            <div className="relative px-4 sm:px-8 pb-6 pt-2">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/register" onClick={() => setShowPopup(false)} className="w-full sm:w-auto">
                  <Button
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 rounded-xl"
                  >
                    <Rocket className="w-5 h-5 mr-2 animate-bounce" />
                    Register Now
                  </Button>
                </Link>
                <Link href="/courses" onClick={() => setShowPopup(false)} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-white border-3 border-orange-500 text-orange-600 hover:bg-orange-50 hover:border-orange-600 px-10 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-orange-500 opacity-50 rounded-tl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-orange-500 opacity-50 rounded-br-2xl"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
