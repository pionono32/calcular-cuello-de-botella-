const MODEL = {
  cpus: {
    "Ryzen 5 3600": {
      vendor: "AMD",
      cores: 6,
      cacheClass: "standard",
      cacheBonus: 0,
      ryzenMemorySensitivity: 1,
      cpuFactor: 0.82,
      lowFactor: 0.78,
      confidence: "high",
      notes: "Todavia rinde bien, pero sus minimos sufren mas con GPUs modernas.",
    },
    "Ryzen 5 5600": {
      vendor: "AMD",
      cores: 6,
      cacheClass: "standard",
      cacheBonus: 0.02,
      ryzenMemorySensitivity: 1,
      cpuFactor: 0.92,
      lowFactor: 0.9,
      confidence: "high",
      notes: "Muy equilibrado para gaming y bastante agradecido con RAM 3200/3600.",
    },
    "Ryzen 7 5700X": {
      vendor: "AMD",
      cores: 8,
      cacheClass: "standard",
      cacheBonus: 0.03,
      ryzenMemorySensitivity: 0.95,
      cpuFactor: 0.98,
      lowFactor: 0.95,
      confidence: "medium",
      notes: "Los 8 nucleos ayudan en 1% lows, aunque no tiene el empuje de cache 3D.",
    },
    "Ryzen 7 5800X3D": {
      vendor: "AMD",
      cores: 8,
      cacheClass: "x3d",
      cacheBonus: 0.12,
      ryzenMemorySensitivity: 0.65,
      cpuFactor: 1.08,
      lowFactor: 1.08,
      confidence: "high",
      notes: "La cache 3D mejora mucho juegos CPU-bound y estabiliza los minimos.",
    },
    "Ryzen 5 7600": {
      vendor: "AMD",
      cores: 6,
      cacheClass: "standard",
      cacheBonus: 0.04,
      ryzenMemorySensitivity: 0.7,
      cpuFactor: 1.04,
      lowFactor: 1.01,
      confidence: "high",
      notes: "Zen 4 levanta bastante el promedio aun con 6 nucleos.",
    },
    "Ryzen 7 7800X3D": {
      vendor: "AMD",
      cores: 8,
      cacheClass: "x3d",
      cacheBonus: 0.16,
      ryzenMemorySensitivity: 0.55,
      cpuFactor: 1.16,
      lowFactor: 1.16,
      confidence: "high",
      notes: "Referencia muy fuerte para gaming puro, sobre todo en juegos CPU-bound.",
    },
    "Core i5-12400F": {
      vendor: "Intel",
      cores: 6,
      cacheClass: "standard",
      cacheBonus: 0.01,
      ryzenMemorySensitivity: 0.45,
      cpuFactor: 0.9,
      lowFactor: 0.87,
      confidence: "high",
      notes: "Muy capaz en rango medio, con buen comportamiento general.",
    },
    "Core i5-13600K": {
      vendor: "Intel",
      cores: 14,
      cacheClass: "standard",
      cacheBonus: 0.04,
      ryzenMemorySensitivity: 0.35,
      cpuFactor: 1.08,
      lowFactor: 1.06,
      confidence: "high",
      notes: "Muy rapido en esports y fuerte en cargas mixtas.",
    },
  },
  gpus: {
    "RTX 3060": {
      gpuFactor: 0.72,
      lowFactor: 0.71,
      saturationBias: 4,
      confidence: "high",
      notes: "Muy comun para 1080p y 1440p moderado.",
    },
    "RTX 3070": {
      gpuFactor: 0.88,
      lowFactor: 0.86,
      saturationBias: 2,
      confidence: "high",
      notes: "Sigue siendo fuerte en raster para 1440p.",
    },
    "RTX 3080": {
      gpuFactor: 1,
      lowFactor: 1,
      saturationBias: 0,
      confidence: "high",
      notes: "GPU de referencia para las bases del modelo.",
    },
    "RTX 4070 Super": {
      gpuFactor: 1.08,
      lowFactor: 1.07,
      saturationBias: -1,
      confidence: "high",
      notes: "Excelente salto en eficiencia y buen techo para 1440p.",
    },
    "RTX 4080 Super": {
      gpuFactor: 1.24,
      lowFactor: 1.22,
      saturationBias: -4,
      confidence: "medium",
      notes: "Muy rapida; expone antes los limites del CPU a 1080p.",
    },
    "RX 6700 XT": {
      gpuFactor: 0.84,
      lowFactor: 0.82,
      saturationBias: 2,
      confidence: "high",
      notes: "Muy buena opcion para 1080p alto y 1440p razonable.",
    },
    "RX 7800 XT": {
      gpuFactor: 1.04,
      lowFactor: 1.02,
      saturationBias: 0,
      confidence: "medium",
      notes: "Muy capaz en raster a 1440p y con VRAM amplia.",
    },
    "RX 7900 XTX": {
      gpuFactor: 1.28,
      lowFactor: 1.25,
      saturationBias: -5,
      confidence: "medium",
      notes: "Muy potente en raster; en 1080p depende mucho del CPU.",
    },
  },
  ram: {
    capacity: {
      "8 GB": { avgModifier: -0.14, lowModifier: -0.18, confidencePenalty: 1 },
      "16 GB": { avgModifier: 0, lowModifier: 0, confidencePenalty: 0 },
      "32 GB": { avgModifier: 0.02, lowModifier: 0.03, confidencePenalty: 0 },
    },
    speed: {
      "2666 MHz": { baseModifier: -0.05 },
      "3000 MHz": { baseModifier: -0.02 },
      "3200 MHz": { baseModifier: 0 },
      "3600 MHz": { baseModifier: 0.03 },
    },
    channel: {
      "Single channel": { avgModifier: -0.09, lowModifier: -0.12, confidencePenalty: 1 },
      "Dual channel": { avgModifier: 0, lowModifier: 0, confidencePenalty: 0 },
    },
  },
  resolutions: {
    "1080p": { cpuScale: 1, gpuScale: 1.12, usageDelta: -8 },
    "1440p": { cpuScale: 0.95, gpuScale: 1, usageDelta: 0 },
    "4K": { cpuScale: 0.9, gpuScale: 0.66, usageDelta: 10 },
  },
  games: {
    CS2: {
      category: "CPU-bound",
      confidence: "high",
      x3dWeight: 1,
      ramWeight: 1,
      notes: "Shooter muy sensible a cache, latencia y frametimes.",
      presets: {
        competitive: {
          cpuBaseline: { avg: 330, low1: 210, gpuUsage: 74 },
          gpuBaseline: { avg: 290, low1: 210, gpuUsage: 97 },
          cpuClamp: { min: 120, max: 520 },
          gpuClamp: { min: 110, max: 420 },
        },
        ultra: {
          cpuBaseline: { avg: 285, low1: 190, gpuUsage: 80 },
          gpuBaseline: { avg: 240, low1: 175, gpuUsage: 98 },
          cpuClamp: { min: 100, max: 440 },
          gpuClamp: { min: 90, max: 340 },
        },
      },
    },
    Warzone: {
      category: "CPU-bound",
      confidence: "medium",
      x3dWeight: 0.95,
      ramWeight: 0.9,
      notes: "Warzone suele castigar CPU, RAM y 1% lows, sobre todo en 1080p.",
      presets: {
        competitive: {
          cpuBaseline: { avg: 178, low1: 128, gpuUsage: 81 },
          gpuBaseline: { avg: 168, low1: 122, gpuUsage: 98 },
          cpuClamp: { min: 70, max: 210 },
          gpuClamp: { min: 65, max: 195 },
        },
        ultra: {
          cpuBaseline: { avg: 154, low1: 108, gpuUsage: 86 },
          gpuBaseline: { avg: 129, low1: 94, gpuUsage: 99 },
          cpuClamp: { min: 60, max: 180 },
          gpuClamp: { min: 52, max: 155 },
        },
      },
    },
    Fortnite: {
      category: "CPU-bound",
      confidence: "medium",
      x3dWeight: 0.9,
      ramWeight: 0.85,
      notes: "Con ajustes competitivos suele escalar mucho con CPU, RAM rapida y cache.",
      presets: {
        competitive: {
          cpuBaseline: { avg: 232, low1: 162, gpuUsage: 78 },
          gpuBaseline: { avg: 224, low1: 165, gpuUsage: 97 },
          cpuClamp: { min: 90, max: 320 },
          gpuClamp: { min: 90, max: 290 },
        },
        ultra: {
          cpuBaseline: { avg: 174, low1: 122, gpuUsage: 84 },
          gpuBaseline: { avg: 146, low1: 106, gpuUsage: 99 },
          cpuClamp: { min: 70, max: 230 },
          gpuClamp: { min: 55, max: 180 },
        },
      },
    },
    "Cyberpunk 2077": {
      category: "GPU-bound",
      confidence: "high",
      x3dWeight: 0.35,
      ramWeight: 0.35,
      notes: "Juego muy pesado del lado GPU; la CPU importa menos salvo en 1080p.",
      presets: {
        competitive: {
          cpuBaseline: { avg: 141, low1: 105, gpuUsage: 89 },
          gpuBaseline: { avg: 118, low1: 90, gpuUsage: 98 },
          cpuClamp: { min: 65, max: 180 },
          gpuClamp: { min: 45, max: 150 },
        },
        ultra: {
          cpuBaseline: { avg: 117, low1: 88, gpuUsage: 92 },
          gpuBaseline: { avg: 86, low1: 67, gpuUsage: 99 },
          cpuClamp: { min: 52, max: 145 },
          gpuClamp: { min: 32, max: 110 },
        },
      },
    },
    "Alan Wake 2": {
      category: "GPU-bound",
      confidence: "medium",
      x3dWeight: 0.25,
      ramWeight: 0.25,
      notes: "Muy dependiente de GPU y memoria de video; el CPU suele pasar a segundo plano.",
      presets: {
        competitive: {
          cpuBaseline: { avg: 108, low1: 81, gpuUsage: 91 },
          gpuBaseline: { avg: 82, low1: 63, gpuUsage: 99 },
          cpuClamp: { min: 48, max: 138 },
          gpuClamp: { min: 30, max: 110 },
        },
        ultra: {
          cpuBaseline: { avg: 96, low1: 72, gpuUsage: 93 },
          gpuBaseline: { avg: 66, low1: 52, gpuUsage: 99 },
          cpuClamp: { min: 40, max: 122 },
          gpuClamp: { min: 24, max: 88 },
        },
      },
    },
    "GTA V": {
      category: "Mixed",
      confidence: "medium",
      x3dWeight: 0.55,
      ramWeight: 0.45,
      notes: "Puede volverse CPU-bound a FPS muy altos, pero tambien escala con GPU.",
      presets: {
        competitive: {
          cpuBaseline: { avg: 196, low1: 142, gpuUsage: 84 },
          gpuBaseline: { avg: 188, low1: 144, gpuUsage: 98 },
          cpuClamp: { min: 90, max: 260 },
          gpuClamp: { min: 85, max: 245 },
        },
        ultra: {
          cpuBaseline: { avg: 168, low1: 124, gpuUsage: 88 },
          gpuBaseline: { avg: 142, low1: 110, gpuUsage: 99 },
          cpuClamp: { min: 72, max: 220 },
          gpuClamp: { min: 58, max: 185 },
        },
      },
    },
    "Red Dead Redemption 2": {
      category: "Mixed",
      confidence: "high",
      x3dWeight: 0.42,
      ramWeight: 0.4,
      notes: "Muy equilibrado: a 1080p influye el CPU, pero a 1440p y 4K manda mas la GPU.",
      presets: {
        competitive: {
          cpuBaseline: { avg: 146, low1: 108, gpuUsage: 87 },
          gpuBaseline: { avg: 132, low1: 102, gpuUsage: 98 },
          cpuClamp: { min: 62, max: 182 },
          gpuClamp: { min: 50, max: 165 },
        },
        ultra: {
          cpuBaseline: { avg: 126, low1: 92, gpuUsage: 90 },
          gpuBaseline: { avg: 108, low1: 84, gpuUsage: 99 },
          cpuClamp: { min: 54, max: 158 },
          gpuClamp: { min: 40, max: 136 },
        },
      },
    },
  },
};

