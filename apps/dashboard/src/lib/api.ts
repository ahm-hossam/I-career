import type {
  ApplicationListItem,
  CampaignSummary,
  PasswordResetRequestSummary,
  ProgramFunnelSummary,
  PublicDashboardUser,
  PublicProgram,
  PublicProgramApplication,
  PublicProgramForm,
  PublicReferralCode,
  UserDetail,
  UserListItem,
} from '@i-career/types';

function internalHeaders() {
  return { 'x-internal-token': process.env.INTERNAL_API_TOKEN! };
}

export async function fetchUsers(): Promise<UserListItem[]> {
  const res = await fetch(`${process.env.API_URL}/users`, { headers: internalHeaders(), cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}

export async function fetchUser(id: string): Promise<UserDetail | null> {
  const res = await fetch(`${process.env.API_URL}/users/${id}`, { headers: internalHeaders(), cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchResetRequests(): Promise<PasswordResetRequestSummary[]> {
  const res = await fetch(`${process.env.API_URL}/password-reset-requests`, { headers: internalHeaders(), cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}

export async function fetchPrograms(): Promise<PublicProgram[]> {
  const res = await fetch(`${process.env.API_URL}/programs`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}

export async function fetchProgram(slug: string): Promise<PublicProgram | null> {
  const res = await fetch(`${process.env.API_URL}/programs/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  return data.program;
}

export async function fetchProgramForms(): Promise<PublicProgramForm[]> {
  const res = await fetch(`${process.env.API_URL}/program-forms`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}

export async function fetchProgramForm(id: string): Promise<PublicProgramForm | null> {
  const res = await fetch(`${process.env.API_URL}/program-forms/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchApplicants(slug: string): Promise<PublicProgramApplication[]> {
  const res = await fetch(`${process.env.API_URL}/programs/${slug}/applicants`, {
    headers: internalHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}

export async function fetchDashboardUsers(): Promise<PublicDashboardUser[]> {
  const res = await fetch(`${process.env.API_URL}/dashboard-users`, { headers: internalHeaders(), cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}

export async function fetchApplications(): Promise<ApplicationListItem[]> {
  const res = await fetch(`${process.env.API_URL}/applications`, { headers: internalHeaders(), cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}

export async function fetchCampaigns(): Promise<CampaignSummary[]> {
  const res = await fetch(`${process.env.API_URL}/campaigns`, { headers: internalHeaders(), cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}

export async function fetchReferralOverview(
  slug: string,
): Promise<{ summary: ProgramFunnelSummary; codes: PublicReferralCode[] }> {
  const res = await fetch(`${process.env.API_URL}/programs/${slug}/referral-codes`, {
    headers: internalHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) {
    return {
      summary: { clicks: 0, signups: 0, applications: 0, organicApplications: 0, accepted: 0, rejected: 0, attended: 0 },
      codes: [],
    };
  }
  return res.json();
}
