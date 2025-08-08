// headline-generator.ts
'use server';

/**
 * @fileOverview A headline generator AI agent for the 'about me' section of a portfolio.
 *
 * - generateHeadline - A function that generates taglines or headlines.
 * - HeadlineGeneratorInput - The input type for the generateHeadline function.
 * - HeadlineGeneratorOutput - The return type for the generateHeadline function.
 */

// Conditional imports to prevent build errors
let ai: any;
let z: any;

try {
  const genkitModule = require('@/ai/genkit');
  ai = genkitModule.ai;
  z = require('genkit').z;
} catch (error) {
  console.warn('AI modules not available, using fallback');
  ai = null;
  z = {
    object: (obj: any) => obj,
    string: () => ({ describe: () => ({}) }),
    enum: () => ({ describe: () => ({}) }),
  };
}

const HeadlineGeneratorInputSchema = z.object({
  aboutMeText: z
    .string()
    .describe('A description of the user, their skills, and experience.'),
  tone: z
    .enum(['professional', 'creative'])
    .describe('The desired tone for the headline.'),
});
export type HeadlineGeneratorInput = typeof HeadlineGeneratorInputSchema extends { aboutMeText: any; tone: any }
  ? { aboutMeText: string; tone: 'professional' | 'creative' }
  : any;

const HeadlineGeneratorOutputSchema = z.object({
  headline: z.string().describe('A generated headline for the about me section.'),
});
export type HeadlineGeneratorOutput = typeof HeadlineGeneratorOutputSchema extends { headline: any }
  ? { headline: string }
  : any;

export async function generateHeadline(input: HeadlineGeneratorInput): Promise<HeadlineGeneratorOutput> {
  // Fallback when AI is not available
  if (!ai) {
    return {
      headline: `${input.tone === 'professional' ? 'Professional' : 'Creative'} Developer & Problem Solver`
    };
  }
  
  try {
    return await headlineGeneratorFlow(input);
  } catch (error) {
    console.warn('AI generation failed, using fallback:', error);
    return {
      headline: `${input.tone === 'professional' ? 'Professional' : 'Creative'} Developer & Problem Solver`
    };
  }
}

const prompt = ai ? ai.definePrompt({
  name: 'headlineGeneratorPrompt',
  input: {schema: HeadlineGeneratorInputSchema},
  output: {schema: HeadlineGeneratorOutputSchema},
  prompt: `You are a creative copywriter specializing in crafting compelling headlines for professional portfolios.

  Based on the provided 'about me' text and desired tone, generate a single headline that captures the essence of the individual.

  About Me Text: {{{aboutMeText}}}
  Tone: {{{tone}}}

  Headline:`,
}) : null;

const headlineGeneratorFlow = ai ? ai.defineFlow(
  {
    name: 'headlineGeneratorFlow',
    inputSchema: HeadlineGeneratorInputSchema,
    outputSchema: HeadlineGeneratorOutputSchema,
  },
  async (input: HeadlineGeneratorInput) => {
    const {output} = await prompt(input);
    return output!;
  }
) : async (input: HeadlineGeneratorInput) => ({
  headline: `${input.tone === 'professional' ? 'Professional' : 'Creative'} Developer & Problem Solver`
});
