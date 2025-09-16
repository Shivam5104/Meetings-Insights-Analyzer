import { Smile, Frown, Meh, Lightbulb, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AnalysisResult } from '@/lib/types';

type InsightsSummaryProps = Pick<
  AnalysisResult,
  'sentiment' | 'missedInformation' | 'supportingTimelines'
>;

const sentimentConfig = {
  positive: {
    icon: Smile,
    label: 'Positive',
    className: 'bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20',
  },
  negative: {
    icon: Frown,
    label: 'Negative',
    className: 'bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20',
  },
  neutral: {
    icon: Meh,
    label: 'Neutral',
    className: 'bg-muted text-muted-foreground border hover:bg-muted/80',
  },
};

export function InsightsSummary({ sentiment, missedInformation, supportingTimelines }: InsightsSummaryProps) {
  const SentimentIcon = sentimentConfig[sentiment].icon;

  const hasGaps = missedInformation && !missedInformation.toLowerCase().includes('no information was missed');

  return (
    <div className="space-y-6">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Lightbulb />
            <span>Key Insights Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Overall Meeting Sentiment</h4>
            <Badge variant="outline" className={`text-base px-3 py-1 ${sentimentConfig[sentiment].className}`}>
              <SentimentIcon className="mr-2 h-5 w-5" />
              {sentimentConfig[sentiment].label}
            </Badge>
          </div>
          {supportingTimelines && (
            <div className="text-sm">
              <h4 className="font-semibold mb-1">Sentiment Drivers:</h4>
              <blockquote className="border-l-2 pl-3 italic text-muted-foreground">"{supportingTimelines}"</blockquote>
            </div>
          )}
        </CardContent>
      </Card>

      {hasGaps && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[hsl(var(--chart-4))]">
              <AlertTriangle />
              <span>Potential Gaps</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground">{missedInformation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
