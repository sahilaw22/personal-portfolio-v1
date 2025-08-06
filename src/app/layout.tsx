import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppStateProvider, { AppStateSync } from '@/components/AppStateProvider';


export const metadata: Metadata = {
  title: 'Portfolio - Sahil Ahmed Wani',
  description: 'A futuristic portfolio for Sahil Ahmed Wani, built with Next.js and AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AppStateProvider>
          <AppStateSync />
            {children}
          <Toaster />
        </AppStateProvider>
      </body>
    </html>
  );
}
