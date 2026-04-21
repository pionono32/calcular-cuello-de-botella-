// ============================================
// PC BOTTLENECK CALCULATOR - Hardware Database
// ============================================

// Scores are normalized gaming performance indexes
// Higher = better for gaming at 1080p
// cpuWeight: how CPU-dependent the game is (0-1)

const CPU_DATA = {
  // === AMD RYZEN 3 ===
  "Ryzen 3 1200": { score: 15, cores: 4, threads: 4, tier: "budget", tdp: 65, socket: "AM4", year: 2017, arch: "Zen" },
  "Ryzen 3 2200G": { score: 18, cores: 4, threads: 4, tier: "budget", tdp: 65, socket: "AM4", year: 2018, arch: "Zen+" },
  "Ryzen 3 3100": { score: 32, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "AM4", year: 2020, arch: "Zen 2" },
  "Ryzen 3 3300X": { score: 38, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "AM4", year: 2020, arch: "Zen 2" },
  "Ryzen 3 4100": { score: 30, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "AM4", year: 2022, arch: "Zen 2" },

  // === AMD RYZEN 5 ===
  "Ryzen 5 1600": { score: 28, cores: 6, threads: 12, tier: "budget", tdp: 65, socket: "AM4", year: 2017, arch: "Zen" },
  "Ryzen 5 2600": { score: 35, cores: 6, threads: 12, tier: "budget", tdp: 65, socket: "AM4", year: 2018, arch: "Zen+" },
  "Ryzen 5 3400G": { score: 22, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "AM4", year: 2019, arch: "Zen+", igpu: "Vega 11" },
  "Ryzen 5 3600": { score: 48, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "AM4", year: 2019, arch: "Zen 2" },
  "Ryzen 5 3600X": { score: 52, cores: 6, threads: 12, tier: "mid", tdp: 95, socket: "AM4", year: 2019, arch: "Zen 2" },
  "Ryzen 5 5500": { score: 55, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "AM4", year: 2022, arch: "Zen 3" },
  "Ryzen 5 5500X3D": { score: 72, cores: 6, threads: 12, tier: "high", tdp: 65, socket: "AM4", year: 2024, arch: "Zen 3", vcache: true },
  "Ryzen 5 5600": { score: 62, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "AM4", year: 2022, arch: "Zen 3" },
  "Ryzen 5 5600X": { score: 68, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "AM4", year: 2020, arch: "Zen 3" },
  "Ryzen 5 5600X3D": { score: 78, cores: 6, threads: 12, tier: "high", tdp: 65, socket: "AM4", year: 2023, arch: "Zen 3", vcache: true },
  "Ryzen 5 7500F": { score: 82, cores: 6, threads: 12, tier: "high", tdp: 65, socket: "AM5", year: 2023, arch: "Zen 4" },
  "Ryzen 5 7600": { score: 85, cores: 6, threads: 12, tier: "high", tdp: 65, socket: "AM5", year: 2023, arch: "Zen 4" },
  "Ryzen 5 7600X": { score: 90, cores: 6, threads: 12, tier: "high", tdp: 105, socket: "AM5", year: 2022, arch: "Zen 4" },
  "Ryzen 5 9600X": { score: 95, cores: 6, threads: 12, tier: "high", tdp: 65, socket: "AM5", year: 2024, arch: "Zen 5" },

  // === AMD RYZEN 7 ===
  "Ryzen 7 1700": { score: 32, cores: 8, threads: 16, tier: "budget", tdp: 65, socket: "AM4", year: 2017, arch: "Zen" },
  "Ryzen 7 2700X": { score: 42, cores: 8, threads: 16, tier: "mid", tdp: 105, socket: "AM4", year: 2018, arch: "Zen+" },
  "Ryzen 7 3700X": { score: 58, cores: 8, threads: 16, tier: "mid", tdp: 65, socket: "AM4", year: 2019, arch: "Zen 2" },
  "Ryzen 7 5800X": { score: 75, cores: 8, threads: 16, tier: "high", tdp: 105, socket: "AM4", year: 2020, arch: "Zen 3" },
  "Ryzen 7 5800X3D": { score: 88, cores: 8, threads: 16, tier: "high", tdp: 105, socket: "AM4", year: 2022, arch: "Zen 3", vcache: true },
  "Ryzen 7 7700": { score: 92, cores: 8, threads: 16, tier: "high", tdp: 65, socket: "AM5", year: 2023, arch: "Zen 4" },
  "Ryzen 7 7700X": { score: 98, cores: 8, threads: 16, tier: "high", tdp: 105, socket: "AM5", year: 2022, arch: "Zen 4" },
  "Ryzen 7 7800X3D": { score: 115, cores: 8, threads: 16, tier: "enthusiast", tdp: 120, socket: "AM5", year: 2023, arch: "Zen 4", vcache: true },
  "Ryzen 7 9700X": { score: 108, cores: 8, threads: 16, tier: "enthusiast", tdp: 65, socket: "AM5", year: 2024, arch: "Zen 5" },

  // === AMD RYZEN 9 ===
  "Ryzen 9 3900X": { score: 72, cores: 12, threads: 24, tier: "high", tdp: 105, socket: "AM4", year: 2019, arch: "Zen 2" },
  "Ryzen 9 5900X": { score: 88, cores: 12, threads: 24, tier: "high", tdp: 105, socket: "AM4", year: 2020, arch: "Zen 3" },
  "Ryzen 9 5950X": { score: 98, cores: 16, threads: 32, tier: "enthusiast", tdp: 105, socket: "AM4", year: 2020, arch: "Zen 3" },
  "Ryzen 9 7900": { score: 105, cores: 12, threads: 24, tier: "enthusiast", tdp: 65, socket: "AM5", year: 2023, arch: "Zen 4" },
  "Ryzen 9 7900X": { score: 112, cores: 12, threads: 24, tier: "enthusiast", tdp: 170, socket: "AM5", year: 2022, arch: "Zen 4" },
  "Ryzen 9 7950X": { score: 125, cores: 16, threads: 32, tier: "enthusiast", tdp: 170, socket: "AM5", year: 2022, arch: "Zen 4" },
  "Ryzen 9 7950X3D": { score: 130, cores: 16, threads: 32, tier: "enthusiast", tdp: 120, socket: "AM5", year: 2023, arch: "Zen 4", vcache: true },
  "Ryzen 9 9900X": { score: 120, cores: 12, threads: 24, tier: "enthusiast", tdp: 120, socket: "AM5", year: 2024, arch: "Zen 5" },
  "Ryzen 9 9950X": { score: 135, cores: 16, threads: 32, tier: "enthusiast", tdp: 170, socket: "AM5", year: 2024, arch: "Zen 5" },

  // === INTEL CORE i3 (10th-14th Gen) ===
  "Core i3-10100F": { score: 35, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "LGA1200", year: 2020, arch: "Comet Lake" },
  "Core i3-12100F": { score: 48, cores: 4, threads: 8, tier: "budget", tdp: 58, socket: "LGA1700", year: 2022, arch: "Alder Lake" },
  "Core i3-13100F": { score: 52, cores: 4, threads: 8, tier: "budget", tdp: 58, socket: "LGA1700", year: 2023, arch: "Raptor Lake" },
  "Core i3-14100F": { score: 55, cores: 4, threads: 8, tier: "budget", tdp: 58, socket: "LGA1700", year: 2024, arch: "Raptor Lake Refresh" },

  // === INTEL CORE i5 (10th-14th Gen) ===
  "Core i5-10400F": { score: 48, cores: 6, threads: 12, tier: "budget", tdp: 65, socket: "LGA1200", year: 2020, arch: "Comet Lake" },
  "Core i5-11400F": { score: 54, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "LGA1200", year: 2021, arch: "Rocket Lake" },
  "Core i5-12400F": { score: 65, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "LGA1700", year: 2022, arch: "Alder Lake" },
  "Core i5-13400F": { score: 75, cores: 10, threads: 16, tier: "mid", tdp: 65, socket: "LGA1700", year: 2023, arch: "Raptor Lake" },
  "Core i5-14400F": { score: 78, cores: 10, threads: 16, tier: "mid", tdp: 65, socket: "LGA1700", year: 2024, arch: "Raptor Lake Refresh" },
  "Core i5-12600K": { score: 78, cores: 10, threads: 16, tier: "high", tdp: 125, socket: "LGA1700", year: 2021, arch: "Alder Lake" },
  "Core i5-13600K": { score: 92, cores: 14, threads: 20, tier: "high", tdp: 125, socket: "LGA1700", year: 2022, arch: "Raptor Lake" },
  "Core i5-14600K": { score: 96, cores: 14, threads: 20, tier: "high", tdp: 125, socket: "LGA1700", year: 2023, arch: "Raptor Lake Refresh" },

  // === INTEL CORE i7 (10th-14th Gen) ===
  "Core i7-10700K": { score: 65, cores: 8, threads: 16, tier: "mid", tdp: 125, socket: "LGA1200", year: 2020, arch: "Comet Lake" },
  "Core i7-11700K": { score: 72, cores: 8, threads: 16, tier: "high", tdp: 125, socket: "LGA1200", year: 2021, arch: "Rocket Lake" },
  "Core i7-12700K": { score: 88, cores: 12, threads: 20, tier: "high", tdp: 125, socket: "LGA1700", year: 2021, arch: "Alder Lake" },
  "Core i7-13700K": { score: 105, cores: 16, threads: 24, tier: "high", tdp: 125, socket: "LGA1700", year: 2022, arch: "Raptor Lake" },
  "Core i7-14700K": { score: 112, cores: 20, threads: 28, tier: "enthusiast", tdp: 125, socket: "LGA1700", year: 2023, arch: "Raptor Lake Refresh" },
  "Core i7-14700KF": { score: 112, cores: 20, threads: 28, tier: "enthusiast", tdp: 125, socket: "LGA1700", year: 2023, arch: "Raptor Lake Refresh" },

  // === INTEL CORE i9 (10th-14th Gen) ===
  "Core i9-10900K": { score: 72, cores: 10, threads: 20, tier: "high", tdp: 125, socket: "LGA1200", year: 2020, arch: "Comet Lake" },
  "Core i9-11900K": { score: 78, cores: 8, threads: 16, tier: "high", tdp: 125, socket: "LGA1200", year: 2021, arch: "Rocket Lake" },
  "Core i9-12900K": { score: 98, cores: 16, threads: 24, tier: "enthusiast", tdp: 125, socket: "LGA1700", year: 2021, arch: "Alder Lake" },
  "Core i9-13900K": { score: 120, cores: 24, threads: 32, tier: "enthusiast", tdp: 125, socket: "LGA1700", year: 2022, arch: "Raptor Lake" },
  "Core i9-14900K": { score: 125, cores: 24, threads: 32, tier: "enthusiast", tdp: 125, socket: "LGA1700", year: 2023, arch: "Raptor Lake Refresh" },
  "Core i9-14900KS": { score: 128, cores: 24, threads: 32, tier: "enthusiast", tdp: 150, socket: "LGA1700", year: 2024, arch: "Raptor Lake Refresh" },

  // === INTEL CORE ULTRA (15th Gen) ===
  "Core Ultra 5 245K": { score: 90, cores: 6, threads: 14, tier: "high", tdp: 65, socket: "LGA1851", year: 2024, arch: "Arrow Lake" },
  "Core Ultra 7 265K": { score: 110, cores: 8, threads: 24, tier: "enthusiast", tdp: 125, socket: "LGA1851", year: 2024, arch: "Arrow Lake" },
  "Core Ultra 9 285K": { score: 125, cores: 8, threads: 24, tier: "enthusiast", tdp: 125, socket: "LGA1851", year: 2024, arch: "Arrow Lake" },

  // === LEGACY INTEL (for completeness) ===
  "Core i3-6100": { score: 18, cores: 2, threads: 4, tier: "budget", tdp: 51, socket: "LGA1151", year: 2015, arch: "Skylake" },
  "Core i3-7100": { score: 20, cores: 2, threads: 4, tier: "budget", tdp: 51, socket: "LGA1151", year: 2017, arch: "Kaby Lake" },
  "Core i3-8100": { score: 28, cores: 4, threads: 4, tier: "budget", tdp: 65, socket: "LGA1151", year: 2017, arch: "Coffee Lake" },
  "Core i3-9100F": { score: 30, cores: 4, threads: 4, tier: "budget", tdp: 65, socket: "LGA1151", year: 2019, arch: "Coffee Lake Refresh" },
  "Core i5-6400": { score: 25, cores: 4, threads: 4, tier: "budget", tdp: 65, socket: "LGA1151", year: 2015, arch: "Skylake" },
  "Core i5-7400": { score: 28, cores: 4, threads: 4, tier: "budget", tdp: 65, socket: "LGA1151", year: 2017, arch: "Kaby Lake" },
  "Core i5-8400": { score: 38, cores: 6, threads: 6, tier: "budget", tdp: 65, socket: "LGA1151", year: 2017, arch: "Coffee Lake" },
  "Core i5-9400F": { score: 42, cores: 6, threads: 6, tier: "budget", tdp: 65, socket: "LGA1151", year: 2019, arch: "Coffee Lake Refresh" },
  "Core i7-6700": { score: 32, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "LGA1151", year: 2015, arch: "Skylake" },
  "Core i7-7700": { score: 36, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "LGA1151", year: 2017, arch: "Kaby Lake" },
  "Core i7-8700": { score: 48, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "LGA1151", year: 2017, arch: "Coffee Lake" },
  "Core i7-9700K": { score: 55, cores: 8, threads: 8, tier: "mid", tdp: 95, socket: "LGA1151", year: 2018, arch: "Coffee Lake Refresh" },
  "Core i9-9900K": { score: 62, cores: 8, threads: 16, tier: "mid", tdp: 95, socket: "LGA1151", year: 2018, arch: "Coffee Lake Refresh" },
};

