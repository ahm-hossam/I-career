import type { ContactSubmission } from '@i-career/database';

export function toPublicContactSubmission(submission: ContactSubmission) {
  return {
    id: submission.id,
    name: submission.name,
    email: submission.email,
    message: submission.message,
    audience: submission.audience,
    service: submission.service,
    status: submission.status,
    createdAt: submission.createdAt,
  };
}
