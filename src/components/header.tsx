'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  const { user, signOut, loading } = useAuth();

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <h1 className="text-xl font-bold tracking-tight text-primary">
            Meeting Insights Analyzer
          </h1>
        </Link>
        <nav className="flex items-center gap-4">
          {user && (
             <Button variant="ghost" asChild>
                <Link href="/history">History</Link>
            </Button>
          )}
          {user ? (
            <Button variant="outline" onClick={signOut} disabled={loading}>
              Sign Out
            </Button>
          ) : (
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
