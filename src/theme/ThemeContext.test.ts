import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getInitialTheme } from './themeUtils';

describe('ThemeContext - getInitialTheme', () => {
  let mockStore: Record<string, string> = {};

  beforeEach(() => {
    mockStore = {};
    const mockLocalStorage = {
      getItem: (key: string) => mockStore[key] ?? null,
      setItem: (key: string, value: string) => {
        mockStore[key] = value;
      },
      removeItem: (key: string) => {
        delete mockStore[key];
      },
      clear: () => {
        mockStore = {};
      },
    };

    (globalThis as any).window = {
      localStorage: mockLocalStorage,
      matchMedia: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    };
    (globalThis as any).localStorage = mockLocalStorage;
  });

  afterEach(() => {
    delete (globalThis as any).window;
    delete (globalThis as any).localStorage;
  });

  it('returns stored light theme from localStorage', () => {
    mockStore['algolens-theme'] = 'light';
    expect(getInitialTheme()).toBe('light');
  });

  it('returns stored dark theme from localStorage', () => {
    mockStore['algolens-theme'] = 'dark';
    expect(getInitialTheme()).toBe('dark');
  });

  it('ignores invalid stored theme values and falls back to system preference (light)', () => {
    mockStore['algolens-theme'] = 'neon-cyber';
    expect(getInitialTheme()).toBe('light');
  });

  it('respects system dark mode preference when no stored theme is found', () => {
    (globalThis as any).window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    expect(getInitialTheme()).toBe('dark');
  });

  it('falls back to light mode when matchMedia is unavailable and no stored theme exists', () => {
    (globalThis as any).window.matchMedia = undefined;
    expect(getInitialTheme()).toBe('light');
  });

  it('handles localStorage throwing errors gracefully', () => {
    (globalThis as any).window.localStorage.getItem = () => {
      throw new Error('SecurityError: Access Denied');
    };
    expect(getInitialTheme()).toBe('light');
  });
});
