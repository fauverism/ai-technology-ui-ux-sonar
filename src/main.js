/**
 * Application entry point.
 * Wires together the radar visualization, UI controls, and persistence layer.
 */

import { getDefaultData, getStarterData } from './data.js';
import { Storage } from './storage.js';
import { TechRadar } from './radar.js';
import { UI } from './ui.js';
import './styles/main.css';

// ── State ──────────────────────────────────────────────────────

let items = Storage.load() || getDefaultData();
let activeFilters = { search: '', quadrant: null, ring: null };

// ── Initialize radar ───────────────────────────────────────────

const radar = new TechRadar('#radar-container', {
  onItemClick: (item) => ui.openEditModal(item),
});
radar.setData(items);

// ── Initialize UI ──────────────────────────────────────────────

const ui = new UI({
  onSave: (item, isEdit) => {
    if (isEdit) {
      const idx = items.findIndex((i) => i.id === item.id);
      if (idx !== -1) items[idx] = item;
    } else {
      items.push(item);
    }
    persist();
  },

  onDelete: (id) => {
    items = items.filter((i) => i.id !== id);
    persist();
  },

  onFilter: (filters) => {
    activeFilters = filters;
    ui.renderFiltered(filters);
  },
});

ui.setItems(items);

// ── New radar button ───────────────────────────────────────────

const banner = document.getElementById('alpha-banner');
const bannerClose = document.getElementById('alpha-banner-close');
let bannerDismissed = false;

if (banner && bannerClose) {
  bannerClose.addEventListener('click', () => {
    bannerDismissed = true;
    banner.style.display = 'none';
  });
}

document.getElementById('btn-new-radar').addEventListener('click', () => {
  const message =
    'Create a new radar? Your current data will be replaced.\n\n' +
    'Export your current radar first if you want to keep it.';
  if (confirm(message)) {
    items = getStarterData();
    persist();
    if (banner && !bannerDismissed) {
      banner.style.display = 'flex';
    }
  }
});

// ── Reset button ───────────────────────────────────────────────

document.getElementById('btn-reset').addEventListener('click', () => {
  if (confirm('Reset all data to defaults? Your customizations will be lost.')) {
    items = getDefaultData();
    persist();
  }
});

// ── Export button ──────────────────────────────────────────────

document.getElementById('btn-export').addEventListener('click', () => {
  const json = Storage.exportJSON(items);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ux-tech-radar.json';
  a.click();
  URL.revokeObjectURL(url);
});

// ── Import button ──────────────────────────────────────────────

document.getElementById('btn-import-confirm').addEventListener('click', () => {
  const textarea = document.getElementById('import-textarea');
  const parsed = Storage.parseImport(textarea.value);
  if (!parsed) {
    alert('Invalid data format. Please paste a valid radar export.');
    return;
  }
  items = parsed;
  persist();
  document.getElementById('import-modal').close();
  textarea.value = '';
});

// ── Persistence helper ─────────────────────────────────────────

function persist() {
  Storage.save(items);
  radar.setData(items);
  ui.setItems(items);
  if (activeFilters.search || activeFilters.quadrant !== null || activeFilters.ring !== null) {
    ui.renderFiltered(activeFilters);
  }
}
