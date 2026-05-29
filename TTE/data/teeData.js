const IMAGE_BY_MNEMONIC = {
  MidEso4: "/assets/images/MidEso4.png",
  MidEso2: "/assets/images/MidEso2.png",
  MidEsoM: "/assets/images/MidEsoM.png",
  MidEsoLAX: "/assets/images/MidEsoLAX.png",
  MidEsoAV_SAX: "/assets/images/MidEsoAV_SAX.png",
  MidEsoAV_LAX: "/assets/images/MidEsoAV_LAX.png",
  MidEsoRV_IO: "/assets/images/MidEsoRV_IO.png",
  MidEsoBi: "/assets/images/MidEsoBi.png",
  MidEsoDA_SAX: "/assets/images/MidEsoDA_SAX.png",
  MidEsoDA_LAX: "/assets/images/MidEsoDA_LAX.png",
  TM_SAX: "/assets/images/TM_SAX.png",
  T2C: "/assets/images/T2C.png",
  TB_SAX: "/assets/images/TB_SAX.png",
  T_LAX: "/assets/images/T_LAX.png",
  DT_LAX: "/assets/images/DT_LAX.png",
  TRVin: "/assets/images/TRVin.png",
  UE_LAX: "/assets/images/UE_LAX.png",
  UE_SAX: "/assets/images/UE_SAX.png",
  MidEA_LAX: "/assets/images/MidEA_LAX.png",
  MidEA_SAX: "/assets/images/MidEA_SAX.png"
};

const VIDEO_BY_MNEMONIC = {
  MidEso4: "/assets/videos/MidEso4.mp4",
  MidEso2: "/assets/videos/MidEso2.mp4",
  MidEsoM: "/assets/videos/MidEsoM.mp4",
  MidEsoLAX: "/assets/videos/MidEsoLAX.mp4",
  MidEsoAV_SAX: "/assets/videos/MisEsoAV_SAX.mp4",
  MidEsoAV_LAX: "/assets/videos/MisEsoAV_LAX.mp4",
  MidEsoRV_IO: "/assets/videos/MidEsoRV_IO.mp4",
  MidEsoBi: "/assets/videos/MidEsoBi.mp4",
  MidEsoDA_SAX: "/assets/videos/MidEsoDA_SAX.mp4",
  MidEsoDA_LAX: "/assets/videos/MidEsoDA_LAX.mp4",
  TM_SAX: "/assets/videos/TM_SAX.mp4",
  T2C: "/assets/videos/T2C.mp4",
  TB_SAX: "/assets/videos/TB_SAX.mp4",
  T_LAX: "/assets/videos/T_LAX.mp4",
  DT_LAX: "/assets/videos/DT_LAX.mp4",
  TRVin: "/assets/videos/TRVin.mp4",
  UE_LAX: "/assets/videos/UE_LAX.mp4",
  UE_SAX: "/assets/videos/UE_SAX.mp4",
  MidEA_LAX: "/assets/videos/MidEA_LAX.mp4",
  MidEA_SAX: "/assets/videos/MidEA_SAX.mp4"
};

function createView({
  id,
  mnemonic,
  view_name,
  category,
  position,
  probe_orientation,
  intercostal_space,
  patient_position,
  description,
  structures_visible
}) {
  return {
    id,
    mnemonic,
    view_name,
    category,
    position,
    image: IMAGE_BY_MNEMONIC[mnemonic],
    video: VIDEO_BY_MNEMONIC[mnemonic],
    probe_orientation,
    intercostal_space,
    patient_position,
    description,
    structures_visible,
    tags: []
  };
}

