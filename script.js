// ============================================
// PC BOTTLENECK CALCULATOR - Premium Edition
// ============================================

// ── CPU DATA (50+ models) ──
// Score: normalized performance index (gaming + productivity blend)
const CPU_DATA = {
  // Intel Core i3
  "Core i3-6100": { score: 18, cores: 2, threads: 4, tier: "budget" },
  "Core i3-7100": { score: 20, cores: 2, threads: 4, tier: "budget" },
  "Core i3-8100": { score: 28, cores: 4, threads: 4, tier: "budget" },
  "Core i3-9100F": { score: 30, cores: 4, threads: 4, tier: "budget" },
  "Core i3-10100F": { score: 35, cores: 4, threads: 8, tier: "budget" },
  "Core i3-12100F": { score: 48, cores: 4, threads: 8, tier: "budget" },
  "Core i3-13100F": { score: 52, cores: 4, threads: 8, tier: "budget" },
  "Core i3-14100F": { score: 55, cores: 4, threads: 8, tier: "budget" },

  // Intel Core i5
  "Core i5-6400": { score: 25, cores: 4, threads: 4, tier: "budget" },
  "Core i5-7400": { score: 28, cores: 4, threads: 4, tier: "budget" },
  "Core i5-8400": { score: 38, cores: 6, threads: 6, tier: "budget" },
  "Core i5-9400F": { score: 42, cores: 6, threads: 6, tier: "budget" },
  "Core i5-10400F": { score: 48, cores: 6, threads: 12, tier: "budget" },
  "Core i5-11400F": { score: 54, cores: 6, threads: 12, tier: "mid" },
  "Core i5-12400F": { score: 65, cores: 6, threads: 12, tier: "mid" },
  "Core i5-13400F": { score: 75, cores: 10, threads: 16, tier: "mid" },
  "Core i5-14400F": { score: 78, cores: 10, threads: 16, tier: "mid" },
  "Core i5-12600K": { score: 78, cores: 10, threads: 16, tier: "high" },
  "Core i5-13600K": { score: 92, cores: 14, threads: 20, tier: "high" },
  "Core i5-14600K": { score: 96, cores: 14, threads: 20, tier: "high" },

  // Intel Core i7
  "Core i7-6700": { score: 32, cores: 4, threads: 8, tier: "budget" },
  "Core i7-7700": { score: 36, cores: 4, threads: 8, tier: "budget" },
  "Core i7-8700": { score: 48, cores: 6, threads: 12, tier: "mid" },
  "Core i7-9700K": { score: 55, cores: 8, threads: 8, tier: "mid" },
  "Core i7-10700K": { score: 65, cores: 8, threads: 16, tier: "mid" },
  "Core i7-11700K": { score: 72, cores: 8, threads: 16, tier: "high" },
  "Core i7-12700K": { score: 88, cores: 12, threads: 20, tier: "high" },
  "Core i7-13700K": { score: 105, cores: 16, threads: 24, tier: "high" },
  "Core i7-14700K": { score: 112, cores: 20, threads: 28, tier: "enthusiast" },

  // Intel Core i9
  "Core i9-9900K": { score: 62, cores: 8, threads: 16, tier: "mid" },
  "Core i9-10900K": { score: 72, cores: 10, threads: 20, tier: "high" },
  "Core i9-11900K": { score: 78, cores: 8, threads: 16, tier: "high" },
  "Core i9-12900K": { score: 98, cores: 16, threads: 24, tier: "enthusiast" },
  "Core i9-13900K": { score: 120, cores: 24, threads: 32, tier: "enthusiast" },
  "Core i9-14900K": { score: 125, cores: 24, threads: 32, tier: "enthusiast" },

  // AMD Ryzen 3
  "Ryzen 3 1200": { score: 15, cores: 4, threads: 4, tier: "budget" },
  "Ryzen 3 2200G": { score: 18, cores: 4, threads: 4, tier: "budget" },
  "Ryzen 3 3100": { score: 32, cores: 4, threads: 8, tier: "budget" },
  "Ryzen 3 3300X": { score: 38, cores: 4, threads: 8, tier: "budget" },
  "Ryzen 3 4100": { score: 30, cores: 4, threads: 8, tier: "budget" },

  // AMD Ryzen 5
  "Ryzen 5 1600": { score: 28, cores: 6, threads: 12, tier: "budget" },
  "Ryzen 5 2600": { score: 35, cores: 6, threads: 12, tier: "budget" },
  "Ryzen 5 3600": { score: 48, cores: 6, threads: 12, tier: "mid" },
  "Ryzen 5 3600X": { score: 52, cores: 6, threads: 12, tier: "mid" },
  "Ryzen 5 5600": { score: 62, cores: 6, threads: 12, tier: "mid" },
  "Ryzen 5 5600X": { score: 68, cores: 6, threads: 12, tier: "mid" },
  "Ryzen 5 7600": { score: 82, cores: 6, threads: 12, tier: "high" },
  "Ryzen 5 7600X": { score: 88, cores: 6, threads: 12, tier: "high" },

  // AMD Ryzen 7
  "Ryzen 7 1700": { score: 32, cores: 8, threads: 16, tier: "budget" },
  "Ryzen 7 2700X": { score: 42, cores: 8, threads: 16, tier: "mid" },
  "Ryzen 7 3700X": { score: 58, cores: 8, threads: 16, tier: "mid" },
  "Ryzen 7 5800X": { score: 75, cores: 8, threads: 16, tier: "high" },
  "Ryzen 7 5800X3D": { score: 85, cores: 8, threads: 16, tier: "high" },
  "Ryzen 7 7700X": { score: 95, cores: 8, threads: 16, tier: "high" },
  "Ryzen 7 7800X3D": { score: 110, cores: 8, threads: 16, tier: "enthusiast" },

  // AMD Ryzen 9
  "Ryzen 9 3900X": { score: 72, cores: 12, threads: 24, tier: "high" },
  "Ryzen 9 5900X": { score: 88, cores: 12, threads: 24, tier: "high" },
  "Ryzen 9 5950X": { score: 98, cores: 16, threads: 32, tier: "enthusiast" },
  "Ryzen 9 7900X": { score: 108, cores: 12, threads: 24, tier: "enthusiast" },
  "Ryzen 9 7950X": { score: 125, cores: 16, threads: 32, tier: "enthusiast" },
  "Ryzen 9 7950X3D": { score: 128, cores: 16, threads: 32, tier: "enthusiast" },
};

