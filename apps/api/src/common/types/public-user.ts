import type { User } from '@i-career/database';

export function toPublicUser(user: User) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    nationality: user.nationality,
    governorate: user.governorate,
    birthday: user.birthday,
    gender: user.gender,
    studentStatus: user.studentStatus,
    university: user.university,
    graduationYear: user.graduationYear,
    faculty: user.faculty,
    archived: user.archived,
    createdAt: user.createdAt,
  };
}
