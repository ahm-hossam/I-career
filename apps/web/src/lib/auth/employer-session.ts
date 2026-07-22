import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import type { EmployerAuthUser } from '@i-career/types';

export const EMPLOYER_SESSION_COOKIE = 'employer_session';

export async function getEmployerSessionUser(): Promise<EmployerAuthUser | null> {
  const token = (await cookies()).get(EMPLOYER_SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_JWT_SECRET!));
    if (payload.kind !== 'employer') return null;
    return {
      id: payload.sub as string,
      email: payload.email as string,
      fullName: payload.fullName as string,
      companyId: payload.companyId as string,
      companyName: payload.companyName as string,
      kind: 'employer',
    };
  } catch {
    return null;
  }
}
