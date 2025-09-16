'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { AnalysisResult } from '@/lib/types';
import { analyzeMeetingNotes } from '@/app/actions';
import { TimelineInput } from '@/components/timeline-input';
import { AnalysisResults } from '@/components/analysis-results';

export function MeetingAnalyzer() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAnalysis = async (rawNotes: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeMeetingNotes(rawNotes);
      setAnalysisResult(result);
    } catch (e: any) {
      const errorMessage = e.message || 'An unexpected error occurred.';
      setError(errorMessage);
      toast({
        title: 'Analysis Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
      <div className="lg:sticky top-24">
        <TimelineInput onAnalyze={handleAnalysis} isLoading={isLoading} />
      </div>
      <div className="min-h-[60vh]">
        <AnalysisResults result={analysisResult} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}
