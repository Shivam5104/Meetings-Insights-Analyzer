'use server';

/**
 * @fileOverview Detects potential missed information in user-captured meeting timelines by comparing them with identified key details.
 *
 * - detectLagDetails - A function that compares user timelines with key details and highlights missed information.
 * - DetectLagDetailsInput - The input type for the detectLagDetails function.
 * - DetectLagDetailsOutput - The return type for the detectLagDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectLagDetailsInputSchema = z.object({
  userTimelines: z
    .string()
    .describe('The meeting timelines captured by the user.'),
  keyDetails: z.string().describe('The key details identified from the meeting.'),
});
export type DetectLagDetailsInput = z.infer<typeof DetectLagDetailsInputSchema>;

const DetectLagDetailsOutputSchema = z.object({
  missedInformation: z
    .string()
    .describe('The potential missed information highlighted for the user.'),
});
export type DetectLagDetailsOutput = z.infer<typeof DetectLagDetailsOutputSchema>;

export async function detectLagDetails(input: DetectLagDetailsInput): Promise<DetectLagDetailsOutput> {
  return detectLagDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectLagDetailsPrompt',
  input: {schema: DetectLagDetailsInputSchema},
  output: {schema: DetectLagDetailsOutputSchema},
  prompt: `You are an AI assistant that compares user-captured meeting timelines with identified key details to highlight potential missed information.

  User Timelines: {{{userTimelines}}}

  Key Details: {{{keyDetails}}}

  Based on the above information, identify any potential missed information from the user timelines, and provide a summary of the missed information. Focus on factual content. If all key details appear to be represented in the user timelines, say that no information was missed.`,
});

const detectLagDetailsFlow = ai.defineFlow(
  {
    name: 'detectLagDetailsFlow',
    inputSchema: DetectLagDetailsInputSchema,
    outputSchema: DetectLagDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
