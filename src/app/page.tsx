'use client';

import { MeetingAnalyzer } from '@/components/meeting-analyzer';
import { Header } from '@/components/header';
import { AuthProvider } from '@/hooks/use-auth';
import { HistoryProvider } from '@/hooks/use-history';

export default function Home() {
  return (
    <AuthProvider>
      <HistoryProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow container mx-auto p-4 md:p-6">
            <MeetingAnalyzer />
          </main>
          <footer className="container mx-auto py-6 px-4 text-center text-sm text-muted-foreground md:px-6">
            <p>&copy; {new Date().getFullYear()} Meeting Insights Analyzer. All rights reserved.</p>
          </footer>
        </div>
      </HistoryProvider>
    </AuthProvider>
  );
}
