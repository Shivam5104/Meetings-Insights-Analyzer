'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/hooks/use-auth';
import { Header } from '@/components/header';
import { getMeetingDetails } from '@/app/actions';
import type { AnalysisResult } from '@/lib/types';
import { AnalysisResults } from '@/components/analysis-results';

function MeetingDetailsPageContent() {
  const pathname = usePathname();
  const id = pathname.split('/').pop() as string;
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getMeetingDetails(id)
        .then((data) => {
          if (data) {
            setResult(data);
          } else {
            setError('Meeting analysis not found.');
          }
        })
        .catch((err) => {
          setError(err.message || 'Failed to load meeting details.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

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
      <MeetingDetailsPageContent />
    </AuthProvider>
  );
}