const state = {
  preset: "competitive",
};

const cpuSelect = document.querySelector("#cpu-select");
const gpuSelect = document.querySelector("#gpu-select");
const gameSelect = document.querySelector("#game-select");
const resolutionSelect = document.querySelector("#resolution-select");
const ramCapacitySelect = document.querySelector("#ram-capacity-select");
const ramSpeedSelect = document.querySelector("#ram-speed-select");
const ramChannelSelect = document.querySelector("#ram-channel-select");
const compareCpuA = document.querySelector("#compare-cpu-a");
const compareCpuB = document.querySelector("#compare-cpu-b");
const diagnosisText = document.querySelector("#diagnosis-text");
const confidencePill = document.querySelector("#confidence-pill");
const avgFpsValue = document.querySelector("#avg-fps-value");
const rangeValue = document.querySelector("#range-value");
const lowValue = document.querySelector("#low-value");
const gpuUsageValue = document.querySelector("#gpu-usage-value");
const explanationText = document.querySelector("#explanation-text");
const referenceText = document.querySelector("#reference-text");
const resultCard = document.querySelector("#result-card");
const compareResults = document.querySelector("#compare-results");
const avgBar = document.querySelector("#avg-bar");
const lowBar = document.querySelector("#low-bar");
const gpuBar = document.querySelector("#gpu-bar");
const presetButtons = document.querySelectorAll(".preset-btn");
const bottleneckGauge = document.querySelector("#bottleneck-gauge");
const bottleneckPercent = document.querySelector("#bottleneck-percent");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function fillSelect(selectElement, options) {
  selectElement.innerHTML = "";

  options.forEach((option) => {
    const item = document.createElement("option");
    item.value = option;
    item.textContent = option;
    selectElement.appendChild(item);
  });
}

