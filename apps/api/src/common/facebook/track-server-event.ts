import { createHash } from 'node:crypto';

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export interface FacebookEventUserData {
  email?: string;
  phone?: string;
}

/**
 * Best-effort server-side call to the Facebook Conversions API. No-ops when
 * FB_PIXEL_ID / FB_CONVERSIONS_ACCESS_TOKEN aren't configured, and never
 * throws — a Facebook outage must not affect registration/application flows.
 */
export async function trackServerEvent(
  eventName: string,
  userData: FacebookEventUserData,
  customData?: Record<string, unknown>,
): Promise<void> {
  const pixelId = process.env.FB_PIXEL_ID;
  const accessToken = process.env.FB_CONVERSIONS_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return;

  const hashedUserData: Record<string, string[]> = {};
  if (userData.email) {
    hashedUserData.em = [sha256(userData.email.trim().toLowerCase())];
  }
  if (userData.phone) {
    hashedUserData.ph = [sha256(userData.phone.replace(/\D/g, ''))];
  }

  try {
    await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            user_data: hashedUserData,
            ...(customData ? { custom_data: customData } : {}),
          },
        ],
      }),
    });
  } catch {
    // best-effort — swallow network/API errors
  }
}