// ── GPU DATA (50+ models) ──
const GPU_DATA = {
  // NVIDIA GTX 900 series
  "GTX 950": { score: 15, vram: 2, tier: "budget" },
  "GTX 960": { score: 20, vram: 2, tier: "budget" },
  "GTX 970": { score: 28, vram: 4, tier: "budget" },
  "GTX 980": { score: 35, vram: 4, tier: "budget" },
  "GTX 980 Ti": { score: 42, vram: 6, tier: "mid" },

  // NVIDIA GTX 1000 series
  "GTX 1050": { score: 18, vram: 2, tier: "budget" },
  "GTX 1050 Ti": { score: 22, vram: 4, tier: "budget" },
  "GTX 1060 3GB": { score: 30, vram: 3, tier: "budget" },
  "GTX 1060 6GB": { score: 34, vram: 6, tier: "budget" },
  "GTX 1070": { score: 45, vram: 8, tier: "mid" },
  "GTX 1070 Ti": { score: 50, vram: 8, tier: "mid" },
  "GTX 1080": { score: 55, vram: 8, tier: "mid" },
  "GTX 1080 Ti": { score: 68, vram: 11, tier: "high" },

  // NVIDIA GTX 1600 series
  "GTX 1650": { score: 26, vram: 4, tier: "budget" },
  "GTX 1650 Super": { score: 32, vram: 4, tier: "budget" },
  "GTX 1660": { score: 36, vram: 6, tier: "budget" },
  "GTX 1660 Super": { score: 40, vram: 6, tier: "mid" },
  "GTX 1660 Ti": { score: 42, vram: 6, tier: "mid" },

  // NVIDIA RTX 2000 series
  "RTX 2060": { score: 48, vram: 6, tier: "mid" },
  "RTX 2060 Super": { score: 55, vram: 8, tier: "mid" },
  "RTX 2070": { score: 60, vram: 8, tier: "mid" },
  "RTX 2070 Super": { score: 68, vram: 8, tier: "high" },
  "RTX 2080": { score: 75, vram: 8, tier: "high" },
  "RTX 2080 Super": { score: 80, vram: 8, tier: "high" },
  "RTX 2080 Ti": { score: 92, vram: 11, tier: "enthusiast" },

  // NVIDIA RTX 3000 series
  "RTX 3050": { score: 38, vram: 8, tier: "budget" },
  "RTX 3060": { score: 55, vram: 12, tier: "mid" },
  "RTX 3060 Ti": { score: 68, vram: 8, tier: "mid" },
  "RTX 3070": { score: 78, vram: 8, tier: "high" },
  "RTX 3070 Ti": { score: 85, vram: 8, tier: "high" },
  "RTX 3080": { score: 100, vram: 10, tier: "enthusiast" },
  "RTX 3080 Ti": { score: 110, vram: 12, tier: "enthusiast" },
  "RTX 3090": { score: 115, vram: 24, tier: "enthusiast" },
  "RTX 3090 Ti": { score: 120, vram: 24, tier: "enthusiast" },

  // NVIDIA RTX 4000 series
  "RTX 4060": { score: 62, vram: 8, tier: "mid" },
  "RTX 4060 Ti": { score: 72, vram: 8, tier: "mid" },
  "RTX 4070": { score: 88, vram: 12, tier: "high" },
  "RTX 4070 Super": { score: 95, vram: 12, tier: "high" },
  "RTX 4070 Ti": { score: 105, vram: 12, tier: "enthusiast" },
  "RTX 4070 Ti Super": { score: 112, vram: 16, tier: "enthusiast" },
  "RTX 4080": { score: 125, vram: 16, tier: "enthusiast" },
  "RTX 4080 Super": { score: 130, vram: 16, tier: "enthusiast" },
  "RTX 4090": { score: 155, vram: 24, tier: "enthusiast" },

  // AMD RX 500 series
  "RX 560": { score: 12, vram: 4, tier: "budget" },
  "RX 570": { score: 20, vram: 4, tier: "budget" },
  "RX 580": { score: 26, vram: 8, tier: "budget" },
  "RX 590": { score: 30, vram: 8, tier: "budget" },

  // AMD RX 5000 series
  "RX 5500 XT": { score: 28, vram: 8, tier: "budget" },
  "RX 5600 XT": { score: 42, vram: 6, tier: "mid" },
  "RX 5700": { score: 50, vram: 8, tier: "mid" },
  "RX 5700 XT": { score: 58, vram: 8, tier: "mid" },

  // AMD RX 6000 series
  "RX 6500 XT": { score: 28, vram: 4, tier: "budget" },
  "RX 6600": { score: 45, vram: 8, tier: "mid" },
  "RX 6600 XT": { score: 52, vram: 8, tier: "mid" },
  "RX 6650 XT": { score: 55, vram: 8, tier: "mid" },
  "RX 6700 XT": { score: 68, vram: 12, tier: "high" },
  "RX 6750 XT": { score: 72, vram: 12, tier: "high" },
  "RX 6800": { score: 88, vram: 16, tier: "high" },
  "RX 6800 XT": { score: 100, vram: 16, tier: "enthusiast" },
  "RX 6900 XT": { score: 108, vram: 16, tier: "enthusiast" },
  "RX 6950 XT": { score: 112, vram: 16, tier: "enthusiast" },

  // AMD RX 7000 series
  "RX 7600": { score: 58, vram: 8, tier: "mid" },
  "RX 7600 XT": { score: 62, vram: 16, tier: "mid" },
  "RX 7700 XT": { score: 78, vram: 12, tier: "high" },
  "RX 7800 XT": { score: 90, vram: 16, tier: "high" },
  "RX 7900 XT": { score: 115, vram: 20, tier: "enthusiast" },
  "RX 7900 XTX": { score: 130, vram: 24, tier: "enthusiast" },
};

