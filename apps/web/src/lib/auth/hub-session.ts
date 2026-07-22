import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import type { HubAuthUser } from '@i-career/types';

export const HUB_SESSION_COOKIE = 'hub_session';

export async function getHubSessionUser(): Promise<HubAuthUser | null> {
  const token = (await cookies()).get(HUB_SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_JWT_SECRET!));
    if (payload.kind !== 'hub') return null;
    return {
      id: payload.sub as string,
      email: payload.email as string,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      kind: 'hub',
    };
  } catch {
    return null;
  }
}

export async function getHubSessionToken(): Promise<string | null> {
  return (await cookies()).get(HUB_SESSION_COOKIE)?.value ?? null;
}
