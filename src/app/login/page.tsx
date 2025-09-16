'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { useAuth, AuthProvider } from '@/hooks/use-auth';
import { ChromeIcon } from '@/components/icons';

function LoginPageContent() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to access your meeting history.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={signInWithGoogle} disabled={loading}>
              <ChromeIcon className="mr-2 h-4 w-4" />
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginPageContent />
    </AuthProvider>
  );
}
