/**
 * D3.js-based interactive technology radar visualization.
 *
 * Renders a circular radar with four quadrants and four concentric rings.
 * Items are plotted as blips (circles or triangles) within their sector.
 */

import * as d3 from 'd3';
import { QUADRANTS, RINGS } from './data.js';

// ── Deterministic positioning ──────────────────────────────────────────────

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return hash;
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// ── Radar class ────────────────────────────────────────────────────────────

export class TechRadar {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    this.tooltip = document.querySelector('#radar-tooltip');
    this.items = [];
    this.selectedId = null;
    this.onItemClick = options.onItemClick || null;

    // Will be computed on render / resize
    this.width = 0;
    this.height = 0;
    this.cx = 0;
    this.cy = 0;
    this.maxRadius = 0;

    this._resizeObserver = new ResizeObserver(() => this.render());
    this._resizeObserver.observe(this.container);
  }

  // ── Public API ──────────────────────────────────────────────

  setData(items) {
    this.items = items;
    this.render();
  }

  highlightItem(id) {
    this.selectedId = id;
    this._updateHighlight();
  }

  destroy() {
    this._resizeObserver.disconnect();
    d3.select(this.container).selectAll('*').remove();
  }

  // ── Rendering ───────────────────────────────────────────────

  render() {
    const rect = this.container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    this.width = rect.width;
    this.height = rect.height;
    this.cx = this.width / 2;
    this.cy = this.height / 2;
    this.maxRadius = Math.min(this.cx, this.cy) - 48;

    // Clear
    d3.select(this.container).selectAll('*').remove();

    const svg = d3
      .select(this.container)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr('class', 'radar-svg');

    this.svg = svg;

    this._drawBackground(svg);
    this._drawRings(svg);
    this._drawAxes(svg);
    this._drawRingLabels(svg);
    this._drawQuadrantLabels(svg);
    this._drawBlips(svg);
  }

  // ── Grid: background quadrant fills ─────────────────────────

  _drawBackground(svg) {
    const g = svg.append('g').attr('class', 'radar-bg');

    // Draw quadrant background arcs (very subtle tint)
    const arcGen = d3.arc();

    // Quadrant angular ranges (standard math → SVG: y is flipped)
    // We use SVG-native angles: 0=right, clockwise positive
    // top-right: -π/2 to 0   → quadrant 0 (Design Tools)
    // top-left:  -π to -π/2  → quadrant 1 (Techniques)
    // bottom-left: π/2 to π  → quadrant 2 (Frameworks)   — note: in SVG, π/2 is down-ish
    // bottom-right: 0 to π/2 → quadrant 3 (AI & Emerging)
    //
    // Remap to visual layout matching ThoughtWorks style:
    const quadrantArcs = [
      { qi: 0, startAngle: -Math.PI / 2, endAngle: 0 },          // top-right
      { qi: 1, startAngle: -Math.PI,     endAngle: -Math.PI / 2 }, // top-left
      { qi: 2, startAngle: Math.PI / 2,  endAngle: Math.PI },      // bottom-left
      { qi: 3, startAngle: 0,            endAngle: Math.PI / 2 },   // bottom-right
    ];

    quadrantArcs.forEach(({ qi, startAngle, endAngle }) => {
      g.append('path')
        .attr('d', arcGen({
          innerRadius: 0,
          outerRadius: this.maxRadius,
          startAngle,
          endAngle,
        }))
        .attr('transform', `translate(${this.cx},${this.cy})`)
        .attr('fill', QUADRANTS[qi].color)
        .attr('opacity', 0.04);
    });
  }

  // ── Concentric rings ────────────────────────────────────────

  _drawRings(svg) {
    const g = svg.append('g').attr('class', 'radar-rings');
    const ringCount = RINGS.length;

    for (let i = ringCount; i >= 1; i--) {
      const r = (i / ringCount) * this.maxRadius;
      g.append('circle')
        .attr('cx', this.cx)
        .attr('cy', this.cy)
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', '#d1d5db')
        .attr('stroke-width', i === ringCount ? 1.5 : 1)
        .attr('stroke-dasharray', i === ringCount ? 'none' : '4,4')
        .attr('opacity', 0.7);
    }
  }

  // ── Quadrant dividing axes ──────────────────────────────────

  _drawAxes(svg) {
    const g = svg.append('g').attr('class', 'radar-axes');

    // Horizontal axis
    g.append('line')
      .attr('x1', this.cx - this.maxRadius)
      .attr('y1', this.cy)
      .attr('x2', this.cx + this.maxRadius)
      .attr('y2', this.cy)
      .attr('stroke', '#9ca3af')
      .attr('stroke-width', 1);

    // Vertical axis
    g.append('line')
      .attr('x1', this.cx)
      .attr('y1', this.cy - this.maxRadius)
      .attr('x2', this.cx)
      .attr('y2', this.cy + this.maxRadius)
      .attr('stroke', '#9ca3af')
      .attr('stroke-width', 1);
  }

  // ── Ring labels ─────────────────────────────────────────────

  _drawRingLabels(svg) {
    const g = svg.append('g').attr('class', 'radar-ring-labels');
    const ringCount = RINGS.length;

    RINGS.forEach((ring, i) => {
      const innerR = (i / ringCount) * this.maxRadius;
      const outerR = ((i + 1) / ringCount) * this.maxRadius;
      const midR = (innerR + outerR) / 2;

      // Place labels along top-left diagonal for readability
      const angle = -Math.PI * 0.75; // 135° (top-left diagonal)
      const x = this.cx + midR * Math.cos(angle);
      const y = this.cy + midR * Math.sin(angle);

      g.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('class', 'ring-label')
        .text(ring.name);
    });
  }

  // ── Quadrant labels ─────────────────────────────────────────

  _drawQuadrantLabels(svg) {
    const g = svg.append('g').attr('class', 'radar-quadrant-labels');
    const offset = 20;

    const positions = [
      // top-right
      { qi: 0, x: this.cx + this.maxRadius / 2, y: this.cy - this.maxRadius - offset, anchor: 'middle' },
      // top-left
      { qi: 1, x: this.cx - this.maxRadius / 2, y: this.cy - this.maxRadius - offset, anchor: 'middle' },
      // bottom-left
      { qi: 2, x: this.cx - this.maxRadius / 2, y: this.cy + this.maxRadius + offset + 14, anchor: 'middle' },
      // bottom-right
      { qi: 3, x: this.cx + this.maxRadius / 2, y: this.cy + this.maxRadius + offset + 14, anchor: 'middle' },
    ];

    positions.forEach(({ qi, x, y, anchor }) => {
      g.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', anchor)
        .attr('class', 'quadrant-label')
        .attr('fill', QUADRANTS[qi].color)
        .text(QUADRANTS[qi].name);
    });
  }

  // ── Item blips ──────────────────────────────────────────────

  _drawBlips(svg) {
    const g = svg.append('g').attr('class', 'radar-blips');
    const ringCount = RINGS.length;

    // Compute positions for all items
    const positioned = this.items.map((item) => {
      const pos = this._computePosition(item, ringCount);
      return { ...item, px: pos.x, py: pos.y };
    });

    const blipGroups = g
      .selectAll('g.blip')
      .data(positioned, (d) => d.id)
      .enter()
      .append('g')
      .attr('class', (d) => `blip ${d.id === this.selectedId ? 'blip--selected' : ''}`)
      .attr('transform', (d) => `translate(${d.px},${d.py})`)
      .style('cursor', 'pointer')
      .on('mouseenter', (event, d) => this._showTooltip(event, d))
      .on('mouseleave', () => this._hideTooltip())
      .on('click', (event, d) => {
        event.stopPropagation();
        if (this.onItemClick) this.onItemClick(d);
      });

    // New items → triangle, existing → circle
    blipGroups.each(function (d) {
      const el = d3.select(this);
      const color = QUADRANTS[d.quadrant].color;

      if (d.isNew) {
        el.append('path')
          .attr('d', d3.symbol().type(d3.symbolTriangle).size(120)())
          .attr('fill', color)
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5);
      } else {
        el.append('circle')
          .attr('r', 6)
          .attr('fill', color)
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5);
      }
    });

    // Entrance animation
    blipGroups
      .attr('opacity', 0)
      .transition()
      .duration(400)
      .delay((_, i) => i * 12)
      .attr('opacity', 1);
  }

  // ── Position computation ────────────────────────────────────

  _computePosition(item, ringCount) {
    const seed = hashCode(item.name + item.id);

    // Ring radial bounds (fraction of maxRadius)
    const innerFrac = item.ring / ringCount;
    const outerFrac = (item.ring + 1) / ringCount;
    // Keep items away from ring borders
    const rFrac = innerFrac + (outerFrac - innerFrac) * (0.15 + 0.7 * seededRandom(seed));
    const r = rFrac * this.maxRadius;

    // Quadrant angular ranges (SVG: 0=right, clockwise positive)
    const quadrantAngles = [
      { start: -Math.PI / 2, end: 0 },          // 0: top-right
      { start: -Math.PI,     end: -Math.PI / 2 }, // 1: top-left
      { start: Math.PI / 2,  end: Math.PI },      // 2: bottom-left
      { start: 0,            end: Math.PI / 2 },   // 3: bottom-right
    ];

    const qa = quadrantAngles[item.quadrant];
    // Keep items away from axes
    const angle = qa.start + (qa.end - qa.start) * (0.1 + 0.8 * seededRandom(seed + 1));

    return {
      x: this.cx + r * Math.cos(angle),
      y: this.cy + r * Math.sin(angle),
    };
  }

  // ── Tooltip ─────────────────────────────────────────────────

  _showTooltip(event, item) {
    const quadrant = QUADRANTS[item.quadrant];
    const ring = RINGS[item.ring];

    this.tooltip.innerHTML = `
      <div class="tooltip-header" style="border-left: 3px solid ${quadrant.color};">
        <strong>${item.name}</strong>
        ${item.isNew ? '<span class="tooltip-new">NEW</span>' : ''}
      </div>
      <div class="tooltip-meta">
        <span class="tooltip-quadrant">${quadrant.name}</span>
        <span class="tooltip-ring">${ring.name}</span>
      </div>
      ${item.description ? `<p class="tooltip-desc">${item.description}</p>` : ''}
    `;

    const containerRect = this.container.getBoundingClientRect();
    const tooltipEl = this.tooltip;
    tooltipEl.style.display = 'block';

    const tooltipRect = tooltipEl.getBoundingClientRect();
    let left = event.clientX - containerRect.left + 14;
    let top = event.clientY - containerRect.top - 10;

    // Prevent overflow right
    if (left + tooltipRect.width > containerRect.width) {
      left = event.clientX - containerRect.left - tooltipRect.width - 14;
    }
    // Prevent overflow bottom
    if (top + tooltipRect.height > containerRect.height) {
      top = event.clientY - containerRect.top - tooltipRect.height + 10;
    }

    tooltipEl.style.left = `${left}px`;
    tooltipEl.style.top = `${top}px`;
  }

  _hideTooltip() {
    this.tooltip.style.display = 'none';
  }

  // ── Highlight ───────────────────────────────────────────────

  _updateHighlight() {
    if (!this.svg) return;

    this.svg.selectAll('g.blip').each(function (d) {
      d3.select(this).classed('blip--selected', d.id === this.selectedId);
    }.bind(this));
  }
}
