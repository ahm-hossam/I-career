import type { Program, ProgramForm, ProgramFormField } from '@i-career/database';
import type { ImageAspect, ProgramPhase, ProgramSponsor } from '@i-career/types';
import { toPublicProgramForm } from './public-program-form';

type ProgramWithForm = Program & { form: (ProgramForm & { fields: ProgramFormField[] }) | null };

export function toPublicProgram(program: ProgramWithForm) {
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
    sponsors: program.sponsors as unknown as ProgramSponsor[],
    form: program.form ? toPublicProgramForm(program.form) : null,
    createdAt: program.createdAt,
    updatedAt: program.updatedAt,
  };
}
