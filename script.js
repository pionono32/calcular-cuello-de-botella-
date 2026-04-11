// Datos del modelo (simplificado de tu versión original)
const MODEL = {
  cpus: {
    "Ryzen 5 5600": { vendor: "AMD", cores: 6, cpuFactor: 0.92, lowFactor: 0.9, cacheClass: "standard", cacheBonus: 0.02, ryzenMemorySensitivity: 1, confidence: "high" },
    "Ryzen 5 5600X": { vendor: "AMD", cores: 6, cpuFactor: 0.95, lowFactor: 0.92, cacheClass: "standard", cacheBonus: 0.03, ryzenMemorySensitivity: 0.98, confidence: "high" },
    "Ryzen 7 5800X3D": { vendor: "AMD", cores: 8, cpuFactor: 1.08, lowFactor: 1.08, cacheClass: "x3d", cacheBonus: 0.12, ryzenMemorySensitivity: 0.65, confidence: "high" },
    "Ryzen 5 7600": { vendor: "AMD", cores: 6, cpuFactor: 1.04, lowFactor: 1.01, cacheClass: "standard", cacheBonus: 0.04, ryzenMemorySensitivity: 0.7, confidence: "high" },
    "Ryzen 7 7800X3D": { vendor: "AMD", cores: 8, cpuFactor: 1.16, lowFactor: 1.16, cacheClass: "x3d", cacheBonus: 0.16, ryzenMemorySensitivity: 0.55, confidence: "high" },
    "Core i5-12400F": { vendor: "Intel", cores: 6, cpuFactor: 0.9, lowFactor: 0.87, cacheClass: "standard", cacheBonus: 0.01, ryzenMemorySensitivity: 0.45, confidence: "high" },
    "Core i5-13600K": { vendor: "Intel", cores: 14, cpuFactor: 1.08, lowFactor: 1.06, cacheClass: "standard", cacheBonus: 0.04, ryzenMemorySensitivity: 0.35, confidence: "high" },
    "Core i7-13700K": { vendor: "Intel", cores: 16, cpuFactor: 1.1, lowFactor: 1.08, cacheClass: "standard", cacheBonus: 0.05, ryzenMemorySensitivity: 0.32, confidence: "high" },
  },
  gpus: {
    "RTX 3060": { gpuFactor: 0.72, lowFactor: 0.71, saturationBias: 4, confidence: "high" },
    "RTX 3060 Ti": { gpuFactor: 0.8, lowFactor: 0.78, saturationBias: 3, confidence: "high" },
    "RTX 3080": { gpuFactor: 1, lowFactor: 1, saturationBias: 0, confidence: "high" },
    "RTX 4070": { gpuFactor: 1, lowFactor: 0.98, saturationBias: 0, confidence: "high" },
    "RTX 4070 Super": { gpuFactor: 1.08, lowFactor: 1.07, saturationBias: -1, confidence: "high" },
    "RTX 4080 Super": { gpuFactor: 1.24, lowFactor: 1.22, saturationBias: -4, confidence: "medium" },
    "RTX 4090": { gpuFactor: 1.38, lowFactor: 1.35, saturationBias: -7, confidence: "medium" },
    "RX 6700 XT": { gpuFactor: 0.84, lowFactor: 0.82, saturationBias: 2, confidence: "high" },
    "RX 6800 XT": { gpuFactor: 1.02, lowFactor: 1, saturationBias: 0, confidence: "medium" },
    "RX 7800 XT": { gpuFactor: 1.04, lowFactor: 1.02, saturationBias: 0, confidence: "medium" },
  },
  games: {
    "CS2": { category: "CPU-bound", confidence: "high", x3dWeight: 1, ramWeight: 1, presets: {
      competitive: { cpuBaseline: { avg: 330, low1: 210, gpuUsage: 74 }, gpuBaseline: { avg: 290, low1: 210, gpuUsage: 97 }, cpuClamp: { min: 120, max: 520 }, gpuClamp: { min: 110, max: 420 } },
      ultra: { cpuBaseline: { avg: 285, low1: 190, gpuUsage: 80 }, gpuBaseline: { avg: 240, low1: 175, gpuUsage: 98 }, cpuClamp: { min: 100, max: 440 }, gpuClamp: { min: 90, max: 340 } }
    }},
    "Cyberpunk 2077": { category: "GPU-bound", confidence: "high", x3dWeight: 0.35, ramWeight: 0.35, presets: {
      competitive: { cpuBaseline: { avg: 141, low1: 105, gpuUsage: 89 }, gpuBaseline: { avg: 118, low1: 90, gpuUsage: 98 }, cpuClamp: { min: 65, max: 180 }, gpuClamp: { min: 45, max: 150 } },
      ultra: { cpuBaseline: { avg: 117, low1: 88, gpuUsage: 92 }, gpuBaseline: { avg: 86, low1: 67, gpuUsage: 99 }, cpuClamp: { min: 52, max: 145 }, gpuClamp: { min: 32, max: 110 } }
    }},
    "Warzone": { category: "CPU-bound", confidence: "medium", x3dWeight: 0.95, ramWeight: 0.9, presets: {
      competitive: { cpuBaseline: { avg: 178, low1: 128, gpuUsage: 81 }, gpuBaseline: { avg: 168, low1: 122, gpuUsage: 98 }, cpuClamp: { min: 70, max: 210 }, gpuClamp: { min: 65, max: 195 } },
      ultra: { cpuBaseline: { avg: 154, low1: 108, gpuUsage: 86 }, gpuBaseline: { avg: 129, low1: 94, gpuUsage: 99 }, cpuClamp: { min: 60, max: 180 }, gpuClamp: { min: 52, max: 155 } }
    }},
  },
  ram: {
    capacity: { "8 GB": { avgModifier: -0.14, lowModifier: -0.18 }, "16 GB": { avgModifier: 0, lowModifier: 0 }, "32 GB": { avgModifier: 0.02, lowModifier: 0.03 } },
    speed: { "2666 MHz": { baseModifier: -0.05 }, "3000 MHz": { baseModifier: -0.02 }, "3200 MHz": { baseModifier: 0 }, "3600 MHz": { baseModifier: 0.03 } },
    channel: { "Single channel": { avgModifier: -0.09, lowModifier: -0.12 }, "Dual channel": { avgModifier: 0, lowModifier: 0 } }
  },
  resolutions: {
    "1080p": { cpuScale: 1, gpuScale: 1.12, usageDelta: -8 },
    "1440p": { cpuScale: 0.95, gpuScale: 1, usageDelta: 0 },
    "4K": { cpuScale: 0.9, gpuScale: 0.66, usageDelta: 10 }
  }
};

