import { notFound } from 'next/navigation';
import { fetchUser } from '@/lib/api';
import { UserDetailView } from '@/components/applicants/user-detail';

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await fetchUser(id);
  if (!user) {
    notFound();
  }

  return <UserDetailView user={user} />;
}
