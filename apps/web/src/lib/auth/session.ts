import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import type { AuthUser, Role } from '@i-career/types';

export const SESSION_COOKIE = 'icareer_session';

export async function getSessionUser(): Promise<AuthUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_JWT_SECRET!));
    return {
      id: payload.sub as string,
      email: payload.email as string,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      role: payload.role as Role,
    };
  } catch {
    return null;
  }
}
