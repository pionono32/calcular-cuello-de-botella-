// ============================================
// PC BOTTLENECK CALCULATOR — Precision Engine v3
// Data: Hardware Unboxed, TechPowerUp, GamersNexus, Digital Foundry
// ============================================

/**
 * Model overview
 * ─────────────────────────────────────────────────────────────────────────────
 * cpuThroughput = cpu.fpsGaming  × workload.cpuScaling[res] × ramFactor × useCaseFactor
 * gpuThroughput = gpu.fpsGaming  × workload.gpuScaling[res] × qualityFactor
 *                               × vramFactor × useCaseFactor
 *
 * qualityFactor (QUALITY_MULTIPLIERS.gpuFpsMult):
 *   Low = 2.20 → GPU has far less work, CPU often becomes the limit
 *   Ultra = 1.00 → baseline (fpsGaming values are measured at Ultra 1080p)
 *   Ultra+RT = 0.62 → GPU is heavily loaded
 *
 * storageFactor (STORAGE_DATA.lowFpsFactor):
 *   Affects 1% Low FPS only (HDD stutters in open-world games)
 *   Does NOT affect average FPS — in most games storage ≠ frames/sec
 *
 * actualFps = min(cpuThroughput, gpuThroughput) × 0.98   (2% system overhead)
 * lowFps    = actualFps × storageData.lowFpsFactor
 * ─────────────────────────────────────────────────────────────────────────────
 */

