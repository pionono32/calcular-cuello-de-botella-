// ============================================
// IA / MACHINE LEARNING BOTTLENECK CALCULATOR
// ============================================

(function() {
  'use strict';

  const CPU_SELECT = document.getElementById('ia-cpu');
  const GPU_SELECT = document.getElementById('ia-gpu');
  const RAM_SELECT = document.getElementById('ia-ram');
  const STORAGE_SELECT = document.getElementById('ia-storage');
  const WORKLOAD_SELECT = document.getElementById('ia-workload');
  const MODEL_SELECT = document.getElementById('ia-model');
  const CALC_BTN = document.getElementById('ia-calc-btn');
  const RESULTS = document.getElementById('ia-results');

  // Populate CPU dropdown
  function populateCPUs() {
    const cpus = Object.keys(CPU_DATA).sort();
    cpus.forEach(name => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      CPU_SELECT.appendChild(opt);
    });
  }

  // Populate GPU dropdown
  function populateGPUs() {
    const gpus = Object.keys(GPU_DATA).sort();
    gpus.forEach(name => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      GPU_SELECT.appendChild(opt);
    });
  }

  // VRAM requirements by model size
  const VRAM_REQ = {
    small: { training: 6, inference: 4, label: 'Pequeno' },
    medium: { training: 12, inference: 8, label: 'Mediano' },
    large: { training: 24, inference: 16, label: 'Grande' },
    xlarge: { training: 48, inference: 24, label: 'Muy Grande' }
  };

  // RAM multipliers for AI workloads
  const RAM_AI_MULTIPLIERS = {
    '16': { factor: 0.75, label: '16 GB', status: 'Insuficiente para IA seria' },
    '32': { factor: 1.0, label: '32 GB', status: 'Minimo recomendado' },
    '64': { factor: 1.08, label: '64 GB', status: 'Ideal para datasets medianos' },
    '128': { factor: 1.12, label: '128 GB', status: 'Excelente para datasets grandes' }
  };

  // Calculate bottleneck for AI
  function calculateAIBottleneck() {
    const cpuName = CPU_SELECT.value;
    const gpuName = GPU_SELECT.value;
    const ram = RAM_SELECT.value;
    const storage = STORAGE_SELECT.value;
    const workload = WORKLOAD_SELECT.value;
    const modelSize = MODEL_SELECT.value;

    if (!cpuName || !gpuName) {
      alert('Selecciona CPU y GPU para continuar.');
      return;
    }

    const cpu = CPU_DATA[cpuName];
    const gpu = GPU_DATA[gpuName];
    const storageInfo = STORAGE_DATA[storage];
    const ramInfo = RAM_AI_MULTIPLIERS[ram];
    const vramReq = VRAM_REQ[modelSize];

    // Base scores
    let cpuScore = cpu.fpsAI;
    let gpuScore = gpu.fpsAI;

    // RAM impact
    const ramFactor = ramInfo.factor;
    cpuScore *= ramFactor;

    // Storage impact on dataset loading
    const storagePenalty = storageInfo.impact.ai.datasetLoadPenalty;
    const storageModelPenalty = storageInfo.impact.ai.modelLoadPenalty;

    // Workload adjustments
    if (workload === 'training') {
      // Training is more GPU and VRAM intensive
      gpuScore *= 1.0;
      cpuScore *= 0.9; // CPU less critical for pure training
    } else if (workload === 'inference') {
      // Inference can be more CPU-bound for preprocessing
      cpuScore *= 1.0;
      gpuScore *= 0.95;
    } else {
      // Mixed
      cpuScore *= 0.95;
      gpuScore *= 0.98;
    }

    // Apply storage penalty to overall throughput
    const storageFactor = 1 - (storagePenalty * 0.3); // Storage affects ~30% of total throughput
    cpuScore *= storageFactor;
    gpuScore *= storageFactor;

    // Determine bottleneck
    const maxScore = Math.max(cpuScore, gpuScore);
    const minScore = Math.min(cpuScore, gpuScore);
    const bottleneckPercent = Math.round(((maxScore - minScore) / maxScore) * 100);

    let bottleneckComponent = '';
    let bottleneckClass = '';
    if (cpuScore < gpuScore * 0.85) {
      bottleneckComponent = 'CPU';
      bottleneckClass = 'cpu';
    } else if (gpuScore < cpuScore * 0.85) {
      bottleneckComponent = 'GPU';
      bottleneckClass = 'gpu';
    } else {
      bottleneckComponent = 'Balanceado';
      bottleneckClass = 'balanced';
    }

    // Warnings
    const warnings = [];

    // VRAM warning
    const requiredVRAM = workload === 'training' ? vramReq.training : vramReq.inference;
    if (gpu.vram < requiredVRAM) {
      warnings.push({
        type: 'danger',
        text: `VRAM insuficiente: tu GPU tiene ${gpu.vram}GB pero se recomiendan ${requiredVRAM}GB para modelos ${vramReq.label} en ${workload === 'training' ? 'entrenamiento' : 'inferencia'}. Considera una GPU con mas VRAM.`
      });
    } else if (gpu.vram < requiredVRAM * 1.5) {
      warnings.push({
        type: 'warn',
        text: `VRAM justa: ${gpu.vram}GB es suficiente pero no deja margen para batches grandes.`
      });
    }

    // RAM warning
    if (parseInt(ram) < 32) {
      warnings.push({
        type: 'danger',
        text: 'RAM insuficiente: 32GB es el minimo recomendado para cargas de IA. Con 16GB experimentaras swapping y ralentizaciones severas.'
      });
    } else if (parseInt(ram) < 64 && modelSize === 'large') {
      warnings.push({
        type: 'warn',
        text: 'Para modelos grandes y datasets extensos, 64GB o mas de RAM del sistema es altamente recomendable.'
      });
    }

    // CUDA warning for AMD GPUs
    if (gpuName.startsWith('RX')) {
      warnings.push({
        type: 'warn',
        text: 'Las GPUs AMD tienen soporte limitado para frameworks de IA. ROCm funciona en Linux pero el ecosistema CUDA de NVIDIA es el estandar.'
      });
    }

    // Storage warning
    if (storage === 'HDD') {
      warnings.push({
        type: 'danger',
        text: 'HDD es extremadamente lento para cargas de IA. Los datasets grandes tardaran minutos en cargar. Un NVMe SSD es practicamente obligatorio.'
      });
    } else if (storage === 'SATA SSD') {
      warnings.push({
        type: 'warn',
        text: 'Un SSD SATA es acceptable pero un NVMe reduce significativamente los tiempos de carga de datasets y checkpoints.'
      });
    }

    // Display results
    displayResults({
      bottleneckPercent,
      bottleneckComponent,
      bottleneckClass,
      cpuScore: Math.round(cpuScore),
      gpuScore: Math.round(gpuScore),
      vram: gpu.vram,
      ram,
      warnings,
      cpuName,
      gpuName,
      workload,
      modelSize,
      storageFactor
    });
  }

  function displayResults(data) {
    RESULTS.style.display = 'block';

    // Percent and badge
    const percentEl = document.getElementById('ia-percent');
    const badgeEl = document.getElementById('ia-badge');
    const barEl = document.getElementById('ia-bar');

    percentEl.textContent = data.bottleneckPercent + '%';
    percentEl.className = 'result-percent ' + data.bottleneckClass;

    let badgeText = '';
    if (data.bottleneckPercent < 15) badgeText = 'Bien Balanceado';
    else if (data.bottleneckPercent < 30) badgeText = 'Bottleneck Leve';
    else if (data.bottleneckPercent < 50) badgeText = 'Bottleneck Moderado';
    else badgeText = 'Bottleneck Severo';

    badgeEl.textContent = badgeText;
    badgeEl.className = 'result-badge ' + data.bottleneckClass;

    barEl.style.width = Math.min(data.bottleneckPercent, 100) + '%';
    barEl.className = 'result-bar-fill ' + data.bottleneckClass;

    // Metrics
    document.getElementById('ia-score-cpu').textContent = data.cpuScore;
    document.getElementById('ia-score-gpu').textContent = data.gpuScore;
    document.getElementById('ia-vram').textContent = data.vram + ' GB';
    document.getElementById('ia-bottleneck-comp').textContent = data.bottleneckComponent;

    // Warnings
    const warningsEl = document.getElementById('ia-warnings');
    warningsEl.innerHTML = '';
    data.warnings.forEach(w => {
      const div = document.createElement('div');
      div.style.cssText = 'padding:12px 16px;border-radius:8px;margin-bottom:8px;font-size:14px;line-height:1.5;';
      if (w.type === 'danger') {
        div.style.background = 'var(--danger-dim)';
        div.style.color = 'var(--danger)';
        div.style.border = '1px solid rgba(226,77,77,0.2)';
      } else {
        div.style.background = 'var(--warn-dim)';
        div.style.color = 'var(--warn)';
        div.style.border = '1px solid rgba(229,162,58,0.2)';
      }
      div.textContent = w.text;
      warningsEl.appendChild(div);
    });

    // Explanation
    const explanationEl = document.getElementById('ia-explanation');
    let explanation = `<strong>Analisis para ${data.workload === 'training' ? 'entrenamiento' : data.workload === 'inference' ? 'inferencia' : 'carga mixta'} de IA:</strong><br><br>`;

    if (data.bottleneckComponent === 'CPU') {
      explanation += `Tu <strong>${data.cpuName}</strong> esta limitando el rendimiento de IA. El CPU maneja el preprocesamiento de datos, DataLoader y operaciones secuenciales. `;
      explanation += `Considera un upgrade a un procesador con mas cores/threads como un <strong>Ryzen 9</strong> o <strong>Core i9</strong>. `;
    } else if (data.bottleneckComponent === 'GPU') {
      explanation += `Tu <strong>${data.gpuName}</strong> es el componente limitante. Para cargas de IA, la GPU realiza el grueso del computo. `;
      if (data.gpuName.startsWith('RX')) {
        explanation += `Ademas, las GPUs AMD tienen soporte limitado en frameworks de IA. `;
      }
      explanation += `Considera una GPU NVIDIA con mas VRAM y mejor soporte CUDA. `;
    } else {
      explanation += `Tu configuracion esta <strong>bien balanceada</strong> para cargas de IA. Tanto el CPU como la GPU trabajan en armonia. `;
    }

    explanation += `<br><br>El almacenamiento <strong>${STORAGE_DATA[data.storage]?.label || data.storage}</strong> `;
    if (data.storage === 'HDD') {
      explanation += `esta causando penalizaciones severas en la carga de datasets y modelos. `;
    } else if (data.storage === 'SATA SSD') {
      explanation += `es aceptable pero un NVMe mejoraria los tiempos de carga. `;
    } else {
      explanation += `no es un cuello de botella significativo. `;
    }

    explanationEl.innerHTML = explanation;

    // Upgrades
    const upgradesEl = document.getElementById('ia-upgrades');
    let upgradesHTML = '<h4>Recomendaciones de Upgrade</h4>';

    if (data.bottleneckComponent === 'CPU' || data.cpuScore < 150) {
      upgradesHTML += '<div class="upgrade-item"><span class="upgrade-name">Upgrade CPU</span></div>';
      upgradesHTML += '<div class="upgrade-note">Ryzen 9 7950X, Core i9-14900K, o Ryzen 9 9950X para mejor preprocesamiento.</div>';
    }
    if (data.bottleneckComponent === 'GPU' || data.gpuScore < 150) {
      upgradesHTML += '<div class="upgrade-item"><span class="upgrade-name">Upgrade GPU</span></div>';
      if (parseInt(data.ram) >= 32) {
        upgradesHTML += '<div class="upgrade-note">RTX 4070 Ti Super (16GB), RTX 4080 Super (16GB), o RTX 4090 (24GB) para entrenamiento.</div>';
      } else {
        upgradesHTML += '<div class="upgrade-note">Primero aumenta la RAM a 32GB+, luego considera RTX 4070+.</div>';
      }
    }
    if (parseInt(data.ram) < 32) {
      upgradesHTML += '<div class="upgrade-item"><span class="upgrade-name">Aumentar RAM</span></div>';
      upgradesHTML += '<div class="upgrade-note">Minimo 32GB, ideal 64GB para datasets grandes. La RAM del sistema es critica para IA.</div>';
    }
    if (data.storage === 'HDD' || data.storage === 'SATA SSD') {
      upgradesHTML += '<div class="upgrade-item"><span class="upgrade-name">Upgrade Almacenamiento</span></div>';
      upgradesHTML += '<div class="upgrade-note">Un NVMe Gen3/Gen4 reduce drasticamente los tiempos de carga de datasets y checkpoints.</div>';
    }

    upgradesEl.innerHTML = upgradesHTML;

    // Scroll to results
    RESULTS.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Init
  populateCPUs();
  populateGPUs();

  CALC_BTN.addEventListener('click', calculateAIBottleneck);

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navLinks.style.display = expanded ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '60px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'var(--bg-surface)';
      navLinks.style.padding = '16px 24px';
      navLinks.style.borderBottom = '1px solid var(--border-subtle)';
    });
  }
})();
