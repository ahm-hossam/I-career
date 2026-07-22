import type { ProgramForm, ProgramFormField } from '@i-career/database';

type FormWithFields = ProgramForm & { fields: ProgramFormField[]; _count?: { programs: number } };

export function toPublicProgramForm(form: FormWithFields) {
  return {
    id: form.id,
    name: form.name,
    fields: form.fields
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((f) => ({
        id: f.id,
        label: f.label,
        type: f.type,
        required: f.required,
        options: f.options,
        order: f.order,
      })),
    programCount: form._count?.programs ?? 0,
    createdAt: form.createdAt,
    updatedAt: form.updatedAt,
  };
}
