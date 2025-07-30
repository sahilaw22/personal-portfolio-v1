import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import PasswordDialog from '@/components/admin/PasswordDialog';
import AdminPanel from '@/components/admin/AdminPanel';
import AppStateProvider from '@/components/AppStateProvider';


export const metadata: Metadata = {
  title: 'Nerdfolio - Sahil A',
  description: 'A futuristic portfolio for Sahil A, built with Next.js and AI.',
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
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AppStateProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </AppStateProvider>
      </body>
    </html>
  );
}
