import { fetchCampaigns, fetchPrograms } from '@/lib/api';
import { CampaignsView } from '@/components/campaigns/campaigns-view';

export default async function CampaignsPage() {
  const [campaigns, programs] = await Promise.all([fetchCampaigns(), fetchPrograms()]);

  return <CampaignsView campaigns={campaigns} programs={programs} />;
}
