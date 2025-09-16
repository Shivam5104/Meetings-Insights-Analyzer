'use server';

import { assessMeetingSentiment } from '@/ai/flows/assess-meeting-sentiment';
import { detectLagDetails } from '@/ai/flows/detect-lag-details';
import { identifyKeyDetails } from '@/ai/flows/identify-key-details';
import type { AnalysisResult, TimelineEntry, MeetingHistoryItem } from '@/lib/types';
import { auth, firestore } from '@/lib/firebase/server';
import { collection, addDoc, getDocs, query, where, orderBy, doc, getDoc } from 'firebase/firestore';

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
  const user = auth.currentUser;
  if (!user) {
    throw new Error('You must be logged in to analyze meeting notes.');
  }

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
    sentiment: sentimentResult.sentiment,
    supportingTimelines: sentimentResult.supportingTimelines,
    missedInformation: lagResult.missedInformation,
    timeline: processedTimeline,
  }

  // Save to Firestore
  try {
    const docRef = await addDoc(collection(firestore, 'meetings'), {
      userId: user.uid,
      title: rawNotes.substring(0, 40).split('\n')[0] + '...', // Use first line as a title
      notes: rawNotes,
      result: result,
      createdAt: new Date().toISOString(),
    });
    return { ...result, id: docRef.id };
  } catch (error) {
    console.error("Error saving to Firestore: ", error);
    throw new Error("Could not save the analysis result. Please try again.");
  }
}

export async function getMeetingHistory(): Promise<MeetingHistoryItem[]> {
  const user = auth.currentUser;
  if (!user) {
    return [];
  }

  const q = query(
    collection(firestore, "meetings"),
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  const history: MeetingHistoryItem[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    history.push({
      id: doc.id,
      title: data.title,
      date: new Date(data.createdAt).toLocaleDateString(),
      sentiment: data.result.sentiment,
    });
  });

  return history;
}

export async function getMeetingDetails(id: string): Promise<AnalysisResult | null> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("You must be logged in to view meeting details.");
  }

  const docRef = doc(firestore, 'meetings', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data.userId === user.uid) {
      return data.result as AnalysisResult;
    } else {
      throw new Error("You do not have permission to view this meeting.");
    }
  }

  return null;
}
