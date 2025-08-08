'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  const personalInfo = {
    name: 'Sahil Ahmed Wani',
    email: 'sahilaw22@gmail.com',
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        router.push('/admin/login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  return (
    <footer
      className="w-full border-t border-border/40 bg-background/95 py-6"
    >
      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
