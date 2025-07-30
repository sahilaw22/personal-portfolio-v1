'use client';

import { useState } from 'react';
import { useAppState } from '@/components/AppStateProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login } = useAppState();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const success = login(password);
    if (!success) {
      setError('Incorrect password. Access denied.');
    } else {
      setError('');
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Admin Access</CardTitle>
          <CardDescription>
            Enter the password to customize your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
             <Button type="button" onClick={handleLogin}>Unlock</Button>
             <Button variant="link" size="sm" onClick={() => router.push('/')}>
                Back to Portfolio
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