const GPU_DATA = {
  // === NVIDIA GTX 900 SERIES ===
  "GTX 950": { score: 15, vram: 2, tier: "budget", tdp: 90, year: 2015, arch: "Maxwell" },
  "GTX 960": { score: 20, vram: 2, tier: "budget", tdp: 120, year: 2015, arch: "Maxwell" },
  "GTX 970": { score: 28, vram: 4, tier: "budget", tdp: 145, year: 2014, arch: "Maxwell" },
  "GTX 980": { score: 35, vram: 4, tier: "budget", tdp: 165, year: 2014, arch: "Maxwell" },
  "GTX 980 Ti": { score: 42, vram: 6, tier: "mid", tdp: 250, year: 2015, arch: "Maxwell" },

  // === NVIDIA GTX 1000 SERIES ===
  "GTX 1050": { score: 18, vram: 2, tier: "budget", tdp: 75, year: 2016, arch: "Pascal" },
  "GTX 1050 Ti": { score: 22, vram: 4, tier: "budget", tdp: 75, year: 2016, arch: "Pascal" },
  "GTX 1060 3GB": { score: 30, vram: 3, tier: "budget", tdp: 120, year: 2016, arch: "Pascal" },
  "GTX 1060 6GB": { score: 34, vram: 6, tier: "budget", tdp: 120, year: 2016, arch: "Pascal" },
  "GTX 1070": { score: 45, vram: 8, tier: "mid", tdp: 150, year: 2016, arch: "Pascal" },
  "GTX 1070 Ti": { score: 50, vram: 8, tier: "mid", tdp: 180, year: 2017, arch: "Pascal" },
  "GTX 1080": { score: 55, vram: 8, tier: "mid", tdp: 180, year: 2016, arch: "Pascal" },
  "GTX 1080 Ti": { score: 68, vram: 11, tier: "high", tdp: 250, year: 2017, arch: "Pascal" },

  // === NVIDIA GTX 1600 SERIES ===
  "GTX 1650": { score: 26, vram: 4, tier: "budget", tdp: 75, year: 2019, arch: "Turing" },
  "GTX 1650 Super": { score: 32, vram: 4, tier: "budget", tdp: 100, year: 2019, arch: "Turing" },
  "GTX 1660": { score: 36, vram: 6, tier: "budget", tdp: 120, year: 2019, arch: "Turing" },
  "GTX 1660 Super": { score: 40, vram: 6, tier: "mid", tdp: 125, year: 2019, arch: "Turing" },
  "GTX 1660 Ti": { score: 42, vram: 6, tier: "mid", tdp: 120, year: 2019, arch: "Turing" },

  // === NVIDIA RTX 2000 SERIES ===
  "RTX 2060": { score: 48, vram: 6, tier: "mid", tdp: 160, year: 2019, arch: "Turing" },
  "RTX 2060 Super": { score: 55, vram: 8, tier: "mid", tdp: 175, year: 2019, arch: "Turing" },
  "RTX 2070": { score: 60, vram: 8, tier: "mid", tdp: 175, year: 2018, arch: "Turing" },
  "RTX 2070 Super": { score: 68, vram: 8, tier: "high", tdp: 215, year: 2019, arch: "Turing" },
  "RTX 2080": { score: 75, vram: 8, tier: "high", tdp: 215, year: 2018, arch: "Turing" },
  "RTX 2080 Super": { score: 80, vram: 8, tier: "high", tdp: 250, year: 2019, arch: "Turing" },
  "RTX 2080 Ti": { score: 92, vram: 11, tier: "enthusiast", tdp: 250, year: 2018, arch: "Turing" },

  // === NVIDIA RTX 3000 SERIES ===
  "RTX 3050": { score: 38, vram: 8, tier: "budget", tdp: 130, year: 2022, arch: "Ampere" },
  "RTX 3060": { score: 55, vram: 12, tier: "mid", tdp: 170, year: 2021, arch: "Ampere" },
  "RTX 3060 Ti": { score: 68, vram: 8, tier: "mid", tdp: 200, year: 2020, arch: "Ampere" },
  "RTX 3070": { score: 78, vram: 8, tier: "high", tdp: 220, year: 2020, arch: "Ampere" },
  "RTX 3070 Ti": { score: 85, vram: 8, tier: "high", tdp: 290, year: 2021, arch: "Ampere" },
  "RTX 3080": { score: 100, vram: 10, tier: "enthusiast", tdp: 320, year: 2020, arch: "Ampere" },
  "RTX 3080 12GB": { score: 105, vram: 12, tier: "enthusiast", tdp: 350, year: 2022, arch: "Ampere" },
  "RTX 3080 Ti": { score: 110, vram: 12, tier: "enthusiast", tdp: 350, year: 2021, arch: "Ampere" },
  "RTX 3090": { score: 115, vram: 24, tier: "enthusiast", tdp: 350, year: 2020, arch: "Ampere" },
  "RTX 3090 Ti": { score: 120, vram: 24, tier: "enthusiast", tdp: 450, year: 2022, arch: "Ampere" },

  // === NVIDIA RTX 4000 SERIES ===
  "RTX 4060": { score: 62, vram: 8, tier: "mid", tdp: 115, year: 2023, arch: "Ada Lovelace" },
  "RTX 4060 Ti": { score: 72, vram: 8, tier: "mid", tdp: 160, year: 2023, arch: "Ada Lovelace" },
  "RTX 4060 Ti 16GB": { score: 72, vram: 16, tier: "mid", tdp: 165, year: 2023, arch: "Ada Lovelace" },
  "RTX 4070": { score: 88, vram: 12, tier: "high", tdp: 200, year: 2023, arch: "Ada Lovelace" },
  "RTX 4070 Super": { score: 95, vram: 12, tier: "high", tdp: 220, year: 2024, arch: "Ada Lovelace" },
  "RTX 4070 Ti": { score: 105, vram: 12, tier: "enthusiast", tdp: 285, year: 2023, arch: "Ada Lovelace" },
  "RTX 4070 Ti Super": { score: 112, vram: 16, tier: "enthusiast", tdp: 285, year: 2024, arch: "Ada Lovelace" },
  "RTX 4080": { score: 125, vram: 16, tier: "enthusiast", tdp: 320, year: 2022, arch: "Ada Lovelace" },
  "RTX 4080 Super": { score: 130, vram: 16, tier: "enthusiast", tdp: 320, year: 2024, arch: "Ada Lovelace" },
  "RTX 4090": { score: 155, vram: 24, tier: "enthusiast", tdp: 450, year: 2022, arch: "Ada Lovelace" },

  // === NVIDIA RTX 5000 SERIES ===
  "RTX 5070": { score: 135, vram: 12, tier: "enthusiast", tdp: 250, year: 2025, arch: "Blackwell" },
  "RTX 5070 Ti": { score: 145, vram: 16, tier: "enthusiast", tdp: 300, year: 2025, arch: "Blackwell" },
  "RTX 5080": { score: 160, vram: 16, tier: "enthusiast", tdp: 360, year: 2025, arch: "Blackwell" },
  "RTX 5090": { score: 185, vram: 32, tier: "enthusiast", tdp: 575, year: 2025, arch: "Blackwell" },

  // === AMD RX 500 SERIES ===
  "RX 560": { score: 12, vram: 4, tier: "budget", tdp: 60, year: 2017, arch: "Polaris" },
  "RX 570": { score: 20, vram: 4, tier: "budget", tdp: 120, year: 2017, arch: "Polaris" },
  "RX 580": { score: 26, vram: 8, tier: "budget", tdp: 185, year: 2017, arch: "Polaris" },
  "RX 590": { score: 30, vram: 8, tier: "budget", tdp: 225, year: 2018, arch: "Polaris" },

  // === AMD RX 5000 SERIES ===
  "RX 5500 XT": { score: 28, vram: 8, tier: "budget", tdp: 130, year: 2019, arch: "Navi" },
  "RX 5600 XT": { score: 42, vram: 6, tier: "mid", tdp: 150, year: 2020, arch: "Navi" },
  "RX 5700": { score: 50, vram: 8, tier: "mid", tdp: 180, year: 2019, arch: "Navi" },
  "RX 5700 XT": { score: 58, vram: 8, tier: "mid", tdp: 225, year: 2019, arch: "Navi" },

  // === AMD RX 6000 SERIES ===
  "RX 6500 XT": { score: 28, vram: 4, tier: "budget", tdp: 107, year: 2022, arch: "Navi 24" },
  "RX 6600": { score: 45, vram: 8, tier: "mid", tdp: 132, year: 2021, arch: "Navi 23" },
  "RX 6600 XT": { score: 52, vram: 8, tier: "mid", tdp: 160, year: 2021, arch: "Navi 23" },
  "RX 6650 XT": { score: 55, vram: 8, tier: "mid", tdp: 180, year: 2022, arch: "Navi 23" },
  "RX 6700 XT": { score: 68, vram: 12, tier: "high", tdp: 230, year: 2021, arch: "Navi 22" },
  "RX 6750 XT": { score: 72, vram: 12, tier: "high", tdp: 250, year: 2022, arch: "Navi 22" },
  "RX 6800": { score: 88, vram: 16, tier: "high", tdp: 250, year: 2020, arch: "Navi 21" },
  "RX 6800 XT": { score: 100, vram: 16, tier: "enthusiast", tdp: 300, year: 2020, arch: "Navi 21" },
  "RX 6900 XT": { score: 108, vram: 16, tier: "enthusiast", tdp: 300, year: 2020, arch: "Navi 21" },
  "RX 6950 XT": { score: 112, vram: 16, tier: "enthusiast", tdp: 335, year: 2022, arch: "Navi 21" },

  // === AMD RX 7000 SERIES ===
  "RX 7600": { score: 58, vram: 8, tier: "mid", tdp: 165, year: 2023, arch: "Navi 33" },
  "RX 7600 XT": { score: 62, vram: 16, tier: "mid", tdp: 190, year: 2024, arch: "Navi 33" },
  "RX 7700 XT": { score: 78, vram: 12, tier: "high", tdp: 245, year: 2023, arch: "Navi 32" },
  "RX 7800 XT": { score: 90, vram: 16, tier: "high", tdp: 263, year: 2023, arch: "Navi 32" },
  "RX 7900 XT": { score: 115, vram: 20, tier: "enthusiast", tdp: 315, year: 2022, arch: "Navi 31" },
  "RX 7900 XTX": { score: 130, vram: 24, tier: "enthusiast", tdp: 355, year: 2022, arch: "Navi 31" },
  "RX 7900 GRE": { score: 105, vram: 16, tier: "enthusiast", tdp: 260, year: 2024, arch: "Navi 31" },

  // === AMD RX 9000 SERIES ===
  "RX 9070": { score: 120, vram: 16, tier: "enthusiast", tdp: 220, year: 2025, arch: "RDNA 4" },
  "RX 9070 XT": { score: 135, vram: 16, tier: "enthusiast", tdp: 304, year: 2025, arch: "RDNA 4" },
};

