// ============================================
// PC BOTTLENECK CALCULATOR - Hardware Database v3
// FPS data based on Hardware Unboxed, TechPowerUp, GamersNexus, Puget Systems
// ============================================

// === CPU DATA ===
// fpsGaming: Average FPS in CPU-bound gaming scenarios at 1080p
// fpsEditing: Relative score for video editing (Premiere/DaVinci)
// fpsAI: Relative score for AI/ML workloads (PyTorch/TensorFlow)
// fpsRendering: Relative score for 3D rendering (Blender/Cinebench)
const CPU_DATA = {
  // AMD RYZEN 3
  "Ryzen 3 1200": { fpsGaming: 65, fpsEditing: 35, fpsAI: 28, fpsRendering: 32, cores: 4, threads: 4, tier: "budget", tdp: 65, socket: "AM4", year: 2017, arch: "Zen" },
  "Ryzen 3 2200G": { fpsGaming: 72, fpsEditing: 42, fpsAI: 35, fpsRendering: 38, cores: 4, threads: 4, tier: "budget", tdp: 65, socket: "AM4", year: 2018, arch: "Zen+", igpu: "Vega 11" },
  "Ryzen 3 3100": { fpsGaming: 95, fpsEditing: 58, fpsAI: 48, fpsRendering: 55, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "AM4", year: 2020, arch: "Zen 2" },
  "Ryzen 3 3300X": { fpsGaming: 108, fpsEditing: 65, fpsAI: 55, fpsRendering: 62, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "AM4", year: 2020, arch: "Zen 2" },
  "Ryzen 3 4100": { fpsGaming: 88, fpsEditing: 52, fpsAI: 42, fpsRendering: 48, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "AM4", year: 2022, arch: "Zen 2" },

  // AMD RYZEN 5
  "Ryzen 5 1600": { fpsGaming: 78, fpsEditing: 68, fpsAI: 58, fpsRendering: 72, cores: 6, threads: 12, tier: "budget", tdp: 65, socket: "AM4", year: 2017, arch: "Zen" },
  "Ryzen 5 2600": { fpsGaming: 88, fpsEditing: 78, fpsAI: 68, fpsRendering: 82, cores: 6, threads: 12, tier: "budget", tdp: 65, socket: "AM4", year: 2018, arch: "Zen+" },
  "Ryzen 5 3400G": { fpsGaming: 75, fpsEditing: 72, fpsAI: 62, fpsRendering: 75, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "AM4", year: 2019, arch: "Zen+", igpu: "Vega 11" },
  "Ryzen 5 3600": { fpsGaming: 115, fpsEditing: 95, fpsAI: 88, fpsRendering: 105, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "AM4", year: 2019, arch: "Zen 2" },
  "Ryzen 5 3600X": { fpsGaming: 122, fpsEditing: 102, fpsAI: 95, fpsRendering: 112, cores: 6, threads: 12, tier: "mid", tdp: 95, socket: "AM4", year: 2019, arch: "Zen 2" },
  "Ryzen 5 5500": { fpsGaming: 125, fpsEditing: 108, fpsAI: 98, fpsRendering: 118, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "AM4", year: 2022, arch: "Zen 3" },
  "Ryzen 5 5500X3D": { fpsGaming: 165, fpsEditing: 112, fpsAI: 95, fpsRendering: 115, cores: 6, threads: 12, tier: "high", tdp: 65, socket: "AM4", year: 2024, arch: "Zen 3", vcache: true },
  "Ryzen 5 5600": { fpsGaming: 135, fpsEditing: 115, fpsAI: 105, fpsRendering: 125, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "AM4", year: 2022, arch: "Zen 3" },
  "Ryzen 5 5600X": { fpsGaming: 148, fpsEditing: 125, fpsAI: 115, fpsRendering: 135, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "AM4", year: 2020, arch: "Zen 3" },
  "Ryzen 5 5600X3D": { fpsGaming: 178, fpsEditing: 128, fpsAI: 108, fpsRendering: 125, cores: 6, threads: 12, tier: "high", tdp: 65, socket: "AM4", year: 2023, arch: "Zen 3", vcache: true },
  "Ryzen 5 7500F": { fpsGaming: 172, fpsEditing: 148, fpsAI: 138, fpsRendering: 162, cores: 6, threads: 12, tier: "high", tdp: 65, socket: "AM5", year: 2023, arch: "Zen 4" },
  "Ryzen 5 7600": { fpsGaming: 180, fpsEditing: 155, fpsAI: 145, fpsRendering: 170, cores: 6, threads: 12, tier: "high", tdp: 65, socket: "AM5", year: 2023, arch: "Zen 4" },
  "Ryzen 5 7600X": { fpsGaming: 192, fpsEditing: 165, fpsAI: 155, fpsRendering: 182, cores: 6, threads: 12, tier: "high", tdp: 105, socket: "AM5", year: 2022, arch: "Zen 4" },
  "Ryzen 5 9600X": { fpsGaming: 210, fpsEditing: 185, fpsAI: 175, fpsRendering: 205, cores: 6, threads: 12, tier: "high", tdp: 65, socket: "AM5", year: 2024, arch: "Zen 5" },

  // AMD RYZEN 7
  "Ryzen 7 1700": { fpsGaming: 85, fpsEditing: 88, fpsAI: 78, fpsRendering: 95, cores: 8, threads: 16, tier: "budget", tdp: 65, socket: "AM4", year: 2017, arch: "Zen" },
  "Ryzen 7 2700X": { fpsGaming: 102, fpsEditing: 105, fpsAI: 95, fpsRendering: 115, cores: 8, threads: 16, tier: "mid", tdp: 105, socket: "AM4", year: 2018, arch: "Zen+" },
  "Ryzen 7 3700X": { fpsGaming: 128, fpsEditing: 132, fpsAI: 122, fpsRendering: 145, cores: 8, threads: 16, tier: "mid", tdp: 65, socket: "AM4", year: 2019, arch: "Zen 2" },
  "Ryzen 7 5800X": { fpsGaming: 162, fpsEditing: 168, fpsAI: 158, fpsRendering: 185, cores: 8, threads: 16, tier: "high", tdp: 105, socket: "AM4", year: 2020, arch: "Zen 3" },
  "Ryzen 7 5800X3D": { fpsGaming: 205, fpsEditing: 172, fpsAI: 148, fpsRendering: 168, cores: 8, threads: 16, tier: "high", tdp: 105, socket: "AM4", year: 2022, arch: "Zen 3", vcache: true },
  "Ryzen 7 7700": { fpsGaming: 198, fpsEditing: 195, fpsAI: 185, fpsRendering: 215, cores: 8, threads: 16, tier: "high", tdp: 65, socket: "AM5", year: 2023, arch: "Zen 4" },
  "Ryzen 7 7700X": { fpsGaming: 215, fpsEditing: 210, fpsAI: 198, fpsRendering: 232, cores: 8, threads: 16, tier: "high", tdp: 105, socket: "AM5", year: 2022, arch: "Zen 4" },
  "Ryzen 7 7800X3D": { fpsGaming: 255, fpsEditing: 218, fpsAI: 188, fpsRendering: 208, cores: 8, threads: 16, tier: "enthusiast", tdp: 120, socket: "AM5", year: 2023, arch: "Zen 4", vcache: true },
  "Ryzen 7 9700X": { fpsGaming: 235, fpsEditing: 228, fpsAI: 215, fpsRendering: 252, cores: 8, threads: 16, tier: "enthusiast", tdp: 65, socket: "AM5", year: 2024, arch: "Zen 5" },

  // AMD RYZEN 9
  "Ryzen 9 3900X": { fpsGaming: 138, fpsEditing: 185, fpsAI: 175, fpsRendering: 215, cores: 12, threads: 24, tier: "high", tdp: 105, socket: "AM4", year: 2019, arch: "Zen 2" },
  "Ryzen 9 5900X": { fpsGaming: 168, fpsEditing: 225, fpsAI: 215, fpsRendering: 265, cores: 12, threads: 24, tier: "high", tdp: 105, socket: "AM4", year: 2020, arch: "Zen 3" },
  "Ryzen 9 5950X": { fpsGaming: 172, fpsEditing: 285, fpsAI: 275, fpsRendering: 335, cores: 16, threads: 32, tier: "enthusiast", tdp: 105, socket: "AM4", year: 2020, arch: "Zen 3" },
  "Ryzen 9 7900": { fpsGaming: 205, fpsEditing: 258, fpsAI: 248, fpsRendering: 305, cores: 12, threads: 24, tier: "enthusiast", tdp: 65, socket: "AM5", year: 2023, arch: "Zen 4" },
  "Ryzen 9 7900X": { fpsGaming: 220, fpsEditing: 285, fpsAI: 272, fpsRendering: 338, cores: 12, threads: 24, tier: "enthusiast", tdp: 170, socket: "AM5", year: 2022, arch: "Zen 4" },
  "Ryzen 9 7950X": { fpsGaming: 228, fpsEditing: 348, fpsAI: 335, fpsRendering: 415, cores: 16, threads: 32, tier: "enthusiast", tdp: 170, socket: "AM5", year: 2022, arch: "Zen 4" },
  "Ryzen 9 7950X3D": { fpsGaming: 262, fpsEditing: 355, fpsAI: 328, fpsRendering: 395, cores: 16, threads: 32, tier: "enthusiast", tdp: 120, socket: "AM5", year: 2023, arch: "Zen 4", vcache: true },
  "Ryzen 9 9900X": { fpsGaming: 245, fpsEditing: 312, fpsAI: 298, fpsRendering: 368, cores: 12, threads: 24, tier: "enthusiast", tdp: 120, socket: "AM5", year: 2024, arch: "Zen 5" },
  "Ryzen 9 9950X": { fpsGaming: 258, fpsEditing: 385, fpsAI: 372, fpsRendering: 462, cores: 16, threads: 32, tier: "enthusiast", tdp: 170, socket: "AM5", year: 2024, arch: "Zen 5" },

  // INTEL CORE i3
  "Core i3-10100F": { fpsGaming: 92, fpsEditing: 68, fpsAI: 58, fpsRendering: 72, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "LGA1200", year: 2020, arch: "Comet Lake" },
  "Core i3-12100F": { fpsGaming: 118, fpsEditing: 88, fpsAI: 78, fpsRendering: 95, cores: 4, threads: 8, tier: "budget", tdp: 58, socket: "LGA1700", year: 2022, arch: "Alder Lake" },
  "Core i3-13100F": { fpsGaming: 125, fpsEditing: 95, fpsAI: 85, fpsRendering: 102, cores: 4, threads: 8, tier: "budget", tdp: 58, socket: "LGA1700", year: 2023, arch: "Raptor Lake" },
  "Core i3-14100F": { fpsGaming: 130, fpsEditing: 102, fpsAI: 92, fpsRendering: 110, cores: 4, threads: 8, tier: "budget", tdp: 58, socket: "LGA1700", year: 2024, arch: "Raptor Lake Refresh" },

  // INTEL CORE i5
  "Core i5-10400F": { fpsGaming: 108, fpsEditing: 95, fpsAI: 85, fpsRendering: 105, cores: 6, threads: 12, tier: "budget", tdp: 65, socket: "LGA1200", year: 2020, arch: "Comet Lake" },
  "Core i5-11400F": { fpsGaming: 118, fpsEditing: 108, fpsAI: 98, fpsRendering: 120, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "LGA1200", year: 2021, arch: "Rocket Lake" },
  "Core i5-12400F": { fpsGaming: 142, fpsEditing: 132, fpsAI: 122, fpsRendering: 148, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "LGA1700", year: 2022, arch: "Alder Lake" },
  "Core i5-13400F": { fpsGaming: 162, fpsEditing: 158, fpsAI: 148, fpsRendering: 182, cores: 10, threads: 16, tier: "mid", tdp: 65, socket: "LGA1700", year: 2023, arch: "Raptor Lake" },
  "Core i5-14400F": { fpsGaming: 168, fpsEditing: 168, fpsAI: 158, fpsRendering: 195, cores: 10, threads: 16, tier: "mid", tdp: 65, socket: "LGA1700", year: 2024, arch: "Raptor Lake Refresh" },
  "Core i5-12600K": { fpsGaming: 168, fpsEditing: 175, fpsAI: 165, fpsRendering: 202, cores: 10, threads: 16, tier: "high", tdp: 125, socket: "LGA1700", year: 2021, arch: "Alder Lake" },
  "Core i5-13600K": { fpsGaming: 195, fpsEditing: 208, fpsAI: 198, fpsRendering: 242, cores: 14, threads: 20, tier: "high", tdp: 125, socket: "LGA1700", year: 2022, arch: "Raptor Lake" },
  "Core i5-14600K": { fpsGaming: 202, fpsEditing: 222, fpsAI: 212, fpsRendering: 262, cores: 14, threads: 20, tier: "high", tdp: 125, socket: "LGA1700", year: 2023, arch: "Raptor Lake Refresh" },

  // INTEL CORE i7
  "Core i7-10700K": { fpsGaming: 128, fpsEditing: 145, fpsAI: 135, fpsRendering: 168, cores: 8, threads: 16, tier: "mid", tdp: 125, socket: "LGA1200", year: 2020, arch: "Comet Lake" },
  "Core i7-11700K": { fpsGaming: 138, fpsEditing: 162, fpsAI: 152, fpsRendering: 188, cores: 8, threads: 16, tier: "high", tdp: 125, socket: "LGA1200", year: 2021, arch: "Rocket Lake" },
  "Core i7-12700K": { fpsGaming: 175, fpsEditing: 205, fpsAI: 195, fpsRendering: 242, cores: 12, threads: 20, tier: "high", tdp: 125, socket: "LGA1700", year: 2021, arch: "Alder Lake" },
  "Core i7-13700K": { fpsGaming: 210, fpsEditing: 258, fpsAI: 248, fpsRendering: 308, cores: 16, threads: 24, tier: "high", tdp: 125, socket: "LGA1700", year: 2022, arch: "Raptor Lake" },
  "Core i7-14700K": { fpsGaming: 220, fpsEditing: 285, fpsAI: 272, fpsRendering: 338, cores: 20, threads: 28, tier: "enthusiast", tdp: 125, socket: "LGA1700", year: 2023, arch: "Raptor Lake Refresh" },
  "Core i7-14700KF": { fpsGaming: 220, fpsEditing: 285, fpsAI: 272, fpsRendering: 338, cores: 20, threads: 28, tier: "enthusiast", tdp: 125, socket: "LGA1700", year: 2023, arch: "Raptor Lake Refresh" },

  // INTEL CORE i9
  "Core i9-10900K": { fpsGaming: 138, fpsEditing: 185, fpsAI: 175, fpsRendering: 218, cores: 10, threads: 20, tier: "high", tdp: 125, socket: "LGA1200", year: 2020, arch: "Comet Lake" },
  "Core i9-11900K": { fpsGaming: 148, fpsEditing: 198, fpsAI: 188, fpsRendering: 232, cores: 8, threads: 16, tier: "high", tdp: 125, socket: "LGA1200", year: 2021, arch: "Rocket Lake" },
  "Core i9-12900K": { fpsGaming: 188, fpsEditing: 258, fpsAI: 248, fpsRendering: 308, cores: 16, threads: 24, tier: "enthusiast", tdp: 125, socket: "LGA1700", year: 2021, arch: "Alder Lake" },
  "Core i9-13900K": { fpsGaming: 228, fpsEditing: 335, fpsAI: 322, fpsRendering: 402, cores: 24, threads: 32, tier: "enthusiast", tdp: 125, socket: "LGA1700", year: 2022, arch: "Raptor Lake" },
  "Core i9-14900K": { fpsGaming: 238, fpsEditing: 358, fpsAI: 345, fpsRendering: 432, cores: 24, threads: 32, tier: "enthusiast", tdp: 125, socket: "LGA1700", year: 2023, arch: "Raptor Lake Refresh" },
  "Core i9-14900KS": { fpsGaming: 245, fpsEditing: 368, fpsAI: 355, fpsRendering: 445, cores: 24, threads: 32, tier: "enthusiast", tdp: 150, socket: "LGA1700", year: 2024, arch: "Raptor Lake Refresh" },

  // INTEL CORE ULTRA
  "Core Ultra 5 245K": { fpsGaming: 185, fpsEditing: 198, fpsAI: 188, fpsRendering: 232, cores: 6, threads: 14, tier: "high", tdp: 65, socket: "LGA1851", year: 2024, arch: "Arrow Lake" },
  "Core Ultra 7 265K": { fpsGaming: 225, fpsEditing: 278, fpsAI: 265, fpsRendering: 328, cores: 8, threads: 24, tier: "enthusiast", tdp: 125, socket: "LGA1851", year: 2024, arch: "Arrow Lake" },
  "Core Ultra 9 285K": { fpsGaming: 240, fpsEditing: 312, fpsAI: 298, fpsRendering: 368, cores: 8, threads: 24, tier: "enthusiast", tdp: 125, socket: "LGA1851", year: 2024, arch: "Arrow Lake" },

  // LEGACY INTEL
  "Core i3-6100": { fpsGaming: 58, fpsEditing: 35, fpsAI: 28, fpsRendering: 35, cores: 2, threads: 4, tier: "budget", tdp: 51, socket: "LGA1151", year: 2015, arch: "Skylake" },
  "Core i3-7100": { fpsGaming: 65, fpsEditing: 42, fpsAI: 35, fpsRendering: 42, cores: 2, threads: 4, tier: "budget", tdp: 51, socket: "LGA1151", year: 2017, arch: "Kaby Lake" },
  "Core i3-8100": { fpsGaming: 82, fpsEditing: 58, fpsAI: 48, fpsRendering: 58, cores: 4, threads: 4, tier: "budget", tdp: 65, socket: "LGA1151", year: 2017, arch: "Coffee Lake" },
  "Core i3-9100F": { fpsGaming: 88, fpsEditing: 65, fpsAI: 55, fpsRendering: 65, cores: 4, threads: 4, tier: "budget", tdp: 65, socket: "LGA1151", year: 2019, arch: "Coffee Lake Refresh" },
  "Core i5-6400": { fpsGaming: 72, fpsEditing: 55, fpsAI: 45, fpsRendering: 55, cores: 4, threads: 4, tier: "budget", tdp: 65, socket: "LGA1151", year: 2015, arch: "Skylake" },
  "Core i5-7400": { fpsGaming: 78, fpsEditing: 62, fpsAI: 52, fpsRendering: 62, cores: 4, threads: 4, tier: "budget", tdp: 65, socket: "LGA1151", year: 2017, arch: "Kaby Lake" },
  "Core i5-8400": { fpsGaming: 98, fpsEditing: 85, fpsAI: 75, fpsRendering: 88, cores: 6, threads: 6, tier: "budget", tdp: 65, socket: "LGA1151", year: 2017, arch: "Coffee Lake" },
  "Core i5-9400F": { fpsGaming: 105, fpsEditing: 92, fpsAI: 82, fpsRendering: 98, cores: 6, threads: 6, tier: "budget", tdp: 65, socket: "LGA1151", year: 2019, arch: "Coffee Lake Refresh" },
  "Core i7-6700": { fpsGaming: 88, fpsEditing: 78, fpsAI: 68, fpsRendering: 82, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "LGA1151", year: 2015, arch: "Skylake" },
  "Core i7-7700": { fpsGaming: 95, fpsEditing: 88, fpsAI: 78, fpsRendering: 92, cores: 4, threads: 8, tier: "budget", tdp: 65, socket: "LGA1151", year: 2017, arch: "Kaby Lake" },
  "Core i7-8700": { fpsGaming: 115, fpsEditing: 118, fpsAI: 108, fpsRendering: 128, cores: 6, threads: 12, tier: "mid", tdp: 65, socket: "LGA1151", year: 2017, arch: "Coffee Lake" },
  "Core i7-9700K": { fpsGaming: 125, fpsEditing: 132, fpsAI: 122, fpsRendering: 148, cores: 8, threads: 8, tier: "mid", tdp: 95, socket: "LGA1151", year: 2018, arch: "Coffee Lake Refresh" },
  "Core i9-9900K": { fpsGaming: 138, fpsEditing: 158, fpsAI: 148, fpsRendering: 178, cores: 8, threads: 16, tier: "mid", tdp: 95, socket: "LGA1151", year: 2018, arch: "Coffee Lake Refresh" },
};

