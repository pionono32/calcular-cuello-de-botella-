// ============================================
// CALCULATOR UI — Dropdowns & Results Display
// ============================================

const dropdownState = {
  cpu: { open: false, filtered: [], selectedIndex: -1, selectedValue: '' },
  gpu: { open: false, filtered: [], selectedIndex: -1, selectedValue: '' },
  workload: { open: false, filtered: [], selectedIndex: -1, selectedValue: '' },
};

let liveUpdate = false;

document.addEventListener('DOMContentLoaded', function() {
  initDropdowns();
  initEvents();
  initMobileNav();
});

function initDropdowns() {
  createCustomDropdown('cpu', Object.keys(CPU_DATA).sort(), 'Selecciona CPU...');
  createCustomDropdown('gpu', Object.keys(GPU_DATA).sort(), 'Selecciona GPU...');
  createCustomDropdown('workload', Object.keys(WORKLOAD_DATA), 'Selecciona juego/uso...');
}

function createCustomDropdown(type, items, placeholder) {
  const container = document.getElementById(`${type}-dropdown`);
  if (!container) return;

  container.innerHTML = '';
  container.classList.add('custom-dropdown');

  const trigger = document.createElement('div');
  trigger.className = 'dropdown-trigger';
  trigger.innerHTML = `<span class="dropdown-text">${placeholder}</span><span class="dropdown-arrow">&#9662;</span>`;

  const menu = document.createElement('div');
  menu.className = 'dropdown-menu';
  menu.style.display = 'none';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'dropdown-search';
  searchInput.placeholder = 'Buscar...';

  const list = document.createElement('div');
  list.className = 'dropdown-list';

  menu.appendChild(searchInput);
  menu.appendChild(list);
  container.appendChild(trigger);
  container.appendChild(menu);

  dropdownState[type].menu = menu;
  dropdownState[type].list = list;
  dropdownState[type].search = searchInput;
  dropdownState[type].container = container;
  dropdownState[type].filtered = [...items];
  dropdownState[type].allItems = [...items];
  dropdownState[type].placeholder = placeholder;

  renderDropdownList(type, list, items);

  trigger.addEventListener('click', (e) => { e.stopPropagation(); toggleDropdown(type); });
  searchInput.addEventListener('input', (e) => filterDropdown(type, e.target.value));
  searchInput.addEventListener('keydown', (e) => handleDropdownKeydown(type, e));

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) closeDropdown(type);
  });

  const sidebar = document.querySelector('.calc-sidebar');
  if (sidebar) {
    sidebar.addEventListener('scroll', () => {
      if (dropdownState[type].open) positionDropdown(type);
    });
  }

  window.addEventListener('resize', () => {
    if (dropdownState[type].open) positionDropdown(type);
  });
}

function positionDropdown(type) {
  const state = dropdownState[type];
  const rect = state.container.getBoundingClientRect();
  state.menu.style.top = `${rect.bottom + 4}px`;
  state.menu.style.left = `${rect.left}px`;
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
  const state = dropdownState[type];
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
  const items = dropdownState[type].allItems;
  const filtered = query.trim() ? items.filter(item => item.toLowerCase().includes(query.toLowerCase())) : [...items];
  dropdownState[type].filtered = filtered;
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
    if (state.selectedIndex >= 0 && items[state.selectedIndex]) {
      selectDropdownItem(type, items[state.selectedIndex]);
    }
  } else if (e.key === 'Escape') {
    closeDropdown(type);
  }
}