// Estado
const state = {
  preset: "competitive",
  chatOpen: false
};

// Elementos DOM
const elements = {
  cpuSelect: document.getElementById('cpu-select'),
  gpuSelect: document.getElementById('gpu-select'),
  gameSelect: document.getElementById('game-select'),
  resolutionSelect: document.getElementById('resolution-select'),
  ramCapacitySelect: document.getElementById('ram-capacity-select'),
  ramSpeedSelect: document.getElementById('ram-speed-select'),
  ramChannelSelect: document.getElementById('ram-channel-select'),
  compareCpuA: document.getElementById('compare-cpu-a'),
  compareCpuB: document.getElementById('compare-cpu-b'),
  presetButtons: document.querySelectorAll('.preset-btn'),
  resultCard: document.getElementById('result-card'),
  scoreRing: document.getElementById('score-progress'),
  gameScore: document.getElementById('game-score'),
  diagnosisTitle: document.getElementById('diagnosis-title'),
  diagnosisDesc: document.getElementById('diagnosis-desc'),
  avgFps: document.getElementById('avg-fps'),
  lowFps: document.getElementById('low-fps'),
  gpuUsage: document.getElementById('gpu-usage'),
  fpsRange: document.getElementById('fps-range'),
  avgBar: document.getElementById('avg-bar'),
  lowBar: document.getElementById('low-bar'),
  usageBar: document.getElementById('usage-bar'),
  explanationText: document.getElementById('explanation-text'),
  chatTrigger: document.getElementById('chat-trigger'),
  chatWindow: document.getElementById('chat-window'),
  chatClose: document.getElementById('chat-close'),
  chatInput: document.getElementById('chat-input'),
  chatSend: document.getElementById('chat-send'),
  chatMessages: document.getElementById('chat-messages')
};

// Inicialización
function init() {
  populateSelects();
  attachEvents();
  calculateAndRender();
  initChat();
  
  // Mostrar notificación del chat después de 3 segundos
  setTimeout(() => {
    document.getElementById('chat-notification').style.display = 'flex';
  }, 3000);
}

