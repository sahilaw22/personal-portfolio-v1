import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  // @ts-expect-error - Type conflict in genkit library
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
