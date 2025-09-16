export interface TimelineEntry {
  id: number;
  time: string;
  note: string;
  isKeyDetail?: boolean;
}

export interface AnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  supportingTimelines: string;
  missedInformation: string;
  timeline: TimelineEntry[];
}
