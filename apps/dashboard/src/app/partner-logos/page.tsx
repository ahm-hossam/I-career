import { fetchPartnerLogos } from '@/lib/api';
import { PartnerLogosView } from '@/components/partner-logos/partner-logos-view';

export default async function PartnerLogosPage() {
  const logos = await fetchPartnerLogos();

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <PartnerLogosView logos={logos} />
    </div>
  );
}
