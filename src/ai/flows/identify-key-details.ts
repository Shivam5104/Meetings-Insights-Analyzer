'use server';

/**
 * @fileOverview Identifies key discussion points from a meeting timeline and details.
 *
 * - identifyKeyDetails - A function that analyzes meeting timelines and details to identify key discussion points.
 * - IdentifyKeyDetailsInput - The input type for the identifyKeyDetails function.
 * - IdentifyKeyDetailsOutput - The return type for the identifyKeyDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyKeyDetailsInputSchema = z.object({
  timeline: z
    .string()
    .describe('The meeting timeline, including timestamps and notes.'),
});
export type IdentifyKeyDetailsInput = z.infer<typeof IdentifyKeyDetailsInputSchema>;

const IdentifyKeyDetailsOutputSchema = z.object({
  keyDetails: z
    .string()
    .describe('A summary of the key discussion points from the meeting.'),
  isImportant: z
    .boolean()
    .describe('Whether or not the timeline entry is important'),
});
export type IdentifyKeyDetailsOutput = z.infer<typeof IdentifyKeyDetailsOutputSchema>;

export async function identifyKeyDetails(input: IdentifyKeyDetailsInput): Promise<IdentifyKeyDetailsOutput> {
  return identifyKeyDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyKeyDetailsPrompt',
  input: {schema: IdentifyKeyDetailsInputSchema},
  output: {schema: IdentifyKeyDetailsOutputSchema},
  prompt: `You are an AI assistant helping to identify key details from meeting timelines.

  Analyze the following meeting timeline and extract the key discussion points. Determine if the timeline is important. Return the important of timeline points, and a boolean value representing its importance.

  Meeting Timeline:
  {{timeline}}
  `,
});

const identifyKeyDetailsFlow = ai.defineFlow(
  {
    name: 'identifyKeyDetailsFlow',
    inputSchema: IdentifyKeyDetailsInputSchema,
    outputSchema: IdentifyKeyDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