function populateSelects() {
  const cpus = Object.keys(MODEL.cpus).sort();
  const gpus = Object.keys(MODEL.gpus).sort();
  const games = Object.keys(MODEL.games);
  const resolutions = Object.keys(MODEL.resolutions);
  const capacities = Object.keys(MODEL.ram.capacity);
  const speeds = Object.keys(MODEL.ram.speed);
  const channels = Object.keys(MODEL.ram.channel);

  fillSelect(elements.cpuSelect, cpus, 'Ryzen 5 5600X');
  fillSelect(elements.gpuSelect, gpus, 'RTX 3080');
  fillSelect(elements.gameSelect, games, 'Cyberpunk 2077');
  fillSelect(elements.resolutionSelect, resolutions, '1440p');
  fillSelect(elements.ramCapacitySelect, capacities, '16 GB');
  fillSelect(elements.ramSpeedSelect, speeds, '3200 MHz');
  fillSelect(elements.ramChannelSelect, channels, 'Dual channel');
  
  fillSelect(elements.compareCpuA, cpus, 'Ryzen 5 5600');
  fillSelect(elements.compareCpuB, cpus, 'Ryzen 7 5800X3D');
}

function fillSelect(select, options, defaultValue) {
  select.innerHTML = options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
  if (defaultValue && options.includes(defaultValue)) {
    select.value = defaultValue;
  }
}

function attachEvents() {
  // Preset buttons
  elements.presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.preset = btn.dataset.preset;
      calculateAndRender();
    });
  });

  // Selects
  ['cpuSelect', 'gpuSelect', 'gameSelect', 'resolutionSelect', 'ramCapacitySelect', 'ramSpeedSelect', 'ramChannelSelect'].forEach(id => {
    elements[id].addEventListener('change', calculateAndRender);
  });

  // Comparación
  elements.compareCpuA.addEventListener('change', renderComparison);
  elements.compareCpuB.addEventListener('change', renderComparison);

  // Búsquedas
  setupSearch('cpu-search', 'cpu-select');
  setupSearch('gpu-search', 'gpu-select');
  setupSearch('compare-cpu-a-search', 'compare-cpu-a');
  setupSearch('compare-cpu-b-search', 'compare-cpu-b');
}

function setupSearch(inputId, selectId) {
  const input = document.getElementById(inputId);
  const select = document.getElementById(selectId);
  const options = Array.from(select.options).map(o => o.value);

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = options.filter(opt => opt.toLowerCase().includes(query));
    
    if (filtered.length > 0) {
      fillSelect(select, filtered, filtered[0]);
      calculateAndRender();
    }
  });
}

