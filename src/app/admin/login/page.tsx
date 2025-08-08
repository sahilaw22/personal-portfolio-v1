'use client';

import { useState } from 'react';
import { useAppState } from '@/components/AppStateProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login, recoverPassword } = useAppState();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryAnswer, setRecoveryAnswer] = useState('');
  const [recoveredPassword, setRecoveredPassword] = useState('');

  const handleLogin = () => {
    const success = login(password);
    if (!success) {
      setError('Incorrect password. Access denied.');
      setShowRecovery(true);
    } else {
      setError('');
      setShowRecovery(false);
    }
  };

  const handleRecovery = () => {
    const result = recoverPassword(recoveryAnswer);
    if (result.success && result.password) {
      setRecoveredPassword(result.password);
      setError('');
      // Automatically set the recovered password and try to login
      setPassword(result.password);
      login(result.password);
    } else {
      setError('Incorrect answer. Please try again.');
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Admin Access</CardTitle>
          <CardDescription>
            {showRecovery ? 'Reset your password using security question' : 'Enter the password to customize your portfolio.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {!showRecovery ? (
              <>
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
                {error && (
                  <Button variant="link" size="sm" onClick={() => setShowRecovery(true)}>
                    Forgot Password?
                  </Button>
                )}
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Security Question:</p>
                  <p className="text-sm text-muted-foreground">What is your roll number?</p>
                </div>
                <Input
                  type="text"
                  value={recoveryAnswer}
                  onChange={(e) => setRecoveryAnswer(e.target.value)}
                  placeholder="Enter your roll number"
                  onKeyDown={(e) => e.key === 'Enter' && handleRecovery()}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                {recoveredPassword && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">Password recovered: <span className="font-mono font-bold">{recoveredPassword}</span></p>
                    <p className="text-xs text-green-600 mt-1">You are now logged in!</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button type="button" onClick={handleRecovery} className="flex-1">
                    Reset Password
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setShowRecovery(false);
                    setRecoveryAnswer('');
                    setRecoveredPassword('');
                    setError('');
                  }}>
                    Back
                  </Button>
                </div>
              </>
            )}
             <Button variant="link" size="sm" onClick={() => router.push('/')}>
                Back to Portfolio
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
