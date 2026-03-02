import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
});

export const metadata = {
  title: 'Vipul Badwaik — Full Stack Developer',
  description:
    'Portfolio of Vipul Badwaik — Full Stack Developer & UI/UX Enthusiast specializing in React, Next.js, and modern web technologies.',
  openGraph: {
    title: 'Vipul Badwaik — Full Stack Developer',
    description:
      'Full Stack Developer & UI/UX Enthusiast specializing in React, Next.js, and modern web technologies.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-[#0a0a0a] text-white antialiased selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}
