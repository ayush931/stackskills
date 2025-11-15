'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Zap, Monitor, Clock, Users, CheckCircle, Star, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

export default function PricingSection() {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, role } = useAuthStore();

  const handlePurchase = (planName: string, purchaseUrl: string) => {
    // Check if user is logged in
    if (!isLoggedIn) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to purchase a plan',
        variant: 'destructive',
      });
      router.push('/login-user');
      return;
    }

    // Check if user is ADMIN
    if (role === 'ADMIN') {
      toast({
        title: 'Access Restricted',
        description: 'Admin accounts cannot purchase plans. Please use a student account.',
        variant: 'destructive',
      });
      return;
    }

    // Check if user is USER (student)
    if (role === 'USER') {
      toast({
        title: 'Redirecting to Payment',
        description: `Processing ${planName} plan purchase...`,
        variant: 'success',
      });

      // Redirect to payment page
      window.location.href = purchaseUrl;
      return;
    }

    // Fallback for any other case
    toast({
      title: 'Error',
      description: 'Unable to process purchase. Please contact support.',
      variant: 'destructive',
    });
  };

  const isPurchaseDisabled = isLoggedIn && role === 'ADMIN';

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-orange-100 text-orange-600">Pricing</Badge>
          <h2 className="text-4xl font-bold text-black">Choose Your Learning Path</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible plans designed to fit every student's learning style and schedule
          </p>

          {/* Admin Restriction Notice */}
          {isLoggedIn && role === 'ADMIN' && (
            <div className="max-w-2xl mx-auto mt-6 p-4 bg-orange-100 border-l-4 border-orange-500 rounded-lg">
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-orange-600" />
                <p className="text-orange-800 font-medium">
                  Admin accounts cannot purchase plans. Student accounts only.
                </p>
              </div>
            </div>
          )}
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
                  {
                    icon: <Monitor className="w-5 h-5 text-green-500" />,
                    text: 'Study at home using our platform',
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-green-500" />,
                    text: '1 Hr Masterclass every weekend',
                  },
                  {
                    icon: <Users className="w-5 h-5 text-green-500" />,
                    text: 'Doubt support: 9 AM - 9 PM',
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
                    text: 'Access of portal',
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {feature.icon}
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() =>
                  handlePurchase(
                    'Self Learning',
                    'https://payments.cashfree.com/forms?code=stackskills'
                  )
                }
                disabled={isPurchaseDisabled}
                className={`w-full py-3 text-lg font-semibold rounded-xl transition-all ${
                  isPurchaseDisabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {isPurchaseDisabled ? (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Admin Restricted
                  </>
                ) : !isLoggedIn ? (
                  'Login to Purchase'
                ) : (
                  'Get Started'
                )}
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
                Elevate your learning with live interactive classes, expert teachers, and premium
                support. Ideal for dedicated learners.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: <Users className="w-5 h-5 text-green-400" />,
                    text: 'Learn directly from our expert teachers',
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-green-400" />,
                    text: 'MWF / TTS 45-min classes',
                  },
                  {
                    icon: <Users className="w-5 h-5 text-green-400" />,
                    text: 'Doubt support: 9 AM - 9 PM',
                  },
                  {
                    icon: <Star className="w-5 h-5 text-green-400" />,
                    text: '1.5 Hr Masterclass every weekend',
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {feature.icon}
                    <span className="text-gray-200">{feature.text}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() =>
                  handlePurchase(
                    'Live Classes',
                    'https://payments.cashfree.com/forms/SSJR_Liveclasses'
                  )
                }
                disabled={isPurchaseDisabled}
                className={`w-full py-3 text-lg font-semibold rounded-xl transition-all ${
                  isPurchaseDisabled
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed hover:bg-gray-600'
                    : 'bg-white hover:bg-gray-100 text-black'
                }`}
              >
                {isPurchaseDisabled ? (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Admin Restricted
                  </>
                ) : !isLoggedIn ? (
                  'Login to Purchase'
                ) : (
                  'Start Live Classes'
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Additional Information */}
        {!isLoggedIn && (
          <div className="max-w-2xl mx-auto mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => router.push('/register-user')}
                className="text-orange-600 font-semibold hover:text-orange-700 underline"
              >
                Register now
              </button>{' '}
              to get started with your learning journey!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
