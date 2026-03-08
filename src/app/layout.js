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

const SITE_URL = 'https://vipulbadwaik.in';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Vipul Badwaik — Full Stack Developer',
  description:
    'Portfolio of Vipul Badwaik — Full Stack Developer & UI/UX Enthusiast specializing in React, Next.js, Node.js, and modern web technologies. Currently Frontend AI Engineer at Fundly.ai.',
  keywords: [
    'Vipul Badwaik',
    'Full Stack Developer',
    'Frontend Engineer',
    'React Developer',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'UI/UX',
    'Portfolio',
    'Software Engineer',
    'India',
  ],
  authors: [{ name: 'Vipul Badwaik', url: SITE_URL }],
  creator: 'Vipul Badwaik',
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Vipul Badwaik — Full Stack Developer',
    description:
      'Full Stack Developer & UI/UX Enthusiast specializing in React, Next.js, and modern web technologies.',
    url: SITE_URL,
    siteName: 'Vipul Badwaik',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vipul Badwaik — Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vipul Badwaik — Full Stack Developer',
    description:
      'Full Stack Developer & UI/UX Enthusiast specializing in React, Next.js, and modern web technologies.',
    creator: '@VipulBadwaik',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="manifest" href="/manifest.json" />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Vipul Badwaik',
              url: SITE_URL,
              image: `${SITE_URL}/avatar.png`,
              jobTitle: 'Frontend AI Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'Fundly.ai',
              },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Rungta College of Engineering and Technology, Bhilai',
              },
              knowsAbout: [
                'JavaScript',
                'TypeScript',
                'React',
                'Next.js',
                'Node.js',
                'Python',
                'Tailwind CSS',
                'PostgreSQL',
                'MongoDB',
                'Docker',
                'AWS',
                'UI/UX Design',
              ],
              sameAs: [
                'https://github.com/vipulbadwaik',
                'https://www.linkedin.com/in/vipulbadwaik/',
                'https://x.com/VipulBadwaik',
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
