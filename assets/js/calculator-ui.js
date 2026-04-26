// ============================================
// CALCULATOR UI v3 — Dropdowns, Results & i18n
// ============================================

// Safe i18n helper — works even if i18n.js is loaded after this file
function _t(key) {
  return (typeof window.t === 'function') ? window.t(key) : key;
}

const dropdownState = {
  cpu:      { open: false, filtered: [], selectedIndex: -1, selectedValue: '' },
  gpu:      { open: false, filtered: [], selectedIndex: -1, selectedValue: '' },
  workload: { open: false, filtered: [], selectedIndex: -1, selectedValue: '' },
};

let liveUpdate = false;

document.addEventListener('DOMContentLoaded', function () {
  initDropdowns();
  initEvents();
  initMobileNav();
  initStorageWarning();
});

// ── DROPDOWNS ─────────────────────────────────────────────────────────────────

function initDropdowns() {
  createCustomDropdown('cpu',      Object.keys(CPU_DATA).sort(),      'Selecciona CPU...');
  createCustomDropdown('gpu',      Object.keys(GPU_DATA).sort(),      'Selecciona GPU...');
  createCustomDropdown('workload', Object.keys(WORKLOAD_DATA),        'Selecciona juego/uso...');
}

function createCustomDropdown(type, items, placeholder) {
  const container = document.getElementById(`${type}-dropdown`);
  if (!container) return;

  container.innerHTML = '';
  container.classList.add('custom-dropdown');

  const trigger = document.createElement('div');
  trigger.className = 'dropdown-trigger';
  trigger.innerHTML = `<span class="dropdown-text">${placeholder}</span><span class="dropdown-arrow" aria-hidden="true">&#9662;</span>`;

  const menu = document.createElement('div');
  menu.className = 'dropdown-menu';
  menu.style.display = 'none';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'dropdown-search';
  searchInput.placeholder = 'Buscar...';
  searchInput.setAttribute('aria-label', 'Buscar');

  const list = document.createElement('div');
  list.className = 'dropdown-list';

  menu.appendChild(searchInput);
  menu.appendChild(list);
  container.appendChild(trigger);
  container.appendChild(menu);

  dropdownState[type].menu        = menu;
  dropdownState[type].list        = list;
  dropdownState[type].search      = searchInput;
  dropdownState[type].container   = container;
  dropdownState[type].filtered    = [...items];
  dropdownState[type].allItems    = [...items];
  dropdownState[type].placeholder = placeholder;

  renderDropdownList(type, list, items);

  trigger.addEventListener('click', e => { e.stopPropagation(); toggleDropdown(type); });
  searchInput.addEventListener('input',   e => filterDropdown(type, e.target.value));
  searchInput.addEventListener('keydown', e => handleDropdownKeydown(type, e));

  document.addEventListener('click', e => { if (!container.contains(e.target)) closeDropdown(type); });

  const sidebar = document.querySelector('.calc-sidebar');
  if (sidebar) sidebar.addEventListener('scroll', () => { if (dropdownState[type].open) positionDropdown(type); });
  window.addEventListener('resize',              () => { if (dropdownState[type].open) positionDropdown(type); });
}

function positionDropdown(type) {
  const state = dropdownState[type];
  const rect  = state.container.getBoundingClientRect();
  state.menu.style.top   = `${rect.bottom + 4}px`;
  state.menu.style.left  = `${rect.left}px`;
  state.menu.style.width = `${rect.width}px`;
}

function renderDropdownList(type, listEl, items) {
  listEl.innerHTML = '';
  items.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'dropdown-item';
    div.textContent = item;
    div.dataset.index = index;
    div.addEventListener('click', () => selectDropdownItem(type, item));
    listEl.appendChild(div);
  });
}

function toggleDropdown(type) {
  const state  = dropdownState[type];
  const isOpen = state.open;
  Object.keys(dropdownState).forEach(t => { if (t !== type) closeDropdown(t); });

  if (isOpen) {
    closeDropdown(type);
  } else {
    positionDropdown(type);
    state.menu.style.display = 'flex';
    state.open = true;
    state.container.classList.add('open');
    state.search.focus();
    state.container.querySelector('.dropdown-arrow').innerHTML = '&#9652;';
  }
}

function closeDropdown(type) {
  const state = dropdownState[type];
  if (!state || !state.menu) return;
  state.menu.style.display = 'none';
  state.open = false;
  if (state.container) state.container.classList.remove('open');
  const arrow = state.container?.querySelector('.dropdown-arrow');
  if (arrow) arrow.innerHTML = '&#9662;';
}