// === GPU DATA ===
// fpsGaming: Average FPS at 1080p Ultra in GPU-bound scenarios
// fpsRendering: Relative score for GPU rendering (Blender/CUDA)
// fpsAI: Relative score for AI inference (VRAM + Tensor cores)
const GPU_DATA = {
  // NVIDIA GTX 900
  "GTX 950": { fpsGaming: 35, fpsRendering: 25, fpsAI: 15, vram: 2, tier: "budget", tdp: 90, year: 2015, arch: "Maxwell" },
  "GTX 960": { fpsGaming: 48, fpsRendering: 35, fpsAI: 22, vram: 2, tier: "budget", tdp: 120, year: 2015, arch: "Maxwell" },
  "GTX 970": { fpsGaming: 68, fpsRendering: 52, fpsAI: 32, vram: 4, tier: "budget", tdp: 145, year: 2014, arch: "Maxwell" },
  "GTX 980": { fpsGaming: 82, fpsRendering: 65, fpsAI: 42, vram: 4, tier: "budget", tdp: 165, year: 2014, arch: "Maxwell" },
  "GTX 980 Ti": { fpsGaming: 105, fpsRendering: 88, fpsAI: 58, vram: 6, tier: "mid", tdp: 250, year: 2015, arch: "Maxwell" },

  // NVIDIA GTX 1000
  "GTX 1050": { fpsGaming: 42, fpsRendering: 32, fpsAI: 18, vram: 2, tier: "budget", tdp: 75, year: 2016, arch: "Pascal" },
  "GTX 1050 Ti": { fpsGaming: 52, fpsRendering: 42, fpsAI: 25, vram: 4, tier: "budget", tdp: 75, year: 2016, arch: "Pascal" },
  "GTX 1060 3GB": { fpsGaming: 72, fpsRendering: 58, fpsAI: 38, vram: 3, tier: "budget", tdp: 120, year: 2016, arch: "Pascal" },
  "GTX 1060 6GB": { fpsGaming: 78, fpsRendering: 65, fpsAI: 42, vram: 6, tier: "budget", tdp: 120, year: 2016, arch: "Pascal" },
  "GTX 1070": { fpsGaming: 108, fpsRendering: 92, fpsAI: 62, vram: 8, tier: "mid", tdp: 150, year: 2016, arch: "Pascal" },
  "GTX 1070 Ti": { fpsGaming: 118, fpsRendering: 102, fpsAI: 68, vram: 8, tier: "mid", tdp: 180, year: 2017, arch: "Pascal" },
  "GTX 1080": { fpsGaming: 132, fpsRendering: 115, fpsAI: 78, vram: 8, tier: "mid", tdp: 180, year: 2016, arch: "Pascal" },
  "GTX 1080 Ti": { fpsGaming: 158, fpsRendering: 142, fpsAI: 95, vram: 11, tier: "high", tdp: 250, year: 2017, arch: "Pascal" },

  // NVIDIA GTX 1600
  "GTX 1650": { fpsGaming: 58, fpsRendering: 48, fpsAI: 28, vram: 4, tier: "budget", tdp: 75, year: 2019, arch: "Turing" },
  "GTX 1650 Super": { fpsGaming: 72, fpsRendering: 62, fpsAI: 38, vram: 4, tier: "budget", tdp: 100, year: 2019, arch: "Turing" },
  "GTX 1660": { fpsGaming: 82, fpsRendering: 72, fpsAI: 45, vram: 6, tier: "budget", tdp: 120, year: 2019, arch: "Turing" },
  "GTX 1660 Super": { fpsGaming: 92, fpsRendering: 82, fpsAI: 52, vram: 6, tier: "mid", tdp: 125, year: 2019, arch: "Turing" },
  "GTX 1660 Ti": { fpsGaming: 95, fpsRendering: 85, fpsAI: 55, vram: 6, tier: "mid", tdp: 120, year: 2019, arch: "Turing" },

  // NVIDIA RTX 2000
  "RTX 2060": { fpsGaming: 102, fpsRendering: 95, fpsAI: 72, vram: 6, tier: "mid", tdp: 160, year: 2019, arch: "Turing" },
  "RTX 2060 Super": { fpsGaming: 115, fpsRendering: 108, fpsAI: 82, vram: 8, tier: "mid", tdp: 175, year: 2019, arch: "Turing" },
  "RTX 2070": { fpsGaming: 125, fpsRendering: 118, fpsAI: 92, vram: 8, tier: "mid", tdp: 175, year: 2018, arch: "Turing" },
  "RTX 2070 Super": { fpsGaming: 138, fpsRendering: 132, fpsAI: 102, vram: 8, tier: "high", tdp: 215, year: 2019, arch: "Turing" },
  "RTX 2080": { fpsGaming: 152, fpsRendering: 148, fpsAI: 115, vram: 8, tier: "high", tdp: 215, year: 2018, arch: "Turing" },
  "RTX 2080 Super": { fpsGaming: 162, fpsRendering: 158, fpsAI: 122, vram: 8, tier: "high", tdp: 250, year: 2019, arch: "Turing" },
  "RTX 2080 Ti": { fpsGaming: 185, fpsRendering: 185, fpsAI: 145, vram: 11, tier: "enthusiast", tdp: 250, year: 2018, arch: "Turing" },

  // NVIDIA RTX 3000
  "RTX 3050": { fpsGaming: 78, fpsRendering: 72, fpsAI: 58, vram: 8, tier: "budget", tdp: 130, year: 2022, arch: "Ampere" },
  "RTX 3060": { fpsGaming: 115, fpsRendering: 112, fpsAI: 88, vram: 12, tier: "mid", tdp: 170, year: 2021, arch: "Ampere" },
  "RTX 3060 Ti": { fpsGaming: 138, fpsRendering: 138, fpsAI: 108, vram: 8, tier: "mid", tdp: 200, year: 2020, arch: "Ampere" },
  "RTX 3070": { fpsGaming: 162, fpsRendering: 165, fpsAI: 128, vram: 8, tier: "high", tdp: 220, year: 2020, arch: "Ampere" },
  "RTX 3070 Ti": { fpsGaming: 175, fpsRendering: 178, fpsAI: 138, vram: 8, tier: "high", tdp: 290, year: 2021, arch: "Ampere" },
  "RTX 3080": { fpsGaming: 205, fpsRendering: 215, fpsAI: 168, vram: 10, tier: "enthusiast", tdp: 320, year: 2020, arch: "Ampere" },
  "RTX 3080 12GB": { fpsGaming: 212, fpsRendering: 225, fpsAI: 178, vram: 12, tier: "enthusiast", tdp: 350, year: 2022, arch: "Ampere" },
  "RTX 3080 Ti": { fpsGaming: 225, fpsRendering: 242, fpsAI: 192, vram: 12, tier: "enthusiast", tdp: 350, year: 2021, arch: "Ampere" },
  "RTX 3090": { fpsGaming: 235, fpsRendering: 258, fpsAI: 205, vram: 24, tier: "enthusiast", tdp: 350, year: 2020, arch: "Ampere" },
  "RTX 3090 Ti": { fpsGaming: 248, fpsRendering: 275, fpsAI: 218, vram: 24, tier: "enthusiast", tdp: 450, year: 2022, arch: "Ampere" },

  // NVIDIA RTX 4000
  "RTX 4060": { fpsGaming: 128, fpsRendering: 125, fpsAI: 115, vram: 8, tier: "mid", tdp: 115, year: 2023, arch: "Ada Lovelace" },
  "RTX 4060 Ti": { fpsGaming: 148, fpsRendering: 148, fpsAI: 135, vram: 8, tier: "mid", tdp: 160, year: 2023, arch: "Ada Lovelace" },
  "RTX 4060 Ti 16GB": { fpsGaming: 148, fpsRendering: 148, fpsAI: 138, vram: 16, tier: "mid", tdp: 165, year: 2023, arch: "Ada Lovelace" },
  "RTX 4070": { fpsGaming: 182, fpsRendering: 185, fpsAI: 172, vram: 12, tier: "high", tdp: 200, year: 2023, arch: "Ada Lovelace" },
  "RTX 4070 Super": { fpsGaming: 198, fpsRendering: 202, fpsAI: 188, vram: 12, tier: "high", tdp: 220, year: 2024, arch: "Ada Lovelace" },
  "RTX 4070 Ti": { fpsGaming: 218, fpsRendering: 225, fpsAI: 208, vram: 12, tier: "enthusiast", tdp: 285, year: 2023, arch: "Ada Lovelace" },
  "RTX 4070 Ti Super": { fpsGaming: 232, fpsRendering: 242, fpsAI: 225, vram: 16, tier: "enthusiast", tdp: 285, year: 2024, arch: "Ada Lovelace" },
  "RTX 4080": { fpsGaming: 262, fpsRendering: 278, fpsAI: 258, vram: 16, tier: "enthusiast", tdp: 320, year: 2022, arch: "Ada Lovelace" },
  "RTX 4080 Super": { fpsGaming: 272, fpsRendering: 292, fpsAI: 272, vram: 16, tier: "enthusiast", tdp: 320, year: 2024, arch: "Ada Lovelace" },
  "RTX 4090": { fpsGaming: 325, fpsRendering: 358, fpsAI: 335, vram: 24, tier: "enthusiast", tdp: 450, year: 2022, arch: "Ada Lovelace" },

  // NVIDIA RTX 5000
  "RTX 5070": { fpsGaming: 285, fpsRendering: 305, fpsAI: 288, vram: 12, tier: "enthusiast", tdp: 250, year: 2025, arch: "Blackwell" },
  "RTX 5070 Ti": { fpsGaming: 305, fpsRendering: 332, fpsAI: 312, vram: 16, tier: "enthusiast", tdp: 300, year: 2025, arch: "Blackwell" },
  "RTX 5080": { fpsGaming: 340, fpsRendering: 375, fpsAI: 352, vram: 16, tier: "enthusiast", tdp: 360, year: 2025, arch: "Blackwell" },
  "RTX 5090": { fpsGaming: 395, fpsRendering: 445, fpsAI: 418, vram: 32, tier: "enthusiast", tdp: 575, year: 2025, arch: "Blackwell" },

  // AMD RX 500
  "RX 560": { fpsGaming: 28, fpsRendering: 18, fpsAI: 8, vram: 4, tier: "budget", tdp: 60, year: 2017, arch: "Polaris" },
  "RX 570": { fpsGaming: 48, fpsRendering: 32, fpsAI: 15, vram: 4, tier: "budget", tdp: 120, year: 2017, arch: "Polaris" },
  "RX 580": { fpsGaming: 62, fpsRendering: 42, fpsAI: 20, vram: 8, tier: "budget", tdp: 185, year: 2017, arch: "Polaris" },
  "RX 590": { fpsGaming: 72, fpsRendering: 48, fpsAI: 25, vram: 8, tier: "budget", tdp: 225, year: 2018, arch: "Polaris" },

  // AMD RX 5000
  "RX 5500 XT": { fpsGaming: 68, fpsRendering: 45, fpsAI: 22, vram: 8, tier: "budget", tdp: 130, year: 2019, arch: "Navi" },
  "RX 5600 XT": { fpsGaming: 98, fpsRendering: 68, fpsAI: 32, vram: 6, tier: "mid", tdp: 150, year: 2020, arch: "Navi" },
  "RX 5700": { fpsGaming: 115, fpsRendering: 82, fpsAI: 38, vram: 8, tier: "mid", tdp: 180, year: 2019, arch: "Navi" },
  "RX 5700 XT": { fpsGaming: 132, fpsRendering: 95, fpsAI: 45, vram: 8, tier: "mid", tdp: 225, year: 2019, arch: "Navi" },

  // AMD RX 6000
  "RX 6500 XT": { fpsGaming: 68, fpsRendering: 38, fpsAI: 15, vram: 4, tier: "budget", tdp: 107, year: 2022, arch: "Navi 24" },
  "RX 6600": { fpsGaming: 102, fpsRendering: 72, fpsAI: 35, vram: 8, tier: "mid", tdp: 132, year: 2021, arch: "Navi 23" },
  "RX 6600 XT": { fpsGaming: 118, fpsRendering: 85, fpsAI: 42, vram: 8, tier: "mid", tdp: 160, year: 2021, arch: "Navi 23" },
  "RX 6650 XT": { fpsGaming: 125, fpsRendering: 92, fpsAI: 45, vram: 8, tier: "mid", tdp: 180, year: 2022, arch: "Navi 23" },
  "RX 6700 XT": { fpsGaming: 148, fpsRendering: 112, fpsAI: 55, vram: 12, tier: "high", tdp: 230, year: 2021, arch: "Navi 22" },
  "RX 6750 XT": { fpsGaming: 158, fpsRendering: 122, fpsAI: 60, vram: 12, tier: "high", tdp: 250, year: 2022, arch: "Navi 22" },
  "RX 6800": { fpsGaming: 185, fpsRendering: 148, fpsAI: 72, vram: 16, tier: "high", tdp: 250, year: 2020, arch: "Navi 21" },
  "RX 6800 XT": { fpsGaming: 212, fpsRendering: 175, fpsAI: 85, vram: 16, tier: "enthusiast", tdp: 300, year: 2020, arch: "Navi 21" },
  "RX 6900 XT": { fpsGaming: 228, fpsRendering: 192, fpsAI: 95, vram: 16, tier: "enthusiast", tdp: 300, year: 2020, arch: "Navi 21" },
  "RX 6950 XT": { fpsGaming: 238, fpsRendering: 205, fpsAI: 102, vram: 16, tier: "enthusiast", tdp: 335, year: 2022, arch: "Navi 21" },

  // AMD RX 7000
  "RX 7600": { fpsGaming: 122, fpsRendering: 95, fpsAI: 48, vram: 8, tier: "mid", tdp: 165, year: 2023, arch: "Navi 33" },
  "RX 7600 XT": { fpsGaming: 132, fpsRendering: 105, fpsAI: 52, vram: 16, tier: "mid", tdp: 190, year: 2024, arch: "Navi 33" },
  "RX 7700 XT": { fpsGaming: 168, fpsRendering: 138, fpsAI: 68, vram: 12, tier: "high", tdp: 245, year: 2023, arch: "Navi 32" },
  "RX 7800 XT": { fpsGaming: 198, fpsRendering: 168, fpsAI: 82, vram: 16, tier: "high", tdp: 263, year: 2023, arch: "Navi 32" },
  "RX 7900 XT": { fpsGaming: 248, fpsRendering: 218, fpsAI: 108, vram: 20, tier: "enthusiast", tdp: 315, year: 2022, arch: "Navi 31" },
  "RX 7900 XTX": { fpsGaming: 278, fpsRendering: 252, fpsAI: 125, vram: 24, tier: "enthusiast", tdp: 355, year: 2022, arch: "Navi 31" },
  "RX 7900 GRE": { fpsGaming: 228, fpsRendering: 198, fpsAI: 98, vram: 16, tier: "enthusiast", tdp: 260, year: 2024, arch: "Navi 31" },

  // AMD RX 9000
  "RX 9070": { fpsGaming: 258, fpsRendering: 232, fpsAI: 115, vram: 16, tier: "enthusiast", tdp: 220, year: 2025, arch: "RDNA 4" },
  "RX 9070 XT": { fpsGaming: 288, fpsRendering: 265, fpsAI: 132, vram: 16, tier: "enthusiast", tdp: 304, year: 2025, arch: "RDNA 4" },
};