// ── GAME DATA ──
const GAME_DATA = {
  "CS2": { category: "CPU-bound", cpuWeight: 0.75, baseFps: 330 },
  "Warzone": { category: "CPU-bound", cpuWeight: 0.70, baseFps: 178 },
  "Fortnite": { category: "CPU-bound", cpuWeight: 0.65, baseFps: 232 },
  "Valorant": { category: "CPU-bound", cpuWeight: 0.80, baseFps: 380 },
  "Apex Legends": { category: "Mixed", cpuWeight: 0.55, baseFps: 195 },
  "GTA V": { category: "Mixed", cpuWeight: 0.50, baseFps: 196 },
  "Red Dead Redemption 2": { category: "Mixed", cpuWeight: 0.45, baseFps: 146 },
  "Cyberpunk 2077": { category: "GPU-bound", cpuWeight: 0.25, baseFps: 141 },
  "Alan Wake 2": { category: "GPU-bound", cpuWeight: 0.20, baseFps: 108 },
  "Starfield": { category: "GPU-bound", cpuWeight: 0.30, baseFps: 125 },
  "Hogwarts Legacy": { category: "GPU-bound", cpuWeight: 0.35, baseFps: 135 },
  "Spider-Man 2": { category: "GPU-bound", cpuWeight: 0.30, baseFps: 155 },
};

