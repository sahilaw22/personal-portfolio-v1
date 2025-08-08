// palette-generator.ts
'use server';

/**
 * @fileOverview An AI agent to generate color palettes for the portfolio theme.
 *
 * - generatePalette - A function that creates a color palette from a theme description.
 * - PaletteGeneratorInput - The input type for the generatePalette function.
 * - PaletteGeneratorOutput - The return type for the generatePalette function.
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
  };
}

const PaletteGeneratorInputSchema = z.object({
  theme: z
    .string()
    .describe('A descriptive theme to generate a color palette from (e.g., "ocean sunset", "forest floor", "cyberpunk city").'),
});
export type PaletteGeneratorInput = typeof PaletteGeneratorInputSchema extends { theme: any }
  ? { theme: string }
  : any;

const PaletteGeneratorOutputSchema = z.object({
    background: z.string().describe("The background color in HSL format, like '222 84% 5%'"),
    foreground: z.string().describe("The foreground (text) color in HSL format, like '210 40% 98%'"),
    primary: z.string().describe("The primary accent color in HSL format, like '3 98% 66%'"),
    accent: z.string().describe("The secondary accent color in HSL format, like '24 95% 58%'"),
});
export type PaletteGeneratorOutput = typeof PaletteGeneratorOutputSchema extends { background: any; foreground: any; primary: any; accent: any } 
  ? { background: string; foreground: string; primary: string; accent: string }
  : any;

export async function generatePalette(input: PaletteGeneratorInput): Promise<PaletteGeneratorOutput> {
  if (!ai) {
    // Fallback palette generation
    return {
      background: "222 84% 5%",
      foreground: "210 40% 98%",
      primary: "3 98% 66%",
      accent: "24 95% 58%"
    };
  }
  return paletteGeneratorFlow(input);
}

const prompt = ai ? ai.definePrompt({
  name: 'paletteGeneratorPrompt',
  input: {schema: PaletteGeneratorInputSchema},
  output: {schema: PaletteGeneratorOutputSchema},
  prompt: `You are a professional UI/UX designer specializing in color theory. Your task is to generate a beautiful and accessible color palette for a web portfolio based on a given theme.

  You must return the colors as HSL string values (e.g., "222 84% 5%") without the "hsl()" wrapper.

  Ensure the generated palette has sufficient contrast between the background and foreground colors for readability.

  Theme: {{{theme}}}
  `,
}) : null;

const paletteGeneratorFlow = ai ? ai.defineFlow(
  {
    name: 'paletteGeneratorFlow',
    inputSchema: PaletteGeneratorInputSchema,
    outputSchema: PaletteGeneratorOutputSchema,
  },
  async (input: PaletteGeneratorInput) => {
    if (!prompt) {
      throw new Error('AI prompt not available');
    }
    const {output} = await prompt(input);
    return output!;
  }
) : null;
