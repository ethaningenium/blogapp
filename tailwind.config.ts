import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/slices/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'mygray-900': '#000000',
        'mygray-800': '#101214',
        'mygray-700': '#1B1D1F',
        'mygray-600': '#1D1F21',
        'mygreen-500': '#12B76A',
        'mygreen-200': '#A6F4C5',
      },
    },
  },
  plugins: [],
};
export default config;