const RESOLUTION_MULTIPLIERS = {
  "1080p": { cpuScale: 1.0, gpuScale: 1.12 },
  "1440p": { cpuScale: 0.95, gpuScale: 1.0 },
  "4K": { cpuScale: 0.90, gpuScale: 0.66 },
};

const RAM_MULTIPLIERS = {
  "8": { avg: 0.86, low: 0.82 },
  "16": { avg: 1.0, low: 1.0 },
  "32": { avg: 1.02, low: 1.03 },
  "64": { avg: 1.03, low: 1.04 },
};

// ── DOM ELEMENTS ──
const els = {
  cpuSelect: document.getElementById('cpu-select'),
  gpuSelect: document.getElementById('gpu-select'),
  ramSelect: document.getElementById('ram-select'),
  resolutionSelect: document.getElementById('resolution-select'),
  gameSelect: document.getElementById('game-select'),
  calcBtn: document.getElementById('calc-btn'),
  liveToggle: document.getElementById('live-toggle'),
  emptyState: document.getElementById('empty-state'),
  resultsPanel: document.getElementById('results-panel'),
  bottleneckPercent: document.getElementById('bottleneck-percent'),
  bottleneckBadge: document.getElementById('bottleneck-badge'),
  bottleneckBar: document.getElementById('bottleneck-bar'),
  fpsVal: document.getElementById('fps-val'),
  lowVal: document.getElementById('low-val'),
  gpuVal: document.getElementById('gpu-val'),
  explanation: document.getElementById('explanation'),
};

// ── CUSTOM DROPDOWN STATE ──
const dropdownState = {
  cpu: { open: false, filtered: [], selectedIndex: -1 },
  gpu: { open: false, filtered: [], selectedIndex: -1 },
  game: { open: false, filtered: [], selectedIndex: -1 },
};

// ── INITIALIZATION ──
function init() {
  initCustomDropdowns();
  bindEvents();
}

// ── CUSTOM DROPDOWNS ──
function initCustomDropdowns() {
  createCustomDropdown('cpu', Object.keys(CPU_DATA).sort(), 'Select CPU...');
  createCustomDropdown('gpu', Object.keys(GPU_DATA).sort(), 'Select GPU...');
  createCustomDropdown('game', Object.keys(GAME_DATA), 'Select workload...');
}