function highlightDropdownItem(type) {
  const list = dropdownState[type].list;
  if (!list) return;
  const items = list.querySelectorAll('.dropdown-item');
  items.forEach((el, i) => {
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

// ── EVENTS ──
function initEvents() {
  const calcBtn = document.getElementById('calc-btn');
  const liveToggle = document.getElementById('live-toggle');
  const ramSelect = document.getElementById('calc-ram');
  const resolutionSelect = document.getElementById('calc-resolution');
  const usecaseSelect = document.getElementById('calc-usecase');

  calcBtn.addEventListener('click', runCalculation);

  liveToggle.addEventListener('click', () => {
    liveToggle.classList.toggle('active');
    liveUpdate = liveToggle.classList.contains('active');
    if (liveUpdate) runCalculation();
  });

  [ramSelect, resolutionSelect, usecaseSelect].forEach(sel => {
    sel.addEventListener('change', () => { if (liveUpdate) runCalculation(); });
  });
}

function runCalculation() {
  const cpuName = getDropdownValue('cpu');
  const gpuName = getDropdownValue('gpu');
  const ram = document.getElementById('calc-ram').value;
  const resolution = document.getElementById('calc-resolution').value;
  const workloadName = getDropdownValue('workload');
  const useCase = document.getElementById('calc-usecase').value;

  if (!cpuName || !gpuName || !workloadName) {
    return;
  }

  const result = calculateBottleneck(cpuName, gpuName, ram, resolution, workloadName, useCase);
  displayResults(result);
}

// ── DISPLAY RESULTS ──
function displayResults(data) {
  const emptyState = document.getElementById('empty-state');
  const resultsPanel = document.getElementById('results-panel');

  emptyState.style.display = 'none';
  resultsPanel.style.display = 'block';

  // Percent & badge
  const percentEl = document.getElementById('result-percent');
  const badgeEl = document.getElementById('result-badge');
  const barEl = document.getElementById('result-bar');

  animateNumber(percentEl, data.bottleneckPercent, '%');
  percentEl.className = `result-percent ${data.badgeClass}`;
  badgeEl.className = `result-badge ${data.badgeClass}`;
  badgeEl.textContent = data.diagnosis;

  setTimeout(() => {
    barEl.style.width = `${data.bottleneckPercent}%`;
    barEl.className = `result-bar-fill ${data.badgeClass}`;
  }, 50);

  // Metrics
  animateNumber(document.getElementById('metric-fps'), data.fps, '');
  animateNumber(document.getElementById('metric-low'), data.lowFps, '');
  animateNumber(document.getElementById('metric-gpu-usage'), data.gpuUsage, '%');
  animateNumber(document.getElementById('metric-cpu-usage'), data.cpuUsage, '%');

  // Explanation
  document.getElementById('result-explanation').innerHTML = data.explanation;

  // Resolution impact
  renderResolutionImpact(data.resolutionImpact, data.resolution);

  // Upgrades
  renderUpgrades(data.upgrades);

  // Component details
  renderComponentDetails(data);
}

function renderResolutionImpact(impacts, currentRes) {
  const grid = document.getElementById('resolution-grid');
  grid.innerHTML = '';

  impacts.forEach(impact => {
    const item = document.createElement('div');
    item.className = `resolution-item ${impact.resolution === currentRes ? 'active' : ''}`;

    const bottleneckClass = impact.bottleneck === 'balanced' ? 'balanced' : impact.bottleneck;
    const bottleneckText = impact.bottleneck === 'balanced' ? 'Balanceado' :
                           impact.bottleneck === 'cpu' ? 'CPU Limit' : 'GPU Limit';

    item.innerHTML = `
      <h4>${impact.label}</h4>
      <div class="res-bottleneck ${bottleneckClass}">${impact.percent}%</div>
      <div class="res-label">${bottleneckText}</div>
    `;
    grid.appendChild(item);
  });
}

function renderUpgrades(upgrades) {
  const card = document.getElementById('upgrades-card');
  const list = document.getElementById('upgrades-list');

  if (!upgrades || upgrades.suggestions.length === 0) {
    card.style.display = 'none';
    return;
  }

  card.style.display = 'block';
  list.innerHTML = '';

  upgrades.suggestions.forEach(suggestion => {
    const item = document.createElement('div');
    item.className = 'upgrade-suggestion';

    const specs = suggestion.type === 'CPU'
      ? `${CPU_DATA[suggestion.component]?.cores} cores | ${CPU_DATA[suggestion.component]?.socket}`
      : `${GPU_DATA[suggestion.component]?.vram} GB VRAM | ${GPU_DATA[suggestion.component]?.tdp}W`;

    item.innerHTML = `
      <div class="upgrade-info">
        <span class="upgrade-name">${suggestion.component}</span>
        <span class="upgrade-specs">${specs}</span>
        <span class="upgrade-specs">${suggestion.note}</span>
      </div>
      <span class="upgrade-improvement">${suggestion.improvement}</span>
    `;
    list.appendChild(item);
  });
}

function renderComponentDetails(data) {
  const cpu = CPU_DATA[data.cpuName || getDropdownValue('cpu')];
  const gpu = GPU_DATA[data.gpuName || getDropdownValue('gpu')];

  const cpuDetails = document.getElementById('cpu-details');
  const gpuDetails = document.getElementById('gpu-details');

  if (cpu) {
    cpuDetails.innerHTML = `
      <div class="detail-row"><span>Modelo</span><span>${data.cpuName}</span></div>
      <div class="detail-row"><span>Núcleos / Hilos</span><span>${cpu.cores} / ${cpu.threads}</span></div>
      <div class="detail-row"><span>Arquitectura</span><span>${cpu.arch}</span></div>
      <div class="detail-row"><span>Socket</span><span>${cpu.socket}</span></div>
      <div class="detail-row"><span>TDP</span><span>${cpu.tdp}W</span></div>
      <div class="detail-row"><span>Año</span><span>${cpu.year}</span></div>
      <div class="detail-row"><span>Score Gaming</span><span>${cpu.score}</span></div>
    `;
  }

  if (gpu) {
    gpuDetails.innerHTML = `
      <div class="detail-row"><span>Modelo</span><span>${data.gpuName}</span></div>
      <div class="detail-row"><span>VRAM</span><span>${gpu.vram} GB</span></div>
      <div class="detail-row"><span>Arquitectura</span><span>${gpu.arch}</span></div>
      <div class="detail-row"><span>TDP</span><span>${gpu.tdp}W</span></div>
      <div class="detail-row"><span>Año</span><span>${gpu.year}</span></div>
      <div class="detail-row"><span>Score Gaming</span><span>${gpu.score}</span></div>
    `;
  }
}

function animateNumber(element, target, suffix) {
  const duration = 800;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    element.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── SHARE ──
function shareResult(platform) {
  const cpu = getDropdownValue('cpu');
  const gpu = getDropdownValue('gpu');
  const text = `Analicé el bottleneck de mi ${cpu} + ${gpu} con @BottleneckCalc`;
  const url = window.location.href;

  if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  } else if (platform === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  }
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('Link copiado al portapapeles');
  });
}

// ── MOBILE NAV ──
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.style.display === 'flex';
    links.style.display = isOpen ? 'none' : 'flex';
    if (!isOpen) {
      links.style.position = 'absolute';
      links.style.top = '60px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.flexDirection = 'column';
      links.style.background = 'var(--bg-surface)';
      links.style.padding = '16px';
      links.style.borderBottom = '1px solid var(--border-subtle)';
    }
    toggle.setAttribute('aria-expanded', !isOpen);
  });
}
