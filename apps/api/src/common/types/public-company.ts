import type { Company } from '@i-career/database';

export function toPublicCompany(company: Company) {
  return {
    id: company.id,
    name: company.name,
    numberOfEmployees: company.numberOfEmployees,
    industry: company.industry,
    type: company.type,
    description: company.description,
    address: company.address,
    benefits: company.benefits,
    logoUrl: company.logoUrl,
    linkedinUrl: company.linkedinUrl,
    facebookUrl: company.facebookUrl,
    websiteUrl: company.websiteUrl,
    createdAt: company.createdAt,
  };
}
