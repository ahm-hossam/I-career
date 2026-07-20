import type { Metadata } from 'next';
import { Almarai } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

const almarai = Almarai({
  variable: '--font-almarai',
  subsets: ['latin'],
  weight: ['400', '700', '800'],
});

const SITE_DESCRIPTION =
  'iCareer was established in 2012 with the primary focus of providing education on employability to early talents. It has been growing within the past 10 years and transforming drastically to offer end-to-end digital services and solutions to the tech-savvy generation.';

export const metadata: Metadata = {
  title: 'iCareer',
  description: SITE_DESCRIPTION,
  icons: {
    icon: '/brand/favicon-icon.png',
  },
  openGraph: {
    title: 'iCareer',
    description: SITE_DESCRIPTION,
    siteName: 'iCareer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iCareer',
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${almarai.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
