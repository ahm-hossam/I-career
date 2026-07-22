import { ArticlesView } from '@/components/articles-view';
import { fetchArticles } from '@/lib/api';

export default async function ArticlesPage() {
  const articles = await fetchArticles();
  return <ArticlesView articles={articles} />;
}
