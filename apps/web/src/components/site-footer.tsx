import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType } from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { COPYRIGHT, FOOTER_COLUMNS, SOCIAL_LINKS } from '@/data/site';

const socialIcons: Record<string, ComponentType<{ size?: number }>> = {
  Instagram,
  LinkedIn: Linkedin,
  Facebook,
};

export function SiteFooter() {
  return (
    <footer className="bg-[#f1f1f1] pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Image
              src="/brand/logo-footer.png"
              alt="iCareer"
              width={160}
              height={30}
              className="h-8 w-auto"
            />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="text-sm font-bold text-ink">{col.heading}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink-soft transition-colors hover:text-brand-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 sm:flex-row">
          <p className="text-xs text-ink-faint">{COPYRIGHT}</p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-soft shadow-sm transition-colors hover:bg-brand-500 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
