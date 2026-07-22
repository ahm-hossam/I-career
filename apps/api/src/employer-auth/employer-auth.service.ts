import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { prisma } from '@i-career/database';
import { toPublicCompany } from '../common/types/public-company';
import type { EmployerLoginDto } from './dto/login.dto';
import type { RegisterCompanyDto } from './dto/register-company.dto';
import type { RegisterExistingCompanyDto } from './dto/register-existing.dto';

@Injectable()
export class EmployerAuthService {
  constructor(private readonly jwtService: JwtService) {}

  private async signToken(user: {
    id: string;
    email: string;
    fullName: string;
    companyId: string;
    companyName: string;
  }) {
    return this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      companyId: user.companyId,
      companyName: user.companyName,
      kind: 'employer',
    });
  }

  async searchCompanies(query: string) {
    const companies = await prisma.company.findMany({
      where: { name: { contains: query, mode: 'insensitive' } },
      orderBy: { name: 'asc' },
      take: 10,
    });
    return companies.map(toPublicCompany);
  }

  async registerNewCompany(dto: RegisterCompanyDto) {
    const existingUser = await prisma.employerUser.findUnique({ where: { email: dto.email } });
    if (existingUser) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const employerUser = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: dto.name,
          numberOfEmployees: dto.numberOfEmployees,
          industry: dto.industry,
          type: dto.type,
          description: dto.description,
          address: dto.address,
          benefits: dto.benefits,
          logoUrl: dto.logoUrl,
          linkedinUrl: dto.linkedinUrl,
          facebookUrl: dto.facebookUrl,
          websiteUrl: dto.websiteUrl,
          documentUrls: dto.documentUrls ?? [],
        },
      });

      return tx.employerUser.create({
        data: {
          email: dto.email,
          passwordHash,
          fullName: dto.fullName,
          phone: dto.phone,
          jobTitle: dto.jobTitle,
          companyId: company.id,
        },
        include: { company: true },
      });
    });

    const token = await this.signToken({
      id: employerUser.id,
      email: employerUser.email,
      fullName: employerUser.fullName,
      companyId: employerUser.companyId,
      companyName: employerUser.company.name,
    });
    return { company: toPublicCompany(employerUser.company), token };
  }

  async registerForExistingCompany(dto: RegisterExistingCompanyDto) {
    const company = await prisma.company.findUnique({ where: { id: dto.companyId } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const existingUser = await prisma.employerUser.findUnique({ where: { email: dto.email } });
    if (existingUser) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const employerUser = await prisma.employerUser.create({
      data: {
        email: dto.email,
        passwordHash,
        fullName: dto.fullName,
        phone: dto.phone,
        jobTitle: dto.jobTitle,
        companyId: company.id,
      },
    });

    const token = await this.signToken({
      id: employerUser.id,
      email: employerUser.email,
      fullName: employerUser.fullName,
      companyId: company.id,
      companyName: company.name,
    });
    return { company: toPublicCompany(company), token };
  }

  async login(dto: EmployerLoginDto) {
    const user = await prisma.employerUser.findUnique({
      where: { email: dto.email },
      include: { company: true },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.signToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      companyId: user.companyId,
      companyName: user.company.name,
    });
    return { company: toPublicCompany(user.company), token };
  }
}