function calculateBottleneck(
  cpuName, gpuName, ram, resolution, workloadName,
  useCase  = "gaming",
  storage  = "SATA SSD",
  quality  = "ultra"
) {
  const cpu         = CPU_DATA[cpuName];
  const gpu         = GPU_DATA[gpuName];
  const workload    = WORKLOAD_DATA[workloadName];
  const ramData     = RAM_MULTIPLIERS[ram]       || RAM_MULTIPLIERS["16"];
  const useCaseData = USE_CASE_MULTIPLIERS[useCase] || USE_CASE_MULTIPLIERS["gaming"];
  const storageData = STORAGE_DATA[storage]      || STORAGE_DATA["SATA SSD"];
  const qualityData = QUALITY_MULTIPLIERS[quality] || QUALITY_MULTIPLIERS["ultra"];

  if (!cpu || !gpu || !workload) {
    return { error: "Componentes inválidos seleccionados" };
  }

  // ── CPU THROUGHPUT ────────────────────────────────────────────────────────
  const cpuScaling   = workload.cpuScaling[resolution] || 1.0;
  const cpuThroughput = cpu.fpsGaming * cpuScaling * ramData.fpsFactor * useCaseData.cpuFactor;

  // ── GPU THROUGHPUT ────────────────────────────────────────────────────────
  const gpuScaling   = workload.gpuScaling[resolution] || 1.0;

  // VRAM penalty: insufficient VRAM forces texture compression / streaming spills
  const vramRequired = workload.vramRequired[resolution] || 4;
  let vramFactor = 1.0;
  if (gpu.vram < vramRequired) {
    const deficit  = vramRequired - gpu.vram;
    // Each 1 GB short costs ~10–15% performance (capped at 55% max penalty)
    vramFactor = Math.max(0.45, 1.0 - (deficit * 0.13));
  }

  // Quality multiplier: Low = GPU renders far more FPS than baseline (Ultra)
  const gpuThroughput = gpu.fpsGaming * gpuScaling * qualityData.gpuFpsMult * vramFactor * useCaseData.gpuFactor;

  // ── ACTUAL FPS ────────────────────────────────────────────────────────────
  const systemOverhead = 0.02; // drivers, OS, background tasks
  const actualFps = Math.round(Math.min(cpuThroughput, gpuThroughput) * (1 - systemOverhead));

  // 1% Low: storage type determines stutter severity
  const lowFps = Math.round(actualFps * storageData.lowFpsFactor);

  // ── BOTTLENECK CALCULATION ────────────────────────────────────────────────
  const faster = Math.max(cpuThroughput, gpuThroughput);
  const slower = Math.min(cpuThroughput, gpuThroughput);
  const rawBottleneck     = ((faster - slower) / faster) * 100;
  const bottleneckPercent = Math.min(Math.round(rawBottleneck), 65);

  // ── DIAGNOSIS ────────────────────────────────────────────────────────────
  let diagnosis, badgeClass, bottleneckedComponent;
  const imbalanceThreshold = 1.18; // >18% gap = noticeable bottleneck

  if (cpuThroughput < gpuThroughput / imbalanceThreshold) {
    diagnosis            = "Cuello de Botella: CPU";
    badgeClass           = "cpu";
    bottleneckedComponent = "CPU";
  } else if (gpuThroughput < cpuThroughput / imbalanceThreshold) {
    diagnosis            = "Cuello de Botella: GPU";
    badgeClass           = "gpu";
    bottleneckedComponent = "GPU";
  } else {
    diagnosis            = "Bien Balanceado";
    badgeClass           = "balanced";
    bottleneckedComponent = null;
  }

  // ── SEVERITY ─────────────────────────────────────────────────────────────
  let severity;
  if      (bottleneckPercent <= 10) severity = "balanced";
  else if (bottleneckPercent <= 25) severity = "slight";
  else if (bottleneckPercent <= 45) severity = "moderate";
  else                              severity = "severe";

  // ── UTILISATION ──────────────────────────────────────────────────────────
  const cpuUsage = Math.min(Math.round((actualFps / cpuThroughput) * 100), 99);
  const gpuUsage = Math.min(Math.round((actualFps / gpuThroughput) * 100), 99);

  // ── EXPLANATION ──────────────────────────────────────────────────────────
  const explanation = generateExplanation(
    cpuName, gpuName, workloadName, resolution,
    diagnosis, bottleneckPercent, bottleneckedComponent, severity,
    cpu, gpu, cpuThroughput, gpuThroughput, actualFps, vramFactor,
    qualityData, storageData
  );

  // ── UPGRADE RECOMMENDATIONS ───────────────────────────────────────────────
  const upgrades = generateUpgrades(bottleneckedComponent, cpu, gpu, severity);

  // ── RESOLUTION IMPACT ─────────────────────────────────────────────────────
  const resolutionImpact = analyzeResolutionImpact(cpu, gpu, workload, ramData, useCaseData, qualityData);

  // ── BENCHMARK VALIDATION ─────────────────────────────────────────────────
  const validation = validateAgainstBenchmarks(cpuName, gpuName, resolution, actualFps);

  return {
    bottleneckPercent,
    rawBottleneck: Math.round(rawBottleneck * 10) / 10,
    diagnosis,
    badgeClass,
    severity,
    bottleneckedComponent,
    fps: actualFps,
    lowFps,
    gpuUsage,
    cpuUsage,
    cpuThroughput: Math.round(cpuThroughput),
    gpuThroughput: Math.round(gpuThroughput),
    explanation,
    upgrades,
    resolutionImpact,
    ramStatus:     ramData.status,
    vramStatus:    vramFactor < 1.0 ? `VRAM insuficiente (${gpu.vram}GB < ${vramRequired}GB recomendados)` : null,
    storageStatusKey: storageData.statusKey,
    qualityLabel:  qualityData.label,
    storage,
    quality,
    workload: workloadName,
    resolution,
    useCase,
    validation,
  };
}

