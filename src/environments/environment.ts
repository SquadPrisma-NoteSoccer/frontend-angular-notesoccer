export const environment = {
  production: false,
  apiUrl: (window as any).__env?.NG_APP_API_BASE_URL ?? 'http://localhost:8080',
  // apiUrl: 'https://drainage-joke-territories-incorporate.trycloudflare.com',
};
