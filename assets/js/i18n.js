// ============================================
// BOTTLENECKCALC — Internationalization (i18n)
// Languages: Español (es) | English (en)
// ============================================

const TRANSLATIONS = {
  es: {
    // ── NAV ──
    "nav.gaming":    "Gaming",
    "nav.ia":        "IA / ML",
    "nav.edicion":   "Edición",
    "nav.rendering": "Rendering",
    "nav.streaming": "Streaming",
    "nav.cpus":      "CPUs",
    "nav.gpus":      "GPUs",
    "nav.blog":      "Blog",
    "nav.open_menu": "Abrir menú",
    // ── BREADCRUMB ──
    "bc.home": "Inicio",
    "bc.calc": "Calculadora",
    // ── SIDEBAR ──
    "sidebar.title":      "Configuración",
    "sidebar.components": "Componentes",
    "sidebar.cpu":        "Procesador (CPU)",
    "sidebar.gpu":        "Tarjeta Gráfica (GPU)",
    "sidebar.ram":        "Memoria RAM",
    "sidebar.settings":   "Ajustes",
    "sidebar.resolution": "Resolución",
    "sidebar.workload":   "Juego / Uso",
    "sidebar.usecase":    "Tipo de Uso",
    "sidebar.storage":    "Almacenamiento",
    "sidebar.quality":    "Calidad Gráfica",
    "sidebar.live":       "Actualización en vivo",
    "sidebar.btn":        "Calcular Bottleneck",
    // ── SELECT OPTIONS — USECASE ──
    "uc.gaming":      "Gaming",
    "uc.streaming":   "Gaming + Streaming",
    "uc.editing":     "Edición de Video / 3D",
    "uc.productivity":"Productividad Pesada",
    // ── SELECT OPTIONS — QUALITY ──
    "q.low":      "Baja (Low)",
    "q.medium":   "Media (Medium)",
    "q.high":     "Alta (High)",
    "q.ultra":    "Ultra / Máximo",
    "q.ultra_rt": "Ultra + Ray Tracing",
    // ── SELECT OPTIONS — STORAGE ──
    "st.hdd":    "HDD — Disco Duro",
    "st.ssd":    "SSD SATA",
    "st.nvme3":  "NVMe PCIe 3.0",
    "st.nvme4":  "NVMe PCIe 4.0",
    "st.nvme5":  "NVMe PCIe 5.0",
    // ── SELECT OPTIONS — RESOLUTION ──
    "res.1080p": "1920 × 1080 (1080p)",
    "res.1440p": "2560 × 1440 (1440p)",
    "res.4k":    "3840 × 2160 (4K)",
    // ── RESULTS PANEL ──
    "results.title":    "Resultados del Análisis",
    "results.analyzing":"Analizando...",
    // ── EMPTY STATE ──
    "empty.title": "Sin Datos",
    "empty.desc":  "Selecciona tu CPU, GPU y juego/uso en el panel lateral, luego presiona Calcular para ver el análisis de bottleneck.",
    // ── METRICS ──
    "metric.fps":      "FPS Estimado",
    "metric.low":      "1% Low",
    "metric.gpu":      "Uso GPU",
    "metric.cpu":      "Uso CPU",
    "metric.hint_avg": "Promedio",
    "metric.hint_min": "Mínimos",
    "metric.hint_util":"Utilización",
    // ── RESULT BAR LABELS ──
    "bar.balanced": "Balanceado",
    "bar.moderate": "Moderado",
    "bar.severe":   "Severo",
    // ── CARDS ──
    "detail.title":    "Análisis Detallado",
    "res.title":       "Impacto por Resolución",
    "upgrades.title":  "Recomendaciones de Upgrade",
    "component.cpu":   "CPU Seleccionada",
    "component.gpu":   "GPU Seleccionada",
    "share.title":     "Compartir Resultado",
    "share.copy":      "Copiar Link",
    // ── RESOLUTION IMPACT LABELS ──
    "ri.balanced":  "Balanceado",
    "ri.cpu_limit": "CPU Limit",
    "ri.gpu_limit": "GPU Limit",
    // ── COMPONENT DETAIL ROWS ──
    "det.model":      "Modelo",
    "det.cores":      "Núcleos / Hilos",
    "det.arch":       "Arquitectura",
    "det.socket":     "Socket",
    "det.tdp":        "TDP",
    "det.year":       "Año",
    "det.throughput": "Throughput",
    "det.vram":       "VRAM",
    // ── UPGRADES ──
    "upg.none":    "No se necesitan upgrades. Tu sistema está bien balanceado.",
    "upg.cpu_msg": "Para eliminar el bottleneck de CPU, considera estos upgrades:",
    "upg.gpu_msg": "Para eliminar el bottleneck de GPU, considera estos upgrades:",
    // ── VALIDATION ──
    "val.high":   "✓ Validado con benchmarks reales",
    "val.medium": "~ Dentro del margen esperado",
    "val.low":    "⚠ Desviación significativa de benchmarks",
    // ── STORAGE WARNINGS ──
    "storage.warn.hdd": "⚠ HDD detectado — tiempos de carga lentos y posibles micro-stutters en mundos abiertos (GTA V, Cyberpunk 2077, RDR2). Upgrading a SSD mejora los 1% Lows notablemente.",
    // ── ALERTS ──
    "alert.select": "Por favor selecciona CPU, GPU y un juego/aplicación",
    "alert.copied": "Link copiado al portapapeles",
    // ── FOOTER ──
    "footer.data": "Datos de Hardware Unboxed, GamersNexus, TechPowerUp. Estimaciones aproximadas — el rendimiento real varía según configuración, drivers y versión del juego.",
  },

  en: {
    // ── NAV ──
    "nav.gaming":    "Gaming",
    "nav.ia":        "AI / ML",
    "nav.edicion":   "Editing",
    "nav.rendering": "Rendering",
    "nav.streaming": "Streaming",
    "nav.cpus":      "CPUs",
    "nav.gpus":      "GPUs",
    "nav.blog":      "Blog",
    "nav.open_menu": "Open menu",
    // ── BREADCRUMB ──
    "bc.home": "Home",
    "bc.calc": "Calculator",
    // ── SIDEBAR ──
    "sidebar.title":      "Settings",
    "sidebar.components": "Components",
    "sidebar.cpu":        "Processor (CPU)",
    "sidebar.gpu":        "Graphics Card (GPU)",
    "sidebar.ram":        "RAM Memory",
    "sidebar.settings":   "Settings",
    "sidebar.resolution": "Resolution",
    "sidebar.workload":   "Game / Use",
    "sidebar.usecase":    "Use Case",
    "sidebar.storage":    "Storage",
    "sidebar.quality":    "Graphics Quality",
    "sidebar.live":       "Live Update",
    "sidebar.btn":        "Calculate Bottleneck",
    // ── SELECT OPTIONS — USECASE ──
    "uc.gaming":       "Gaming",
    "uc.streaming":    "Gaming + Streaming",
    "uc.editing":      "Video Editing / 3D",
    "uc.productivity": "Heavy Productivity",
    // ── SELECT OPTIONS — QUALITY ──
    "q.low":      "Low",
    "q.medium":   "Medium",
    "q.high":     "High",
    "q.ultra":    "Ultra / Max",
    "q.ultra_rt": "Ultra + Ray Tracing",
    // ── SELECT OPTIONS — STORAGE ──
    "st.hdd":   "HDD — Hard Drive",
    "st.ssd":   "SSD SATA",
    "st.nvme3": "NVMe PCIe 3.0",
    "st.nvme4": "NVMe PCIe 4.0",
    "st.nvme5": "NVMe PCIe 5.0",
    // ── SELECT OPTIONS — RESOLUTION ──
    "res.1080p": "1920 × 1080 (1080p)",
    "res.1440p": "2560 × 1440 (1440p)",
    "res.4k":    "3840 × 2160 (4K)",
    // ── RESULTS PANEL ──
    "results.title":     "Analysis Results",
    "results.analyzing": "Analyzing...",
    // ── EMPTY STATE ──
    "empty.title": "No Data",
    "empty.desc":  "Select your CPU, GPU and game/use in the sidebar, then press Calculate to see the bottleneck analysis.",
    // ── METRICS ──
    "metric.fps":      "Estimated FPS",
    "metric.low":      "1% Low",
    "metric.gpu":      "GPU Usage",
    "metric.cpu":      "CPU Usage",
    "metric.hint_avg": "Average",
    "metric.hint_min": "Minimums",
    "metric.hint_util":"Utilization",
    // ── RESULT BAR LABELS ──
    "bar.balanced": "Balanced",
    "bar.moderate": "Moderate",
    "bar.severe":   "Severe",
    // ── CARDS ──
    "detail.title":   "Detailed Analysis",
    "res.title":      "Resolution Impact",
    "upgrades.title": "Upgrade Recommendations",
    "component.cpu":  "Selected CPU",
    "component.gpu":  "Selected GPU",
    "share.title":    "Share Result",
    "share.copy":     "Copy Link",
    // ── RESOLUTION IMPACT LABELS ──
    "ri.balanced":  "Balanced",
    "ri.cpu_limit": "CPU Limit",
    "ri.gpu_limit": "GPU Limit",
    // ── COMPONENT DETAIL ROWS ──
    "det.model":      "Model",
    "det.cores":      "Cores / Threads",
    "det.arch":       "Architecture",
    "det.socket":     "Socket",
    "det.tdp":        "TDP",
    "det.year":       "Year",
    "det.throughput": "Throughput",
    "det.vram":       "VRAM",
    // ── UPGRADES ──
    "upg.none":    "No upgrades needed. Your system is well balanced.",
    "upg.cpu_msg": "To eliminate the CPU bottleneck, consider these upgrades:",
    "upg.gpu_msg": "To eliminate the GPU bottleneck, consider these upgrades:",
    // ── VALIDATION ──
    "val.high":   "✓ Validated against real benchmarks",
    "val.medium": "~ Within expected margin",
    "val.low":    "⚠ Significant deviation from benchmarks",
    // ── STORAGE WARNINGS ──
    "storage.warn.hdd": "⚠ HDD detected — slow loading times and possible micro-stutters in open-world games (GTA V, Cyberpunk 2077, RDR2). Upgrading to an SSD noticeably improves 1% Lows.",
    // ── ALERTS ──
    "alert.select": "Please select a CPU, GPU and game/application",
    "alert.copied": "Link copied to clipboard",
    // ── FOOTER ──
    "footer.data": "Data from Hardware Unboxed, GamersNexus, TechPowerUp. Approximate estimates — real performance varies by configuration, drivers and game version.",
  }
};

