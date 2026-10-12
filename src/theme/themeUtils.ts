export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'algolens-theme';

export const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // localStorage might be unavailable
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};
