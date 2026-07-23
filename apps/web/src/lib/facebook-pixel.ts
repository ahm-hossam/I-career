declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fire(...args: unknown[]) {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq(...args);
}

export function trackPageView() {
  fire('track', 'PageView');
}

export function trackLead() {
  fire('track', 'Lead');
}

export function trackCompleteRegistration() {
  fire('track', 'CompleteRegistration');
}
