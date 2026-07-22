import type { Metadata } from 'next';
import { Almarai } from 'next/font/google';
import { cookies } from 'next/headers';
import { DashboardShell } from '@/components/dashboard-shell';
import { ThemeLocaleScript } from '@/components/theme-locale-script';
import { fetchResetRequests, fetchUsers } from '@/lib/api';
import { DashboardAuthProvider } from '@/lib/auth/auth-context';
import { getDashboardSessionUser } from '@/lib/auth/session';
import { LocaleProvider } from '@/lib/i18n/locale-context';
import { dirOf, LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/i18n/types';
import { buildActivityItems } from '@/lib/overview-data';
import { ThemeProvider } from '@/lib/theme/theme-context';
import type { Theme } from '@/lib/theme/theme-context';
import './globals.css';

const almarai = Almarai({
  variable: '--font-almarai',
  subsets: ['latin', 'arabic'],
  weight: ['400', '700', '800'],
});

export const metadata: Metadata = {
  title: 'iCareer Admin',
  description: 'iCareer admin dashboard — programs, applicants, employers, and events at a glance.',
  icons: {
    icon: '/brand/favicon-icon.png',
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('icareer-locale')?.value;
  const locale: Locale = LOCALES.includes(cookieLocale as Locale) ? (cookieLocale as Locale) : DEFAULT_LOCALE;
  const cookieTheme = cookieStore.get('icareer-theme')?.value;
  const theme: Theme = cookieTheme === 'dark' ? 'dark' : 'light';

  const [users, requests, sessionUser] = await Promise.all([
    fetchUsers(),
    fetchResetRequests(),
    getDashboardSessionUser(),
  ]);
  const activityItems = buildActivityItems(users, requests, 8);

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${almarai.variable} h-full antialiased ${theme === 'dark' ? 'dark' : ''}`}
      style={{ colorScheme: theme }}
    >
      <head>
        <ThemeLocaleScript />
      </head>
      <body className="min-h-full font-sans">
        <ThemeProvider initialTheme={theme}>
          <LocaleProvider initialLocale={locale}>
            <DashboardAuthProvider initialUser={sessionUser}>
              <DashboardShell activity={activityItems}>{children}</DashboardShell>
            </DashboardAuthProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
