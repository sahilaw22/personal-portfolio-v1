
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['"Space Grotesk"', 'sans-serif'],
        headline: ['"Poppins"', 'sans-serif'],
        slab: ['"Roboto Slab"', 'serif'],
        serif: ['"Playfair Display"', 'serif'],
        inter: ['"Inter"', 'sans-serif'],
        lexend: ['"Lexend"', 'sans-serif'],
        'source-code-pro': ['"Source Code Pro"', 'monospace'],
        'jetbrains-mono': ['"JetBrains Mono"', 'monospace'],
        'ibm-plex-mono': ['"IBM Plex Mono"', 'monospace'],
        lato: ['"Lato"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        oswald: ['"Oswald"', 'sans-serif'],
        raleway: ['"Raleway"', 'sans-serif'],
        merriweather: ['"Merriweather"', 'serif'],
        'pt-sans': ['"PT Sans"', 'sans-serif'],
        'open-sans': ['"Open Sans"', 'sans-serif'],
        nunito: ['"Nunito"', 'sans-serif'],
        ubuntu: ['"Ubuntu"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        'zilla-slab': ['"Zilla Slab"', 'serif'],
        domine: ['"Domine"', 'serif'],
        'cormorant-garamond': ['"Cormorant Garamond"', 'serif'],
        'eb-garamond': ['"EB Garamond"', 'serif'],
        'libre-baskerville': ['"Libre Baskerville"', 'serif'],
        lora: ['"Lora"', 'serif'],
        playbill: ['"Playbill"', 'sans-serif'],
        lobster: ['"Lobster"', 'cursive'],
        pacifico: ['"Pacifico"', 'cursive'],
        anton: ['"Anton"', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        'portfolio-silver': '#BDBDBD',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
