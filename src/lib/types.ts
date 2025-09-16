export interface TimelineEntry {
  id: number;
  time: string;
  note: string;
  isKeyDetail?: boolean;
}

export interface AnalysisResult {
  id: string; // Changed to string for easier local management
  date: string;
  title: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  supportingTimelines: string;
  missedInformation: string;
  timeline: TimelineEntry[];
}

export interface MeetingHistoryItem extends AnalysisResult {}
