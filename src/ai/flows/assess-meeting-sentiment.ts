// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Analyzes the meeting timeline and discussion details to determine the overall sentiment (positive, negative, neutral).
 *
 * - assessMeetingSentiment - A function that handles the meeting sentiment assessment.
 * - AssessMeetingSentimentInput - The input type for the assessMeetingSentiment function.
 * - AssessMeetingSentimentOutput - The return type for the assessMeetingSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessMeetingSentimentInputSchema = z.object({
  meetingDetails: z
    .string()
    .describe('Meeting details, including timelines and discussion points.'),
});
export type AssessMeetingSentimentInput = z.infer<typeof AssessMeetingSentimentInputSchema>;

const AssessMeetingSentimentOutputSchema = z.object({
  sentiment: z
    .enum(['positive', 'negative', 'neutral'])
    .describe('The overall sentiment of the meeting.'),
  supportingTimelines: z
    .string()
    .describe('Timelines from the meeting that support the determined sentiment.'),
});
export type AssessMeetingSentimentOutput = z.infer<typeof AssessMeetingSentimentOutputSchema>;

export async function assessMeetingSentiment(
  input: AssessMeetingSentimentInput
): Promise<AssessMeetingSentimentOutput> {
  return assessMeetingSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessMeetingSentimentPrompt',
  input: {schema: AssessMeetingSentimentInputSchema},
  output: {schema: AssessMeetingSentimentOutputSchema},
  prompt: `Analyze the following meeting details to determine the overall sentiment (positive, negative, or neutral) of the meeting.\n\nMeeting Details:\n{{{meetingDetails}}}\n\nProvide the overall sentiment and list the timelines that most strongly support this sentiment.\n\nEnsure the sentiment is one of the following values: positive, negative, or neutral.\n\nOutput the timelines that support the sentiment. If there is no clear positive or negative sentiment, return neutral and do not include any supporting timelines.\n`,
});

const assessMeetingSentimentFlow = ai.defineFlow(
  {
    name: 'assessMeetingSentimentFlow',
    inputSchema: AssessMeetingSentimentInputSchema,
    outputSchema: AssessMeetingSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
