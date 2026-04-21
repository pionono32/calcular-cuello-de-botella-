// ============================================
// HOME PAGE - Quick Calculator
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initHomeCalculator();
  initMobileNav();
});

function initHomeCalculator() {
  const cpuSelect = document.getElementById('home-cpu');
  const gpuSelect = document.getElementById('home-gpu');
  const workloadSelect = document.getElementById('home-workload');
  const calcBtn = document.getElementById('home-calc-btn');

  if (!cpuSelect || !gpuSelect || !workloadSelect) return;

  // Populate CPU dropdown
  const cpus = Object.keys(CPU_DATA).sort();
  cpus.forEach(cpu => {
    const option = document.createElement('option');
    option.value = cpu;
    option.textContent = cpu;
    cpuSelect.appendChild(option);
  });

  // Populate GPU dropdown
  const gpus = Object.keys(GPU_DATA).sort();
  gpus.forEach(gpu => {
    const option = document.createElement('option');
    option.value = gpu;
    option.textContent = gpu;
    gpuSelect.appendChild(option);
  });

  // Populate workload dropdown
  const workloads = Object.keys(WORKLOAD_DATA);
  workloads.forEach(workload => {
    const option = document.createElement('option');
    option.value = workload;
    option.textContent = workload;
    workloadSelect.appendChild(option);
  });

  // Calculate button
  calcBtn.addEventListener('click', function() {
    const cpu = cpuSelect.value;
    const gpu = gpuSelect.value;
    const ram = document.getElementById('home-ram').value;
    const resolution = document.getElementById('home-resolution').value;
    const workload = workloadSelect.value;
    const useCase = document.getElementById('home-usecase').value;

    if (!cpu || !gpu || !workload) {
      alert('Por favor selecciona CPU, GPU y juego/uso');
      return;
    }

    const result = calculateBottleneck(cpu, gpu, ram, resolution, workload, useCase);
    displayHomeResults(result);
  });
}

function displayHomeResults(data) {
  const resultsPanel = document.getElementById('home-results');
  const percentEl = document.getElementById('home-percent');
  const badgeEl = document.getElementById('home-badge');
  const barEl = document.getElementById('home-bar');
  const fpsEl = document.getElementById('home-fps');
  const gpuUsageEl = document.getElementById('home-gpu-usage');
  const cpuUsageEl = document.getElementById('home-cpu-usage');
  const explanationEl = document.getElementById('home-explanation');
  const upgradesEl = document.getElementById('home-upgrades');

  resultsPanel.style.display = 'block';
  resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

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

  // Metrics
  animateNumber(fpsEl, data.fps, '');
  animateNumber(gpuUsageEl, data.gpuUsage, '%');
  animateNumber(cpuUsageEl, data.cpuUsage, '%');

  // Explanation
  explanationEl.innerHTML = data.explanation;

  // Upgrades
  if (data.upgrades && data.upgrades.suggestions.length > 0) {
    let upgradesHTML = `<h4>${data.upgrades.message}</h4>`;
    data.upgrades.suggestions.forEach(suggestion => {
      upgradesHTML += `
        <div class="upgrade-item">
          <div>
            <span class="upgrade-name">${suggestion.component}</span>
            <div class="upgrade-note">${suggestion.note}</div>
          </div>
          <span class="upgrade-improvement">${suggestion.improvement}</span>
        </div>
      `;
    });
    upgradesEl.innerHTML = upgradesHTML;
    upgradesEl.style.display = 'block';
  } else {
    upgradesEl.style.display = 'none';
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

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  
  if (!toggle || !links) return;
  
  toggle.addEventListener('click', () => {
    const isOpen = links.style.display === 'flex';
    links.style.display = isOpen ? 'none' : 'flex';
    links.style.position = 'absolute';
    links.style.top = '60px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.flexDirection = 'column';
    links.style.background = 'var(--bg-surface)';
    links.style.padding = '16px';
    links.style.borderBottom = '1px solid var(--border-subtle)';
    toggle.setAttribute('aria-expanded', !isOpen);
  });
}
