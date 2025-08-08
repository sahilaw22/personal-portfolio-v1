'use client';

import { useState, useCallback } from 'react';
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

  const handleLogin = useCallback(() => {
    const success = login(password);
    if (!success) {
      setError('Incorrect password. Access denied.');
      setShowRecovery(true);
    } else {
      setError('');
      setShowRecovery(false);
    }
  }, [password, login]);

  const handleRecovery = useCallback(() => {
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
  }, [recoveryAnswer, recoverPassword, login]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleRecoveryAnswerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRecoveryAnswer(e.target.value);
  }, []);

  const handlePasswordKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }, [handleLogin]);

  const handleRecoveryKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRecovery();
    }
  }, [handleRecovery]);

  const showRecoveryHandler = useCallback(() => {
    setShowRecovery(true);
  }, []);

  const handleBackToLogin = useCallback(() => {
    setShowRecovery(false);
    setRecoveryAnswer('');
    setRecoveredPassword('');
    setError('');
  }, []);

  const navigateToHome = useCallback(() => {
    router.push('/');
  }, [router]);
  
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
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  onKeyDown={handlePasswordKeyDown}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="button" onClick={handleLogin}>Unlock</Button>
                {error && (
                  <Button variant="link" size="sm" onClick={showRecoveryHandler}>
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
                  onChange={handleRecoveryAnswerChange}
                  placeholder="Enter your roll number"
                  onKeyDown={handleRecoveryKeyDown}
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
                  <Button variant="outline" onClick={handleBackToLogin}>
                    Back
                  </Button>
                </div>
              </>
            )}
             <Button variant="link" size="sm" onClick={navigateToHome}>
                Back to Portfolio
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