function createCustomDropdown(type, items, placeholder) {
  const container = document.getElementById(`${type}-select`);
  if (!container) return;

  // Clear and build structure
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
  searchInput.placeholder = 'Type to search...';

  const list = document.createElement('div');
  list.className = 'dropdown-list';

  menu.appendChild(searchInput);
  menu.appendChild(list);
  container.appendChild(trigger);
  container.appendChild(menu);

  // Store items
  dropdownState[type].menu = menu;
  dropdownState[type].list = list;
  dropdownState[type].search = searchInput;
  dropdownState[type].container = container;
  dropdownState[type].filtered = [...items];
  dropdownState[type].allItems = [...items];
  dropdownState[type].placeholder = placeholder;

  // Render list
  renderDropdownList(type, list, items);

  // Events
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown(type);
  });

  searchInput.addEventListener('input', (e) => {
    filterDropdown(type, e.target.value);
  });

  searchInput.addEventListener('keydown', (e) => {
    handleDropdownKeydown(type, e);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      closeDropdown(type);
    }
  });

  // Reposition on scroll
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.addEventListener('scroll', () => {
      if (dropdownState[type].open) {
        const rect = container.getBoundingClientRect();
        menu.style.top = `${rect.bottom + 4}px`;
        menu.style.left = `${rect.left}px`;
      }
    });
  }

  window.addEventListener('resize', () => {
    if (dropdownState[type].open) {
      const rect = container.getBoundingClientRect();
      menu.style.top = `${rect.bottom + 4}px`;
      menu.style.left = `${rect.left}px`;
      menu.style.width = `${rect.width}px`;
    }
  });
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
  const container = state.container;
  const menu = state.menu;
  const isOpen = state.open;

  // Close all others
  Object.keys(dropdownState).forEach(t => {
    if (t !== type) closeDropdown(t);
  });

  if (isOpen) {
    closeDropdown(type);
  } else {
    // Calculate position before showing
    const rect = container.getBoundingClientRect();
    menu.style.top = `${rect.bottom + 4}px`;
    menu.style.left = `${rect.left}px`;
    menu.style.width = `${rect.width}px`;
    menu.style.display = 'flex';
    state.open = true;
    container.classList.add('open');
    state.search.focus();
    container.querySelector('.dropdown-arrow').innerHTML = '&#9652;';
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
  const filtered = query.trim()
    ? items.filter(item => item.toLowerCase().includes(query.toLowerCase()))
    : [...items];
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
    if (i === dropdownState[type].selectedIndex) {
      el.scrollIntoView({ block: 'nearest' });
    }
  });
}

function selectDropdownItem(type, value) {
  const container = document.getElementById(`${type}-select`);
  container.dataset.value = value;
  container.querySelector('.dropdown-text').textContent = value;
  closeDropdown(type);

  if (liveToggleActive()) {
    calculateBottleneck();
  }
}

function getDropdownValue(type) {
  const container = document.getElementById(`${type}-select`);
  return container.dataset.value || '';
}

// ── EVENTS ──
function bindEvents() {
  els.calcBtn.addEventListener('click', calculateBottleneck);

  els.liveToggle.addEventListener('click', () => {
    els.liveToggle.classList.toggle('active');
    if (liveToggleActive()) calculateBottleneck();
  });

  [els.ramSelect, els.resolutionSelect].forEach(sel => {
    sel.addEventListener('change', () => {
      if (liveToggleActive()) calculateBottleneck();
    });
  });
}

function liveToggleActive() {
  return els.liveToggle.classList.contains('active');
}

