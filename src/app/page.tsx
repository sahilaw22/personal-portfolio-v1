
'use client';
import { useEffect } from 'react';
import HomePage from '@/components/HomePage';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { useAppState } from '@/components/AppStateProvider';

export default function Page() {
  const { addPageView } = useAppState();

  useEffect(() => {
    addPageView();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
