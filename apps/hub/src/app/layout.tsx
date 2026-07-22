import type { Metadata } from 'next';
import { Almarai } from 'next/font/google';
import { AuthModal } from '@/components/auth/auth-modal';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { AuthProvider } from '@/lib/auth/auth-context';
import { AuthModalProvider } from '@/lib/auth/auth-modal-context';
import { EmployerAuthProvider } from '@/lib/auth/employer-auth-context';
import { getEmployerSessionUser } from '@/lib/auth/employer-session';
import { getHubSessionUser } from '@/lib/auth/session';
import './globals.css';

const almarai = Almarai({
  variable: '--font-almarai',
  subsets: ['latin'],
  weight: ['400', '700', '800'],
});

export const metadata: Metadata = {
  title: 'iCareer Hub',
  description: 'Programs, events, and articles to help ambitious young talent find their dream job.',
  icons: {
    icon: '/brand/favicon-icon.png',
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, employer] = await Promise.all([getHubSessionUser(), getEmployerSessionUser()]);

  return (
    <html lang="en" className={`${almarai.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
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
      </body>
    </html>
  );
}
