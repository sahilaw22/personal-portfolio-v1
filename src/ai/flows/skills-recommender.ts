'use server';

/**
 * @fileOverview AI tool to suggest relevant skills to include in a portfolio based on industry trends or specific job descriptions.
 *
 * - getSkillsRecommendations - A function that suggests skills for a portfolio.
 * - SkillsRecommenderInput - The input type for the getSkillsRecommendations function.
 * - SkillsRecommenderOutput - The return type for the getSkillsRecommendations function.
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
    array: () => ({ describe: () => ({}) }),
  };
}

const SkillsRecommenderInputSchema = z.object({
  industry: z
    .string()
    .describe('The industry for which skills are being recommended.'),
  jobDescription: z
    .string()
    .optional()
    .describe('Optional job description to tailor skill recommendations.'),
});
export type SkillsRecommenderInput = typeof SkillsRecommenderInputSchema extends { industry: any; jobDescription?: any }
  ? { industry: string; jobDescription?: string }
  : any;

const SkillsRecommenderOutputSchema = z.object({
  skills: z.array(z.string()).describe('Recommended skills for the portfolio.'),
});
export type SkillsRecommenderOutput = typeof SkillsRecommenderOutputSchema extends { skills: any }
  ? { skills: string[] }
  : any;

export async function getSkillsRecommendations(input: SkillsRecommenderInput): Promise<SkillsRecommenderOutput> {
  if (!ai) {
    // Fallback skill recommendations
    return {
      skills: [
        "JavaScript/TypeScript",
        "React/Next.js",
        "Node.js",
        "Python",
        "SQL",
        "Git/GitHub",
        "Cloud Services (AWS/Azure)",
        "API Development"
      ]
    };
  }
  return skillsRecommenderFlow(input);
}

const prompt = ai ? ai.definePrompt({
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
}) : null;

const skillsRecommenderFlow = ai ? ai.defineFlow(
  {
    name: 'skillsRecommenderFlow',
    inputSchema: SkillsRecommenderInputSchema,
    outputSchema: SkillsRecommenderOutputSchema,
  },
  async (input: SkillsRecommenderInput) => {
    if (!prompt) {
      throw new Error('AI prompt not available');
    }
    const {output} = await prompt(input);
    const skills = output!.skills;
    return {skills};
  }
) : null;
