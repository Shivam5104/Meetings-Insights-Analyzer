import { BarChart2, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { TimelineEntry } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TimelineVisualizerProps {
  timeline: TimelineEntry[];
}

export function TimelineVisualizer({ timeline }: TimelineVisualizerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 />
          <span>Timeline Breakdown</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="relative pl-8">
            <Separator orientation="vertical" className="absolute left-3 top-0 h-full bg-border" />
            {timeline.map((entry, index) => (
              <div key={entry.id} className="relative mb-8 flex items-start gap-4">
                <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                </div>
                <p className="w-20 pt-1 font-mono text-sm text-muted-foreground">{entry.time}</p>
                <div
                  className={cn(
                    'flex-1 rounded-md border p-3 transition-colors',
                    entry.isKeyDetail ? 'border-accent bg-accent/5' : 'bg-muted/40'
                  )}
                >
                  <p className="text-sm">
                    {entry.isKeyDetail && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Lightbulb className="mr-2 inline-block h-4 w-4 text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Identified as a key detail</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {entry.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
