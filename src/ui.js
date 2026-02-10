/**
 * UI controller for the sidebar item list, forms, filters, and modals.
 */

import { QUADRANTS, RINGS, generateId } from './data.js';

export class UI {
  constructor({ onSave, onDelete, onFilter }) {
    this.onSave = onSave;
    this.onDelete = onDelete;
    this.onFilter = onFilter;

    // DOM references
    this.modal = document.getElementById('item-modal');
    this.form = document.getElementById('item-form');
    this.modalTitle = document.getElementById('modal-title');
    this.deleteBtn = document.getElementById('btn-delete-item');
    this.itemList = document.getElementById('item-list');
    this.itemCount = document.getElementById('item-count');
    this.searchInput = document.getElementById('search-input');
    this.filterQuadrant = document.getElementById('filter-quadrant');
    this.filterRing = document.getElementById('filter-ring');

    this._editing = null; // item being edited, or null for new
    this._items = [];

    this._populateFormSelects();
    this._populateFilterSelects();
    this._bindEvents();
  }

  // ── Public API ──────────────────────────────────────────────

  setItems(items) {
    this._items = items;
    this._renderList();
  }

  openAddModal() {
    this._editing = null;
    this.modalTitle.textContent = 'Add Technology';
    this.form.reset();
    document.getElementById('form-id').value = '';
    this.deleteBtn.style.display = 'none';
    this.modal.showModal();
    document.getElementById('form-name').focus();
  }

  openEditModal(item) {
    this._editing = item;
    this.modalTitle.textContent = 'Edit Technology';
    document.getElementById('form-id').value = item.id;
    document.getElementById('form-name').value = item.name;
    document.getElementById('form-quadrant').value = item.quadrant;
    document.getElementById('form-ring').value = item.ring;
    document.getElementById('form-description').value = item.description || '';
    document.getElementById('form-isNew').checked = item.isNew || false;
    this.deleteBtn.style.display = 'inline-flex';
    this.modal.showModal();
  }

  scrollToItem(id) {
    const el = this.itemList.querySelector(`[data-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      el.classList.add('item-card--flash');
      setTimeout(() => el.classList.remove('item-card--flash'), 1200);
    }
  }

  // ── Private: populate selects ───────────────────────────────

  _populateFormSelects() {
    const qSelect = document.getElementById('form-quadrant');
    const rSelect = document.getElementById('form-ring');

    QUADRANTS.forEach((q) => {
      const opt = document.createElement('option');
      opt.value = q.id;
      opt.textContent = q.name;
      qSelect.appendChild(opt);
    });

    RINGS.forEach((r) => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = `${r.name} — ${r.description}`;
      rSelect.appendChild(opt);
    });
  }

  _populateFilterSelects() {
    QUADRANTS.forEach((q) => {
      const opt = document.createElement('option');
      opt.value = q.id;
      opt.textContent = q.name;
      this.filterQuadrant.appendChild(opt);
    });

    RINGS.forEach((r) => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = r.name;
      this.filterRing.appendChild(opt);
    });
  }

  // ── Private: event binding ──────────────────────────────────

  _bindEvents() {
    // Add button
    document.getElementById('btn-add-item').addEventListener('click', () => this.openAddModal());

    // Modal close buttons
    document.getElementById('modal-close').addEventListener('click', () => this.modal.close());
    document.getElementById('btn-cancel').addEventListener('click', () => this.modal.close());

    // Click outside modal to close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.modal.close();
    });

    // Form submit
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSave();
    });

    // Delete
    this.deleteBtn.addEventListener('click', () => {
      if (this._editing && confirm(`Remove "${this._editing.name}" from the radar?`)) {
        this.modal.close();
        if (this.onDelete) this.onDelete(this._editing.id);
      }
    });

    // Filters
    this.searchInput.addEventListener('input', () => this._emitFilter());
    this.filterQuadrant.addEventListener('change', () => this._emitFilter());
    this.filterRing.addEventListener('change', () => this._emitFilter());

    // Import modal
    const importModal = document.getElementById('import-modal');
    document.getElementById('btn-import').addEventListener('click', () => importModal.showModal());
    document.getElementById('import-modal-close').addEventListener('click', () => importModal.close());
    document.getElementById('btn-import-cancel').addEventListener('click', () => importModal.close());
    importModal.addEventListener('click', (e) => {
      if (e.target === importModal) importModal.close();
    });

    // Keyboard: Escape closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.modal.open) this.modal.close();
        if (importModal.open) importModal.close();
      }
    });
  }

  // ── Private: form handling ──────────────────────────────────

  _handleSave() {
    const formData = new FormData(this.form);
    const item = {
      id: formData.get('id') || generateId(),
      name: formData.get('name').trim(),
      quadrant: parseInt(formData.get('quadrant'), 10),
      ring: parseInt(formData.get('ring'), 10),
      description: formData.get('description').trim(),
      isNew: document.getElementById('form-isNew').checked,
    };

    if (!item.name) return;

    this.modal.close();
    if (this.onSave) this.onSave(item, !!this._editing);
  }

  _emitFilter() {
    const filters = {
      search: this.searchInput.value.trim().toLowerCase(),
      quadrant: this.filterQuadrant.value !== '' ? parseInt(this.filterQuadrant.value, 10) : null,
      ring: this.filterRing.value !== '' ? parseInt(this.filterRing.value, 10) : null,
    };
    if (this.onFilter) this.onFilter(filters);
  }

  // ── Private: render item list ───────────────────────────────

  _renderList(filteredItems = null) {
    const items = filteredItems || this._items;
    this.itemCount.textContent = items.length;

    // Group by quadrant
    const grouped = {};
    QUADRANTS.forEach((q) => (grouped[q.id] = []));
    items.forEach((item) => {
      if (grouped[item.quadrant]) grouped[item.quadrant].push(item);
    });

    let html = '';

    QUADRANTS.forEach((q) => {
      const group = grouped[q.id];
      if (group.length === 0) return;

      // Sort by ring, then name
      group.sort((a, b) => a.ring - b.ring || a.name.localeCompare(b.name));

      html += `
        <div class="item-group">
          <h3 class="item-group-title" style="color: ${q.color};">
            <span class="dot" style="background: ${q.color};"></span>
            ${q.name}
          </h3>
          ${group
            .map(
              (item) => `
            <div class="item-card" data-id="${item.id}" tabindex="0">
              <div class="item-card-header">
                <span class="item-name">${item.name}</span>
                ${item.isNew ? '<span class="badge badge-new">NEW</span>' : ''}
              </div>
              <span class="item-ring ring-${item.ring}">${RINGS[item.ring].name}</span>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    });

    if (items.length === 0) {
      html = '<div class="empty-state">No technologies match your filters.</div>';
    }

    this.itemList.innerHTML = html;

    // Bind click events to item cards
    this.itemList.querySelectorAll('.item-card').forEach((card) => {
      const id = card.dataset.id;
      const item = this._items.find((i) => i.id === id);
      if (item) {
        card.addEventListener('click', () => this.openEditModal(item));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.openEditModal(item);
          }
        });
      }
    });
  }

  renderFiltered(filters) {
    let items = this._items;

    if (filters.search) {
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(filters.search) ||
          (i.description && i.description.toLowerCase().includes(filters.search))
      );
    }
    if (filters.quadrant !== null && filters.quadrant !== undefined) {
      items = items.filter((i) => i.quadrant === filters.quadrant);
    }
    if (filters.ring !== null && filters.ring !== undefined) {
      items = items.filter((i) => i.ring === filters.ring);
    }

    this._renderList(items);
  }
}
