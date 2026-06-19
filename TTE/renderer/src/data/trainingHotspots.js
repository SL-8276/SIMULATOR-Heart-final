export const excludedTrainingViewIds = [8, 15, 17, 20];

export const supplementalTrainingHotspotsByViewId = {
  1: [
    { id: "plax-extra-rcc", label: "RCC", x: 55.0, y: 50.0, options: ["RCC", "NCC", "LCC", "AV"] },
    { id: "plax-extra-lcc-ncc", label: "LCC/NCC", x: 54.74, y: 68.7, options: ["RCC", "LCC/NCC", "AV", "Aorta"] },
    { id: "plax-extra-aml", label: "AML", x: 51.15, y: 47.18, options: ["AML", "PML", "MV", "AV"] },
    { id: "plax-extra-pml", label: "PML", x: 49.74, y: 66.38, options: ["PML", "AML", "MV", "AV"] }
  ],
  4: [
    { id: "psax-out-extra-rpa", label: "RPA", x: 47.98, y: 75.55, options: ["RPA", "LPA", "MPA", "PV"] },
    { id: "psax-out-extra-lpa", label: "LPA", x: 60.84, y: 75.59, options: ["RPA", "LPA", "MPA", "PV"] },
    { id: "psax-out-extra-mpa", label: "MPA", x: 54.91, y: 60.38, options: ["RPA", "LPA", "MPA", "PV"] },
    { id: "psax-out-extra-rcc", label: "RCC", x: 51.18, y: 47.7, options: ["RCC", "NCC", "LCC", "AV"] },
    { id: "psax-out-extra-ncc", label: "NCC", x: 45.0, y: 55.3, options: ["RCC", "NCC", "LCC", "AV"] },
    { id: "psax-out-extra-lcc", label: "LCC", x: 55.0, y: 55.72, options: ["RCC", "NCC", "LCC", "AV"] }
  ],
  9: [
    { id: "apical4-extra-cs", label: "CS", x: 57.95, y: 70.66, options: ["CS", "LA", "LV", "RA"] }
  ],
  18: [
    { id: "subivc-extra-liver", label: "Liver", x: 48.72, y: 37.76, options: ["Liver", "IVC", "Aorta", "RA"] },
    { id: "subivc-extra-aorta", label: "Aorta", x: 43.62, y: 57.54, options: ["Aorta", "IVC", "Liver", "RA"] }
  ],
  19: [
    { id: "suplax-extra-bca", label: "BCA", x: 56.47, y: 25.75, options: ["BCA", "LCC", "LSCA", "Arch"] }
  ],
  "teaching-psax-pa-bifurcation": [
    { id: "teach-psax-pa-bifurcation-1", label: "RV", x: 45.09, y: 40.1, options: ["RV", "LV", "RA", "PA"] },
    { id: "teach-psax-pa-bifurcation-2", label: "RPA", x: 47.98, y: 75.55, options: ["RPA", "LPA", "MPA", "PV"] },
    { id: "teach-psax-pa-bifurcation-3", label: "LPA", x: 60.84, y: 75.59, options: ["RPA", "LPA", "MPA", "PV"] },
    { id: "teach-psax-pa-bifurcation-4", label: "MPA", x: 54.91, y: 60.38, options: ["RPA", "LPA", "MPA", "PV"] },
    { id: "teach-psax-pa-bifurcation-5", label: "PV", x: 57.8, y: 50.0, options: ["RPA", "LPA", "MPA", "PV"] }
  ],
};

