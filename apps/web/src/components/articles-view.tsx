'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { ArticleCategory, PublicArticle } from '@i-career/types';
import { cn } from '@i-career/utils';
import { PageHeaderBanner } from '@/components/page-header-banner';

const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  CAREER_HACKS: 'Career Hacks',
  JOB_SEARCH: 'Job Search',
  DAY_IN_THE_LIFE: 'Day in the Life',
  GUIDE: 'Guide',
};

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ArticleCategory[];

export function ArticlesView({ articles }: { articles: PublicArticle[] }) {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | null>(null);

  const filtered = useMemo(
    () => (activeCategory ? articles.filter((a) => a.category === activeCategory) : articles),
    [articles, activeCategory],
  );

  return (
    <div>
      <PageHeaderBanner heading="Articles" />

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
      <div className="flex flex-col gap-8 sm:flex-row">
        <aside className="shrink-0 sm:w-56">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-faint">Category</p>
            {activeCategory && (
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 sm:flex-col">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory((prev) => (prev === category ? null : category))}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors sm:rounded-lg sm:text-start',
                  activeCategory === category ? 'bg-brand-500 text-white' : 'bg-ink/[0.04] text-ink-soft hover:bg-ink/[0.08]',
                )}
              >
                {CATEGORY_LABELS[category]}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1">
          <h1 className="text-xl font-bold text-ink">{filtered.length} Articles</h1>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="flex h-full flex-col gap-2 rounded-3xl border border-ink/[0.06] bg-white p-5 shadow-sm transition-shadow hover:shadow-xl"
                >
                  <span className="w-fit rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-bold text-brand-700">
                    {CATEGORY_LABELS[article.category]}
                  </span>
                  <h2 className="font-bold text-ink">{article.title}</h2>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
