import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppStateProvider, { AppStateSync } from '@/components/AppStateProvider';


export const metadata: Metadata = {
  title: 'AI-Powered Portfolio',
  description: 'A futuristic portfolio built with Next.js and AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Space+Grotesk:wght@300..700&family=Roboto+Slab:wght@400;700&family=Playfair+Display:wght@400;700&family=Inter:wght@400;700&family=Lexend:wght@400;700&family=Source+Code+Pro:wght@400;700&family=JetBrains+Mono:wght@400;700&family=IBM+Plex+Mono:wght@400;700&display=swap" rel="stylesheet" />
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