// Cálculos
function calculateScenario(cpuName, gpuName) {
  const cpu = MODEL.cpus[cpuName];
  const gpu = MODEL.gpus[gpuName];
  const game = MODEL.games[elements.gameSelect.value];
  const preset = game.presets[state.preset];
  const res = MODEL.resolutions[elements.resolutionSelect.value];
  
  // RAM multipliers
  const ramCap = MODEL.ram.capacity[elements.ramCapacitySelect.value];
  const ramSpeed = MODEL.ram.speed[elements.ramSpeedSelect.value];
  const ramChan = MODEL.ram.channel[elements.ramChannelSelect.value];
  
  const freqSens = cpu.vendor === 'AMD' ? cpu.ryzenMemorySensitivity : 0.45;
  const speedBoost = ramSpeed.baseModifier * freqSens * game.ramWeight;
  
  const ramAvgMult = 1 + ramCap.avgModifier + ramChan.avgModifier + speedBoost;
  const ramLowMult = 1 + ramCap.lowModifier + ramChan.lowModifier + speedBoost * 1.3;

  // Techos
  const x3dBonus = cpu.cacheClass === 'x3d' ? game.x3dWeight * cpu.cacheBonus : 0;
  const coreBonus = Math.max(cpu.cores - 6, 0) * 0.014;

  const cpuCeiling = {
    avg: Math.min(preset.cpuBaseline.avg * cpu.cpuFactor * (1 + x3dBonus) * ramAvgMult * res.cpuScale, preset.cpuClamp.max),
    low: Math.min(preset.cpuBaseline.low1 * cpu.lowFactor * (1 + x3dBonus * 1.08) * (1 + coreBonus) * ramLowMult * res.cpuScale, preset.cpuClamp.max * 0.86)
  };

  const gpuCeiling = {
    avg: Math.min(preset.gpuBaseline.avg * gpu.gpuFactor * res.gpuScale, preset.gpuClamp.max),
    low: Math.min(preset.gpuBaseline.low1 * gpu.lowFactor * res.gpuScale, preset.gpuClamp.max * 0.84),
    fullUsage: Math.min(preset.gpuBaseline.gpuUsage + gpu.saturationBias, 99)
  };

  // Combinar
  const cpuWeightMap = { "CPU-bound": 0.75, Mixed: 0.5, "GPU-bound": 0.25 };
  const cpuW = cpuWeightMap[game.category];
  const gpuW = 1 - cpuW;

  let finalAvg = cpuCeiling.avg * cpuW + gpuCeiling.avg * gpuW;
  let finalLow = cpuCeiling.low * cpuW + gpuCeiling.low * gpuW;

  // Penalización por desbalance
  const ratio = cpuCeiling.avg / Math.max(gpuCeiling.avg, 1);
  let imbalancePenalty = 0;
  if (ratio < 0.6) imbalancePenalty = (0.6 - ratio) * 0.55;
  else if (ratio > 1.65) imbalancePenalty = (ratio - 1.65) * 0.18;

  finalAvg *= (1 - imbalancePenalty);
  finalLow *= (1 - imbalancePenalty * 1.25);

  // GPU Usage real
  const gpuUsage = Math.min(Math.round((finalAvg / Math.max(gpuCeiling.avg, 1)) * gpuCeiling.fullUsage), 99);

  // Diagnóstico y Score (0-100)
  let diagnosis, score, statusClass, title, desc;
  
  const diff = gpuCeiling.avg - cpuCeiling.avg;
  const maxCeiling = Math.max(cpuCeiling.avg, gpuCeiling.avg);
  const bottleneckPct = Math.abs(diff / maxCeiling * 100);
  
  if (bottleneckPct > 15 && gpuUsage < 85) {
    diagnosis = "CPU bottleneck";
    score = Math.round(60 - (bottleneckPct - 15));
    statusClass = "status-bad";
    title = "⚠️ Cuello de botella en CPU";
    desc = `Tu ${cpuName} limita a tu ${gpuName}. La GPU solo trabaja al ${gpuUsage}%. Considera upgradear el procesador.`;
  } else if (bottleneckPct > 15 && gpuUsage >= 90) {
    diagnosis = "GPU bottleneck";
    score = Math.round(70 + (100 - gpuUsage));
    statusClass = "status-warning";
    title = "🎯 GPU al límite";
    desc = `Tu ${gpuName} está dando todo (${gpuUsage}%). Para más FPS necesitas mejorar la gráfica.`;
  } else {
    diagnosis = "Balanced";
    score = Math.round(85 + (15 - bottleneckPct));
    statusClass = "status-good";
    title = "✅ ¡Equipo Balanceado!";
    desc = `Tu ${cpuName} y ${gpuName} trabajan perfectos juntos. Sin cuellos de botella significativos.`;
  }

  score = Math.max(0, Math.min(100, score));

  // 1% Low realista
  const cpuLimited = cpuCeiling.avg < gpuCeiling.avg * 0.92;
  let realisticLow;
  if (cpuLimited) {
    const baseRatio = game.category === "CPU-bound" ? 0.68 : 0.73;
    const x3dBoost = cpu.cacheClass === "x3d" ? 0.07 : 0;
    realisticLow = Math.round(finalAvg * (baseRatio + x3dBoost));
  } else {
    realisticLow = Math.round(finalAvg * (game.category === "GPU-bound" ? 0.82 : 0.78));
  }

  return {
    score,
    statusClass,
    title,
    desc,
    avg: Math.round(finalAvg),
    low: realisticLow,
    gpuUsage,
    range: { min: Math.round(finalAvg * 0.9), max: Math.round(finalAvg * 1.05) },
    diagnosis,
    explanation: buildExplanation(cpuName, gpuName, cpu, gpu, game, diagnosis, gpuUsage, elements.resolutionSelect.value)
  };
}

