'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/header';
import type { AnalysisResult } from '@/lib/types';
import { AnalysisResults } from '@/components/analysis-results';
import { useHistory, HistoryProvider } from '@/hooks/use-history';

function MeetingDetailsPageContent() {
  const pathname = usePathname();
  const id = pathname.split('/').pop() as string;
  const { history } = useHistory();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && id && history.length > 0) {
      const foundMeeting = history.find((item) => item.id === id);
      if (foundMeeting) {
        setResult(foundMeeting);
      } else {
        setError('Meeting analysis not found in your session history.');
      }
      setLoading(false);
    } else if (user) {
        setLoading(false);
        setError('No meeting history found for this session.');
    }
  }, [id, history, user]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
         <AnalysisResults result={result} isLoading={loading} error={error} />
      </main>
    </div>
  );
}

export default function MeetingDetailsPage() {
  return (
    <AuthProvider>
      <HistoryProvider>
        <MeetingDetailsPageContent />
      </HistoryProvider>
    </AuthProvider>
  );
}