// === STORAGE DATA ===
// lowFpsFactor: multiplier on actualFps to compute 1% low FPS.
//   HDD = severe stutters in open-world asset-streaming games (GTA V, Cyberpunk, RDR2).
//   SSD SATA = comfortable baseline (current industry standard).
//   NVMe Gen4/5 = smooth; Gen4+ enables DirectStorage in supported titles.
const STORAGE_DATA = {
  "HDD": {
    readSpeed: 150, writeSpeed: 150, randomRead: 2,
    label: "HDD — Disco Duro",
    lowFpsFactor: 0.55,
    statusKey: "storage.warn.hdd",
    impact: {
      gaming: { loadingPenalty: 0.35, textureStreamPenalty: 0.25, stutterRisk: "high" },
      editing: { timelinePenalty: 0.45, exportPenalty: 0.05, scratchPenalty: 0.55 },
      ai: { datasetLoadPenalty: 0.65, modelLoadPenalty: 0.40 },
    }
  },
  "SATA SSD": {
    readSpeed: 550, writeSpeed: 520, randomRead: 95,
    label: "SSD SATA",
    lowFpsFactor: 0.70,
    statusKey: null,
    impact: {
      gaming: { loadingPenalty: 0.08, textureStreamPenalty: 0.05, stutterRisk: "low" },
      editing: { timelinePenalty: 0.12, exportPenalty: 0.02, scratchPenalty: 0.15 },
      ai: { datasetLoadPenalty: 0.15, modelLoadPenalty: 0.10 },
    }
  },
  "NVMe Gen3": {
    readSpeed: 3500, writeSpeed: 3000, randomRead: 650,
    label: "NVMe PCIe 3.0",
    lowFpsFactor: 0.75,
    statusKey: null,
    impact: {
      gaming: { loadingPenalty: 0.03, textureStreamPenalty: 0.02, stutterRisk: "none" },
      editing: { timelinePenalty: 0.05, exportPenalty: 0.01, scratchPenalty: 0.06 },
      ai: { datasetLoadPenalty: 0.06, modelLoadPenalty: 0.04 },
    }
  },
  "NVMe Gen4": {
    readSpeed: 7000, writeSpeed: 5500, randomRead: 1200,
    label: "NVMe PCIe 4.0",
    lowFpsFactor: 0.78,
    statusKey: null,
    impact: {
      gaming: { loadingPenalty: 0.01, textureStreamPenalty: 0.01, stutterRisk: "none" },
      editing: { timelinePenalty: 0.02, exportPenalty: 0.00, scratchPenalty: 0.02 },
      ai: { datasetLoadPenalty: 0.02, modelLoadPenalty: 0.01 },
    }
  },
  "NVMe Gen5": {
    readSpeed: 12000, writeSpeed: 10000, randomRead: 1800,
    label: "NVMe PCIe 5.0",
    lowFpsFactor: 0.80,
    statusKey: null,
    impact: {
      gaming: { loadingPenalty: 0.00, textureStreamPenalty: 0.00, stutterRisk: "none" },
      editing: { timelinePenalty: 0.01, exportPenalty: 0.00, scratchPenalty: 0.01 },
      ai: { datasetLoadPenalty: 0.01, modelLoadPenalty: 0.00 },
    }
  },
};

