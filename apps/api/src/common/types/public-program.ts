import type { Program } from '@i-career/database';
import type { ImageAspect, ProgramPhase } from '@i-career/types';

export function toPublicProgram(program: Program) {
  return {
    id: program.id,
    slug: program.slug,
    title: program.title,
    subtitleEn: program.subtitleEn,
    subtitleAr: program.subtitleAr,
    logoUrl: program.logoUrl,
    imageAspect: program.imageAspect as ImageAspect,
    aboutBody: program.aboutBody,
    phases: program.phases as unknown as ProgramPhase[],
    benefits: program.benefits,
    criteria: program.criteria,
    partnerName: program.partnerName,
    partnerBio: program.partnerBio,
    partnerLogoUrl: program.partnerLogoUrl,
    createdAt: program.createdAt,
    updatedAt: program.updatedAt,
  };
}
