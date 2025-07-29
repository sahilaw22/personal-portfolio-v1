'use server';

/**
 * @fileOverview AI tool to suggest relevant skills to include in a portfolio based on industry trends or specific job descriptions.
 *
 * - getSkillsRecommendations - A function that suggests skills for a portfolio.
 * - SkillsRecommenderInput - The input type for the getSkillsRecommendations function.
 * - SkillsRecommenderOutput - The return type for the getSkillsRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillsRecommenderInputSchema = z.object({
  industry: z
    .string()
    .describe('The industry for which skills are being recommended.'),
  jobDescription: z
    .string()
    .optional()
    .describe('Optional job description to tailor skill recommendations.'),
});
export type SkillsRecommenderInput = z.infer<typeof SkillsRecommenderInputSchema>;

const SkillsRecommenderOutputSchema = z.object({
  skills: z.array(z.string()).describe('Recommended skills for the portfolio.'),
});
export type SkillsRecommenderOutput = z.infer<typeof SkillsRecommenderOutputSchema>;

export async function getSkillsRecommendations(input: SkillsRecommenderInput): Promise<SkillsRecommenderOutput> {
  return skillsRecommenderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillsRecommenderPrompt',
  input: {schema: SkillsRecommenderInputSchema},
  output: {schema: SkillsRecommenderOutputSchema},
  prompt: `You are a career counselor specializing in helping people build their portfolios.

You will suggest skills to include in a portfolio based on industry trends and specific job descriptions.

Suggest skills for the following industry: {{{industry}}}.

{% if jobDescription %}
Tailor the skill recommendations to the following job description: {{{jobDescription}}}
{% endif %}

Return only a list of skills, one skill per line.
`,
});

const skillsRecommenderFlow = ai.defineFlow(
  {
    name: 'skillsRecommenderFlow',
    inputSchema: SkillsRecommenderInputSchema,
    outputSchema: SkillsRecommenderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    const skills = output!.skills;
    return {skills};
  }
);