// ── EXPLANATION ───────────────────────────────────────────────────────────────
function generateExplanation(
  cpuName, gpuName, workloadName, resolution,
  diagnosis, percent, component, severity,
  cpu, gpu, cpuThroughput, gpuThroughput, actualFps,
  vramFactor, qualityData, storageData
) {
  const workload  = WORKLOAD_DATA[workloadName];
  const resLabels = { "1080p": "1080p Full HD", "1440p": "1440p QHD", "4K": "4K Ultra HD" };
  const resLabel  = resLabels[resolution] || resolution;
  const qualLabel = qualityData ? qualityData.label : "Ultra";
  let text = "";

  if (diagnosis.includes("CPU")) {
    text = `Tu <strong>${cpuName}</strong> limita el rendimiento de la <strong>${gpuName}</strong> en <strong>${workloadName}</strong> a <strong>${resLabel}</strong> — calidad <strong>${qualLabel}</strong>. `;
    if (severity === "severe") {
      text += `El cuello de botella es <strong>severo (${percent}%)</strong>. La CPU puede procesar ~${Math.round(cpuThroughput)} FPS pero la GPU podría rendir ~${Math.round(gpuThroughput)} FPS. Estás perdiendo ${Math.round(gpuThroughput - actualFps)} FPS de potencial. `;
      text += `Verás stuttering e inconsistencias en el frametime. `;
    } else if (severity === "moderate") {
      text += `El cuello de botella es <strong>moderado (${percent}%)</strong>. La CPU limita el rendimiento de forma notable. Un procesador más rápido marcaría la diferencia. `;
    } else {
      text += `Bottleneck <strong>leve (${percent}%)</strong>. La CPU es el factor limitante pero el sistema rinde bien. `;
    }
    if (cpu.cores <= 4) text += `Con solo ${cpu.cores} núcleos, este procesador está en el límite para juegos modernos. `;
    if (workload.category === "CPU-bound") text += `${workloadName} es muy dependiente de CPU, lo que intensifica el bottleneck. `;
    if (resolution === "1080p") text += `A 1080p la presión sobre la CPU aumenta porque la GPU tiene menos trabajo por resolución y espera instrucciones. `;
    if (qualityData && qualityData.gpuFpsMult > 1.3) text += `Con calidad <strong>${qualLabel}</strong> la GPU tiene menos carga y la CPU se vuelve el cuello de botella natural. `;

  } else if (diagnosis.includes("GPU")) {
    text = `La <strong>${gpuName}</strong> es el factor limitante con <strong>${cpuName}</strong> en <strong>${workloadName}</strong> a <strong>${resLabel}</strong> — calidad <strong>${qualLabel}</strong>. `;
    if (severity === "severe") {
      text += `Bottleneck <strong>severo (${percent}%)</strong>. La GPU rinde ~${Math.round(gpuThroughput)} FPS pero la CPU puede manejar ~${Math.round(cpuThroughput)} FPS. `;
      text += `Para esta calidad y resolución necesitas una GPU significativamente más potente. `;
    } else if (severity === "moderate") {
      text += `Bottleneck <strong>moderado (${percent}%)</strong>. La GPU trabaja al límite pero el sistema es usable. `;
    } else {
      text += `Bottleneck <strong>leve (${percent}%)</strong>. La GPU es el limitante pero el rendimiento es sólido. `;
    }
    if (resolution === "4K") text += `A 4K es normal y esperado que la GPU sea el cuello de botella. `;
    if (qualityData && qualityData.gpuFpsMult < 0.8) text += `Con <strong>${qualLabel}</strong> el coste de renderizado es muy alto, lo que explica la carga extrema en GPU. `;
    if (vramFactor < 1.0) text += `Además, la VRAM insuficiente está penalizando el rendimiento. `;

  } else {
    text = `<strong>${cpuName}</strong> y <strong>${gpuName}</strong> están <strong>bien balanceados</strong> en <strong>${workloadName}</strong> a <strong>${resLabel}</strong> — calidad <strong>${qualLabel}</strong>. `;
    text += `CPU puede entregar ~${Math.round(cpuThroughput)} FPS y GPU ~${Math.round(gpuThroughput)} FPS. Resultado: ${actualFps} FPS estables. `;
    text += `Combinación ideal para aprovechar al máximo la inversión. `;
  }

  return text;
}

