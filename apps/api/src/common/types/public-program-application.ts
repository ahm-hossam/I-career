import type { ProgramApplication, ReferralCode, User } from '@i-career/database';

type ApplicationWithRelations = ProgramApplication & {
  user: User;
  referralCode: ReferralCode | null;
};

export function toPublicProgramApplication(app: ApplicationWithRelations) {
  return {
    id: app.id,
    status: app.status,
    attendedAt: app.attendedAt,
    answers: app.answers as Record<string, string | string[]> | null,
    createdAt: app.createdAt,
    applicant: {
      id: app.user.id,
      firstName: app.user.firstName,
      lastName: app.user.lastName,
      email: app.user.email,
      phone: app.user.phone,
      university: app.user.university,
      faculty: app.user.faculty,
    },
    referral: app.referralCode
      ? {
          code: app.referralCode.code,
          label: app.referralCode.label,
          type: app.referralCode.type,
        }
      : null,
  };
}
