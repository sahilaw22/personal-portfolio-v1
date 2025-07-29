// headline-generator.ts
'use server';

/**
 * @fileOverview A headline generator AI agent for the 'about me' section of a portfolio.
 *
 * - generateHeadline - A function that generates taglines or headlines.
 * - HeadlineGeneratorInput - The input type for the generateHeadline function.
 * - HeadlineGeneratorOutput - The return type for the generateHeadline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HeadlineGeneratorInputSchema = z.object({
  aboutMeText: z
    .string()
    .describe('A description of the user, their skills, and experience.'),
  tone: z
    .enum(['professional', 'creative'])
    .describe('The desired tone for the headline.'),
});
export type HeadlineGeneratorInput = z.infer<typeof HeadlineGeneratorInputSchema>;

const HeadlineGeneratorOutputSchema = z.object({
  headline: z.string().describe('A generated headline for the about me section.'),
});
export type HeadlineGeneratorOutput = z.infer<typeof HeadlineGeneratorOutputSchema>;

export async function generateHeadline(input: HeadlineGeneratorInput): Promise<HeadlineGeneratorOutput> {
  return headlineGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'headlineGeneratorPrompt',
  input: {schema: HeadlineGeneratorInputSchema},
  output: {schema: HeadlineGeneratorOutputSchema},
  prompt: `You are a creative copywriter specializing in crafting compelling headlines for professional portfolios.

  Based on the provided 'about me' text and desired tone, generate a single headline that captures the essence of the individual.

  About Me Text: {{{aboutMeText}}}
  Tone: {{{tone}}}

  Headline:`,
});

const headlineGeneratorFlow = ai.defineFlow(
  {
    name: 'headlineGeneratorFlow',
    inputSchema: HeadlineGeneratorInputSchema,
    outputSchema: HeadlineGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