function buildExplanation(cpuName, gpuName, cpu, gpu, game, diagnosis, gpuUsage, resolution) {
  let text = "";
  
  if (diagnosis === "CPU bottleneck") {
    text = `Tu ${cpuName} no puede alimentar suficientemente a tu ${gpuName}. `;
    if (cpu.cores <= 4) text += "Con solo 4 núcleos, este procesador se queda corto para juegos modernos. ";
    else if (cpu.cacheClass !== "x3d" && game.x3dWeight > 0.7) text += "Este juego beneficia mucho la cache 3D, que tu CPU no tiene. ";
  } else if (diagnosis === "GPU bottleneck") {
    text = `Tu ${gpuName} está al ${gpuUsage}% de uso, dando todo lo que puede. `;
    if (resolution === "4K") text += "En 4K la GPU siempre es el límite, es normal. ";
    else if (resolution === "1080p") text += "Incluso en 1080p tu gráfica está al máximo, considera una upgrade. ";
  } else {
    text = `¡Perfecto! Tu ${cpuName} y ${gpuName} están balanceados. `;
    if (gpuUsage >= 90) text += "La GPU casi al máximo (${gpuUsage}%) significa que no hay desperdicio de potencia. ";
    else text += "La GPU trabaja al ${gpuUsage}%, dejando algo de margen. ";
  }
  
  if (elements.ramCapacitySelect.value === "8 GB" || elements.ramChannelSelect.value === "Single channel") {
    text += "⚠️ Tu configuración de RAM podría estar limitando el rendimiento. Considera 16GB en dual channel.";
  }
  
  return text;
}

function calculateAndRender() {
  const result = calculateScenario(elements.cpuSelect.value, elements.gpuSelect.value);
  
  // Actualizar UI
  elements.resultCard.className = `result-card ${result.statusClass}`;
  elements.gameScore.textContent = result.score;
  elements.diagnosisTitle.textContent = result.title;
  elements.diagnosisDesc.textContent = result.desc;
  elements.avgFps.textContent = result.avg;
  elements.lowFps.textContent = result.low;
  elements.gpuUsage.textContent = result.gpuUsage;
  elements.fpsRange.textContent = `${result.range.min}-${result.range.max}`;
  elements.explanationText.textContent = result.explanation;
  
  // Animar anillos
  const circumference = 339.292;
  const offset = circumference - (result.score / 100) * circumference;
  elements.scoreRing.style.strokeDashoffset = offset;
  
  // Color del score según valor
  const scoreColor = result.score >= 80 ? '#10b981' : result.score >= 60 ? '#f59e0b' : '#ef4444';
  elements.scoreRing.style.stroke = scoreColor;
  
  // Barras
  elements.avgBar.style.width = `${Math.min(result.avg / 3, 100)}%`;
  elements.lowBar.style.width = `${Math.min(result.low / 3, 100)}%`;
  elements.usageBar.style.width = `${result.gpuUsage}%`;
  
  renderComparison();
}

function renderComparison() {
  const resultA = calculateScenario(elements.compareCpuA.value, elements.gpuSelect.value);
  const resultB = calculateScenario(elements.compareCpuB.value, elements.gpuSelect.value);
  
  const container = document.getElementById('compare-results');
  
  const diff = resultB.avg - resultA.avg;
  const diffText = diff > 0 ? `+${diff} FPS` : `${diff} FPS`;
  const diffClass = diff > 0 ? 'positive' : 'negative';
  
  container.innerHTML = `
    <div class="compare-card ${resultA.statusClass}">
      <div class="compare-header">
        <h4>${elements.compareCpuA.value}</h4>
        <span class="compare-score">${resultA.score}</span>
      </div>
      <div class="compare-metrics">
        <div><span>${resultA.avg}</span> FPS avg</div>
        <div><span>${resultA.low}</span> 1% low</div>
        <div><span>${resultA.gpuUsage}%</span> GPU</div>
      </div>
    </div>
    
    <div class="compare-divider">
      <div class="diff-badge ${diffClass}">${diffText}</div>
      <div class="vs-circle">VS</div>
    </div>
    
    <div class="compare-card ${resultB.statusClass}">
      <div class="compare-header">
        <h4>${elements.compareCpuB.value}</h4>
        <span class="compare-score">${resultB.score}</span>
      </div>
      <div class="compare-metrics">
        <div><span>${resultB.avg}</span> FPS avg</div>
        <div><span>${resultB.low}</span> 1% low</div>
        <div><span>${resultB.gpuUsage}%</span> GPU</div>
      </div>
    </div>
  `;
}

