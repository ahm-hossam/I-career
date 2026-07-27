import type { User } from '@i-career/database';
import type { ProgramAcceptanceCriteria } from '@i-career/types';

export interface AcceptanceDecision {
  status: 'ACCEPTED' | 'REJECTED' | null;
  reason: string | null;
}

function calculateAge(birthday: Date, now: Date): number {
  let age = now.getFullYear() - birthday.getFullYear();
  const monthDiff = now.getMonth() - birthday.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthday.getDate())) {
    age -= 1;
  }
  return age;
}

const FIELD_LABELS: Record<string, string> = {
  gender: 'gender',
  nationality: 'nationality',
  governorate: 'governorate',
  studentStatus: 'student status',
  university: 'university',
  faculty: 'faculty',
};

/**
 * Evaluates an applicant against a program's acceptance criteria. `status` is
 * null when no criteria are configured at all, meaning the application should
 * stay PENDING for manual review — only fields the admin actually set are
 * checked. On rejection, `reason` explains the first criterion that failed,
 * shown to both the admin and the applicant.
 */
export function evaluateAcceptanceCriteria(
  user: User,
  criteria: ProgramAcceptanceCriteria,
): AcceptanceDecision {
  const fieldChecks: Array<{ field: keyof typeof FIELD_LABELS; accepted?: string[]; value: string }> = [
    { field: 'gender', accepted: criteria.gender, value: user.gender },
    { field: 'nationality', accepted: criteria.nationality, value: user.nationality },
    { field: 'governorate', accepted: criteria.governorate, value: user.governorate },
    { field: 'studentStatus', accepted: criteria.studentStatus, value: user.studentStatus },
    { field: 'university', accepted: criteria.university, value: user.university },
    { field: 'faculty', accepted: criteria.faculty, value: user.faculty },
  ];

  let anyCriteriaConfigured = false;

  for (const { field, accepted, value } of fieldChecks) {
    if (accepted && accepted.length > 0) {
      anyCriteriaConfigured = true;
      if (!accepted.includes(value)) {
        return {
          status: 'REJECTED',
          reason: `Your ${FIELD_LABELS[field]} (${value}) doesn't match this program's accepted ${FIELD_LABELS[field]}${accepted.length > 1 ? 's' : ''}: ${accepted.join(', ')}.`,
        };
      }
    }
  }

  if (criteria.hasDisability && criteria.hasDisability.length > 0) {
    anyCriteriaConfigured = true;
    if (!criteria.hasDisability.includes(user.hasDisability)) {
      return {
        status: 'REJECTED',
        reason: user.hasDisability
          ? "This program isn't accepting applicants who reported a disability."
          : 'This program requires applicants who reported a disability.',
      };
    }
  }

  if (criteria.minAge != null || criteria.maxAge != null) {
    anyCriteriaConfigured = true;
    const age = calculateAge(user.birthday, new Date());
    if (criteria.minAge != null && age < criteria.minAge) {
      return {
        status: 'REJECTED',
        reason: `You must be at least ${criteria.minAge} years old to apply (you are ${age}).`,
      };
    }
    if (criteria.maxAge != null && age > criteria.maxAge) {
      return {
        status: 'REJECTED',
        reason: `You must be at most ${criteria.maxAge} years old to apply (you are ${age}).`,
      };
    }
  }

  return { status: anyCriteriaConfigured ? 'ACCEPTED' : null, reason: null };
}
