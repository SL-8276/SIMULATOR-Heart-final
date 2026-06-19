export const teachingExtraViews = [
  {
    id: "teaching-psax-pa-bifurcation",
    mnemonic: "Pulmonary Artery Bifurcation",
    view_name: "Parasternal Short Axis - Pulmonary Artery Bifurcation",
    category: "Parasternal",
    position: "parasternal",
    image: "/assets/teaching-subviews/psax-pa-bifurcation.png",
    video: "/assets/teaching-subviews/psax-pa-bifurcation.mp4",
    labelled_video: "/assets/teaching-subviews/psax-pa-bifurcation.mp4",
    labelled_image: "/assets/teaching-subviews/psax-pa-bifurcation-labelled.png",
    probe_orientation: "index marker pointing towards the left shoulder (2 o'clock)",
    intercostal_space: "in the 3rd or 4th intercostal space, at the left parasternal border",
    description: "Parasternal short-axis pulmonary artery bifurcation view."
  },
  {
    id: "teaching-subcostal-ivc-aorta",
    mnemonic: "Subcostal Inferior Vena Cava",
    view_name: "Subcostal Inferior Vena Cava",
    category: "Subcostal",
    position: "subcostal",
    image: "/assets/teaching-subviews/subcostal-ivc-aorta.png",
    video: "/assets/teaching-subviews/subcostal-ivc-aorta.mp4",
    labelled_video: "/assets/teaching-subviews/subcostal-ivc-aorta.mp4",
    labelled_image: "/assets/teaching-subviews/subcostal-ivc-aorta-labelled.png",
    probe_orientation: "index marker pointing towards the head (12 o'clock)",
    intercostal_space: "in the subxiphoid region of the abdomen",
    description: "Subcostal view of the inferior vena cava and aorta."
  },
  {
    id: "teaching-suprasternal-aortic-lax",
    mnemonic: "Suprasternal Aortic Arch",
    view_name: "Suprasternal Long Axis Aortic Arch",
    category: "Suprasternal",
    position: "suprasternal",
    image: "/assets/teaching-subviews/suprasternal-aortic-lax.png",
    video: "/assets/teaching-subviews/suprasternal-aortic-lax.mp4",
    labelled_video: "/assets/teaching-subviews/suprasternal-aortic-lax.mp4",
    labelled_image: "/assets/teaching-subviews/suprasternal-aortic-lax-labelled.png",
    probe_orientation: "index marker pointing towards the left supraclavicular notch (1 o'clock)",
    intercostal_space: "in the suprasternal notch",
    description: "Suprasternal long-axis view demonstrating the aortic arch and great vessel relationships."
  }
];

export const teachingSubviewsByViewId = {
  1: [
    {
      id: "plax-av-zoomed",
      view_name: "Parasternal Long Axis Aortic Valve Zoomed",
      image: "/assets/teaching-subviews/plax-av-zoomed.png",
      labelled_image: "/assets/teaching-subviews/plax-av-zoomed-labelled.png",
      video: "/assets/teaching-subviews/plax-av-zoomed.mp4"
    },
    {
      id: "plax-mv-zoomed",
      view_name: "Parasternal Long Axis Mitral Valve Zoomed",
      image: "/assets/teaching-subviews/plax-mv-zoomed.png",
      labelled_image: "/assets/teaching-subviews/plax-mv-zoomed-labelled.png",
      video: "/assets/teaching-subviews/plax-mv-zoomed.mp4"
    }
  ],
  4: [
    {
      id: "psax-av-leaflets",
      view_name: "Parasternal Short Axis Aortic Valve Level - AV Leaflets",
      image: "/assets/teaching-subviews/psax-av-leaflets.png",
      labelled_image: "/assets/teaching-subviews/psax-av-leaflets-labelled.png",
      video: "/assets/teaching-subviews/psax-av-leaflets.mp4"
    }
  ],
  9: [
    {
      id: "apical4-coronary-sinus",
      view_name: "Apical 4-Chamber Coronary Sinus view",
      image: "/assets/teaching-subviews/apical4-coronary-sinus.png",
      labelled_image: "/assets/teaching-subviews/apical4-coronary-sinus-labelled.png",
      video: "/assets/teaching-subviews/apical4-coronary-sinus.mp4"
    }
  ],
  16: [
    {
      id: "teaching-subcostal-mitral",
      view_name: "Subcostal Short Axis Mitral Outflow",
      image: "/assets/teaching-subviews/subcostal-sax-mitral-level.png",
      labelled_image: "/assets/teaching-subviews/subcostal-sax-mitral-level-labelled.png",
      video: "/assets/training/videos/Subcostal Mitral .mp4",
      labelled_video: "/assets/training/videos/Subcostal Mitral .mp4",
      probe_orientation: "index marker pointing towards the head (12 o'clock)",
      intercostal_space: "in the subxiphoid region of the abdomen",
      description: "Subcostal view focused on the mitral valve outflow region."
    }
  ],

  19: [],
  "teaching-subcostal-ivc-aorta": [
    {
      id: "teaching-subcostal-aorta",
      view_name: "Aorta",
      image: "/assets/teaching-subviews/subcostal-ivc-aorta.png",
      labelled_image: "/assets/teaching-subviews/subcostal-ivc-aorta-labelled.png",
      video: "/assets/teaching-subviews/subcostal-ivc-aorta.mp4",
      labelled_video: "/assets/teaching-subviews/subcostal-ivc-aorta.mp4",
      description: "Subcostal inferior vena cava view highlighting the aorta."
    }
  ]
};
