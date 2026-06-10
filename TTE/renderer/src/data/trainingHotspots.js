export const excludedTrainingViewIds = [8, 15, 17, 20];

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
      { id: "plax-rvin-rv", label: "RV", x: 55.42, y: 31.3, options: ["RV", "LV", "Aorta", "LA"] },
      { id: "plax-rvin-ivc", label: "IVC", x: 71.95, y: 48.65, options: ["SVC", "IVC", "PV", "PA"] },
      { id: "plax-rvin-tv", label: "TV", x: 56.96, y: 51.98, options: ["TV", "PV", "MV", "AV"] },
      { id: "plax-rvin-ra", label: "RA", x: 62.55, y: 61.55, options: ["RA", "RV", "LA", "PA"] },
      { id: "plax-rvin-svc", label: "SVC", x: 57.85, y: 82.23, options: ["SVC", "IVC", "PV", "PA"] }
    ]
  },
  3: {
    image: "/assets/training/images/PlaxRVoutEcho.png",
    video: "/assets/training/videos/PlaxRVout.mp4",
    hotspots: [
      { id: "plax-rvout-rv", label: "RVOT", x: 50.4, y: 29.55, options: ["RVOT", "PV", "Aorta", "LV"] },
      { id: "plax-rvout-pv", label: "PV", x: 55.98, y: 35.61, options: ["PV", "TV", "LV", "AV"] },
      { id: "plax-rvout-pa", label: "PA", x: 60.98, y: 47.07, options: ["RA", "PA", "Aorta", "AV"] }
    ]
  },
  4: {
    image: "/assets/training/images/PsaxOutEcho.png",
    video: "/assets/training/videos/PsaxOut.mp4",
    hotspots: [
      { id: "psax-out-ra", label: "RA", x: 39.07, y: 47.48, options: ["RV", "LV", "PA", "Aorta"] },
      { id: "psax-out-tv", label: "TV", x: 40.9, y: 38.93, options: ["TV", "IAS", "MV", "PV"] },
      { id: "psax-out-ias", label: "IAS", x: 41.67, y: 57.99, options: ["PV", "AV", "TV", "MV"] },
      { id: "psax-out-rv", label: "IVS", x: 47.43, y: 28.16, options: ["LA", "RA", "RV", "PA"] },
      { id: "psax-out-la", label: "LA", x: 48.2, y: 63.5, options: ["AV", "PV", "MV", "TV"] },
      { id: "psax-out-pv", label: "PV", x: 60.22, y: 38.93, options: ["PA", "Aorta", "RV", "LV"] },
      { id: "psax-out-pa", label: "PA", x: 61.33, y: 44.78, options: ["IVS", "IAS", "TV", "PV"] },
      { id: "psax-out-aorta", label: "Aorta", x: 90.8, y: 26.41, options: ["LA", "RA", "RV", "PA"] }
    ]
  },
  5: {
    image: "/assets/training/images/PsaxMVEcho.png",
    video: "/assets/training/videos/PsaxMV.mp4",
    hotspots: [
      { id: "psax-mv-rv", label: "RV", x: 44.96, y: 32.71, options: ["LV", "RV", "Aorta", "PA"] },
      { id: "psax-mv-aml", label: "AML", x: 51.5, y: 48.09, options: ["AML", "PML", "AV", "TV"] },
      { id: "psax-mv-pml", label: "PML", x: 52.56, y: 63.48, options: ["PML", "AML", "AV", "TV"] }
    ]
  },
  6: {
    image: "/assets/training/images/PsaxMidEcho.png",
    video: "/assets/training/videos/PsaxMid.mp4",
    hotspots: [
      { id: "psax-mid-rv", label: "RV", x: 48.46, y: 26.41, options: ["LV", "RV", "Aorta", "PA"] },
      { id: "psax-mid-pmpm", label: "PMPM", x: 49.66, y: 57.18, options: ["LV", "RV", "LA", "RA"] },
      { id: "psax-mid-lv", label: "LV", x: 53.32, y: 43.55, options: ["ALPM", "PMPM", "AML", "PML"] },
      { id: "psax-mid-alpm", label: "ALPM", x: 58.17, y: 49.4, options: ["ALPM", "PMPM", "AML", "PML"] }
    ]
  },
  7: {
    image: "/assets/training/images/PsaxApexEcho.png",
    video: "/assets/training/videos/PsaxApex.mp4",
    hotspots: [
      { id: "psax-apex-rv", label: "RV", x: 49.96, y: 27.35, options: ["LV", "RV", "Aorta", "PA"] },
      { id: "psax-apex-lv", label: "LV", x: 54.82, y: 40.85, options: ["LV", "RV", "LA", "RA"] }
    ]
  },
  9: {
    image: "/assets/training/images/Apical4Echo.png",
    video: "/assets/training/videos/Apical4.mp4",
    hotspots: [
      { id: "apical4-rv", label: "RV", x: 46.2, y: 43.5, options: ["LV", "RV", "Aorta", "PA"] },
      { id: "apical4-tv", label: "TV", x: 46.63, y: 70.59, options: ["LV", "RV", "LA", "RA"] },
      { id: "apical4-ra", label: "RA", x: 50.33, y: 78.37, options: ["MV", "TV", "PV", "AV"] },
      { id: "apical4-lpv", label: "L PV", x: 55.19, y: 86.14, options: ["MV", "TV", "PV", "AV"] },
      { id: "apical4-lv", label: "LV", x: 56.34, y: 34.22, options: ["LPV", "RPV", "LPA", "RPA"] },
      { id: "apical4-mv", label: "MV", x: 57.8, y: 47.5, options: ["LV", "RV", "LA", "RA"] },
      { id: "apical4-la", label: "LA", x: 59.03, y: 75.38, options: ["LV", "RV", "LA", "RA"] },
      { id: "apical4-rpv", label: "R PV", x: 69.42, y: 66.75, options: ["LPV", "RPV", "LPA", "RPA"] }
    ]
  },
  10: {
    image: "/assets/training/images/Apical5Echo.png",
    video: "/assets/training/videos/Apical5.mp4",
    hotspots: [
      { id: "apical5-ra", label: "RA", x: 42.1, y: 59.61, options: ["LV", "RV", "Aorta", "PA"] },
      { id: "apical5-rv", label: "RV", x: 44.52, y: 32.78, options: ["LV", "RV", "Aorta", "PA"] },
      { id: "apical5-aorta", label: "Aorta", x: 50.85, y: 74.41, options: ["LA", "RA", "LV", "RV"] },
      { id: "apical5-av", label: "AV", x: 52.48, y: 67.77, options: ["AV", "PV", "MV", "TV"] },
      { id: "apical5-lv", label: "LV", x: 52.48, y: 27.39, options: ["Aorta", "PA", "Pulm Vein", "LA"] }
