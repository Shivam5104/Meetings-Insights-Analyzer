import type { AnalysisResult } from '@/lib/types';
import { InsightsSummary } from './insights-summary';
import { TimelineVisualizer } from './timeline-visualizer';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Bot, BarChart2, AlertCircle } from 'lucide-react';

interface AnalysisResultsProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

export function AnalysisResults({ result, isLoading, error }: AnalysisResultsProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center border-destructive bg-destructive/10">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-destructive">Analysis Failed</h3>
        <p className="text-destructive/80">{error}</p>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center border-dashed min-h-[50vh]">
        <Bot className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground">Awaiting Analysis</h3>
        <p className="text-muted-foreground">
          Your meeting insights will appear here once the analysis is complete.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <InsightsSummary
        sentiment={result.sentiment}
        missedInformation={result.missedInformation}
        supportingTimelines={result.supportingTimelines}
      />
      <TimelineVisualizer timeline={result.timeline} />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-8 w-1/3 mt-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-muted-foreground" />
            <Skeleton className="h-8 w-1/3" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          {[...Array(5)].map((_, i) => (
            <div className="flex items-start gap-4" key={i}>
              <Skeleton className="h-5 w-16 mt-1" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