// === WORKLOAD DATA ===
const WORKLOAD_DATA = {
  // CPU-bound games
  "CS2": { category: "CPU-bound", cpuWeight: 0.75, baseFps: 330, type: "gaming", description: "Competitive FPS - very CPU dependent" },
  "Valorant": { category: "CPU-bound", cpuWeight: 0.80, baseFps: 380, type: "gaming", description: "Esports shooter - extremely CPU bound" },
  "Fortnite": { category: "CPU-bound", cpuWeight: 0.65, baseFps: 232, type: "gaming", description: "Battle royale - CPU heavy in competitive" },
  "Warzone": { category: "CPU-bound", cpuWeight: 0.70, baseFps: 178, type: "gaming", description: "Battle royale - high CPU usage" },
  "Rainbow Six Siege": { category: "CPU-bound", cpuWeight: 0.72, baseFps: 290, type: "gaming", description: "Tactical shooter - CPU intensive" },
  "Overwatch 2": { category: "CPU-bound", cpuWeight: 0.68, baseFps: 310, type: "gaming", description: "Team shooter - favors fast CPUs" },

  // Mixed
  "Apex Legends": { category: "Mixed", cpuWeight: 0.55, baseFps: 195, type: "gaming", description: "Battle royale - balanced load" },
  "GTA V": { category: "Mixed", cpuWeight: 0.50, baseFps: 196, type: "gaming", description: "Open world - balanced CPU/GPU" },
  "Red Dead Redemption 2": { category: "Mixed", cpuWeight: 0.45, baseFps: 146, type: "gaming", description: "Open world - slightly GPU heavy" },
  "Elden Ring": { category: "Mixed", cpuWeight: 0.48, baseFps: 165, type: "gaming", description: "Open world action - balanced" },
  "Call of Duty MW3": { category: "Mixed", cpuWeight: 0.52, baseFps: 210, type: "gaming", description: "FPS - fairly balanced" },

  // GPU-bound games
  "Cyberpunk 2077": { category: "GPU-bound", cpuWeight: 0.25, baseFps: 141, type: "gaming", description: "Ray tracing showcase - GPU heavy" },
  "Alan Wake 2": { category: "GPU-bound", cpuWeight: 0.20, baseFps: 108, type: "gaming", description: "Graphical showcase - very GPU bound" },
  "Starfield": { category: "GPU-bound", cpuWeight: 0.30, baseFps: 125, type: "gaming", description: "Space RPG - GPU dependent" },
  "Hogwarts Legacy": { category: "GPU-bound", cpuWeight: 0.35, baseFps: 135, type: "gaming", description: "Magic open world - GPU heavy" },
  "Spider-Man 2": { category: "GPU-bound", cpuWeight: 0.30, baseFps: 155, type: "gaming", description: "Open world - GPU intensive" },
  "Assassin's Creed Mirage": { category: "GPU-bound", cpuWeight: 0.32, baseFps: 142, type: "gaming", description: "Open world - GPU bound" },
  "Avatar Frontiers": { category: "GPU-bound", cpuWeight: 0.22, baseFps: 95, type: "gaming", description: "Graphical showcase - very GPU heavy" },

  // Productivity
  "Video Editing (Premiere)": { category: "Mixed", cpuWeight: 0.60, baseFps: 100, type: "productivity", description: "Video editing - CPU + GPU acceleration" },
  "3D Rendering (Blender)": { category: "GPU-bound", cpuWeight: 0.30, baseFps: 100, type: "productivity", description: "3D rendering - GPU CUDA/OptiX heavy" },
  "Streaming (x264)": { category: "CPU-bound", cpuWeight: 0.85, baseFps: 100, type: "productivity", description: "Live streaming - very CPU intensive" },
  "Streaming (NVENC)": { category: "GPU-bound", cpuWeight: 0.35, baseFps: 100, type: "productivity", description: "GPU encoding - minimal CPU impact" },
};

