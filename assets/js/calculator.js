// ============================================
// PC BOTTLENECK CALCULATOR - Advanced Engine
// ============================================

function calculateBottleneck(cpuName, gpuName, ram, resolution, workloadName, useCase = "gaming") {
  const cpu = CPU_DATA[cpuName];
  const gpu = GPU_DATA[gpuName];
  const workload = WORKLOAD_DATA[workloadName];
  const resMult = RESOLUTION_MULTIPLIERS[resolution] || RESOLUTION_MULTIPLIERS["1080p"];
  const ramMult = RAM_MULTIPLIERS[ram] || RAM_MULTIPLIERS["16"];
  const useMult = USE_CASE_MULTIPLIERS[useCase] || USE_CASE_MULTIPLIERS["gaming"];

  if (!cpu || !gpu || !workload) {
    return { error: "Invalid components selected" };
  }

  // Calculate adjusted scores
  const cpuScore = cpu.score * resMult.cpuScale * ramMult.avg * useMult.cpuScale;
  const gpuScore = gpu.score * resMult.gpuScale * ramMult.avg * useMult.gpuScale;

  // Determine bottleneck direction and percentage
  const stronger = Math.max(cpuScore, gpuScore);
  const weaker = Math.min(cpuScore, gpuScore);
  const rawPercent = Math.round(((stronger - weaker) / stronger) * 100);
  const bottleneckPercent = Math.min(rawPercent, 65);

  // Determine diagnosis
  let diagnosis, badgeClass, bottleneckedComponent, explanation;
  
  if (cpuScore < gpuScore * 0.85) {
    diagnosis = "CPU Bottleneck";
    badgeClass = "cpu";
    bottleneckedComponent = "CPU";
  } else if (gpuScore < cpuScore * 0.85) {
    diagnosis = "GPU Bottleneck";
    badgeClass = "gpu";
    bottleneckedComponent = "GPU";
  } else {
    diagnosis = "Well Balanced";
    badgeClass = "balanced";
    bottleneckedComponent = null;
  }

  // Determine severity
  let severity = "balanced";
  if (bottleneckPercent <= 15) severity = "balanced";
  else if (bottleneckPercent <= 30) severity = "slight";
  else if (bottleneckPercent <= 45) severity = "moderate";
  else severity = "severe";

  // Calculate FPS estimates
  const baseFps = workload.baseFps;
  const cpuFps = baseFps * (cpuScore / 100);
  const gpuFps = baseFps * (gpuScore / 100);
  const finalAvg = Math.round(Math.min(cpuFps, gpuFps));
  const finalLow = Math.round(finalAvg * 0.75);

  // GPU usage estimate
  const gpuUsage = diagnosis === "GPU Bottleneck"
    ? 99
    : Math.min(Math.round((cpuScore / gpuScore) * 97), 99);

  // CPU usage estimate
  const cpuUsage = diagnosis === "CPU Bottleneck"
    ? 99
    : Math.min(Math.round((gpuScore / cpuScore) * 97), 99);

  // Generate detailed explanation
  explanation = generateExplanation(cpuName, gpuName, workloadName, resolution, diagnosis, bottleneckPercent, bottleneckedComponent, severity, cpu, gpu);

  // Generate upgrade recommendations
  const upgrades = generateUpgrades(bottleneckedComponent, cpu, gpu, severity);

  // Resolution impact analysis
  const resolutionImpact = analyzeResolutionImpact(cpu, gpu, workload);

  return {
    bottleneckPercent,
    rawPercent,
    diagnosis,
    badgeClass,
    severity,
    bottleneckedComponent,
    fps: finalAvg,
    lowFps: finalLow,
    gpuUsage,
    cpuUsage,
    cpuScore: Math.round(cpuScore),
    gpuScore: Math.round(gpuScore),
    explanation,
    upgrades,
    resolutionImpact,
    ramStatus: ramMult.status,
    workload: workloadName,
    resolution,
    useCase,
  };
}

