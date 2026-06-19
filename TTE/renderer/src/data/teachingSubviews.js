export const teachingExtraViews = [
  {
    id: "teaching-psax-pa-bifurcation",
    mnemonic: "PsaxPABif",
    view_name: "PSAX PA Bifurcation",
    category: "Parasternal",
    position: "parasternal",
    image: "/assets/images/PSAXPABifurcationProbe.png",
    video: "/assets/teaching-subviews/psax-pa-bifurcation.mp4",
    labelled_image: "/assets/teaching-subviews/psax-pa-bifurcation-labelled.png",
    probe_orientation: "index marker pointing towards the left shoulder (2 o'clock)",
    intercostal_space: "in the 3rd or 4th intercostal space, at the left parasternal border",
    description: "Parasternal short-axis pulmonary artery bifurcation view."
  },
  {
    id: "teaching-subcostal-ivc-longaxis",
    mnemonic: "SubIVCLAX",
    view_name: "Subcostal IVC Longaxis",
    category: "Subcostal",
    position: "subcostal",
    image: "/assets/images/SubIVCProbe.png",
    video: "/assets/teaching-subviews/subcostal-ivc-longaxis.mp4",
    labelled_image: "/assets/teaching-subviews/subcostal-ivc-longaxis-labelled.png",
    probe_orientation: "index marker pointing towards the head (12 o'clock)",
    intercostal_space: "in the subxiphoid region of the abdomen",
    description: "Subcostal long-axis view of the inferior vena cava entering the right atrium."
  },
  {
    id: "teaching-subcostal-mitral",
    mnemonic: "SubMV",
    view_name: "Subcostal Mitral",
    category: "Subcostal",
    position: "subcostal",
    image: "/assets/images/SubcostalMitralProbe.jpg",
    video: "/assets/teaching-subviews/subcostal-mitral.mp4",
    probe_orientation: "index marker pointing towards the head (12 o'clock)",
    intercostal_space: "in the subxiphoid region of the abdomen",
    description: "Subcostal view focused on the mitral valve."
  }
];

export const teachingSubviewsByViewId = {
  1: [
    {
      id: "plax-av-zoomed",
      view_name: "PLAX AV Zoomed",
      image: "/assets/teaching-subviews/plax-av-zoomed.png",
      labelled_image: "/assets/teaching-subviews/plax-av-zoomed.mp4",
      video: "/assets/teaching-subviews/plax-av-zoomed.mp4"
    },
    {
      id: "plax-mv-zoomed",
      view_name: "PLAX MV Zoomed",
      image: "/assets/teaching-subviews/plax-mv-zoomed.png",
      labelled_image: "/assets/teaching-subviews/plax-mv-zoomed.mp4",
      video: "/assets/teaching-subviews/plax-mv-zoomed.mp4"
    }
  ],
  4: [
    {
      id: "psax-av-leaflets",
      view_name: "PSAX aortic valve level - AV leaflets",
      image: "/assets/teaching-subviews/psax-av-leaflets.png",
      labelled_image: "/assets/teaching-subviews/psax-av-leaflets-labelled.png",
      video: "/assets/teaching-subviews/psax-av-leaflets.mp4"
    }
  ],
  9: [
    {
      id: "apical4-coronary-sinus",
      view_name: "Apical 4 C - Coronary Sinus view",
      image: "/assets/teaching-subviews/apical4-coronary-sinus.png",
      labelled_image: "/assets/teaching-subviews/apical4-coronary-sinus-labelled.png",
      video: "/assets/teaching-subviews/apical4-coronary-sinus.mp4"
    }
  ],
  16: [
    {
      id: "subcostal-sax-mitral-level",
      view_name: "Subcostal SAX Mitral level",
      image: "/assets/teaching-subviews/subcostal-sax-mitral-level.png",
      labelled_image: "/assets/teaching-subviews/subcostal-sax-mitral-level-labelled.png"
    }
  ],
  18: [
    {
      id: "subcostal-ivc-aorta",
      view_name: "Subcostal IVC - Aorta",
      image: "/assets/teaching-subviews/subcostal-ivc-aorta.png",
      labelled_image: "/assets/teaching-subviews/subcostal-ivc-aorta-labelled.png",
      video: "/assets/teaching-subviews/subcostal-ivc-aorta.mp4"
    }
  ],
  19: [
    {
      id: "suprasternal-aortic-lax",
      view_name: "Suprasternal Aortic LAX",
      image: "/assets/teaching-subviews/suprasternal-aortic-lax.png",
      labelled_image: "/assets/teaching-subviews/suprasternal-aortic-lax-labelled.png",
      video: "/assets/teaching-subviews/suprasternal-aortic-lax.mp4"
    }
  ]
};
