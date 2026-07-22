import type { PublicArticle, PublicEvent, PublicProgram } from '@i-career/types';

export async function fetchPrograms(): Promise<PublicProgram[]> {
  const res = await fetch(`${process.env.API_URL}/programs`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}

export async function fetchProgramBySlug(
  slug: string,
): Promise<{ program: PublicProgram; otherPrograms: PublicProgram[] } | null> {
  const res = await fetch(`${process.env.API_URL}/programs/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchArticles(category?: string): Promise<PublicArticle[]> {
  const url = new URL(`${process.env.API_URL}/articles`);
  if (category) url.searchParams.set('category', category);
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}

export async function fetchArticleBySlug(
  slug: string,
): Promise<{ article: PublicArticle; relatedArticles: PublicArticle[] } | null> {
  const res = await fetch(`${process.env.API_URL}/articles/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchEvents(type?: string): Promise<PublicEvent[]> {
  const url = new URL(`${process.env.API_URL}/events`);
  if (type) url.searchParams.set('type', type);
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}