// ── Core helpers ──────────────────────────────────────────────────────────────

let currentLang = localStorage.getItem('bc_lang') || 'es';

/** Translate a key. Falls back to Spanish, then returns the key itself. */
function t(key) {
  return TRANSLATIONS[currentLang]?.[key]
      ?? TRANSLATIONS['es']?.[key]
      ?? key;
}

/** Apply a language: translate DOM, update toggle state, persist choice. */
function applyLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('bc_lang', lang);
  document.documentElement.lang = lang;

  // textContent replacements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.getAttribute('data-i18n'));
    if (val) el.textContent = val;
  });

  // placeholder replacements
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const val = t(el.getAttribute('data-i18n-ph'));
    if (val) el.placeholder = val;
  });

  // aria-label replacements
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const val = t(el.getAttribute('data-i18n-aria'));
    if (val) el.setAttribute('aria-label', val);
  });

  // <select> option text replacements
  document.querySelectorAll('select[data-i18n-select] option[data-i18n]').forEach(opt => {
    const val = t(opt.getAttribute('data-i18n'));
    if (val) opt.textContent = val;
  });

  // Toggle button active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ── Init on DOM ready ─────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });
  applyLanguage(currentLang);
});

// Expose to other scripts loaded after this one
window.t = t;
window.applyLanguage = applyLanguage;
window.currentLang = currentLang; // live reference via window