function getRamModifiers(cpu, gameName, capacity, speed, channel) {
  const capacityProfile = MODEL.ram.capacity[capacity];
  const speedProfile = MODEL.ram.speed[speed];
  const channelProfile = MODEL.ram.channel[channel];
  const game = MODEL.games[gameName];
  const memorySensitivity = cpu.vendor === "AMD" ? cpu.ryzenMemorySensitivity : 0.55;
  const speedEffect = speedProfile.baseModifier * memorySensitivity * game.ramWeight;

  return {
    avgModifier: capacityProfile.avgModifier + channelProfile.avgModifier + speedEffect,
    lowModifier:
      capacityProfile.lowModifier + channelProfile.lowModifier + speedEffect * 1.12,
    confidencePenalty:
      capacityProfile.confidencePenalty + channelProfile.confidencePenalty,
  };
}

function buildCpuReference(cpu, gameName, presetName) {
  const cpuProfile = MODEL.cpus[cpu];
  const game = MODEL.games[gameName];
  const preset = game.presets[presetName];
  const x3dBonus = cpuProfile.cacheClass === "x3d" ? game.x3dWeight * cpuProfile.cacheBonus : 0;

  return {
    avg: clamp(
      Math.round(preset.cpuBaseline.avg * cpuProfile.cpuFactor * (1 + x3dBonus)),
      preset.cpuClamp.min,
      preset.cpuClamp.max
    ),
    low1: clamp(
      Math.round(
        preset.cpuBaseline.low1 *
          cpuProfile.lowFactor *
          (1 + x3dBonus * 1.05) *
          (1 + Math.max(cpuProfile.cores - 6, 0) * 0.012)
      ),
      Math.round(preset.cpuClamp.min * 0.7),
      Math.round(preset.cpuClamp.max * 0.88)
    ),
    gpuUsage: clamp(
      Math.round(
        preset.cpuBaseline.gpuUsage +
          (cpuProfile.cpuFactor - 1) * 30 +
          x3dBonus * 45
      ),
      60,
      98
    ),
  };
}

