import type { Metadata } from 'next';
import { Almarai } from 'next/font/google';
import { AuthModal } from '@/components/auth/auth-modal';
import { HubAuthModal } from '@/components/hub-auth/auth-modal';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { AuthProvider } from '@/lib/auth/auth-context';
import { AuthModalProvider } from '@/lib/auth/auth-modal-context';
import { HubAuthProvider } from '@/lib/auth/hub-auth-context';
import { HubAuthModalProvider } from '@/lib/auth/hub-auth-modal-context';
import { EmployerAuthProvider } from '@/lib/auth/employer-auth-context';
import { getSessionUser } from '@/lib/auth/session';
import { getHubSessionUser } from '@/lib/auth/hub-session';
import { getEmployerSessionUser } from '@/lib/auth/employer-session';
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, hubUser, employer] = await Promise.all([
    getSessionUser(),
    getHubSessionUser(),
    getEmployerSessionUser(),
  ]);

  return (
    <html lang="en" className={`${almarai.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <AuthProvider initialUser={user}>
          <HubAuthProvider initialUser={hubUser}>
            <EmployerAuthProvider initialEmployer={employer}>
              <AuthModalProvider>
                <HubAuthModalProvider>
                  <SiteHeader />
                  <main className="flex-1">{children}</main>
                  <SiteFooter />
                  <AuthModal />
                  <HubAuthModal />
                </HubAuthModalProvider>
              </AuthModalProvider>
            </EmployerAuthProvider>
          </HubAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
