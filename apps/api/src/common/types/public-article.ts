import type { Article } from '@i-career/database';

export function toPublicArticle(article: Article) {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    category: article.category,
    body: article.body,
    publishedAt: article.publishedAt,
  };
}
