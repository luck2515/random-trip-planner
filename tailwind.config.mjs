import typography from '@tailwindcss/typography';
import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // classベースのダークモード
  theme: {
    extend: {
      colors: {
        // ライトモードのカラー
        'primary': {
          light: '#60a5fa', // blue-400
          DEFAULT: '#3b82f6', // blue-500
          dark: '#2563eb', // blue-600
        },
        // ダークモードのカラー
        'dark': {
          'bg-primary': '#1a1a1a',
          'bg-secondary': '#2d2d2d',
          'text-primary': '#e5e5e5',
          'text-secondary': '#a3a3a3',
          'border': '#404040',
        },
      },
    },
  },
  plugins: [
    typography(),
    scrollbar({ nocompatible: true }),
  ],
}
