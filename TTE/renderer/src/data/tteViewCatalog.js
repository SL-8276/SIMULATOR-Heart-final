import { views } from "../../../data/tteData.js";
import {
  teachingExtraViews,
  teachingSubviewsByViewId
} from "./teachingSubviews.js";

const extraTrainingMediaById = {
  "teaching-psax-pa-bifurcation": {
    training_image: "/assets/training/images/psax-pa-bifurcation.png",
    training_video: "/assets/training/videos/psax-pa-bifurcation.mp4"
  },
  "teaching-subcostal-ivc-longaxis": {
    training_image: "/assets/training/images/subcostal-ivc-longaxis.png",
    training_video: "/assets/training/videos/subcostal-ivc-longaxis.mp4"
  }
};

const teachingMainViews = teachingExtraViews.map((view) => ({
  ...view,
  ...(extraTrainingMediaById[view.id] ?? {})
}));

function makeSubviewView(parentView, subview) {
  return {
    ...parentView,
    ...subview,
    id: `subview-${subview.id}`,
    mnemonic: parentView.mnemonic,
    view_name: subview.view_name,
    image: parentView.image,
    video: subview.video,
    structure_video: subview.labelled_image,
    training_image: subview.image,
    training_video: subview.video,
    parent_view_id: parentView.id,
    is_subview: true
  };
}

const teachingSubviewViews = views.flatMap((view) => {
  const subviews = teachingSubviewsByViewId[view.id] ?? [];
  return subviews.map((subview) => makeSubviewView(view, subview));
});

export const tteViews = views;
export const mainTteViews = views.concat(teachingMainViews);
export const allTteViews = views.concat(teachingMainViews, teachingSubviewViews);