function filterDropdown(type, query) {
  const items    = dropdownState[type].allItems;
  const filtered = query.trim()
    ? items.filter(i => i.toLowerCase().includes(query.toLowerCase()))
    : [...items];
  dropdownState[type].filtered      = filtered;
  dropdownState[type].selectedIndex = -1;
  renderDropdownList(type, dropdownState[type].list, filtered);
}

function handleDropdownKeydown(type, e) {
  const state = dropdownState[type];
  const items = state.filtered;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    state.selectedIndex = Math.min(state.selectedIndex + 1, items.length - 1);
    highlightDropdownItem(type);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    state.selectedIndex = Math.max(state.selectedIndex - 1, 0);
    highlightDropdownItem(type);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (state.selectedIndex >= 0 && items[state.selectedIndex]) selectDropdownItem(type, items[state.selectedIndex]);
  } else if (e.key === 'Escape') {
    closeDropdown(type);
  }
}

function highlightDropdownItem(type) {
  const list = dropdownState[type].list;
  if (!list) return;
  list.querySelectorAll('.dropdown-item').forEach((el, i) => {
    el.classList.toggle('highlighted', i === dropdownState[type].selectedIndex);
    if (i === dropdownState[type].selectedIndex) el.scrollIntoView({ block: 'nearest' });
  });
}

function selectDropdownItem(type, value) {
  const container = document.getElementById(`${type}-dropdown`);
  dropdownState[type].selectedValue = value;
  container.querySelector('.dropdown-text').textContent = value;
  closeDropdown(type);
  if (liveUpdate) runCalculation();
}

function getDropdownValue(type) {
  return dropdownState[type]?.selectedValue || '';
}

// ── STORAGE WARNING ──────────────────────────────────────────────────────────

function initStorageWarning() {
  const storageSelect = document.getElementById('calc-storage');
  if (!storageSelect) return;
  storageSelect.addEventListener('change', updateStorageWarning);
  updateStorageWarning();
}

function updateStorageWarning() {
  const storageSelect = document.getElementById('calc-storage');
  const warnBox       = document.getElementById('storage-warn-box');
  if (!storageSelect || !warnBox) return;

  const key  = storageSelect.value;
  const data = STORAGE_DATA[key];
  if (data && data.statusKey) {
    warnBox.textContent = _t(data.statusKey);
    warnBox.classList.add('visible');
  } else {
    warnBox.textContent = '';
    warnBox.classList.remove('visible');
  }
}

// ── EVENTS ────────────────────────────────────────────────────────────────────

function initEvents() {
  const calcBtn        = document.getElementById('calc-btn');
  const liveToggle     = document.getElementById('live-toggle');
  const ramSelect      = document.getElementById('calc-ram');
  const resSelect      = document.getElementById('calc-resolution');
  const usecaseSelect  = document.getElementById('calc-usecase');
  const storageSelect  = document.getElementById('calc-storage');
  const qualitySelect  = document.getElementById('calc-quality');

  if (calcBtn)   calcBtn.addEventListener('click', runCalculation);

  if (liveToggle) {
    liveToggle.addEventListener('click', () => {
      liveToggle.classList.toggle('active');
      liveUpdate = liveToggle.classList.contains('active');
      liveToggle.setAttribute('aria-checked', liveUpdate);
      if (liveUpdate) runCalculation();
    });
  }

  [ramSelect, resSelect, usecaseSelect, storageSelect, qualitySelect].forEach(sel => {
    if (sel) sel.addEventListener('change', () => { if (liveUpdate) runCalculation(); });
  });
}

function runCalculation() {
  const cpuName      = getDropdownValue('cpu');
  const gpuName      = getDropdownValue('gpu');
  const ram          = document.getElementById('calc-ram')?.value        || '16';
  const resolution   = document.getElementById('calc-resolution')?.value || '1440p';
  const workloadName = getDropdownValue('workload');
  const useCase      = document.getElementById('calc-usecase')?.value    || 'gaming';
  const storage      = document.getElementById('calc-storage')?.value    || 'SATA SSD';
  const quality      = document.getElementById('calc-quality')?.value    || 'ultra';

  if (!cpuName || !gpuName || !workloadName) {
    // Highlight missing fields visually
    if (!cpuName)      document.getElementById('cpu-dropdown')?.classList.add('field-error');
    if (!gpuName)      document.getElementById('gpu-dropdown')?.classList.add('field-error');
    if (!workloadName) document.getElementById('workload-dropdown')?.classList.add('field-error');
    return;
  }

  // Clear any error highlights
  ['cpu-dropdown', 'gpu-dropdown', 'workload-dropdown'].forEach(id => {
    document.getElementById(id)?.classList.remove('field-error');
  });

  const result = calculateBottleneck(cpuName, gpuName, ram, resolution, workloadName, useCase, storage, quality);
  if (result.error) return;
  displayResults(result, cpuName, gpuName);
}