// === RESOLUTION MULTIPLIERS ===
const RESOLUTION_MULTIPLIERS = {
  "1080p": { cpuScale: 1.0, gpuScale: 1.12, name: "1920 x 1080", label: "1080p Full HD" },
  "1440p": { cpuScale: 0.95, gpuScale: 1.0, name: "2560 x 1440", label: "1440p QHD" },
  "4K": { cpuScale: 0.90, gpuScale: 0.66, name: "3840 x 2160", label: "4K Ultra HD" },
  " ultrawide 1440p": { cpuScale: 0.93, gpuScale: 0.85, name: "3440 x 1440", label: "Ultrawide 1440p" },
};

// === RAM MULTIPLIERS ===
const RAM_MULTIPLIERS = {
  "8": { avg: 0.86, low: 0.82, label: "8 GB", status: "Insufficient for modern gaming" },
  "16": { avg: 1.0, low: 1.0, label: "16 GB", status: "Standard for gaming" },
  "32": { avg: 1.02, low: 1.03, label: "32 GB", status: "Ideal for multitasking" },
  "64": { avg: 1.03, low: 1.04, label: "64 GB", status: "Overkill for gaming, good for production" },
};

// === USE CASE MULTIPLIERS ===
const USE_CASE_MULTIPLIERS = {
  "gaming": { cpuScale: 1.0, gpuScale: 1.0, label: "Gaming" },
  "streaming": { cpuScale: 1.15, gpuScale: 0.95, label: "Gaming + Streaming" },
  "editing": { cpuScale: 1.10, gpuScale: 1.05, label: "Video Editing / 3D" },
  "productivity": { cpuScale: 1.20, gpuScale: 0.90, label: "Heavy Productivity" },
};

