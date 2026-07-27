import type { PartnerLogo } from '@i-career/database';

export function toPublicPartnerLogo(logo: PartnerLogo) {
  return {
    id: logo.id,
    category: logo.category,
    name: logo.name,
    imageUrl: logo.imageUrl,
    width: logo.width,
    height: logo.height,
    order: logo.order,
  };
}
