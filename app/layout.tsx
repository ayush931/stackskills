import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StackSkills - Learn Coding & STEM for Kids | Classes 4-10',
  description: 'Join StackSkills for interactive coding and STEM education. Partnered with Codementum. Perfect for students from classes 4-10. Start your coding journey today!',
  keywords: 'coding for kids, STEM education, programming classes, Codementum partner, online coding school, kids programming, technology education',
  authors: [{ name: 'StackSkills' }],
  openGraph: {
    title: 'StackSkills - Learn Coding & STEM for Kids',
    description: 'Interactive coding and STEM education for students classes 4-10. Partnered with Codementum.',
    url: 'https://stackskills.in',
    siteName: 'StackSkills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StackSkills - Learn Coding & STEM for Kids',
    description: 'Interactive coding and STEM education for students classes 4-10. Partnered with Codementum.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF6B35" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}