function buildGpuReference(gpu, gameName, presetName) {
  const gpuProfile = MODEL.gpus[gpu];
  const game = MODEL.games[gameName];
  const preset = game.presets[presetName];

  return {
    avg: clamp(
      Math.round(preset.gpuBaseline.avg * gpuProfile.gpuFactor),
      preset.gpuClamp.min,
      preset.gpuClamp.max
    ),
    low1: clamp(
      Math.round(preset.gpuBaseline.low1 * gpuProfile.lowFactor),
      Math.round(preset.gpuClamp.min * 0.75),
      Math.round(preset.gpuClamp.max * 0.86)
    ),
    gpuUsage: clamp(preset.gpuBaseline.gpuUsage + gpuProfile.saturationBias, 88, 99),
  };
}

function getConfidence(cpuName, gpuName, gameName, ramPenalty) {
  const levels = ["low", "medium", "high"];
  const cpuConfidence = levels.indexOf(MODEL.cpus[cpuName].confidence);
  const gpuConfidence = levels.indexOf(MODEL.gpus[gpuName].confidence);
  const gameConfidence = levels.indexOf(MODEL.games[gameName].confidence);
  const score = Math.min(cpuConfidence, gpuConfidence, gameConfidence) - ramPenalty;

  if (score >= 2) {
    return "high";
  }

  if (score >= 1) {
    return "medium";
  }

  return "low";
}

