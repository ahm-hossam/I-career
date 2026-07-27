import type { ServiceProject } from '@i-career/database';

export function toPublicServiceProject(project: ServiceProject) {
  return {
    id: project.id,
    category: project.category,
    name: project.name,
    description: project.description,
    logoUrl: project.logoUrl,
    linkUrl: project.linkUrl,
    order: project.order,
  };
}
