export const trainingSubviewViews = [
  {
    id: "teach-psax-pa-bifurcation",
    mnemonic: "PsaxPABif",
    view_name: "PSAX Aortic Valve - PA Bifurcation",
    category: "Teaching Subview",
    position: "teaching-subview",
    image: "/assets/training/images/psax-pa-bifurcation.png",
    video: "/assets/training/videos/psax-pa-bifurcation.mp4",
    description:
      "PPT-backed identify-structure training view for PSAX Aortic Valve - PA Bifurcation.",
    hotspots: [
      { id: "teach-psax-pa-bifurcation-1", label: "RV", x: 45.09, y: 40.1, options: ["RV", "LV", "RA", "PA"] },
      { id: "teach-psax-pa-bifurcation-2", label: "RPA", x: 47.98, y: 75.55, options: ["RPA", "LPA", "MPA", "PV"] },
      { id: "teach-psax-pa-bifurcation-3", label: "LPA", x: 60.84, y: 75.59, options: ["RPA", "LPA", "MPA", "PV"] },
      { id: "teach-psax-pa-bifurcation-4", label: "MPA", x: 54.91, y: 60.38, options: ["RPA", "LPA", "MPA", "PV"] },
      { id: "teach-psax-pa-bifurcation-5", label: "PV", x: 57.8, y: 50.0, options: ["RPA", "LPA", "MPA", "PV"] }
    ]
  },
  {
    id: "teach-psax-av-leaflets",
    mnemonic: "PsaxAVLeaf",
    view_name: "PSAX Aortic Valve - AV Leaflets",
    category: "Teaching Subview",
    position: "teaching-subview",
    image: "/assets/training/images/psax-av-leaflets.png",
    video: "/assets/training/videos/psax-av-leaflets.mp4",
    description:
      "PPT-backed identify-structure training view for PSAX Aortic Valve - AV Leaflets.",
    hotspots: [
      { id: "teach-psax-av-leaflets-1", label: "RCC", x: 51.18, y: 47.7, options: ["RCC", "NCC", "LCC", "AV"] },
      { id: "teach-psax-av-leaflets-2", label: "NCC", x: 45.0, y: 55.3, options: ["RCC", "NCC", "LCC", "AV"] },
      { id: "teach-psax-av-leaflets-3", label: "LCC", x: 55.0, y: 55.72, options: ["RCC", "NCC", "LCC", "AV"] },
      { id: "teach-psax-av-leaflets-4", label: "IAS", x: 40.0, y: 68.72, options: ["IAS", "RA", "RV", "LA"] },
      { id: "teach-psax-av-leaflets-5", label: "RV", x: 53.68, y: 35.22, options: ["RV", "LV", "RA", "PA"] },
      { id: "teach-psax-av-leaflets-6", label: "RA", x: 32.65, y: 57.46, options: ["RA", "RV", "LA", "IAS"] },
      { id: "teach-psax-av-leaflets-7", label: "LA", x: 50.0, y: 71.81, options: ["LA", "RA", "LV", "RV"] }
    ]
  },
  {
    id: "teach-plax-av-zoomed",
    mnemonic: "PlaxAVZoom",
    view_name: "PLAX AV Zoomed",
    category: "Teaching Subview",
    position: "teaching-subview",
    image: "/assets/training/images/plax-av-zoomed.png",
    video: "/assets/training/videos/plax-av-zoomed.mp4",
    description: "PPT-backed identify-structure training view for PLAX AV Zoomed.",
    hotspots: [
      { id: "teach-plax-av-zoomed-1", label: "RV", x: 50.0, y: 28.61, options: ["RV", "LV", "RA", "PA"] },
      { id: "teach-plax-av-zoomed-2", label: "RCC", x: 55.0, y: 50.0, options: ["RCC", "NCC", "LCC", "AV"] },
      { id: "teach-plax-av-zoomed-3", label: "LCC/NCC", x: 54.74, y: 68.7, options: ["RCC", "LCC/NCC", "AV", "Aorta"] }
    ]
  },
  {
    id: "teach-plax-mv-zoomed",
    mnemonic: "PlaxMVZoom",
    view_name: "PLAX MV Zoomed",
    category: "Teaching Subview",
    position: "teaching-subview",
    image: "/assets/training/images/plax-mv-zoomed.png",
    video: "/assets/training/videos/plax-mv-zoomed.mp4",
    description: "PPT-backed identify-structure training view for PLAX MV Zoomed.",
    hotspots: [
      { id: "teach-plax-mv-zoomed-1", label: "MV", x: 45.64, y: 57.17, options: ["MV", "AML", "PML", "AV"] },
      { id: "teach-plax-mv-zoomed-2", label: "AML", x: 51.15, y: 47.18, options: ["AML", "PML", "MV", "AV"] },
      { id: "teach-plax-mv-zoomed-3", label: "PML", x: 49.74, y: 66.38, options: ["PML", "AML", "MV", "AV"] }
    ]
  },
  {
    id: "teach-apical4-cs",
    mnemonic: "Ap4CS",
    view_name: "Apical 4 C - Coronary Sinus view",
    category: "Teaching Subview",
    position: "teaching-subview",
    image: "/assets/training/images/apical4-coronary-sinus.png",
    video: "/assets/training/videos/apical4-coronary-sinus.mp4",
    description:
      "PPT-backed identify-structure training view for Apical 4 C - Coronary Sinus view.",
    hotspots: [
      { id: "teach-apical4-cs-1", label: "LV", x: 56.79, y: 34.93, options: ["LV", "LA", "RA", "RV"] },
      { id: "teach-apical4-cs-2", label: "LA", x: 61.28, y: 80.4, options: ["LA", "RA", "LV", "RV"] },
      { id: "teach-apical4-cs-3", label: "CS", x: 57.95, y: 70.66, options: ["CS", "LA", "LV", "RA"] }
    ]
  },
  {
    id: "teach-subcostal-ivc-longaxis",
    mnemonic: "SubIVCLAX",
    view_name: "Subcostal IVC Longaxis",
    category: "Teaching Subview",
    position: "teaching-subview",
    image: "/assets/training/images/subcostal-ivc-longaxis.png",
    video: "/assets/training/videos/subcostal-ivc-longaxis.mp4",
    description: "PPT-backed identify-structure training view for Subcostal IVC Longaxis.",
    hotspots: [
      { id: "teach-subcostal-ivc-longaxis-1", label: "Liver", x: 48.72, y: 37.76, options: ["Liver", "IVC", "Aorta", "RA"] },
      { id: "teach-subcostal-ivc-longaxis-2", label: "IVC", x: 49.62, y: 64.35, options: ["IVC", "Aorta", "Liver", "RA"] },
      { id: "teach-subcostal-ivc-longaxis-3", label: "RA", x: 59.87, y: 66.39, options: ["RA", "RV", "LA", "IAS"] }
    ]
  },
  {
    id: "teach-subcostal-ivc-aorta",
    mnemonic: "SubIVCAo",
    view_name: "Subcostal IVC - Aorta",
    category: "Teaching Subview",
    position: "teaching-subview",
    image: "/assets/training/images/subcostal-ivc-aorta.png",
    video: "/assets/training/videos/subcostal-ivc-aorta.mp4",
    description: "PPT-backed identify-structure training view for Subcostal IVC - Aorta.",
    hotspots: [
      { id: "teach-subcostal-ivc-aorta-1", label: "Aorta", x: 43.62, y: 57.54, options: ["Aorta", "IVC", "Liver", "RA"] },
      { id: "teach-subcostal-ivc-aorta-2", label: "Liver", x: 47.98, y: 42.46, options: ["Liver", "IVC", "Aorta", "RA"] }
    ]
  },
  {
    id: "teach-subcostal-aorta-longaxis-color",
    mnemonic: "SubAoColor",
    view_name: "Subcostal Aorta Long Axis Color",
    category: "Teaching Subview",
    position: "teaching-subview",
    image: "/assets/training/images/subcostal-aorta-longaxis-color.png",
    video: "/assets/training/videos/subcostal-aorta-longaxis-color.mp4",
    description:
      "Color Doppler version of the PPT-backed Subcostal IVC - Aorta identify-structure view.",
    hotspots: [
      { id: "teach-subcostal-aorta-longaxis-color-1", label: "Aorta", x: 43.62, y: 57.54, options: ["Aorta", "IVC", "Liver", "RA"] },
      { id: "teach-subcostal-aorta-longaxis-color-2", label: "Liver", x: 47.98, y: 42.46, options: ["Liver", "IVC", "Aorta", "RA"] }
    ]
  },
  {
    id: "teach-subcostal-great-vessels-sax",
    mnemonic: "SubGVSAX",
    view_name: "Subcostal Great Vessels SAX",
    category: "Teaching Subview",
    position: "teaching-subview",
    image: "/assets/training/images/subcostal-great-vessels-sax.png",
    video: "/assets/training/videos/subcostal-great-vessels-sax.mp4",
    description:
      "PPT-backed identify-structure training view for Subcostal Great Vessels SAX.",
    hotspots: [
      { id: "teach-subcostal-great-vessels-sax-1", label: "Aorta", x: 59.51, y: 57.06, options: ["Aorta", "IVC", "Liver", "RA"] },
      { id: "teach-subcostal-great-vessels-sax-2", label: "IVC", x: 44.08, y: 59.8, options: ["IVC", "Aorta", "Liver", "RA"] },
      { id: "teach-subcostal-great-vessels-sax-3", label: "Liver", x: 38.61, y: 51.58, options: ["Liver", "IVC", "Aorta", "RA"] }
    ]
  },
  {
    id: "teach-suprasternal-aortic-lax",
    mnemonic: "SupAoLAX",
    view_name: "Suprasternal Aortic LAX",
    category: "Teaching Subview",
    position: "teaching-subview",
    image: "/assets/training/images/suprasternal-aortic-lax.png",
    video: "/assets/training/videos/suprasternal-aortic-lax.mp4",
    description:
      "PPT-backed identify-structure training view for Suprasternal Aortic LAX.",
    hotspots: [
      { id: "teach-suprasternal-aortic-lax-1", label: "LSCA", x: 66.67, y: 39.57, options: ["LSCA", "LCC", "BCA", "Arch"] },
      { id: "teach-suprasternal-aortic-lax-2", label: "DTA", x: 58.33, y: 53.23, options: ["DTA", "Arch", "BCA", "LCC"] },
      { id: "teach-suprasternal-aortic-lax-3", label: "Arch", x: 51.12, y: 33.5, options: ["Arch", "BCA", "LCC", "LSCA"] },
      { id: "teach-suprasternal-aortic-lax-4", label: "BCA", x: 56.47, y: 25.75, options: ["BCA", "LCC", "LSCA", "Arch"] },
      { id: "teach-suprasternal-aortic-lax-5", label: "LCC", x: 63.29, y: 31.3, options: ["LCC", "BCA", "LSCA", "Arch"] }
    ]
  },
  {
    id: "teach-suprasternal-sax",
    mnemonic: "SupSAX",
    view_name: "Suprasternal SAX",
    category: "Teaching Subview",
    position: "teaching-subview",
    image: "/assets/training/images/suprasternal-sax.png",
    video: "/assets/training/videos/suprasternal-sax.mp4",
    description: "PPT-backed identify-structure training view for Suprasternal SAX.",
    hotspots: [
      { id: "teach-suprasternal-sax-1", label: "Aorta", x: 54.36, y: 34.34, options: ["Aorta", "LPA", "LA", "RPA"] },
      { id: "teach-suprasternal-sax-2", label: "LPA", x: 54.36, y: 52.69, options: ["RPA", "LPA", "MPA", "PV"] },
      { id: "teach-suprasternal-sax-3", label: "LA", x: 52.19, y: 65.99, options: ["LA", "RA", "LV", "RV"] }
    ]
  }
];

export const trainingSubviewsByViewId = {
  1: trainingSubviewViews.filter((view) =>
    ["teach-plax-av-zoomed", "teach-plax-mv-zoomed"].includes(view.id)
  ),
  4: trainingSubviewViews.filter((view) =>
    ["teach-psax-pa-bifurcation", "teach-psax-av-leaflets"].includes(view.id)
  ),
  9: trainingSubviewViews.filter((view) => view.id === "teach-apical4-cs"),
  18: trainingSubviewViews.filter((view) =>
    [
      "teach-subcostal-ivc-longaxis",
      "teach-subcostal-ivc-aorta",
      "teach-subcostal-aorta-longaxis-color",
      "teach-subcostal-great-vessels-sax"
    ].includes(view.id)
  ),
  19: trainingSubviewViews.filter((view) =>
    ["teach-suprasternal-aortic-lax", "teach-suprasternal-sax"].includes(view.id)
  )
};
