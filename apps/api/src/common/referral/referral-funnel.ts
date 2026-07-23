import { prisma } from '@i-career/database';

export interface ReferralFunnelCounts {
  clicks: number;
  signups: number;
  applications: number;
  accepted: number;
  rejected: number;
  attended: number;
}

function emptyCounts(): ReferralFunnelCounts {
  return { clicks: 0, signups: 0, applications: 0, accepted: 0, rejected: 0, attended: 0 };
}

export async function computeReferralFunnel(
  codeIds: string[],
): Promise<Map<string, ReferralFunnelCounts>> {
  const map = new Map<string, ReferralFunnelCounts>(codeIds.map((id) => [id, emptyCounts()]));
  if (codeIds.length === 0) return map;

  const [events, statusGroups, attendedGroups] = await Promise.all([
    prisma.referralEvent.groupBy({
      by: ['referralCodeId', 'type'],
      where: { referralCodeId: { in: codeIds } },
      _count: { _all: true },
    }),
    prisma.programApplication.groupBy({
      by: ['referralCodeId', 'status'],
      where: { referralCodeId: { in: codeIds } },
      _count: { _all: true },
    }),
    prisma.programApplication.groupBy({
      by: ['referralCodeId'],
      where: { referralCodeId: { in: codeIds }, attendedAt: { not: null } },
      _count: { _all: true },
    }),
  ]);

  for (const e of events) {
    const entry = map.get(e.referralCodeId);
    if (!entry) continue;
    if (e.type === 'CLICK') entry.clicks = e._count._all;
    if (e.type === 'SIGNUP') entry.signups = e._count._all;
    if (e.type === 'APPLICATION') entry.applications = e._count._all;
  }

  for (const g of statusGroups) {
    if (!g.referralCodeId) continue;
    const entry = map.get(g.referralCodeId);
    if (!entry) continue;
    if (g.status === 'ACCEPTED') entry.accepted = g._count._all;
    if (g.status === 'REJECTED') entry.rejected = g._count._all;
  }

  for (const a of attendedGroups) {
    if (!a.referralCodeId) continue;
    const entry = map.get(a.referralCodeId);
    if (entry) entry.attended = a._count._all;
  }

  return map;
}

export interface ProgramBreakdownEntry {
  program: { id: string; slug: string; title: string };
  count: number;
}

export async function computeProgramBreakdown(
  codeIds: string[],
): Promise<Map<string, ProgramBreakdownEntry[]>> {
  const map = new Map<string, ProgramBreakdownEntry[]>(codeIds.map((id) => [id, []]));
  if (codeIds.length === 0) return map;

  const groups = await prisma.programApplication.groupBy({
    by: ['referralCodeId', 'programId'],
    where: { referralCodeId: { in: codeIds } },
    _count: { _all: true },
  });
  if (groups.length === 0) return map;

  const programIds = [...new Set(groups.map((g) => g.programId))];
  const programs = await prisma.program.findMany({
    where: { id: { in: programIds } },
    select: { id: true, slug: true, title: true },
  });
  const programById = new Map(programs.map((p) => [p.id, p]));

  for (const g of groups) {
    if (!g.referralCodeId) continue;
    const program = programById.get(g.programId);
    if (!program) continue;
    const entry = map.get(g.referralCodeId);
    if (!entry) continue;
    entry.push({ program, count: g._count._all });
  }

  return map;
}
