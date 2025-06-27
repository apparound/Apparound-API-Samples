import type { Config } from 'tailwindcss'

export default {
   darkMode: ['class'],
   content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
   prefix: '',
   theme: {
      container: {
         center: true,
         padding: '2rem',
         screens: {
            '2xl': '1400px',
         },
      },
      extend: {
         boxShadow: {
            '1app': '0 1px 10px 0 rgb(0 0 0 / 0.15), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            '2app': '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
            'kiki-shadow': '0 0 12px rgba(0,0,0,0.15)',
         },
         colors: {
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
               DEFAULT: 'hsl(var(--primary))',
               foreground: 'hsl(var(--primary-foreground))',
               text: 'var(--primary-text)',
            },
            secondary: {
               DEFAULT: 'hsl(var(--secondary))',
               foreground: 'hsl(var(--secondary-foreground))',
            },
            destructive: {
               DEFAULT: 'hsl(var(--destructive))',
               foreground: 'hsl(var(--destructive-foreground))',
            },
            muted: {
               DEFAULT: 'hsl(var(--muted))',
               foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
               DEFAULT: 'hsl(var(--accent))',
               foreground: 'hsl(var(--accent-foreground))',
            },
            popover: {
               DEFAULT: 'hsl(var(--popover))',
               foreground: 'hsl(var(--popover-foreground))',
            },
            card: {
               DEFAULT: 'hsl(var(--card))',
               foreground: 'hsl(var(--card-foreground))',
            },
            sidebar: {
               DEFAULT: 'hsl(var(--sidebar-background))',
               foreground: 'hsl(var(--sidebar-foreground))',
               primary: 'hsl(var(--sidebar-primary))',
               'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
               accent: 'hsl(var(--sidebar-accent))',
               'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
               border: 'hsl(var(--sidebar-border))',
               ring: 'hsl(var(--sidebar-ring))',
            },
            selected: {
               DEFAULT: '#e0f2ff', // azzurro chiaro custom
            },
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
         },
         animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
         },
         spacing: {
            '5.5': '1.4rem',
            '8': '2rem',
         },
         minHeight: {
            '500': '500px',
         },
         width: {
            '13': '3.25rem',
         },
         height: {
            '13': '3.25rem',
         },
      },
   },
   plugins: [require('tailwindcss-animate')],
} satisfies Config