function getResolutionAdjustedCeilings(cpuRef, gpuRef, resolution) {
  const resolutionProfile = MODEL.resolutions[resolution];

  return {
    cpuAvg: Math.round(cpuRef.avg * resolutionProfile.cpuScale),
    cpuLow: Math.round(cpuRef.low1 * resolutionProfile.cpuScale),
    gpuAvg: Math.round(gpuRef.avg * resolutionProfile.gpuScale),
    gpuLow: Math.round(gpuRef.low1 * resolutionProfile.gpuScale),
    usageDelta: resolutionProfile.usageDelta,
  };
}

function calculateScenario(cpuName, gpuName) {
  const gameName = gameSelect.value;
  const resolutionName = resolutionSelect.value;
  const ramCapacity = ramCapacitySelect.value;
  const ramSpeed = ramSpeedSelect.value;
  const ramChannel = ramChannelSelect.value;
  const cpuProfile = MODEL.cpus[cpuName];
  const gpuProfile = MODEL.gpus[gpuName];
  const game = MODEL.games[gameName];
  const ramModifiers = getRamModifiers(
    cpuProfile,
    gameName,
    ramCapacity,
    ramSpeed,
    ramChannel
  );
  const cpuRef = buildCpuReference(cpuName, gameName, state.preset);
  const gpuRef = buildGpuReference(gpuName, gameName, state.preset);
  const ceilings = getResolutionAdjustedCeilings(cpuRef, gpuRef, resolutionName);
  const cpuAvg = Math.round(ceilings.cpuAvg * (1 + ramModifiers.avgModifier));
  const cpuLow = Math.round(ceilings.cpuLow * (1 + ramModifiers.lowModifier));
  const gpuAvg = ceilings.gpuAvg;
  const gpuLow = ceilings.gpuLow;

  const safeAvg = Math.floor(Math.min(cpuAvg, gpuAvg) * 0.985);
  const safeLow = Math.floor(Math.min(cpuLow, gpuLow) * 0.97);
  const confidence = getConfidence(
    cpuName,
    gpuName,
    gameName,
    ramModifiers.confidencePenalty
  );
  const spreadMap = { high: 0.06, medium: 0.09, low: 0.13 };
  const spread = spreadMap[confidence];
  const rangeMin = Math.max(18, Math.round(safeAvg * (1 - spread)));
  const rangeMax = Math.max(rangeMin + 2, Math.round(safeAvg * (1 + spread * 0.6)));

  const cpuLimited = cpuAvg <= gpuAvg * 0.94;
  const gpuLimited = gpuAvg <= cpuAvg * 0.94;
  const bottleneckGap = Math.abs(cpuAvg - gpuAvg) / Math.max(cpuAvg, gpuAvg, 1);
  const gpuUsage = clamp(
    Math.round((safeAvg / Math.max(gpuAvg, 1)) * 100 + ceilings.usageDelta + gpuProfile.saturationBias),
    55,
    99
  );

  let diagnosis = "Balanced";

  if (cpuLimited && gpuUsage < 90) {
    diagnosis = "CPU bottleneck";
  } else if (gpuLimited && gpuUsage >= 93) {
    diagnosis = "GPU bottleneck";
  }

  const bottleneckPercentValue =
    diagnosis === "Balanced" ? clamp(Math.round(bottleneckGap * 100 * 0.55), 4, 18) : clamp(Math.round(bottleneckGap * 100), 10, 38);

  return {
    diagnosis,
    confidence,
    average: clamp(safeAvg, 18, 520),
    low1: clamp(safeLow, 14, 420),
    range: { min: rangeMin, max: rangeMax },
    gpuUsage,
    bottleneckPercent: bottleneckPercentValue,
    explanation: buildExplanation(
      cpuProfile,
      gpuProfile,
      game,
      resolutionName,
      diagnosis,
      ramCapacity,
      ramSpeed,
      ramChannel
    ),
    reference: buildReferenceText(gameName, cpuRef, gpuRef),
  };
}

