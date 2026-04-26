// ============================================
// HOME PAGE - Contextual Bottleneck Calculator
// ============================================

const USE_CASE_CONFIG = {
  gaming: {
    icon: '🎮',
    label: 'Gaming',
    primaryFactor: 'GPU',
    insight: 'La <strong>GPU</strong> es el componente más crítico en gaming. A 1440p/4K el bottleneck casi siempre es la tarjeta gráfica.',
    insightClass: 'usecase-insight-gaming',
    workloadTypes: ['gaming'],
    metric1Label: 'FPS Estimado',
    metric2Label: 'Uso GPU',
    metric3Label: 'Uso CPU',
    metric2IsKey: true,
    calloutTemplate: (data) => {
      const isGPUBottleneck = data.badgeClass === 'gpu';
      const isCPUBottleneck = data.badgeClass === 'cpu';
      if (isGPUBottleneck) {
        return `<strong>GPU es el cuello de botella.</strong> Upgrading la GPU tendrá el mayor impacto en tus FPS. El CPU tiene capacidad sobrante.`;
      } else if (isCPUBottleneck) {
        return `<strong>CPU es el cuello de botella.</strong> La GPU tiene potencial sin usar. Considera cambiar a un juego menos CPU-bound o upgrading el procesador.`;
      }
      return `<strong>Sistema bien balanceado para gaming.</strong> CPU y GPU trabajan en equilibrio óptimo.`;
    }
  },
  ia: {
    icon: '🧠',
    label: 'IA / Machine Learning',
    primaryFactor: 'VRAM + RAM',
    insight: 'Para IA, la <strong>VRAM</strong> y <strong>RAM del sistema</strong> son los factores más críticos. Sin suficiente VRAM los modelos no cargan.',
    insightClass: 'usecase-insight-ia',
    workloadTypes: ['productivity'],
    metric1Label: 'Score CPU',
    metric2Label: 'Score GPU',
    metric3Label: 'VRAM GPU',
    metric2IsKey: true,
    calloutTemplate: (data) => {
      const gpuVram = data.gpuVram || 0;
      const ram = parseInt(data.ram) || 16;
      const vramOk = gpuVram >= 16;
      const ramOk = ram >= 32;
      if (!vramOk && !ramOk) {
        return `<strong>VRAM y RAM insuficientes para IA seria.</strong> Necesitas al menos 16GB VRAM y 32GB RAM para entrenar modelos modernos.`;
      } else if (!vramOk) {
        return `<strong>VRAM limitada (${gpuVram}GB).</strong> Para entrenamiento de modelos grandes necesitas 16GB+ VRAM. Considera RTX 4070 Ti Super o RTX 4080.`;
      } else if (!ramOk) {
        return `<strong>RAM insuficiente para IA (${ram}GB).</strong> Con menos de 32GB experimentarás swapping severo al cargar datasets grandes.`;
      }
      return `<strong>Configuración apta para IA.</strong> VRAM y RAM adecuadas. Verifica compatibilidad CUDA para máximo rendimiento.`;
    }
  },
  editing: {
    icon: '🎬',
    label: 'Edición de Video',
    primaryFactor: 'CPU',
    insight: 'En edición de video el <strong>CPU</strong> lidera exportación y codificación. Más núcleos = renders más rápidos. La GPU ayuda con aceleración por hardware.',
    insightClass: 'usecase-insight-editing',
    workloadTypes: ['productivity'],
    metric1Label: 'Score Render',
    metric2Label: 'Uso GPU',
    metric3Label: 'Uso CPU',
    metric3IsKey: true,
    calloutTemplate: (data) => {
      const isCPUBottleneck = data.badgeClass === 'cpu';
      const isGPUBottleneck = data.badgeClass === 'gpu';
      if (isCPUBottleneck) {
        return `<strong>CPU es el cuello de botella para edición.</strong> Un procesador con más núcleos/threads reducirá significativamente los tiempos de exportación.`;
      } else if (isGPUBottleneck) {
        return `<strong>GPU limita la aceleración por hardware.</strong> Una GPU más potente acelera efectos, color grading y proxy en Premiere/DaVinci.`;
      }
      return `<strong>Sistema balanceado para edición de video.</strong> CPU y GPU están bien equilibrados para flujos de trabajo creativos.`;
    }
  },
  streaming: {
    icon: '📡',
    label: 'Gaming + Streaming',
    primaryFactor: 'CPU',
    insight: 'Con codificación x264 el <strong>CPU</strong> es crítico. Con NVENC la GPU se encarga del encoding y el CPU queda libre para el juego.',
    insightClass: 'usecase-insight-streaming',
    workloadTypes: ['gaming', 'productivity'],
    metric1Label: 'FPS en Juego',
    metric2Label: 'Uso GPU',
    metric3Label: 'Uso CPU',
    calloutTemplate: (data) => {
      const isCPUBottleneck = data.badgeClass === 'cpu';
      if (isCPUBottleneck) {
        return `<strong>CPU es el cuello de botella para streaming.</strong> Con x264 el CPU está al límite. Usa NVENC si tienes NVIDIA para liberar el procesador.`;
      }
      return `<strong>Configuración adecuada para streaming.</strong> Considera NVENC (NVIDIA) o AV1 (RTX 4000+) para mejor calidad con menor carga en CPU.`;
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  initHomeCalculator();
  initMobileNav();
});

function initHomeCalculator() {
  const cpuSelect = document.getElementById('home-cpu');
  const gpuSelect = document.getElementById('home-gpu');
  const useCaseSelect = document.getElementById('home-usecase');
  const workloadSelect = document.getElementById('home-workload');
  const calcBtn = document.getElementById('home-calc-btn');

  if (!cpuSelect || !gpuSelect || !workloadSelect) return;

  // Populate CPU dropdown
  Object.keys(CPU_DATA).sort().forEach(cpu => {
    const opt = document.createElement('option');
    opt.value = cpu;
    opt.textContent = cpu;
    cpuSelect.appendChild(opt);
  });

  // Populate GPU dropdown
  Object.keys(GPU_DATA).sort().forEach(gpu => {
    const opt = document.createElement('option');
    opt.value = gpu;
    opt.textContent = gpu;
    gpuSelect.appendChild(opt);
  });

  // Populate workloads for initial use case
  populateWorkloads('gaming');

  // Use case change → update insight + workloads
  useCaseSelect.addEventListener('change', function() {
    const useCase = this.value;
    updateUseCaseInsight(useCase);
    populateWorkloads(useCase);
    // Hide results when use case changes
    document.getElementById('home-results').style.display = 'none';
  });

  calcBtn.addEventListener('click', function() {
    const cpu = cpuSelect.value;
    const gpu = gpuSelect.value;
    const ram = document.getElementById('home-ram').value;
    const resolution = document.getElementById('home-resolution').value;
    const workload = workloadSelect.value;
    const useCase = useCaseSelect.value;

    if (!cpu || !gpu || !workload) {
      alert('Por favor selecciona CPU, GPU y un juego/aplicación');
      return;
    }

    const result = calculateBottleneck(cpu, gpu, ram, resolution, workload, useCase);
    displayHomeResults(result, useCase, gpu);
  });
}

function populateWorkloads(useCase) {
  const workloadSelect = document.getElementById('home-workload');
  const config = USE_CASE_CONFIG[useCase] || USE_CASE_CONFIG.gaming;

  workloadSelect.innerHTML = '<option value="">Selecciona...</option>';

  Object.entries(WORKLOAD_DATA).forEach(([name, data]) => {
    const matchesType = config.workloadTypes.includes(data.type);
    if (matchesType) {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      workloadSelect.appendChild(opt);
    }
  });
}

function updateUseCaseInsight(useCase) {
  const config = USE_CASE_CONFIG[useCase] || USE_CASE_CONFIG.gaming;
  const banner = document.getElementById('usecase-insight');
  if (!banner) return;

  banner.className = `usecase-insight-banner ${config.insightClass}`;
  banner.innerHTML = `<span class="insight-icon" aria-hidden="true">${config.icon}</span><div><strong>${config.label}:</strong> ${config.insight}</div>`;

  // Update metric labels
  const fps = document.getElementById('home-fps-label');
  const gpuLbl = document.getElementById('home-gpu-label');
  const cpuLbl = document.getElementById('home-cpu-label');
  if (fps) fps.textContent = config.metric1Label;
  if (gpuLbl) gpuLbl.textContent = config.metric2Label;
  if (cpuLbl) cpuLbl.textContent = config.metric3Label;
}

function displayHomeResults(data, useCase, gpuName) {
  const resultsPanel = document.getElementById('home-results');
  const percentEl = document.getElementById('home-percent');
  const badgeEl = document.getElementById('home-badge');
  const barEl = document.getElementById('home-bar');
  const fpsEl = document.getElementById('home-fps');
  const gpuUsageEl = document.getElementById('home-gpu-usage');
  const cpuUsageEl = document.getElementById('home-cpu-usage');
  const explanationEl = document.getElementById('home-explanation');
  const upgradesEl = document.getElementById('home-upgrades');
  const calloutEl = document.getElementById('home-primary-callout');

  resultsPanel.style.display = 'block';
  resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  const config = USE_CASE_CONFIG[useCase] || USE_CASE_CONFIG.gaming;

  // Animate percent
  animateNumber(percentEl, data.bottleneckPercent, '%');
  percentEl.className = `result-percent ${data.badgeClass}`;

  // Badge
  badgeEl.className = `result-badge ${data.badgeClass}`;
  badgeEl.textContent = data.diagnosis;

  // Bar
  setTimeout(() => {
    barEl.style.width = `${data.bottleneckPercent}%`;
    barEl.className = `result-bar-fill ${data.badgeClass}`;
  }, 50);

  // Use-case-specific metric values
  const gpuData = GPU_DATA[gpuName];
  const gpuVram = gpuData ? gpuData.vram : 0;
  const ram = document.getElementById('home-ram').value;

  if (useCase === 'ia') {
    animateNumber(fpsEl, data.cpuUsage, '');
    animateNumber(gpuUsageEl, data.gpuUsage, '');
    fpsEl.textContent = data.cpuThroughput || '--';
    gpuUsageEl.textContent = data.gpuThroughput || '--';
    cpuUsageEl.textContent = `${gpuVram}GB`;
  } else {
    animateNumber(fpsEl, data.fps, '');
    animateNumber(gpuUsageEl, data.gpuUsage, '%');
    animateNumber(cpuUsageEl, data.cpuUsage, '%');
  }

  // Update metric labels for current use case
  const fpsLabel = document.getElementById('home-fps-label');
  const gpuLabel = document.getElementById('home-gpu-label');
  const cpuLabel = document.getElementById('home-cpu-label');
  if (fpsLabel) fpsLabel.textContent = config.metric1Label;
  if (gpuLabel) gpuLabel.textContent = config.metric2Label;
  if (cpuLabel) cpuLabel.textContent = config.metric3Label;

  // Primary bottleneck callout
  if (calloutEl) {
    const calloutText = config.calloutTemplate({ ...data, gpuVram, ram });
    calloutEl.innerHTML = calloutText;
    calloutEl.style.display = 'block';

    // Style callout based on bottleneck type
    calloutEl.className = 'primary-bottleneck-callout';
    if (data.badgeClass === 'gpu') calloutEl.classList.add('callout-gpu');
    else if (data.badgeClass === 'cpu') calloutEl.classList.add('callout-cpu');
    else calloutEl.classList.add('callout-balanced');
  }

  // Explanation
  if (explanationEl) explanationEl.innerHTML = data.explanation;

  // Upgrades
  if (upgradesEl) {
    if (data.upgrades && data.upgrades.suggestions && data.upgrades.suggestions.length > 0) {
      let html = `<h4>${data.upgrades.message}</h4>`;
      data.upgrades.suggestions.forEach(s => {
        html += `<div class="upgrade-item">
          <div><span class="upgrade-name">${s.component}</span><div class="upgrade-note">${s.note}</div></div>
          <span class="upgrade-improvement">${s.improvement}</span>
        </div>`;
      });
      upgradesEl.innerHTML = html;
      upgradesEl.style.display = 'block';
    } else {
      upgradesEl.style.display = 'none';
    }
  }
}

function animateNumber(element, target, suffix) {
  const duration = 800;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    element.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isOpen);
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
      links.style.zIndex = '99';
    }
  });
}
