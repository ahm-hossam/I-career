import type { PasswordResetRequestSummary, PublicUser } from '@i-career/types';

export interface KpiDatum {
  key: 'kpiApplicants' | 'kpiPrograms' | 'kpiEmployers' | 'kpiEvents';
  value: number | null;
  trend: number | null;
  spark: number[];
}

export interface ChartPoint {
  month: string;
  value: number;
}

export type ActivityKind = 'registration' | 'resetRequest';

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  actor: string;
  detail: string;
  time: string;
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function trailingMonths(now: Date, count: number): Date[] {
  return Array.from({ length: count }, (_, i) => new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1));
}

export function buildSignupChart(users: PublicUser[], now = new Date()): ChartPoint[] {
  return trailingMonths(now, 12).map((monthDate) => {
    const value = users.filter((u) => {
      const created = new Date(u.createdAt);
      return created.getFullYear() === monthDate.getFullYear() && created.getMonth() === monthDate.getMonth();
    }).length;
    return { month: MONTH_LABELS[monthDate.getMonth()], value };
  });
}

export function buildApplicantsKpi(users: PublicUser[], now = new Date()): KpiDatum {
  const spark = buildSignupChart(users, now).map((point) => point.value);
  const thisMonth = spark[spark.length - 1] ?? 0;
  const lastMonth = spark[spark.length - 2] ?? 0;

  let trend = 0;
  if (lastMonth > 0) trend = Math.round(((thisMonth - lastMonth) / lastMonth) * 1000) / 10;
  else if (thisMonth > 0) trend = 100;

  return { key: 'kpiApplicants', value: users.length, trend, spark };
}

export function emptyKpi(key: KpiDatum['key']): KpiDatum {
  return { key, value: null, trend: null, spark: [] };
}

function formatRelativeTime(iso: string, now = new Date()): string {
  const minutes = Math.floor((now.getTime() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function buildActivityItems(
  users: PublicUser[],
  requests: PasswordResetRequestSummary[],
  limit = 6,
  now = new Date(),
): ActivityItem[] {
  const registrationEvents = users.map((u) => ({
    id: `user-${u.id}`,
    kind: 'registration' as const,
    actor: `${u.firstName} ${u.lastName}`,
    detail: 'registered on iCareer',
    rawTime: u.createdAt,
  }));

  const resetEvents = requests
    .filter((r) => r.status === 'PENDING')
    .map((r) => ({
      id: `reset-${r.id}`,
      kind: 'resetRequest' as const,
      actor: `${r.user.firstName} ${r.user.lastName}`,
      detail: 'requested a password reset',
      rawTime: r.createdAt,
    }));

  return [...registrationEvents, ...resetEvents]
    .sort((a, b) => new Date(b.rawTime).getTime() - new Date(a.rawTime).getTime())
    .slice(0, limit)
    .map(({ rawTime, ...item }) => ({ ...item, time: formatRelativeTime(rawTime, now) }));
}