function generateExplanation(cpuName, gpuName, workloadName, resolution, diagnosis, percent, component, severity, cpu, gpu) {
  const workload = WORKLOAD_DATA[workloadName];
  const resLabel = RESOLUTION_MULTIPLIERS[resolution]?.label || resolution;
  
  let text = "";
  
  if (diagnosis === "CPU Bottleneck") {
    text = `Tu <strong>${cpuName}</strong> está limitando el rendimiento de tu <strong>${gpuName}</strong> en <strong>${workloadName}</strong> a <strong>${resLabel}</strong>. `;
    
    if (severity === "severe") {
      text += `El cuello de botella es <strong>severo (${percent}%)</strong>. Tu CPU no puede alimentar suficientes frames a la GPU, desperdiciando gran parte de su potencial. `;
      text += `En juegos CPU-bound como este, verás stuttering y FPS inconsistentes incluso con una GPU potente. `;
    } else if (severity === "moderate") {
      text += `El cuello de botella es <strong>moderado (${percent}%)</strong>. Tu CPU limita el rendimiento de forma notable. `;
      text += `Podrías obtener mejores resultados con un procesador más rápido, especialmente en escenarios multijugador. `;
    } else {
      text += `El cuello de botella es <strong>leve (${percent}%)</strong>. La CPU es el factor limitante pero no crítico. `;
    }
    
    // Add specific context
    if (cpu.cores <= 4) {
      text += `Con solo ${cpu.cores} núcleos, este procesador se queda corto para juegos modernos que aprovechan 6+ cores. `;
    }
    if (workload.cpuWeight > 0.6) {
      text += `${workloadName} es particularmente exigente con el CPU, lo que agrava el bottleneck. `;
    }
    if (resolution === "1080p") {
      text += `A 1080p el bottleneck de CPU es más pronunciado porque la GPU renderiza frames más rápido de lo que el CPU puede preparar. `;
    }
    
  } else if (diagnosis === "GPU Bottleneck") {
    text = `Tu <strong>${gpuName}</strong> es el factor limitante con el <strong>${cpuName}</strong> en <strong>${workloadName}</strong> a <strong>${resLabel}</strong>. `;
    
    if (severity === "severe") {
      text += `El cuello de botella es <strong>severo (${percent}%)</strong>. Tu GPU está al 100% de carga mientras el CPU espera. `;
      text += `Para esta resolución y juego, necesitas una tarjeta gráfica significativamente más potente. `;
    } else if (severity === "moderate") {
      text += `El cuello de botella es <strong>moderado (${percent}%)</strong>. La GPU trabaja al límite pero el sistema es usable. `;
    } else {
      text += `El cuello de botella es <strong>leve (${percent}%)</strong>. La GPU es el limitante pero el rendimiento es aceptable. `;
    }
    
    if (resolution === "4K") {
      text += `A 4K es normal que la GPU sea el cuello de botella - es el escenario esperado. `;
    }
    if (gpu.vram < 8 && resolution === "1440p") {
      text += `Con solo ${gpu.vram}GB de VRAM, podrías tener limitaciones de memoria en texturas altas a esta resolución. `;
    }
    
  } else {
    text = `Tu <strong>${cpuName}</strong> y <strong>${gpuName}</strong> están <strong>bien balanceados</strong> para <strong>${workloadName}</strong> a <strong>${resLabel}</strong>. `;
    text += `Ambos componentes trabajan eficientemente juntos sin que ninguno limite significativamente al otro. `;
    text += `Este es el combo ideal para aprovechar al máximo tu inversión. `;
  }
  
  return text;
}

function generateUpgrades(component, cpu, gpu, severity) {
  if (!component || severity === "balanced") {
    return {
      message: "No se necesitan upgrades. Tu sistema está bien balanceado.",
      suggestions: [],
    };
  }

  const recommendations = [];
  
  if (component === "CPU") {
    const targetTier = severity === "severe" ? "high" : "mid";
    const candidates = UPGRADE_RECOMMENDATIONS.cpu[targetTier];
    
    candidates.forEach(candidate => {
      const candidateData = CPU_DATA[candidate];
      if (candidateData && candidateData.score > cpu.score * 1.2) {
        const improvement = Math.round(((candidateData.score - cpu.score) / cpu.score) * 100);
        recommendations.push({
          component: candidate,
          type: "CPU",
          improvement: `+${improvement}%`,
          tier: candidateData.tier,
          socket: candidateData.socket,
          note: candidateData.socket !== cpu.socket ? "Requiere cambio de placa madre" : "Compatible con tu placa actual",
        });
      }
    });
    
    return {
      message: `Para eliminar el bottleneck de CPU, considera estos upgrades:`,
      suggestions: recommendations.slice(0, 3),
    };
    
  } else {
    const targetTier = severity === "severe" ? "high" : "mid";
    const candidates = UPGRADE_RECOMMENDATIONS.gpu[targetTier];
    
    candidates.forEach(candidate => {
      const candidateData = GPU_DATA[candidate];
      if (candidateData && candidateData.score > gpu.score * 1.2) {
        const improvement = Math.round(((candidateData.score - gpu.score) / gpu.score) * 100);
        recommendations.push({
          component: candidate,
          type: "GPU",
          improvement: `+${improvement}%`,
          tier: candidateData.tier,
          tdp: candidateData.tdp,
          note: candidateData.tdp > gpu.tdp + 100 ? `Verifica que tu fuente soporte ${candidateData.tdp}W` : "Compatible con tu fuente actual",
        });
      }
    });
    
    return {
      message: `Para eliminar el bottleneck de GPU, considera estos upgrades:`,
      suggestions: recommendations.slice(0, 3),
    };
  }
}

function analyzeResolutionImpact(cpu, gpu, workload) {
  const impacts = [];
  
  ["1080p", "1440p", "4K"].forEach(res => {
    const resMult = RESOLUTION_MULTIPLIERS[res];
    const cpuScore = cpu.score * resMult.cpuScale;
    const gpuScore = gpu.score * resMult.gpuScale;
    
    const stronger = Math.max(cpuScore, gpuScore);
    const weaker = Math.min(cpuScore, gpuScore);
    const percent = Math.round(((stronger - weaker) / stronger) * 100);
    
    let bottleneck = "balanced";
    if (cpuScore < gpuScore * 0.85) bottleneck = "cpu";
    else if (gpuScore < cpuScore * 0.85) bottleneck = "gpu";
    
    impacts.push({
      resolution: res,
      label: resMult.label,
      bottleneck,
      percent: Math.min(percent, 65),
      cpuScore: Math.round(cpuScore),
      gpuScore: Math.round(gpuScore),
    });
  });
  
  return impacts;
}

function getBottleneckClass(percent) {
  if (percent <= 15) return "balanced";
  if (percent <= 30) return "balanced";
  if (percent <= 45) return "warn";
  return "danger";
}

function getBottleneckLabel(percent) {
  if (percent <= 15) return "Well Balanced";
  if (percent <= 30) return "Slight Bottleneck";
  if (percent <= 45) return "Moderate Bottleneck";
  return "Severe Bottleneck";
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateBottleneck, generateExplanation, generateUpgrades, analyzeResolutionImpact, getBottleneckClass, getBottleneckLabel };
}
