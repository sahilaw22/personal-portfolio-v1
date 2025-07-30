'use client';
import HomePage from '@/components/HomePage';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

export default function Page() {
  return (
     <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}