export const trainingViewOverrides = {
  1: {
    image: "/assets/training/images/PlaxEcho.png",
    video: "/assets/training/videos/plax.mp4", 
    hotspots: [
      { id: "plax-rv", label: "RV", x: 52.5, y: 29.73, options: ["RV", "LV", "Aorta", "LA"] },
      { id: "plax-lv", label: "LV", x: 40.97, y: 47.44, options: ["RV", "LV", "Aorta", "LA"] },
      { id: "plax-av", label: "AV", x: 55.92, y: 46.08, options: ["AV", "MV", "PV", "TV"] },
      { id: "plax-aorta", label: "Aorta", x: 64.14, y: 44.79, options: ["RV", "LV", "Aorta", "LA"] },
      { id: "plax-mv", label: "MV", x: 47.41, y: 60.3, options: ["AV", "MV", "PV", "TV"] },
      { id: "plax-la", label: "LA", x: 55.2, y: 62.99, options: ["RV", "LV", "Aorta", "LA"] },
      { id: "plax-dta", label: "DTA", x: 56.74, y: 77.51, options: ["DTA", "SVC", "IVC", "Pulmonary vein"] }
    ]
  },

  2: {
    image: "/assets/training/images/PlaxRVinEcho.png",
    video: "/assets/training/videos/PlaxRVin.mp4",
    hotspots: [
      { id: "plax-rvin-lv", label: "LV", x: 55.42, y: 31.3, options: ["LV", "RV", "LA", "RA"] },
      { id: "plax-rvin-tv", label: "TV", x: 71.95, y: 48.65, options: ["LV", "RV", "LA", "RA"] },
      { id: "plax-rvin-svc", label: "SVC", x: 56.96, y: 51.98, options: ["LV", "RV", "LA", "RA"] },
      { id: "plax-rvin-ra", label: "RA", x: 62.55, y: 61.55, options: ["LV", "RV", "LA", "RA"] },
      { id: "plax-rvin-ivc", label: "IVC", x: 57.85, y: 82.23, options: ["LV", "RV", "LA", "RA"] }
    ]
  },

  3: {
    image: "/assets/training/images/PlaxRVoutEcho.png",
    video: "/assets/training/videos/PlaxRVout.mp4",
    hotspots: [
      { id: "plax-rvout-rvot", label: "RVOT", x: 50.4, y: 29.55, options: ["RVOT", "PV", "Aorta", "LV"] },
      { id: "plax-rvout-pv", label: "PV", x: 55.98, y: 35.61, options: ["PV", "TV", "LV", "AV"] },
      { id: "plax-rvout-ra", label: "RA", x: 60.98, y: 47.07, options: ["RA", "PA", "Aorta", "AV"] }
    ]
  },

  4: {
    image: "/assets/training/images/PsaxOutEcho.png",
    video: "/assets/training/videos/PsaxOut.mp4",
    hotspots: [
      { id: "psax-out-1", label: "RV", x: 47.43, y: 28.16, options: ["ALPM", "PMPM", "AML", "PML"] },
      { id: "psax-out-2", label: "TV", x: 40.9, y: 38.93, options: ["ALPM", "PMPM", "AML", "PML"] },
      { id: "psax-out-3", label: "PV", x: 60.22, y: 38.93, options: ["ALPM", "PMPM", "AML", "PML"] },
      { id: "psax-out-4", label: "LA", x: 39.07, y: 47.48, options: ["ALPM", "PMPM", "AML", "PML"] },
      { id: "psax-out-5", label: "SVC", x: 61.33, y: 44.78, options: ["ALPM", "PMPM", "AML", "PML"] },
      { id: "psax-out-6", label: "PA", x: 41.67, y: 57.99, options: ["ALPM", "PMPM", "AML", "PML"] },
      { id: "psax-out-7", label: "IVS", x: 48.2, y: 63.5, options: ["ALPM", "PMPM", "AML", "PML"] },
      { id: "psax-out-8", label: "RA", x: 52.5, y: 70.0, options: ["ALPM", "PMPM", "AML", "PML"] }
    ]
  },

  5: {
    image: "/assets/training/images/PsaxMVEcho.png",
    video: "/assets/training/videos/PsaxMV.mp4",
    hotspots: [
      { id: "psax-mv-1", label: "LV", x: 44.96, y: 32.71, options: ["LV", "RV", "Aorta", "PA"] },
      { id: "psax-mv-2", label: "AML", x: 51.5, y: 48.09, options: ["AML", "PML", "AV", "TV"] },
      { id: "psax-mv-3", label: "PML", x: 52.56, y: 63.48, options: ["PML", "AML", "AV", "TV"] }
    ]
  },

6: {
  image: "/assets/training/images/PsaxMidEcho.png",
  video: "/assets/training/videos/PsaxMid.mp4",
  hotspots: [
    {
      id: "psax-mid-rv",
      label: "RV",
      x: 48.46,
      y: 26.41,
      options: ["LV", "RV", "LA", "RA"]
    },
    {
      id: "psax-mid-pmpm",
      label: "PMPM",
      x: 49.66,
      y: 57.18,
      options: ["ALPM", "PMPM", "AML", "PML"]
    },
    {
      id: "psax-mid-lv",
      label: "LV",
      x: 53.32,
      y: 43.55,
      options: ["LV", "RV", "LA", "RA"]
    },
    {
      id: "psax-mid-alpm",
      label: "ALPM",
      x: 58.17,
      y: 49.4,
      options: ["ALPM", "PMPM", "AML", "PML"]
    }
  ]
},

  7: {
    image: "/assets/training/images/PsaxApexEcho.png",
    video: "/assets/training/videos/PsaxApex.mp4",
    hotspots: [
      { id: "psax-apex-1", label: "LV", x: 49.96, y: 27.35, options: ["LV", "RV", "Aorta", "PA"] },
      { id: "psax-apex-2", label: "RV", x: 54.82, y: 40.85, options: ["LV", "RV", "LA", "RA"] }
    ]
  },

  9: {
    image: "/assets/training/images/Apical4Echo.png",
    video: "/assets/training/videos/Apical4.mp4",
    hotspots: [
      { id: "apical4-1", label: "RV", x: 46.2, y: 43.5, options: ["LV", "RV", "LA", "RA"] },
      { id: "apical4-2", label: "LV", x: 43.8, y: 56.0, options: ["MV", "TV", "PV", "AV"] },
      { id: "apical4-3", label: "MV", x: 50.8, y: 70.5, options: ["LV", "RV", "LA", "RA"] },
      { id: "apical4-4", label: "TV", x: 55.19, y: 86.14, options: ["LPV", "RPV", "LPA", "RPA"] },
      { id: "apical4-5", label: "LPV", x: 56.34, y: 34.22, options: ["LV", "RV", "Aorta", "PA"] },
      { id: "apical4-6", label: "LA", x: 57.8, y: 68.0, options: ["MV", "TV", "PV", "AV"] },
      { id: "apical4-7", label: "RA", x: 59.03, y: 75.38, options: ["LV", "RV", "LA", "RA"] },
      { id: "apical4-8", label: "RPV", x: 69.42, y: 66.75, options: ["LPV", "RPV", "LPA", "RPA"] }
    ]
  },

  10: {
    image: "/assets/training/images/Apical5Echo.png",
    video: "/assets/training/videos/Apical5.mp4",
    hotspots: [
      { id: "apical5-1", label: "LV", x: 52.48, y: 27.39, options: ["LV", "RV", "Aorta", "PA"] },
      { id: "apical5-2", label: "RV", x: 44.52, y: 32.78, options: ["LV", "RV", "Aorta", "PA"] },
      { id: "apical5-3", label: "LA", x: 44.2, y: 63.8, options: ["LA", "RA", "LV", "RV"] },
      { id: "apical5-4", label: "AV", x: 52.48, y: 67.77, options: ["AV", "PV", "MV", "TV"] },
      { id: "apical5-5", label: "Aorta", x: 50.85, y: 74.41, options: ["Aorta", "PA", "Pulm Vein", "LA"] }
    ]
  },

  11: {
    image: "/assets/training/images/Apical2Echo.png",
    video: "/assets/training/videos/Apical2.mp4",
    hotspots: [
      { id: "apical2-1", label: "AW", x: 62.64, y: 33.45, options: ["AW", "IW", "SW", "LW"] },
      { id: "apical2-2", label: "IW", x: 48.07, y: 40.21, options: ["AW", "IW", "SW", "LW"] },
      { id: "apical2-3", label: "RV", x: 56.2, y: 40.21, options: ["RV", "LV", "LA", "RA"] },
      { id: "apical2-4", label: "MV", x: 57.78, y: 64.65, options: ["MV", "TV", "AV", "PV"] },
      { id: "apical2-5", label: "LA", x: 59.52, y: 78.16, options: ["MV", "TV", "AV", "PV"] }
    ]
  },

  12: {
    image: "/assets/training/images/ApicalLAXEcho.png",
    video: "/assets/training/videos/ApicalLAX.mp4",
    hotspots: [
      { id: "apicallax-1", label: "RV", x: 51.46, y: 28.41, options: ["RV", "LV", "LA", "RA"] },
      { id: "apicallax-2", label: "ASW", x: 61.18, y: 34.52, options: ["ASW", "ISW", "ILW", "ALW"] },
      { id: "apicallax-3", label: "ISW", x: 45.65, y: 40.51, options: ["ASW", "ISW", "ILW", "ALW"] },
      { id: "apicallax-4", label: "RVOT", x: 67.71, y: 37.81, options: ["RVOT", "LVOT", "Aorta", "LV"] },
      { id: "apicallax-5", label: "MV", x: 60.12, y: 57.99, options: ["MV", "TV", "AV", "PV"] },
      { id: "apicallax-6", label: "AV", x: 67.71, y: 53.58, options: ["MV", "TV", "AV", "PV"] },
      { id: "apicallax-7", label: "Aorta", x: 72.04, y: 55.29, options: ["Aorta", "PA", "PV", "LV"] },
      { id: "apicallax-8", label: "LA", x: 65.89, y: 66.79, options: ["RV", "LV", "LA", "RA"] }
    ]
  },

  13: {
    image: "/assets/training/images/Sub4Echo.png",
    video: "/assets/training/videos/Sub4.mp4",
    hotspots: [
      { id: "sub4-tv", label: "TV", x: 49.72, y: 42.09, options: ["MV", "TV", "PV", "AV"] },
      { id: "sub4-mv", label: "MV", x: 55.83, y: 54.05, options: ["MV", "TV", "PV", "AV"] },
      { id: "sub4-ra", label: "RA", x: 47.22, y: 48.37, options: ["LV", "RV", "LA", "RA"] },
      { id: "sub4-la", label: "LA", x: 50.97, y: 59.52, options: ["LV", "RV", "LA", "RA"] },
      { id: "sub4-lv", label: "LV", x: 59.24, y: 46.87, options: ["LV", "RV", "LA", "RA"] },
      { id: "sub4-rv", label: "RV", x: 52.12, y: 38.16, options: ["LV", "RV", "LA", "RA"] }
    ]
  },

  14: {
    image: "/assets/training/images/SubOutEcho.png",
    video: "/assets/training/videos/SubOut.mp4",
    hotspots: [
      { id: "subout-ra", label: "RA", x: 59.96, y: 52.87, options: ["RV", "RA", "PA", "LA"] },
      { id: "subout-la", label: "LA", x: 65.42, y: 65.75, options: ["RA", "LA", "RV", "PA"] },
      { id: "subout-av", label: "AV", x: 65.85, y: 55.25, options: ["AV", "PV", "MV", "TV"] },
      { id: "subout-pa", label: "PA", x: 71.74, y: 56.25, options: ["PA", "LA", "RA", "RV"] },
      { id: "subout-rv", label: "RV", x: 64.82, y: 41.17 }
    ]
  },

  16: {
    image: "/assets/training/images/SubMidEcho.png",
    video: "/assets/training/videos/SubMid.mp4",
    hotspots: [
      { id: "submid-rv", label: "RV", x: 67.32, y: 35.45 },
      { id: "submid-lv", label: "LV", x: 66.03, y: 53.8 }
    ]
  },

  18: {
    image: "/assets/training/images/SubIVCEcho.png",
    video: "/assets/training/videos/SubIVC.mp4",
    hotspots: [
      { id: "subivc-ra", label: "RA", x: 54.53, y: 56.59, options: ["RA", "LA", "LV", "RV"] },
      { id: "subivc-ivc", label: "IVC", x: 40.16, y: 53.41, options: ["Hepatic vein", "IVC", "Portal vein", "Aorta"] },
      { id: "subivc-hv", label: "Hepatic vein", x: 44.43, y: 43.29, options: ["Hepatic vein", "IVC", "Portal vein", "Aorta"] }
    ]
  },

  19: {
    image: "/assets/training/images/SupLAXEcho.png",
    video: "/assets/training/videos/SupLAX.mp4",
    hotspots: [
      { id: "suplax-lcc", label: "LCC", x: 60.03, y: 28.24, options: ["LCC", "BCA", "LSCA", "Arch"] },
      { id: "suplax-lsca", label: "LSCA", x: 61.73, y: 38.74, options: ["LCC", "BCA", "LSCA", "Arch"] },
      { id: "suplax-dta", label: "DTA", x: 60.03, y: 57.74, options: ["Arch", "DTA", "LSCA", "PA"] },
      { id: "suplax-arch", label: "Arch", x: 53.44, y: 35.74, options: ["LCC", "BCA", "LSCA", "Arch"] }
    ]
  }
};