// ── CALCULATION ENGINE ──
function calculateBottleneck() {
  const cpuName = getDropdownValue('cpu');
  const gpuName = getDropdownValue('gpu');
  const ram = els.ramSelect.value;
  const resolution = els.resolutionSelect.value;
  const gameName = getDropdownValue('game');

  if (!cpuName || !gpuName || !gameName) {
    alert('Please select CPU, GPU, and Game');
    return;
  }

  const cpu = CPU_DATA[cpuName];
  const gpu = GPU_DATA[gpuName];
  const game = GAME_DATA[gameName];
  const resMult = RESOLUTION_MULTIPLIERS[resolution];
  const ramMult = RAM_MULTIPLIERS[ram];

  // Performance scores adjusted for resolution and RAM
  const cpuScore = cpu.score * resMult.cpuScale * ramMult.avg;
  const gpuScore = gpu.score * resMult.gpuScale * ramMult.avg;

  // Determine bottleneck
  const stronger = Math.max(cpuScore, gpuScore);
  const weaker = Math.min(cpuScore, gpuScore);
  const bottleneckPercent = Math.round(((stronger - weaker) / stronger) * 100);

  let diagnosis, badgeClass;
  if (cpuScore < gpuScore * 0.85) {
    diagnosis = 'CPU Bottleneck';
    badgeClass = 'cpu';
  } else if (gpuScore < cpuScore * 0.85) {
    diagnosis = 'GPU Bottleneck';
    badgeClass = 'gpu';
  } else {
    diagnosis = 'Well Balanced';
    badgeClass = 'balanced';
  }

  // Cap for display
  const displayPercent = Math.min(bottleneckPercent, 65);

  // Estimate FPS based on the weaker component
  const baseFps = game.baseFps;
  const cpuFps = baseFps * (cpuScore / 100);
  const gpuFps = baseFps * (gpuScore / 100);
  const finalAvg = Math.round(Math.min(cpuFps, gpuFps));
  const finalLow = Math.round(finalAvg * 0.75);

  // GPU usage estimate
  const gpuUsage = diagnosis === 'GPU Bottleneck'
    ? Math.min(Math.round((gpuScore / cpuScore) * 97), 99)
    : Math.min(Math.round((cpuScore / gpuScore) * 97), 99);

  showResults({
    bottleneckPercent: displayPercent,
    diagnosis,
    badgeClass,
    fps: finalAvg,
    low: finalLow,
    gpuUsage: diagnosis === 'GPU Bottleneck' ? 99 : gpuUsage,
    cpuName,
    gpuName,
    gameName,
    resolution,
  });
}

// ── RESULTS DISPLAY ──
function showResults(data) {
  els.emptyState.style.display = 'none';
  els.resultsPanel.style.display = 'block';

  // Animate bottleneck bar
  setTimeout(() => {
    els.bottleneckBar.style.width = `${data.bottleneckPercent}%`;
    els.bottleneckBar.className = `bottleneck-bar-fill ${data.badgeClass}`;
  }, 50);

  // Animate numbers
  animateNumber(els.bottleneckPercent, data.bottleneckPercent, '%');
  animateNumber(els.fpsVal, data.fps, '');
  animateNumber(els.lowVal, data.low, '');
  animateNumber(els.gpuVal, data.gpuUsage, '%');

  // Badge
  els.bottleneckBadge.className = `bottleneck-badge ${data.badgeClass}`;
  els.bottleneckBadge.textContent = data.diagnosis;
  els.bottleneckPercent.className = `bottleneck-percent ${data.badgeClass}`;

  // Explanation
  const explanations = {
    'CPU Bottleneck': `Your <strong>${data.cpuName}</strong> is limiting your <strong>${data.gpuName}</strong> in <strong>${data.gameName}</strong> at <strong>${data.resolution}</strong>. The CPU can't feed frames to the GPU fast enough. Consider upgrading your processor for better performance.`,
    'GPU Bottleneck': `Your <strong>${data.gpuName}</strong> is the limiting factor with <strong>${data.cpuName}</strong> in <strong>${data.gameName}</strong> at <strong>${data.resolution}</strong>. The GPU is running at full capacity. A stronger graphics card would improve your FPS.`,
    'Well Balanced': `Your <strong>${data.cpuName}</strong> and <strong>${data.gpuName}</strong> are well matched for <strong>${data.gameName}</strong> at <strong>${data.resolution}</strong>. Both components work efficiently together.`,
  };
  els.explanation.innerHTML = explanations[data.diagnosis] || explanations['Well Balanced'];
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

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ── START ──
init();