// ── UPGRADE RECOMMENDATIONS ───────────────────────────────────────────────────
function generateUpgrades(component, cpu, gpu, severity) {
  if (!component || severity === "balanced") {
    return { message: "No se necesitan upgrades. Tu sistema está bien balanceado.", suggestions: [] };
  }

  const recommendations = [];

  if (component === "CPU") {
    const targetTier = severity === "severe" ? "high" : "mid";
    (UPGRADE_RECOMMENDATIONS.cpu[targetTier] || []).forEach(candidate => {
      const c = CPU_DATA[candidate];
      if (c && c.fpsGaming > cpu.fpsGaming * 1.15) {
        const improvement = Math.round(((c.fpsGaming - cpu.fpsGaming) / cpu.fpsGaming) * 100);
        recommendations.push({
          component: candidate, type: "CPU",
          improvement: `+${improvement}% FPS`,
          tier: c.tier, socket: c.socket,
          note: c.socket !== cpu.socket ? "Requiere cambio de placa madre" : "Compatible con tu placa actual",
        });
      }
    });
    return { message: "Para eliminar el bottleneck de CPU, considera estos upgrades:", suggestions: recommendations.slice(0, 3) };

  } else {
    const targetTier = severity === "severe" ? "high" : "mid";
    (UPGRADE_RECOMMENDATIONS.gpu[targetTier] || []).forEach(candidate => {
      const g = GPU_DATA[candidate];
      if (g && g.fpsGaming > gpu.fpsGaming * 1.15) {
        const improvement = Math.round(((g.fpsGaming - gpu.fpsGaming) / gpu.fpsGaming) * 100);
        recommendations.push({
          component: candidate, type: "GPU",
          improvement: `+${improvement}% FPS`,
          tier: g.tier, tdp: g.tdp,
          note: g.tdp > gpu.tdp + 100 ? `Verifica que tu fuente soporte ${g.tdp}W` : "Compatible con tu fuente actual",
        });
      }
    });
    return { message: "Para eliminar el bottleneck de GPU, considera estos upgrades:", suggestions: recommendations.slice(0, 3) };
  }
}

// ── RESOLUTION IMPACT ─────────────────────────────────────────────────────────
function analyzeResolutionImpact(cpu, gpu, workload, ramData, useCaseData, qualityData) {
  const qd = qualityData || QUALITY_MULTIPLIERS["ultra"];
  return ["1080p", "1440p", "4K"].map(res => {
    const cpuScaling   = workload.cpuScaling[res] || 1.0;
    const gpuScaling   = workload.gpuScaling[res] || 1.0;
    const vramRequired = workload.vramRequired[res] || 4;

    let vramFactor = 1.0;
    if (gpu.vram < vramRequired) {
      vramFactor = Math.max(0.45, 1.0 - ((vramRequired - gpu.vram) * 0.13));
    }

    const cpuThroughput = cpu.fpsGaming * cpuScaling * ramData.fpsFactor * useCaseData.cpuFactor;
    const gpuThroughput = gpu.fpsGaming * gpuScaling * qd.gpuFpsMult * vramFactor * useCaseData.gpuFactor;
    const actualFps     = Math.round(Math.min(cpuThroughput, gpuThroughput) * 0.98);

    const faster  = Math.max(cpuThroughput, gpuThroughput);
    const slower  = Math.min(cpuThroughput, gpuThroughput);
    const percent = Math.min(Math.round(((faster - slower) / faster) * 100), 65);

    let bottleneck = "balanced";
    if      (cpuThroughput < gpuThroughput / 1.18) bottleneck = "cpu";
    else if (gpuThroughput < cpuThroughput / 1.18) bottleneck = "gpu";

    return { resolution: res, label: res, bottleneck, percent, fps: actualFps, vramWarning: vramFactor < 1.0 };
  });
}

// ── BENCHMARK VALIDATION ──────────────────────────────────────────────────────
function validateAgainstBenchmarks(cpuName, gpuName, resolution, calculatedFps) {
  const combo     = `${cpuName} + ${gpuName}`;
  const benchmark = BENCHMARK_COMBOS[combo];
  if (!benchmark) return null;

  const expectedFps      = benchmark[resolution];
  if (!expectedFps) return null;

  const deviation        = Math.abs(calculatedFps - expectedFps);
  const deviationPercent = Math.round((deviation / expectedFps) * 100);

  return {
    combo, resolution, calculatedFps, expectedFps, deviation, deviationPercent,
    accuracy: deviationPercent <= 10 ? "high" : deviationPercent <= 20 ? "medium" : "low",
  };
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function getBottleneckClass(percent) {
  if (percent <= 25) return "balanced";
  if (percent <= 45) return "warn";
  return "danger";
}

function getBottleneckLabel(percent) {
  if (percent <= 10) return "Bien Balanceado";
  if (percent <= 25) return "Bottleneck Leve";
  if (percent <= 45) return "Bottleneck Moderado";
  return "Bottleneck Severo";
}

// ── MODULE EXPORT (Node / test) ───────────────────────────────────────────────
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateBottleneck, generateExplanation, generateUpgrades,
    analyzeResolutionImpact, validateAgainstBenchmarks,
    getBottleneckClass, getBottleneckLabel,
  };
}
