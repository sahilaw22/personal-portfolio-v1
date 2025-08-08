import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppStateProvider, { AppStateSync } from '@/components/AppStateProvider';
import GradientTextStyles from '@/components/GradientTextStyles';
import BackgroundPatternStyles from '@/components/BackgroundPatternStyles';
import PerformanceProvider from '@/components/PerformanceProvider';

export const metadata: Metadata = {
  title: 'AI-Powered Portfolio',
  description: 'A futuristic portfolio built with Next.js and AI.',
  keywords: 'portfolio, developer, AI, Next.js, React, TypeScript',
  authors: [{ name: 'Portfolio Owner' }],
  creator: 'Portfolio Owner',
  publisher: 'Portfolio Owner',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AI-Powered Portfolio',
    description: 'A futuristic portfolio built with Next.js and AI.',
    url: '/',
    siteName: 'Portfolio',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered Portfolio',
    description: 'A futuristic portfolio built with Next.js and AI.',
    images: ['/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Optimized font loading with preconnect and dns-prefetch */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Load only essential fonts first, then swap */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Space+Grotesk:wght@400;600;700&display=swap" 
          rel="stylesheet"
          media="print" 
          className="font-loader"
        />
        {/* Load additional fonts asynchronously */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto+Slab:wght@400;700&family=Playfair+Display:wght@400;700&family=Lexend:wght@400;700&family=Source+Code+Pro:wght@400;700&family=JetBrains+Mono:wght@400;700&family=IBM+Plex+Mono:wght@400;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&family=Oswald:wght@400;700&family=Raleway:wght@400;700&family=Merriweather:wght@400;700&family=PT+Sans:wght@400;700&family=Open+Sans:wght@400;700&family=Nunito:wght@400;700&family=Ubuntu:wght@400;700&family=Roboto:wght@400;700&family=Zilla+Slab:wght@400;700&family=Domine:wght@400;700&family=Cormorant+Garamond:wght@400;700&family=EB+Garamond:wght@400;700&family=Libre+Baskerville:wght@400;700&family=Lora:wght@400;700&family=Pacifico&family=Anton&display=swap" 
          rel="preload" 
          as="style"
          className="font-preloader"
        />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Handle font loading for better performance
            document.addEventListener('DOMContentLoaded', function() {
              // Set primary font to load immediately
              const fontLoader = document.querySelector('.font-loader');
              if (fontLoader) {
                fontLoader.media = 'all';
              }
              
              // Convert preloaded font to stylesheet after load
              const fontPreloader = document.querySelector('.font-preloader');
              if (fontPreloader) {
                fontPreloader.onload = function() {
                  this.onload = null;
                  this.rel = 'stylesheet';
                };
              }
            });
          `
        }} />
        {/* Preload critical resources */}
        <link rel="preload" href="/profile.jpg" as="image" type="image/jpeg" />
        {/* Performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className="font-body antialiased">
        <PerformanceProvider>
          <AppStateProvider>
            <AppStateSync />
            <GradientTextStyles />
            <BackgroundPatternStyles />
            {children}
            <Toaster />
          </AppStateProvider>
        </PerformanceProvider>
      </body>
    </html>
  );
}