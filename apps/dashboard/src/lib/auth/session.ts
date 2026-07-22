import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import type { DashboardAuthUser } from '@i-career/types';

export const DASHBOARD_SESSION_COOKIE = 'dashboard_session';

export async function getDashboardSessionUser(): Promise<DashboardAuthUser | null> {
  const token = (await cookies()).get(DASHBOARD_SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_JWT_SECRET!));
    if (payload.kind !== 'dashboard') return null;
    return {
      id: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as DashboardAuthUser['role'],
      kind: 'dashboard',
    };
  } catch {
    return null;
  }
}

export async function getDashboardSessionToken(): Promise<string | null> {
  return (await cookies()).get(DASHBOARD_SESSION_COOKIE)?.value ?? null;
}