// === GRAPHICS QUALITY MULTIPLIERS ===
// gpuFpsMult: how much faster (>1.0) or slower (<1.0) a GPU renders vs Ultra.
//   gpu.fpsGaming baseline = Ultra settings @ 1080p GPU-bound scenario.
//   Low quality  → GPU renders ~2.2× faster than Ultra → bottleneck shifts to CPU.
//   Ultra+RT     → GPU is ~1.6× slower than Ultra     → GPU bottleneck almost certain.
const QUALITY_MULTIPLIERS = {
  "low":      { gpuFpsMult: 2.20, label: "Baja",              labelEn: "Low" },
  "medium":   { gpuFpsMult: 1.55, label: "Media",             labelEn: "Medium" },
  "high":     { gpuFpsMult: 1.18, label: "Alta",              labelEn: "High" },
  "ultra":    { gpuFpsMult: 1.00, label: "Ultra",             labelEn: "Ultra" },
  "ultra_rt": { gpuFpsMult: 0.62, label: "Ultra + Ray Tracing", labelEn: "Ultra + Ray Tracing" },
};

// === GAME/WORKLOAD DATA ===
const WORKLOAD_DATA = {
  "CS2": {
    category: "CPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.92, "4K": 0.85 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.78, "4K": 0.42 },
    vramRequired: { "1080p": 4, "1440p": 4, "4K": 6 },
    type: "gaming",
    description: "Competitive FPS - very CPU dependent"
  },
  "Valorant": {
    category: "CPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.95, "4K": 0.90 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.82, "4K": 0.48 },
    vramRequired: { "1080p": 2, "1440p": 2, "4K": 4 },
    type: "gaming",
    description: "Esports shooter - extremely CPU bound"
  },
  "Fortnite": {
    category: "CPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.93, "4K": 0.87 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.75, "4K": 0.40 },
    vramRequired: { "1080p": 4, "1440p": 6, "4K": 8 },
    type: "gaming",
    description: "Battle royale - CPU heavy in competitive"
  },
  "Warzone": {
    category: "CPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.90, "4K": 0.82 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.72, "4K": 0.38 },
    vramRequired: { "1080p": 6, "1440p": 8, "4K": 10 },
    type: "gaming",
    description: "Battle royale - high CPU usage"
  },
  "Rainbow Six Siege": {
    category: "CPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.94, "4K": 0.88 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.80, "4K": 0.45 },
    vramRequired: { "1080p": 4, "1440p": 4, "4K": 6 },
    type: "gaming",
    description: "Tactical shooter - CPU intensive"
  },
  "Overwatch 2": {
    category: "CPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.93, "4K": 0.86 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.76, "4K": 0.42 },
    vramRequired: { "1080p": 4, "1440p": 4, "4K": 6 },
    type: "gaming",
    description: "Team shooter - favors fast CPUs"
  },
  "Apex Legends": {
    category: "Mixed",
    cpuScaling: { "1080p": 1.0, "1440p": 0.88, "4K": 0.78 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.70, "4K": 0.36 },
    vramRequired: { "1080p": 4, "1440p": 6, "4K": 8 },
    type: "gaming",
    description: "Battle royale - balanced load"
  },
  "GTA V": {
    category: "Mixed",
    cpuScaling: { "1080p": 1.0, "1440p": 0.85, "4K": 0.75 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.68, "4K": 0.35 },
    vramRequired: { "1080p": 4, "1440p": 6, "4K": 8 },
    type: "gaming",
    description: "Open world - balanced CPU/GPU"
  },
  "Red Dead Redemption 2": {
    category: "Mixed",
    cpuScaling: { "1080p": 1.0, "1440p": 0.82, "4K": 0.72 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.65, "4K": 0.32 },
    vramRequired: { "1080p": 6, "1440p": 8, "4K": 10 },
    type: "gaming",
    description: "Open world - slightly GPU heavy"
  },
  "Elden Ring": {
    category: "Mixed",
    cpuScaling: { "1080p": 1.0, "1440p": 0.86, "4K": 0.76 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.68, "4K": 0.34 },
    vramRequired: { "1080p": 4, "1440p": 6, "4K": 8 },
    type: "gaming",
    description: "Open world action - balanced"
  },
  "Call of Duty MW3": {
    category: "Mixed",
    cpuScaling: { "1080p": 1.0, "1440p": 0.87, "4K": 0.77 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.70, "4K": 0.36 },
    vramRequired: { "1080p": 6, "1440p": 8, "4K": 10 },
    type: "gaming",
    description: "FPS - fairly balanced"
  },
  "Cyberpunk 2077": {
    category: "GPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.78, "4K": 0.65 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.58, "4K": 0.28 },
    vramRequired: { "1080p": 6, "1440p": 8, "4K": 12 },
    type: "gaming",
    description: "Ray tracing showcase - GPU heavy"
  },
  "Alan Wake 2": {
    category: "GPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.75, "4K": 0.62 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.52, "4K": 0.24 },
    vramRequired: { "1080p": 8, "1440p": 10, "4K": 16 },
    type: "gaming",
    description: "Graphical showcase - very GPU bound"
  },
  "Starfield": {
    category: "GPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.80, "4K": 0.68 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.60, "4K": 0.30 },
    vramRequired: { "1080p": 6, "1440p": 8, "4K": 12 },
    type: "gaming",
    description: "Space RPG - GPU dependent"
  },
  "Hogwarts Legacy": {
    category: "GPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.82, "4K": 0.70 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.62, "4K": 0.30 },
    vramRequired: { "1080p": 8, "1440p": 10, "4K": 16 },
    type: "gaming",
    description: "Magic open world - GPU heavy"
  },
  "Spider-Man 2": {
    category: "GPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.80, "4K": 0.68 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.60, "4K": 0.30 },
    vramRequired: { "1080p": 6, "1440p": 8, "4K": 12 },
    type: "gaming",
    description: "Open world - GPU intensive"
  },
  "Assassin's Creed Mirage": {
    category: "GPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.81, "4K": 0.69 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.61, "4K": 0.29 },
    vramRequired: { "1080p": 6, "1440p": 8, "4K": 10 },
    type: "gaming",
    description: "Open world - GPU bound"
  },
  "Avatar Frontiers": {
    category: "GPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.76, "4K": 0.63 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.54, "4K": 0.25 },
    vramRequired: { "1080p": 8, "1440p": 10, "4K": 16 },
    type: "gaming",
    description: "Graphical showcase - very GPU heavy"
  },
  "Video Editing (Premiere)": {
    category: "Mixed",
    cpuScaling: { "1080p": 1.0, "1440p": 0.95, "4K": 0.90 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.85, "4K": 0.70 },
    vramRequired: { "1080p": 4, "1440p": 6, "4K": 8 },
    type: "productivity",
    description: "Video editing - CPU + GPU acceleration"
  },
  "3D Rendering (Blender)": {
    category: "GPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 0.90, "4K": 0.85 },
    gpuScaling: { "1080p": 1.0, "1440p": 0.88, "4K": 0.75 },
    vramRequired: { "1080p": 6, "1440p": 8, "4K": 12 },
    type: "productivity",
    description: "3D rendering - GPU CUDA/OptiX heavy"
  },
  "Streaming (x264)": {
    category: "CPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 1.0, "4K": 1.0 },
    gpuScaling: { "1080p": 1.0, "1440p": 1.0, "4K": 1.0 },
    vramRequired: { "1080p": 2, "1440p": 2, "4K": 2 },
    type: "productivity",
    description: "Live streaming - very CPU intensive"
  },
  "Streaming (NVENC)": {
    category: "GPU-bound",
    cpuScaling: { "1080p": 1.0, "1440p": 1.0, "4K": 1.0 },
    gpuScaling: { "1080p": 1.0, "1440p": 1.0, "4K": 1.0 },
    vramRequired: { "1080p": 2, "1440p": 2, "4K": 2 },
    type: "productivity",
    description: "GPU encoding - minimal CPU impact"
  },
};

