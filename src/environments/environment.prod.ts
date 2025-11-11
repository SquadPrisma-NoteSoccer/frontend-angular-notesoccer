export const environment = {
  production: true,
  apiUrl: (window as any).__env?.NG_APP_API_BASE_URL ?? 'http://localhost:8080',
};
