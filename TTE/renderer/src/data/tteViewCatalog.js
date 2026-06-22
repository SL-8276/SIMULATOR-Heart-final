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
  },
  "teaching-subcostal-mitral": {
    training_image: "/assets/teaching-subviews/subcostal-sax-mitral-level.png"
  }
};

const teachingMainViews = teachingExtraViews.map((view) => ({
  ...view,
  ...(extraTrainingMediaById[view.id] ?? {})
}));

const baseViewById = new Map(views.map((view) => [view.id, view]));
const teachingMainViewById = new Map(
  teachingMainViews.map((view) => [view.id, view])
);

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

export const mainTteViews = [
  baseViewById.get(1),
  baseViewById.get(2),
  baseViewById.get(3),
  baseViewById.get(4),
  baseViewById.get(5),
  baseViewById.get(6),
  baseViewById.get(7),
  teachingMainViewById.get("teaching-psax-pa-bifurcation"),
  baseViewById.get(9),
  baseViewById.get(10),
  baseViewById.get(11),
  baseViewById.get(12),
  baseViewById.get(13),
  baseViewById.get(14),
  teachingMainViewById.get("teaching-subcostal-mitral"),
  baseViewById.get(16),
  teachingMainViewById.get("teaching-subcostal-ivc-longaxis"),
  baseViewById.get(19)
].filter(Boolean);

const teachingSubviewViews = mainTteViews.flatMap((view) => {
  const subviews = teachingSubviewsByViewId[view.id] ?? [];
  return subviews.map((subview) => makeSubviewView(view, subview));
});

export const tteViews = views;
export const allTteViews = mainTteViews.concat(teachingSubviewViews);
