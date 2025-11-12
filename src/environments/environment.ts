declare global {
  interface Window {
    __env?: Record<string, any>;
  }
}

const runtime: Record<string, any> =
  typeof window !== 'undefined' && window.__env ? window.__env : {};

export const environment = {
  production: false,
  apiUrl: (runtime['NG_APP_API_BASE_URL'] as string),
  // apiUrl: 'https://drainage-joke-territories-incorporate.trycloudflare.com',
};
