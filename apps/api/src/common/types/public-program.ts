import type { Program } from '@i-career/database';
import type { ProgramPhase } from '@i-career/types';

export function toPublicProgram(program: Program) {
  return {
    id: program.id,
    slug: program.slug,
    title: program.title,
    subtitleEn: program.subtitleEn,
    subtitleAr: program.subtitleAr,
    logoUrl: program.logoUrl,
    aboutBody: program.aboutBody,
    phases: program.phases as unknown as ProgramPhase[],
    benefits: program.benefits,
    criteria: program.criteria,
    partnerName: program.partnerName,
    partnerBio: program.partnerBio,
    createdAt: program.createdAt,
  };
}
