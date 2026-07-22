import Image from 'next/image';
import Link from 'next/link';
import { COPYRIGHT, FOOTER_LINKS, NAV_ITEMS } from '@/data/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/[0.06] bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Image src="/brand/logo-footer.png" alt="iCareer" width={110} height={26} className="h-6 w-auto" />
          <span className="text-sm text-ink-faint">{COPYRIGHT}</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-soft">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-brand-600">
              {item.label}
            </Link>
          ))}
          {FOOTER_LINKS.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-brand-600">
              {item.label}
            </Link>
          ))}
          <Link href="/employer/register" className="hover:text-brand-600">
            For Employers
          </Link>
        </nav>
      </div>
    </footer>
  );
}
