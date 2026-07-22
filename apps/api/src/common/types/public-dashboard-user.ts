import type { DashboardUser } from '@i-career/database';

export function toPublicDashboardUser(user: DashboardUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.active,
    createdAt: user.createdAt,
  };
}
