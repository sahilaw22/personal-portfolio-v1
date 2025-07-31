# AI-Powered Next.js Portfolio

This is a modern, feature-rich personal portfolio built with Next.js, TypeScript, and Tailwind CSS. It features a fully integrated admin panel for easy content management and leverages Google's Generative AI (Genkit) for creative content suggestions.

## Features

- **Fully Responsive Design**: A sleek, modern UI that looks great on all devices, from mobile phones to desktops.
- **Dynamic Content Management**: An integrated, password-protected admin panel allows you to edit every part of the portfolio without touching the code.
  - **Live Editing**: Update hero text, about section, skills, experience, education, and projects in real-time.
  - **Image Uploader**: A dedicated interface to upload, crop, and assign images to different sections of your portfolio.
  - **Persistent Storage**: All changes are automatically saved to the browser's `localStorage`, so your content remains even after a refresh.
- **AI-Powered Tools**:
  - **Headline Generator**: Get creative and professional headline suggestions for your "About Me" section.
  - **Skills Recommender**: Receive AI-driven skill recommendations based on industry trends or specific job descriptions.
- **Single-Page Layout**: A smooth, scrolling single-page experience with an animated, sticky header for easy navigation.
- **Customizable UI Components**: Built with the highly customizable and accessible **ShadCN UI** library.

## Tech Stack

This project was built using a modern, scalable, and efficient technology stack.

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with the Gemini API
- **State Management**: React Context API with `localStorage` for persistence
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Deployment**: Configured for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of your project and add your Gemini API key. This is required for the AI features to work.
    ```
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the Genkit developer UI (for AI flow testing):**
    In a separate terminal, run:
    ```bash
    npm run genkit:watch
    ```
    This will start the Genkit development server, usually on `http://localhost:4000`.

5.  **Run the Next.js development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Accessing the Admin Panel

To access the content management system, you can use one of the following methods:

- **Keyboard Shortcut**: Press `Ctrl` + `Shift` + `A` on your keyboard.
- **Secret Tap Gesture**: On a mobile device, tap your name in the hero section 5 times in a row.

The default password to unlock the admin panel is:
**`IamNerd`**

You can change this password in `src/components/AppStateProvider.tsx`.
