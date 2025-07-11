/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* 🌱 Semantic colors */
        background: 'var(--color-background)',
        'background-muted': 'var(--color-background-muted)',
        foreground: 'var(--color-foreground)',
        'foreground-muted': 'var(--color-foreground-muted)',

        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-muted': 'var(--color-primary-muted)',

        secondary: 'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',
        'secondary-muted': 'var(--color-secondary-muted)',

        surface: 'var(--color-surface)',
        'surface-muted': 'var(--color-surface-muted)',
        border: 'var(--color-border)',

        /* 🌈 Scale colors directly from your CSS vars for gradients or specific depth */
        /* Background scale */
        'background-100': 'var(--background-100)',
        'background-200': 'var(--background-200)',
        'background-300': 'var(--background-300)',
        'background-400': 'var(--background-400)',
        'background-500': 'var(--background-500)',
        'background-600': 'var(--background-600)',
        'background-700': 'var(--background-700)',
        'background-800': 'var(--background-800)',
        'background-900': 'var(--background-900)',

        /* Foreground scale */
        'foreground-100': 'var(--foreground-100)',
        'foreground-200': 'var(--foreground-200)',
        'foreground-300': 'var(--foreground-300)',
        'foreground-400': 'var(--foreground-400)',
        'foreground-500': 'var(--foreground-500)',
        'foreground-600': 'var(--foreground-600)',
        'foreground-700': 'var(--foreground-700)',
        'foreground-800': 'var(--foreground-800)',
        'foreground-900': 'var(--foreground-900)',

        /* Primary scale */
        'primary-100': 'var(--primary-100)',
        'primary-200': 'var(--primary-200)',
        'primary-300': 'var(--primary-300)',
        'primary-400': 'var(--primary-400)',
        'primary-500': 'var(--primary-500)',
        'primary-600': 'var(--primary-600)',
        'primary-700': 'var(--primary-700)',
        'primary-800': 'var(--primary-800)',
        'primary-900': 'var(--primary-900)',

        'primary-on-100': 'var(--primary-on-100)',
        'primary-on-200': 'var(--primary-on-200)',
        'primary-on-300': 'var(--primary-on-300)',
        'primary-on-400': 'var(--primary-on-400)',
        'primary-on-500': 'var(--primary-on-500)',
        'primary-on-600': 'var(--primary-on-600)',
        'primary-on-700': 'var(--primary-on-700)',
        'primary-on-800': 'var(--primary-on-800)',
        'primary-on-900': 'var(--primary-on-900)',

        /* Secondary scale */
        'secondary-100': 'var(--secondary-100)',
        'secondary-200': 'var(--secondary-200)',
        'secondary-300': 'var(--secondary-300)',
        'secondary-400': 'var(--secondary-400)',
        'secondary-500': 'var(--secondary-500)',
        'secondary-600': 'var(--secondary-600)',
        'secondary-700': 'var(--secondary-700)',
        'secondary-800': 'var(--secondary-800)',
        'secondary-900': 'var(--secondary-900)',

        'secondary-on-100': 'var(--secondary-on-100)',
        'secondary-on-200': 'var(--secondary-on-200)',
        'secondary-on-300': 'var(--secondary-on-300)',
        'secondary-on-400': 'var(--secondary-on-400)',
        'secondary-on-500': 'var(--secondary-on-500)',
        'secondary-on-600': 'var(--secondary-on-600)',
        'secondary-on-700': 'var(--secondary-on-700)',
        'secondary-on-800': 'var(--secondary-on-800)',
        'secondary-on-900': 'var(--secondary-on-900)',

        /* Neutral scale */
        'neutral-100': 'var(--neutral-100)',
        'neutral-200': 'var(--neutral-200)',
        'neutral-300': 'var(--neutral-300)',
        'neutral-400': 'var(--neutral-400)',
        'neutral-500': 'var(--neutral-500)',
        'neutral-600': 'var(--neutral-600)',
        'neutral-700': 'var(--neutral-700)',
        'neutral-800': 'var(--neutral-800)',
        'neutral-900': 'var(--neutral-900)',
      },

      /* Could also extend borderRadius, boxShadow, spacing using CSS vars if you want */
    },
  },
  plugins: [],
}
