import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6W300NGV97"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6W300NGV97');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vrnv33fb1k");
          `}
        </Script>
      </head>
      <body className="font-sans bg-[#0a0a0a] text-white antialiased selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}
