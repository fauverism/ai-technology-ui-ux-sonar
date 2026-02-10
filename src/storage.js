/**
 * LocalStorage persistence for radar data.
 */

const STORAGE_KEY = 'ux-tech-radar-data';

export const Storage = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  save(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or unavailable — fail silently
    }
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },

  exportJSON(items) {
    return JSON.stringify(items, null, 2);
  },

  parseImport(text) {
    try {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) return null;
      // Basic validation
      const valid = parsed.every(
        (item) =>
          typeof item.name === 'string' &&
          typeof item.quadrant === 'number' &&
          typeof item.ring === 'number'
      );
      return valid ? parsed : null;
    } catch {
      return null;
    }
  },
};