// === BOTTLENECK THRESHOLDS ===
const BOTTLENECK_THRESHOLDS = {
  balanced: { max: 15, label: "Well Balanced", color: "balanced", description: "Your CPU and GPU work efficiently together. Neither component significantly limits the other." },
  slight: { max: 30, label: "Slight Bottleneck", color: "balanced", description: "Minor imbalance. You might see small gains from upgrading the limiting component, but it's not urgent." },
  moderate: { max: 45, label: "Moderate Bottleneck", color: "warn", description: "Noticeable performance limitation. Upgrading the bottlenecked component would provide meaningful improvement." },
  severe: { max: 100, label: "Severe Bottleneck", color: "danger", description: "Significant performance loss. The limiting component is holding back your system considerably." },
};

// === UPGRADE RECOMMENDATIONS ===
const UPGRADE_RECOMMENDATIONS = {
  cpu: {
    budget: ["Ryzen 5 5600", "Core i5-12400F", "Ryzen 5 7500F"],
    mid: ["Ryzen 5 5600X", "Core i5-13400F", "Ryzen 5 7600X"],
    high: ["Ryzen 7 5800X3D", "Core i7-13700K", "Ryzen 7 7800X3D"],
    enthusiast: ["Ryzen 9 7950X3D", "Core i9-14900K", "Ryzen 7 7800X3D"],
  },
  gpu: {
    budget: ["RTX 3060", "RX 6600", "RTX 4060"],
    mid: ["RTX 3060 Ti", "RX 6700 XT", "RTX 4060 Ti"],
    high: ["RTX 4070", "RX 7800 XT", "RTX 4070 Super"],
    enthusiast: ["RTX 4080 Super", "RX 7900 XTX", "RTX 4090"],
  },
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CPU_DATA, GPU_DATA, WORKLOAD_DATA, RESOLUTION_MULTIPLIERS, RAM_MULTIPLIERS, USE_CASE_MULTIPLIERS, BOTTLENECK_THRESHOLDS, UPGRADE_RECOMMENDATIONS };
}
