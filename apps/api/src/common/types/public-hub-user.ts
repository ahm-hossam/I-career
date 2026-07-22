import type { HubUser } from '@i-career/database';

export function toPublicHubUser(user: HubUser) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    governorate: user.governorate,
    birthday: user.birthday,
    gender: user.gender,
    studentStatus: user.studentStatus,
    university: user.university,
    faculty: user.faculty,
    createdAt: user.createdAt,
  };
}
