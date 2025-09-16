'use server';

import { assessMeetingSentiment } from '@/ai/flows/assess-meeting-sentiment';
import { detectLagDetails } from '@/ai/flows/detect-lag-details';
import { identifyKeyDetails } from '@/ai/flows/identify-key-details';
import type { AnalysisResult, TimelineEntry, MeetingHistoryItem } from '@/lib/types';


function parseNotes(rawNotes: string): Array<{ id: number; originalLine: string; time: string | null; note: string }> {
  return rawNotes
    .split('\n')
    .map((line, index) => ({ id: index, line: line.trim() }))
    .filter(item => item.line)
    .map(({ id, line }) => {
      const timeMatch = line.match(/^(\d{1,2}:\d{2})\s*-\s*/);
      if (timeMatch) {
        return {
          id,
          originalLine: line,
          time: timeMatch[1],
          note: line.substring(timeMatch[0].length).trim(),
        };
      }
      return { id, originalLine: line, time: null, note: line };
    });
}

export async function analyzeMeetingNotes(rawNotes: string): Promise<AnalysisResult> {

  if (!rawNotes || !rawNotes.trim()) {
    throw new Error('Meeting notes cannot be empty.');
  }

  const parsedEntries = parseNotes(rawNotes);
  if (parsedEntries.length === 0) {
    throw new Error('No valid meeting notes found to analyze.');
  }

  const [sentimentResult, keyDetailsResults] = await Promise.all([
    assessMeetingSentiment({ meetingDetails: rawNotes }),
    Promise.all(
      parsedEntries.map(entry => identifyKeyDetails({ timeline: entry.originalLine }))
    ),
  ]);

  const importantDetails: string[] = [];
  const processedTimeline: TimelineEntry[] = parsedEntries.map((entry, index) => {
    const keyDetailResult = keyDetailsResults[index];
    const isKey = keyDetailResult.isImportant;
    if (isKey) {
      importantDetails.push(keyDetailResult.keyDetails);
    }
    return {
      id: entry.id,
      time: entry.time || `Item ${index + 1}`,
      note: entry.note,
      isKeyDetail: isKey,
    };
  });

  const lagResult = await detectLagDetails({
    userTimelines: rawNotes,
    keyDetails: importantDetails.length > 0 ? importantDetails.join('\n') : 'No key details were identified.',
  });
  
  const result: AnalysisResult = {
    id: new Date().toISOString(), // Use timestamp as a temporary ID
    title: rawNotes.substring(0, 40).split('\n')[0] + '...', // Use first line as a title
    date: new Date().toISOString(),
    sentiment: sentimentResult.sentiment,
    supportingTimelines: sentimentResult.supportingTimelines,
    missedInformation: lagResult.missedInformation,
    timeline: processedTimeline,
  }

  return result;
}