function buildReferenceText(gameName, cpuRef, gpuRef) {
  return `${gameName}: base CPU ${cpuRef.avg}/${cpuRef.low1} FPS en referencia CPU-limited y base GPU ${gpuRef.avg}/${gpuRef.low1} FPS en referencia GPU-limited. Luego se ajusta por RAM, preset y resolucion.`;
}

function buildExplanation(cpu, gpu, game, resolution, diagnosis, ramCapacity, ramSpeed, ramChannel) {
  const memoryLine =
    ramCapacity === "8 GB" || ramChannel === "Single channel"
      ? `La memoria elegida (${ramCapacity}, ${ramSpeed}, ${ramChannel.toLowerCase()}) castiga bastante los 1% lows y puede provocar stutter o caidas en escenas cargadas.`
      : `La configuracion de memoria (${ramCapacity}, ${ramSpeed}, ${ramChannel.toLowerCase()}) acompana razonablemente al conjunto.`;

  const reasonByDiagnosis = {
    "CPU bottleneck": `El cuello aparece del lado del CPU: ${game.notes} ${cpu.notes}`,
    Balanced: `La carga queda relativamente pareja entre CPU y GPU. ${cpu.notes}`,
    "GPU bottleneck": `La limitacion principal cae en la GPU: ${gpu.notes} ${game.notes}`,
  };

  return `${reasonByDiagnosis[diagnosis]} En ${resolution}, el comportamiento de ${game.category.toLowerCase()} empuja este resultado. ${memoryLine}`;
}

function getResultClass(diagnosis) {
  if (diagnosis === "CPU bottleneck") {
    return "result-cpu";
  }

  if (diagnosis === "GPU bottleneck") {
    return "result-gpu";
  }

  return "result-balanced";
}

