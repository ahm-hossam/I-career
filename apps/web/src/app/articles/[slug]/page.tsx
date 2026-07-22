import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchArticleBySlug } from '@/lib/api';

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchArticleBySlug(slug);
  if (!data) notFound();

  const { article, relatedArticles } = data;
  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(
    new Date(article.publishedAt),
  );

  return (
    <article className="relative -mt-[80px] mx-auto max-w-2xl px-4 pb-12 pt-[124px] sm:px-6 sm:pb-16 sm:pt-[140px] lg:px-8">
      <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">{article.title}</h1>
      <p className="mt-2 text-sm text-ink-faint">{formattedDate}</p>

      <div className="prose prose-ink mt-8 whitespace-pre-line text-ink-soft">{article.body}</div>

      {relatedArticles.length > 0 && (
        <section className="mt-14 border-t border-ink/[0.06] pt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-ink">Must Reads</h2>
            <Link href="/articles" className="text-sm font-semibold text-brand-600 hover:underline">
              See all articles
            </Link>
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {relatedArticles.map((related) => (
              <li key={related.id}>
                <Link href={`/articles/${related.slug}`} className="text-sm font-semibold text-ink hover:text-brand-700">
                  {related.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
