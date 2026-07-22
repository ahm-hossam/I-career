import type { HubUser, ProgramApplication, ReferralCode } from '@i-career/database';

type ApplicationWithRelations = ProgramApplication & {
  hubUser: HubUser;
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
      id: app.hubUser.id,
      firstName: app.hubUser.firstName,
      lastName: app.hubUser.lastName,
      email: app.hubUser.email,
      phone: app.hubUser.phone,
      university: app.hubUser.university,
      faculty: app.hubUser.faculty,
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