export const views = [
  createView({
    id: 1,
    mnemonic: "MidEso4",
    view_name: "Mid Esophageal Four Chamber",
    category: "Mid Esophageal",
    position: "mid esophageal",
    probe_orientation: "Multiplane angle typically near 0 to 20 degrees to open the four-chamber plane.",
    intercostal_space:
      "Mid esophageal depth, centered behind the atria with gentle adjustment for the mitral and tricuspid valves.",
    patient_position: "Supine with TEE probe in place",
    description: "Standard mid esophageal four-chamber view of both atria and ventricles.",
    structures_visible: ["LA", "RA", "LV", "RV", "MV", "TV"]
  }),
  createView({
    id: 2,
    mnemonic: "MidEso2",
    view_name: "Mid Esophageal Two Chamber",
    category: "Mid Esophageal",
    position: "mid esophageal",
    probe_orientation: "Multiplane angle commonly around 80 to 100 degrees.",
    intercostal_space:
      "Mid esophageal depth with probe rotation adjusted to isolate the left atrium and left ventricle.",
    patient_position: "Supine with TEE probe in place",
    description: "Mid esophageal two-chamber view emphasizing the left-sided chambers.",
    structures_visible: ["LA", "LV", "MV"]
  }),
  createView({
    id: 3,
    mnemonic: "MidEsoM",
    view_name: "Mid Esophageal Mitral Commissural",
    category: "Mid Esophageal",
    position: "mid esophageal",
    probe_orientation: "Multiplane angle usually around 50 to 70 degrees.",
    intercostal_space:
      "Mid esophageal depth with slight probe rotation to profile the mitral commissures.",
    patient_position: "Supine with TEE probe in place",
    description: "Mid esophageal commissural view focused on the mitral valve leaflets and commissures.",
    structures_visible: ["LA", "LV", "MV", "Papillary muscles"]
  }),
  createView({
    id: 4,
    mnemonic: "MidEsoLAX",
    view_name: "Mid Esophageal LAX",
    category: "Mid Esophageal",
    position: "mid esophageal",
    probe_orientation: "Multiplane angle generally around 120 to 150 degrees.",
    intercostal_space:
      "Mid esophageal depth with subtle rotation to align the LVOT and aortic valve.",
    patient_position: "Supine with TEE probe in place",
    description: "Mid esophageal long-axis view of the left ventricle, LVOT, and aortic valve.",
    structures_visible: ["LV", "LA", "MV", "LVOT", "AV"]
  }),
  createView({
    id: 5,
    mnemonic: "MidEsoAV_SAX",
    view_name: "Mid Esophageal Aortic Valve SAX",
    category: "Mid Esophageal",
    position: "mid esophageal",
    probe_orientation: "Multiplane angle commonly around 30 to 60 degrees.",
    intercostal_space:
      "Mid esophageal depth positioned to center the aortic valve in short axis.",
    patient_position: "Supine with TEE probe in place",
    description: "Short-axis aortic valve view showing the valve cusps and adjacent right heart structures.",
    structures_visible: ["AV", "TV", "RA", "RVOT"]
  }),
  createView({
    id: 6,
    mnemonic: "MidEsoAV_LAX",
    view_name: "Mid Esophageal Aortic Valve LAX",
    category: "Mid Esophageal",
    position: "mid esophageal",
    probe_orientation: "Multiplane angle commonly around 110 to 140 degrees.",
    intercostal_space:
      "Mid esophageal depth with alignment through the LVOT and aortic valve in long axis.",
    patient_position: "Supine with TEE probe in place",
    description: "Long-axis aortic valve view showing the LVOT, aortic valve, and proximal ascending aorta.",
    structures_visible: ["LVOT", "AV", "Ascending aorta", "MV"]
  }),
  createView({
    id: 7,
    mnemonic: "MidEsoRV_IO",
    view_name: "Mid Esophageal Right Ventricle Inflow-Outflow",
    category: "Mid Esophageal",
    position: "mid esophageal",
    probe_orientation:
      "Angle adjusted through the mid esophageal range to open both inflow and outflow tracts.",
    intercostal_space:
      "Mid esophageal depth with probe rotation favoring the right-sided chambers and RVOT.",
    patient_position: "Supine with TEE probe in place",
    description: "Right ventricular inflow-outflow view showing tricuspid inflow and the RV outflow tract.",
    structures_visible: ["RA", "RV", "TV", "RVOT", "PV"]
  }),
  createView({
    id: 8,
    mnemonic: "MidEsoBi",
    view_name: "Mid Esophageal Bicaval",
    category: "Mid Esophageal",
    position: "mid esophageal",
    probe_orientation: "Multiplane angle usually around 90 to 110 degrees.",
    intercostal_space:
      "Mid esophageal depth with rightward rotation to display both vena cavae entering the right atrium.",
    patient_position: "Supine with TEE probe in place",
    description: "Bicaval view displaying the superior and inferior vena cavae with the right atrium.",
    structures_visible: ["SVC", "IVC", "RA", "IAS"]
  }),
  createView({
    id: 9,
    mnemonic: "MidEsoDA_SAX",
    view_name: "Mid Esophageal Descending Aortic SAX",
    category: "Mid Esophageal",
    position: "mid esophageal",
    probe_orientation:
      "Multiplane angle near 0 degrees to obtain the descending thoracic aorta in short axis.",
    intercostal_space:
      "Mid esophageal depth with posterior rotation toward the descending thoracic aorta.",
    patient_position: "Supine with TEE probe in place",
    description: "Short-axis descending aortic view at mid esophageal level.",
    structures_visible: ["Descending thoracic aorta"]
  }),
  createView({
    id: 10,
    mnemonic: "MidEsoDA_LAX",
    view_name: "Mid Esophageal Descending Aortic Lax",
    category: "Mid Esophageal",
    position: "mid esophageal",
    probe_orientation: "Multiplane angle near 90 degrees to open the descending aorta in long axis.",
    intercostal_space:
      "Mid esophageal depth with posterior rotation toward the descending thoracic aorta.",
    patient_position: "Supine with TEE probe in place",
    description: "Long-axis descending aortic view at mid esophageal level.",
    structures_visible: ["Descending thoracic aorta"]
  }),
  createView({
    id: 11,
    mnemonic: "TM_SAX",
    view_name: "Transgastric Mid SAX",
    category: "Transgastric",
    position: "transgastric",
    probe_orientation:
      "Multiplane angle near 0 degrees for the classic short-axis left ventricular view.",
    intercostal_space: "Advance into the stomach and anteflex to the mid-papillary transgastric level.",
    patient_position: "Supine with TEE probe in place",
    description: "Transgastric mid short-axis view of the left ventricle at papillary muscle level.",
    structures_visible: ["LV", "Papillary muscles", "IVS"]
  }),
  createView({
    id: 12,
    mnemonic: "T2C",
    view_name: "Transgastric Two Chamber",
    category: "Transgastric",
    position: "transgastric",
    probe_orientation: "Multiplane angle commonly around 80 to 100 degrees.",
    intercostal_space:
      "Transgastric depth with anteflexion and rotation to isolate the left-sided two-chamber plane.",
    patient_position: "Supine with TEE probe in place",
    description: "Transgastric two-chamber view of the left atrium and left ventricle.",
    structures_visible: ["LA", "LV", "MV"]
  }),
  createView({
    id: 13,
    mnemonic: "TB_SAX",
    view_name: "Transgatric Basal SAX",
    category: "Transgastric",
    position: "transgastric",
    probe_orientation: "Multiplane angle near 0 to 20 degrees.",
    intercostal_space: "Transgastric basal depth with anteflexion to display the basal short-axis plane.",
    patient_position: "Supine with TEE probe in place",
    description: "Transgastric basal short-axis view through the base of the ventricles.",
    structures_visible: ["Basal LV", "MV", "RV"]
  }),
  createView({
    id: 14,
    mnemonic: "T_LAX",
    view_name: "Transgastric LAX",
    category: "Transgastric",
    position: "transgastric",
    probe_orientation: "Multiplane angle generally around 110 to 130 degrees.",
    intercostal_space: "Transgastric depth with anteflexion to align the LVOT in long axis.",
    patient_position: "Supine with TEE probe in place",
    description: "Transgastric long-axis view of the left ventricle and LVOT.",
    structures_visible: ["LV", "LVOT", "AV", "MV"]
  }),
  createView({
    id: 15,
    mnemonic: "DT_LAX",
    view_name: "Deep Transgastric LAX",
    category: "Transgastric",
    position: "transgastric",
    probe_orientation:
      "Probe advanced deeply with anteflexion to align Doppler and long-axis outflow views.",
    intercostal_space: "Deep transgastric depth beyond the standard transgastric position.",
    patient_position: "Supine with TEE probe in place",
    description: "Deep transgastric long-axis view used for LVOT and aortic valve alignment.",
    structures_visible: ["LVOT", "AV", "Ascending aorta", "LV"]
  }),
  createView({
    id: 16,
    mnemonic: "TRVin",
    view_name: "Transgastric Right Ventricle Inflow",
    category: "Transgastric",
    position: "transgastric",
    probe_orientation:
      "Angle and flexion adjusted to profile the tricuspid inflow and right ventricle.",
    intercostal_space: "Transgastric depth with targeted rotation toward the right ventricle.",
    patient_position: "Supine with TEE probe in place",
    description: "Transgastric right ventricular inflow view focused on the tricuspid valve and RV cavity.",
    structures_visible: ["RA", "RV", "TV"]
  }),
  createView({
    id: 17,
    mnemonic: "UE_LAX",
    view_name: "Upper Esophageal Aortic Arch LAX",
    category: "Upper Esophageal",
    position: "upper esophageal",
    probe_orientation: "Multiplane angle near 90 degrees to open the aortic arch longitudinally.",
    intercostal_space: "Withdraw to upper esophageal level to center the aortic arch.",
    patient_position: "Supine with TEE probe in place",
    description: "Upper esophageal long-axis view of the aortic arch.",
    structures_visible: ["Aortic arch", "Great vessels"]
  }),
  createView({
    id: 18,
    mnemonic: "UE_SAX",
    view_name: "Upper Esophageal Aortic Arch SAX",
    category: "Upper Esophageal",
    position: "upper esophageal",
    probe_orientation: "Multiplane angle near 0 degrees for the short-axis aortic arch plane.",
    intercostal_space: "Withdraw to upper esophageal level to center the aortic arch.",
    patient_position: "Supine with TEE probe in place",
    description: "Upper esophageal short-axis view of the aortic arch.",
    structures_visible: ["Aortic arch", "Great vessels"]
  }),
  createView({
    id: 19,
    mnemonic: "MidEA_LAX",
    view_name: "Mid Esophageal Ascending Aorta LAX",
    category: "Mid Esophageal",
    position: "mid esophageal",
    probe_orientation: "Multiplane angle usually around 100 to 120 degrees.",
    intercostal_space:
      "Mid esophageal depth with slight clockwise rotation to display the ascending aorta longitudinally.",
    patient_position: "Supine with TEE probe in place",
    description: "Mid esophageal long-axis view of the ascending aorta.",
    structures_visible: ["Ascending aorta"]
  }),
  createView({
    id: 20,
    mnemonic: "MidEA_SAX",
    view_name: "Mid Esophageal Ascending Aorta SAX",
    category: "Mid Esophageal",
    position: "mid esophageal",
    probe_orientation:
      "Multiplane angle near 0 to 30 degrees for the ascending aorta short-axis plane.",
    intercostal_space:
      "Mid esophageal depth with slight clockwise rotation to display the ascending aorta in cross-section.",
    patient_position: "Supine with TEE probe in place",
    description: "Mid esophageal short-axis view of the ascending aorta.",
    structures_visible: ["Ascending aorta"]
  })
];
