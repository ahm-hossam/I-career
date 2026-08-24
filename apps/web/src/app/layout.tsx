import type { Metadata } from 'next';
import { Almarai } from 'next/font/google';
import { AuthModal } from '@/components/auth/auth-modal';
import { FacebookPixel } from '@/components/facebook-pixel';
import { SiteReferralTracker } from '@/components/site-referral-tracker';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { AuthProvider } from '@/lib/auth/auth-context';
import { AuthModalProvider } from '@/lib/auth/auth-modal-context';
import { EmployerAuthProvider } from '@/lib/auth/employer-auth-context';
import { getSessionUser } from '@/lib/auth/session';
import { getEmployerSessionUser } from '@/lib/auth/employer-session';
import { LocaleProvider } from '@/lib/i18n/locale-context';
import { LocaleInitScript } from '@/components/locale-init-script';
import { getServerLocale } from '@/lib/i18n/server';
import { dirOf } from '@/lib/i18n/types';
import './globals.css';

const almarai = Almarai({
  variable: '--font-almarai',
  subsets: ['latin', 'arabic'],
  weight: ['400', '700', '800'],
});

const SITE_DESCRIPTION_EN =
  'iCareer was established in 2012 with the primary focus of providing education on employability to early talents. It has been growing within the past 10 years and transforming drastically to offer end-to-end digital services and solutions to the tech-savvy generation.';

const SITE_DESCRIPTION_AR =
  'تأسست iCareer عام 2012 بهدف رئيسي هو تقديم التعليم المتعلق بالتوظيف للمواهب الشابة. وقد نمت خلال السنوات العشر الماضية وتحولت بشكل جذري لتقديم خدمات وحلول رقمية متكاملة للجيل المواكب للتكنولوجيا.';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const description = locale === 'ar' ? SITE_DESCRIPTION_AR : SITE_DESCRIPTION_EN;

  return {
    title: 'iCareer',
    description,
    icons: {
      icon: '/brand/favicon-icon.png',
    },
    openGraph: {
      title: 'iCareer',
      description,
      siteName: 'iCareer',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'iCareer',
      description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, employer, locale] = await Promise.all([getSessionUser(), getEmployerSessionUser(), getServerLocale()]);

  return (
    <html lang={locale} dir={dirOf(locale)} className={`${almarai.variable} h-full antialiased`}>
      <head>
        <LocaleInitScript />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <FacebookPixel />
        <SiteReferralTracker />
        <LocaleProvider initialLocale={locale}>
          <AuthProvider initialUser={user}>
            <EmployerAuthProvider initialEmployer={employer}>
              <AuthModalProvider>
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <SiteFooter />
                <AuthModal />
              </AuthModalProvider>
            </EmployerAuthProvider>
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