// ── DISPLAY RESULTS ───────────────────────────────────────────────────────────

function displayResults(data, cpuName, gpuName) {
  const emptyState  = document.getElementById('empty-state');
  const resultsPanel = document.getElementById('results-panel');
  emptyState.style.display  = 'none';
  resultsPanel.style.display = 'block';

  // ── Percent + badge ──
  const percentEl = document.getElementById('result-percent');
  const badgeEl   = document.getElementById('result-badge');
  const barEl     = document.getElementById('result-bar');

  animateNumber(percentEl, data.bottleneckPercent, '%');
  percentEl.className = `result-percent ${data.badgeClass}`;
  badgeEl.className   = `result-badge ${data.badgeClass}`;
  badgeEl.textContent = data.diagnosis;

  setTimeout(() => {
    barEl.style.width  = `${data.bottleneckPercent}%`;
    barEl.className    = `result-bar-fill ${data.badgeClass}`;
  }, 50);

  // ── Metrics ──
  animateNumber(document.getElementById('metric-fps'),       data.fps,      '');
  animateNumber(document.getElementById('metric-low'),       data.lowFps,   '');
  animateNumber(document.getElementById('metric-gpu-usage'), data.gpuUsage, '%');
  animateNumber(document.getElementById('metric-cpu-usage'), data.cpuUsage, '%');

  // ── Explanation (with quality + storage context appended) ──
  const explanationEl = document.getElementById('result-explanation');
  let explanationHTML = data.explanation;
  // Append storage warning to explanation if HDD
  if (data.storageStatusKey) {
    explanationHTML += `<div class="storage-warn visible" style="margin-top:10px">${_t(data.storageStatusKey)}</div>`;
  }
  // Append VRAM warning if present
  if (data.vramStatus) {
    explanationHTML += `<div class="vram-warn-chip" style="margin-top:6px; display:inline-block">⚠ ${data.vramStatus}</div>`;
  }
  explanationEl.innerHTML = explanationHTML;

  // ── Resolution Impact ──
  renderResolutionImpact(data.resolutionImpact, data.resolution);

  // ── Upgrades ──
  renderUpgrades(data.upgrades);

  // ── Component Details ──
  renderComponentDetails(data, cpuName, gpuName);

  // ── Benchmark validation ──
  renderValidation(data.validation);

  // ── Scroll into view (smooth) ──
  resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderResolutionImpact(impacts, currentRes) {
  const grid = document.getElementById('resolution-grid');
  if (!grid) return;
  grid.innerHTML = '';

  impacts.forEach(impact => {
    const item = document.createElement('div');
    item.className = `resolution-item ${impact.resolution === currentRes ? 'active' : ''}`;

    const bottleneckClass = impact.bottleneck === 'balanced' ? 'balanced' : impact.bottleneck;
    const bottleneckText  =
      impact.bottleneck === 'balanced' ? _t('ri.balanced') :
      impact.bottleneck === 'cpu'      ? _t('ri.cpu_limit') :
                                         _t('ri.gpu_limit');

    const vramWarning = impact.vramWarning
      ? `<div class="vram-warn-chip">VRAM ⚠</div>`
      : '';

    item.innerHTML = `
      <h4>${impact.label}</h4>
      <div class="res-bottleneck ${bottleneckClass}">${impact.percent}%</div>
      <div class="res-label">${bottleneckText}</div>
      <div style="font-size:13px;color:var(--text-secondary);margin-top:4px">~${impact.fps} FPS</div>
      ${vramWarning}
    `;
    grid.appendChild(item);
  });
}

function renderUpgrades(upgrades) {
  const card = document.getElementById('upgrades-card');
  const list = document.getElementById('upgrades-list');
  if (!card || !list) return;

  if (!upgrades || upgrades.suggestions.length === 0) {
    card.style.display = 'none';
    return;
  }

  card.style.display = 'block';
  list.innerHTML = '';
  upgrades.suggestions.forEach(s => {
    const item = document.createElement('div');
    item.className = 'upgrade-suggestion';
    const specs = s.type === 'CPU'
      ? `${CPU_DATA[s.component]?.cores} cores | ${CPU_DATA[s.component]?.socket}`
      : `${GPU_DATA[s.component]?.vram} GB VRAM | ${GPU_DATA[s.component]?.tdp}W`;

    item.innerHTML = `
      <div class="upgrade-info">
        <span class="upgrade-name">${s.component}</span>
        <span class="upgrade-specs">${specs}</span>
        <span class="upgrade-specs">${s.note}</span>
      </div>
      <span class="upgrade-improvement">${s.improvement}</span>
    `;
    list.appendChild(item);
  });
}

function renderComponentDetails(data, cpuName, gpuName) {
  const cpu = CPU_DATA[cpuName || getDropdownValue('cpu')];
  const gpu = GPU_DATA[gpuName || getDropdownValue('gpu')];
  const cpuEl = document.getElementById('cpu-details');
  const gpuEl = document.getElementById('gpu-details');

  if (cpu && cpuEl) {
    cpuEl.innerHTML = `
      <div class="detail-row"><span data-i18n="det.model">${_t('det.model')}</span><span>${cpuName}</span></div>
      <div class="detail-row"><span data-i18n="det.cores">${_t('det.cores')}</span><span>${cpu.cores} / ${cpu.threads}</span></div>
      <div class="detail-row"><span data-i18n="det.arch">${_t('det.arch')}</span><span>${cpu.arch}</span></div>
      <div class="detail-row"><span data-i18n="det.socket">${_t('det.socket')}</span><span>${cpu.socket}</span></div>
      <div class="detail-row"><span data-i18n="det.tdp">${_t('det.tdp')}</span><span>${cpu.tdp}W</span></div>
      <div class="detail-row"><span data-i18n="det.year">${_t('det.year')}</span><span>${cpu.year}</span></div>
      <div class="detail-row"><span data-i18n="det.throughput">${_t('det.throughput')}</span><span>${data.cpuThroughput} FPS</span></div>
    `;
  }

  if (gpu && gpuEl) {
    gpuEl.innerHTML = `
      <div class="detail-row"><span data-i18n="det.model">${_t('det.model')}</span><span>${gpuName}</span></div>
      <div class="detail-row"><span data-i18n="det.vram">${_t('det.vram')}</span><span>${gpu.vram} GB</span></div>
      <div class="detail-row"><span data-i18n="det.arch">${_t('det.arch')}</span><span>${gpu.arch}</span></div>
      <div class="detail-row"><span data-i18n="det.tdp">${_t('det.tdp')}</span><span>${gpu.tdp}W</span></div>
      <div class="detail-row"><span data-i18n="det.year">${_t('det.year')}</span><span>${gpu.year}</span></div>
      <div class="detail-row"><span data-i18n="det.throughput">${_t('det.throughput')}</span><span>${data.gpuThroughput} FPS</span></div>
    `;
  }
}

function renderValidation(validation) {
  if (!validation) return;
  const el = document.getElementById('result-explanation');
  if (!el || el.querySelector('.validation-info')) return;

  const accuracyText =
    validation.accuracy === 'high'   ? _t('val.high') :
    validation.accuracy === 'medium' ? _t('val.medium') :
                                        _t('val.low');

  const div = document.createElement('div');
  div.className = 'validation-info';
  div.style.cssText = 'margin-top:12px;padding-top:12px;border-top:1px solid var(--border-subtle);font-size:12px;color:var(--text-muted)';
  div.textContent = `${accuracyText} (Esperado: ~${validation.expectedFps} FPS, Calculado: ${validation.calculatedFps} FPS, Δ${validation.deviationPercent}%)`;
  el.appendChild(div);
}

// ── ANIMATE NUMBER ────────────────────────────────────────────────────────────

function animateNumber(element, target, suffix) {
  if (!element) return;
  const duration   = 750;
  const startTime  = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── SHARE ─────────────────────────────────────────────────────────────────────

function shareResult(platform) {
  const cpu  = getDropdownValue('cpu');
  const gpu  = getDropdownValue('gpu');
  const text = `Analicé el bottleneck de mi ${cpu} + ${gpu} con BottleneckCalc`;
  const url  = window.location.href;

  if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  } else if (platform === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  }
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert(_t('alert.copied'));
  });
}

// ── MOBILE NAV ────────────────────────────────────────────────────────────────

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isOpen);
    links.style.cssText = isOpen ? '' :
      'display:flex;flex-direction:column;position:absolute;top:60px;left:0;right:0;background:var(--bg-surface);padding:16px;border-bottom:1px solid var(--border-subtle);z-index:99;';
  });
}