// === RAM MULTIPLIERS ===
const RAM_MULTIPLIERS = {
  "8": { fpsFactor: 0.88, label: "8 GB", status: "Insuficiente para juegos modernos" },
  "16": { fpsFactor: 1.0, label: "16 GB", status: "Estándar para gaming" },
  "32": { fpsFactor: 1.03, label: "32 GB", status: "Ideal para multitasking" },
  "64": { fpsFactor: 1.04, label: "64 GB", status: "Overkill para gaming" },
};

// === USE CASE MULTIPLIERS ===
const USE_CASE_MULTIPLIERS = {
  "gaming": { cpuFactor: 1.0, gpuFactor: 1.0, label: "Gaming" },
  "streaming": { cpuFactor: 0.82, gpuFactor: 0.95, label: "Gaming + Streaming" },
  "editing": { cpuFactor: 0.90, gpuFactor: 1.0, label: "Edición de Video / 3D" },
  "productivity": { cpuFactor: 0.78, gpuFactor: 0.92, label: "Productividad Pesada" },
};

// === BOTTLENECK THRESHOLDS ===
const BOTTLENECK_THRESHOLDS = {
  balanced: { max: 10, label: "Bien Balanceado", color: "balanced" },
  slight: { max: 25, label: "Bottleneck Leve", color: "balanced" },
  moderate: { max: 45, label: "Bottleneck Moderado", color: "warn" },
  severe: { max: 100, label: "Bottleneck Severo", color: "danger" },
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

// === KNOWN BENCHMARK COMBOS ===
const BENCHMARK_COMBOS = {
  "Ryzen 5 5600X + RTX 3060": { "1080p": 105, "1440p": 78, "4K": 42 },
  "Ryzen 5 5600X + RTX 4060": { "1080p": 118, "1440p": 88, "4K": 48 },
  "Ryzen 5 5600X + RTX 4070": { "1080p": 142, "1440p": 108, "4K": 58 },
  "Ryzen 7 5800X3D + RTX 3080": { "1080p": 195, "1440p": 152, "4K": 82 },
  "Ryzen 7 5800X3D + RTX 4070": { "1080p": 178, "1440p": 142, "4K": 75 },
  "Ryzen 7 7800X3D + RTX 4080": { "1080p": 248, "1440p": 198, "4K": 108 },
  "Core i5-12400F + RTX 3060": { "1080p": 102, "1440p": 75, "4K": 40 },
  "Core i5-13400F + RTX 4060": { "1080p": 122, "1440p": 92, "4K": 50 },
  "Core i7-13700K + RTX 4070 Ti": { "1080p": 208, "1440p": 168, "4K": 92 },
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CPU_DATA, GPU_DATA, STORAGE_DATA, QUALITY_MULTIPLIERS, WORKLOAD_DATA, RAM_MULTIPLIERS, USE_CASE_MULTIPLIERS, BOTTLENECK_THRESHOLDS, UPGRADE_RECOMMENDATIONS, BENCHMARK_COMBOS };
}