function renderMain() {
  const result = calculateScenario(cpuSelect.value, gpuSelect.value);
  const confidenceLabels = {
    high: "Confianza alta",
    medium: "Confianza media",
    low: "Confianza baja",
  };

  diagnosisText.textContent = result.diagnosis;
  confidencePill.textContent = confidenceLabels[result.confidence];
  avgFpsValue.textContent = `${result.average}`;
  rangeValue.textContent = `${result.range.min} - ${result.range.max}`;
  lowValue.textContent = `${result.low1}`;
  gpuUsageValue.textContent = `${result.gpuUsage}%`;
  explanationText.textContent = result.explanation;
  referenceText.textContent = result.reference;
  resultCard.className = `result-card ${getResultClass(result.diagnosis)}`;
  avgBar.style.width = `${clamp((result.average / 260) * 100, 4, 100)}%`;
  lowBar.style.width = `${clamp((result.low1 / 220) * 100, 4, 100)}%`;
  gpuBar.style.width = `${result.gpuUsage}%`;
  bottleneckPercent.textContent = `${result.bottleneckPercent}%`;
  bottleneckGauge.style.setProperty("--gauge-value", `${result.bottleneckPercent}%`);

  const gaugeColorMap = {
    "CPU bottleneck": "var(--danger)",
    Balanced: "var(--warning)",
    "GPU bottleneck": "var(--success)",
  };
  bottleneckGauge.style.setProperty("--gauge-color", gaugeColorMap[result.diagnosis]);
}

function createCompareCard(cpuName) {
  const result = calculateScenario(cpuName, gpuSelect.value);
  const card = document.createElement("article");
  card.className = `compare-item ${getResultClass(result.diagnosis)}`;

  card.innerHTML = `
    <h3>${cpuName}</h3>
    <p>${result.explanation}</p>
    <div class="compare-meta">
      <strong>${result.average} FPS promedio</strong>
      <span>Rango: ${result.range.min} - ${result.range.max}</span>
      <span>1% low: ${result.low1}</span>
      <span>Uso de GPU: ${result.gpuUsage}%</span>
      <span>Diagnostico: ${result.diagnosis}</span>
    </div>
  `;

  return card;
}

function renderComparison() {
  compareResults.innerHTML = "";
  compareResults.appendChild(createCompareCard(compareCpuA.value));
  compareResults.appendChild(createCompareCard(compareCpuB.value));
}

function handleUpdate() {
  renderMain();
  renderComparison();
}

function setPreset(nextPreset) {
  state.preset = nextPreset;
  presetButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.preset === nextPreset);
  });
  handleUpdate();
}

function populateControls() {
  const cpuNames = Object.keys(MODEL.cpus);
  const gpuNames = Object.keys(MODEL.gpus);
  const gameNames = Object.keys(MODEL.games);

  fillSelect(cpuSelect, cpuNames);
  fillSelect(compareCpuA, cpuNames);
  fillSelect(compareCpuB, cpuNames);
  fillSelect(gpuSelect, gpuNames);
  fillSelect(gameSelect, gameNames);
  fillSelect(resolutionSelect, Object.keys(MODEL.resolutions));
  fillSelect(ramCapacitySelect, Object.keys(MODEL.ram.capacity));
  fillSelect(ramSpeedSelect, Object.keys(MODEL.ram.speed));
  fillSelect(ramChannelSelect, Object.keys(MODEL.ram.channel));

  cpuSelect.value = "Ryzen 7 5800X3D";
  gpuSelect.value = "RTX 3080";
  gameSelect.value = "Warzone";
  resolutionSelect.value = "1440p";
  ramCapacitySelect.value = "16 GB";
  ramSpeedSelect.value = "3200 MHz";
  ramChannelSelect.value = "Dual channel";
  compareCpuA.value = "Ryzen 5 5600";
  compareCpuB.value = "Ryzen 7 7800X3D";
}

function attachEvents() {
  [
    cpuSelect,
    gpuSelect,
    gameSelect,
    resolutionSelect,
    ramCapacitySelect,
    ramSpeedSelect,
    ramChannelSelect,
  ].forEach((element) => {
    element.addEventListener("change", handleUpdate);
  });

  [compareCpuA, compareCpuB].forEach((element) => {
    element.addEventListener("change", renderComparison);
  });

  presetButtons.forEach((button) => {
    button.addEventListener("click", () => setPreset(button.dataset.preset));
  });
}

populateControls();
attachEvents();
handleUpdate();
