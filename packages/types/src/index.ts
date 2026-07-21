export type Role = 'ADMIN' | 'USER';
export type Gender = 'MALE' | 'FEMALE';
export type StudentStatus = 'STUDENT' | 'GRADUATE';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface PublicUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  nationality: string;
  birthday: string;
  gender: Gender;
  studentStatus: StudentStatus;
  university: string;
  graduationYear: number;
  faculty: string;
  createdAt: string;
}

export type ResetRequestStatus = 'PENDING' | 'RESOLVED';

export interface PasswordResetRequestSummary {
  id: string;
  status: ResetRequestStatus;
  createdAt: string;
  resolvedAt: string | null;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}
