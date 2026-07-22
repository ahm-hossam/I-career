import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, type ArticleCategory } from '@i-career/database';
import { toPublicArticle } from '../common/types/public-article';

@Injectable()
export class ArticlesService {
  async findAll(category?: ArticleCategory) {
    const articles = await prisma.article.findMany({
      where: category ? { category } : undefined,
      orderBy: { publishedAt: 'desc' },
    });
    return articles.map(toPublicArticle);
  }

  async findBySlug(slug: string) {
    const article = await prisma.article.findUnique({ where: { slug } });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    const related = await prisma.article.findMany({
      where: { slug: { not: slug } },
      orderBy: { publishedAt: 'desc' },
      take: 4,
    });
    return { article: toPublicArticle(article), relatedArticles: related.map(toPublicArticle) };
  }
}