// Chatbot
function initChat() {
  // Abrir/cerrar chat
  elements.chatTrigger.addEventListener('click', () => {
    state.chatOpen = !state.chatOpen;
    elements.chatWindow.classList.toggle('open', state.chatOpen);
    document.getElementById('chat-notification').style.display = 'none';
    if (state.chatOpen) elements.chatInput.focus();
  });
  
  elements.chatClose.addEventListener('click', () => {
    state.chatOpen = false;
    elements.chatWindow.classList.remove('open');
  });
  
  // Enviar mensaje
  elements.chatSend.addEventListener('click', sendMessage);
  elements.chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  
  // Quick replies
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-reply')) {
      const question = e.target.dataset.question;
      addMessage(question, 'user');
      setTimeout(() => respondToQuestion(question), 500);
    }
  });
}

function sendMessage() {
  const text = elements.chatInput.value.trim();
  if (!text) return;
  
  addMessage(text, 'user');
  elements.chatInput.value = '';
  
  // Simular typing
  showTyping();
  setTimeout(() => {
    hideTyping();
    respondToQuestion(text);
  }, 1000);
}

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `message ${sender}-message`;
  div.innerHTML = `
    <div class="message-avatar">${sender === 'user' ? '👤' : '🤖'}</div>
    <div class="message-content">${text}</div>
  `;
  elements.chatMessages.appendChild(div);
  elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'message bot-message typing';
  div.id = 'typing-indicator';
  div.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  elements.chatMessages.appendChild(div);
  elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function hideTyping() {
  const typing = document.getElementById('typing-indicator');
  if (typing) typing.remove();
}

function respondToQuestion(text) {
  const lower = text.toLowerCase();
  let response = '';
  
  if (lower.includes('cuello') || lower.includes('bottleneck')) {
    response = "Un cuello de botella ocurre cuando un componente (generalmente CPU o GPU) limita al otro. Si tu GPU usa menos del 85% mientras juegas, tu CPU probablemente sea el cuello. Idealmente quieres la GPU al 90-99% para aprovechar al máximo tu inversión.";
  } else if (lower.includes('5800x3d') || lower.includes('x3d') || lower.includes('cache')) {
    response = "El 5800X3D es especial porque tiene 96MB de cache 3D, lo que mejora mucho en juegos CPU-bound como CS2, Warzone o simuladores. Puede dar 20-30% más FPS que un 5800X normal en esos juegos, aunque en tareas de productividad es igual.";
  } else if (lower.includes('ram') || lower.includes('memoria')) {
    response = "Para gaming en 2024, lo mínimo recomendado es 16GB en Dual Channel (2 sticks). 8GB ya se queda corto en juegos modernos, y single channel puede bajar el rendimiento hasta 20%. Si usas AMD Ryzen, intenta usar 3600MHz para mejor rendimiento.";
  } else if (lower.includes('1080p') || lower.includes('1440p') || lower.includes('4k')) {
    response = "A mayor resolución, más trabajo para la GPU y menos para el CPU. En 1080p el CPU importa más (puede ser cuello de botella), en 4K casi siempre limita la GPU. 1440p es el punto dulce actual para PCs de gama media-alta.";
  } else if (lower.includes('dlss') || lower.includes('fsr')) {
    response = "DLSS (NVIDIA) y FSR (AMD) son tecnologías que renderizan a menor resolución y escalan con IA/algoritmos. Pueden dar 30-50% más FPS con mínima pérdida de calidad. DLSS suele verse mejor pero solo funciona en RTX 2000+.";
  } else if (lower.includes('comprar') || lower.includes('recomiendas') || lower.includes('upgrade')) {
    const cpu = elements.cpuSelect.value;
    const gpu = elements.gpuSelect.value;
    response = `Con tu ${cpu} y ${gpu}, si quieres mejorar, prioriza ${calculateScenario(cpu, gpu).diagnosis === 'CPU bottleneck' ? 'cambiar el CPU primero' : 'mejorar la GPU primero'}. El balance es clave: no tiene sentido poner una RTX 4090 con un Ryzen 5 3600, por ejemplo.`;
  } else {
    response = "Interesante pregunta. En general, para gaming lo más importante es tener un balance CPU-GPU. Si me das más detalles de tu setup actual o presupuesto, puedo darte recomendaciones más específicas. ¿Qué juegos quieres correr?";
  }
  
  addMessage(response, 'bot');
}

// Iniciar
document.addEventListener('DOMContentLoaded', init);
