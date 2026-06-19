import { useEffect, useMemo, useState } from "react";
import { allTteViews, mainTteViews } from "../data/tteViewCatalog.js";
import {
  excludedTrainingViewIds,
  supplementalTrainingHotspotsByViewId,
  trainingViewOverrides
} from "../data/trainingHotspots.js";
import {
  extractQuaternion,
  findMatchingView,
  formatQuaternion,
  isInactiveProbeTag,
  loadCalibrations,
  normalizeProbeReading
} from "../lib/probeMatching.js";
import { getProbeInput } from "../lib/probeInput.js";
import { MediaImage, MediaVideo } from "./ReferenceMedia.jsx";
import { TrainingHotspotVideo } from "./TrainingHotspotMedia.jsx";

const trainingViews = mainTteViews
  .filter((view) => !excludedTrainingViewIds.includes(view.id))
  .map((view) => ({
    ...view,
    ...(trainingViewOverrides[view.id] ?? {}),
    image: trainingViewOverrides[view.id]?.image ?? view.training_image ?? view.image,
    video: trainingViewOverrides[view.id]?.video ?? view.training_video ?? view.video,
    hotspots: mergeHotspots(
      trainingViewOverrides[view.id]?.hotspots ?? view.hotspots ?? [],
      supplementalTrainingHotspotsByViewId[view.id] ?? []
    )
  }));

export default function Training({ setMode }) {
  const [workflow, setWorkflow] = useState("menu");
  const [search, setSearch] = useState("");
  const [currentId, setCurrentId] = useState(String(trainingViews[0]?.id ?? 1));
  const [probeReading, setProbeReading] = useState(null);
  const [matchedViewId, setMatchedViewId] = useState(null);
  const [probeStatus, setProbeStatus] = useState("Waiting for probe input.");
  const [matchedCalibration, setMatchedCalibration] = useState(null);

  const filteredViews = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return trainingViews;

    return trainingViews.filter((view) => {
      return (
        view.view_name.toLowerCase().includes(q) ||
        view.mnemonic.toLowerCase().includes(q) ||
        view.category.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const currentView = useMemo(() => {
    return (
      trainingViews.find((view) => String(view.id) === String(currentId)) ??
      filteredViews[0] ??
      trainingViews[0]
    );
  }, [currentId, filteredViews]);

  const hotspotOptionPool = useMemo(() => getHotspotOptionPool(), []);

  const matchedProbeView = useMemo(() => {
    return allTteViews.find((view) => String(view.id) === String(matchedViewId)) ?? null;
  }, [matchedViewId]);

  const readingLabel = useMemo(() => {
    if (!probeReading) return "No probe data received yet";

    const parts = [];
    if (probeReading.rawTag) parts.push(`Tag: ${probeReading.rawTag}`);
    const quaternionLabel = formatQuaternion(extractQuaternion(probeReading));
    if (quaternionLabel) parts.push(quaternionLabel);
    if (probeReading.button !== undefined) parts.push(`Button: ${probeReading.button}`);
    if (probeReading.sequence !== undefined) parts.push(`Seq: ${probeReading.sequence}`);
    return parts.join(" | ") || "Probe data received";
  }, [probeReading]);

  const savedCalibrationLabel = useMemo(() => {
    if (!matchedCalibration) return probeStatus;

    return `${probeStatus} Saved tag: ${matchedCalibration.tag || "None"} | ${formatQuaternion(
      extractQuaternion(matchedCalibration)
    )}`;
  }, [matchedCalibration, probeStatus]);

  useEffect(() => {
    const probeInput = getProbeInput();

    function clearMatchedProbe(status) {
      setProbeReading(null);
      setMatchedViewId(null);
      setMatchedCalibration(null);
      setProbeStatus(status);
    }

    function applyProbeReading(reading) {
      const normalized = normalizeProbeReading(reading);
      setProbeReading(normalized);

      if (!normalized) {
        setMatchedViewId(null);
        setMatchedCalibration(null);
        setProbeStatus("Waiting for live probe input.");
        return;
      }

      if (isInactiveProbeTag(normalized.tag)) {
        setMatchedViewId(null);
        setMatchedCalibration(null);
        setProbeStatus("No active probe position detected.");
        return;
      }

      const calibrations = loadCalibrations();
      const match = findMatchingView(reading, calibrations, allTteViews);

      if (match) {
        setMatchedViewId(match.view.id);
        setMatchedCalibration(match.calibration);
        setProbeStatus("Matched probe input with the closest calibrated TTE view.");
        return;
      }

      setMatchedViewId(null);
      setMatchedCalibration(null);
      setProbeStatus("No calibrated view matched the current probe tag and quaternion.");
    }

    const unsubscribeReading =
      probeInput && typeof probeInput.onReading === "function"
        ? probeInput.onReading(applyProbeReading)
        : null;

    const unsubscribeStatus =
      probeInput && typeof probeInput.onStatus === "function"
        ? probeInput.onStatus((message) => {
            const nextStatus = String(message || "Serial status updated.");
            setProbeStatus(nextStatus);

            if (isInactiveProbeStatus(nextStatus)) {
              clearMatchedProbe(nextStatus);
            }
          })
        : null;

    if (!unsubscribeReading) {
      setProbeStatus("Probe input bridge unavailable. Choose a COM port in Calibration Mode first.");
    } else {
      setProbeStatus("Waiting for probe input from the selected COM port.");
    }

    return () => {
      if (typeof unsubscribeReading === "function") {
        unsubscribeReading();
      }

      if (typeof unsubscribeStatus === "function") {
        unsubscribeStatus();
      }
    };
  }, []);

  useEffect(() => {
    if (!filteredViews.length) return;
    if (!filteredViews.some((view) => String(view.id) === String(currentId))) {
      setCurrentId(String(filteredViews[0].id));
    }
  }, [currentId, filteredViews]);

  function handleFilteredSelectChange(e) {
    const value = String(e.target.value);
    setCurrentId(value);
  }

  if (!currentView) return null;
  const currentHotspots = currentView.hotspots ?? [];

  if (workflow === "menu") {
    return (
      <div className="home-page training-choice-page">
        <div className="home-shell training-choice-shell">
          <div className="home-title-block">
            <div className="home-kicker">Training Mode</div>
            <h1 className="home-title">Training</h1>
          </div>

          <div className="home-button-row training-choice-row">
            <button
              className="home-action-btn training-choice-btn"
              onClick={() => setWorkflow("probe")}
            >
              <span className="home-action-title">Probe Position</span>
            </button>

            <button
              className="home-action-btn training-choice-btn"
              onClick={() => setWorkflow("structures")}
            >
              <span className="home-action-title">Identify Structures</span>
            </button>
          </div>

          <div className="training-choice-footer">
            <button className="tte-ref-home-btn" onClick={() => setMode("home")}>
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (workflow === "probe") {
    return (
      <div className="tte-ref-page">
        <div className="tte-ref-topband">
          <div className="tte-ref-brand-wrap">
            <div className="tte-ref-brand-title">Probe Position</div>
            <div className="tte-ref-brand-subtitle">
              Match live probe input against the calibration values saved with Set
            </div>
          </div>
        </div>

        <div className="tte-ref-content">
          <div className="tte-ref-card">
            <div className="tte-ref-card-titlebar">
              <div className="tte-ref-title-left">
                <span className="tte-ref-view-title">
                  {matchedProbeView ? matchedProbeView.view_name : "Awaiting Matched View"}
                </span>
                <span className="tte-ref-green-pill">
                  {matchedProbeView?.mnemonic ?? "Probe"}
                </span>
              </div>

              <span className="tte-ref-blue-pill">
                {matchedProbeView?.category ?? "Training"}
              </span>
            </div>

            <div className="tte-ref-main-body">
              <div className="tte-ref-media-grid">
                <div className="tte-ref-media-col">
                  <div className="tte-ref-section-label">PROBE POSITION IMAGE</div>
                  <div className="tte-ref-media-frame">
                    <MediaImage
                      src={matchedProbeView?.image}
                      alt={matchedProbeView?.view_name ?? "Matched TTE view"}
                      fallbackTitle="Waiting for a calibrated probe match"
                    />
                  </div>
                </div>

                <div className="tte-ref-media-col">
                  <div className="tte-ref-section-label">ECHOCARDIOGRAPHY VIDEO</div>
                  <div className="tte-ref-media-frame">
                    <MediaVideo
                      src={matchedProbeView?.video}
                      fallbackTitle="Matched echocardiography video will appear here"
                    />
                  </div>
                </div>
              </div>

              <div className="tte-ref-details-grid">
                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">PROBE INPUT</div>
                  <div className="tte-ref-detail-value">{readingLabel}</div>
                </div>

                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">MATCH STATUS</div>
                  <div className="tte-ref-detail-value">
                    {matchedProbeView && matchedCalibration
                      ? savedCalibrationLabel
                      : probeStatus}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tte-ref-bottom-row tte-ref-bottom-row-between">
            <button className="tte-ref-secondary-btn" onClick={() => setWorkflow("menu")}>
              Back
            </button>
            <button className="tte-ref-home-btn" onClick={() => setMode("home")}>
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tte-ref-page">
      <div className="tte-ref-topband">
        <div className="tte-ref-brand-wrap">
          <div className="tte-ref-brand-title">Identify Structures</div>
          <div className="tte-ref-brand-subtitle">
            Identify structures on the unlabelled echocardiography loop
          </div>
        </div>
      </div>

      <div className="tte-ref-content">
        <div className="tte-ref-controls-row">
          <div className="tte-ref-search-box">
            <span className="tte-ref-search-icon">Search</span>
            <input
              className="tte-ref-search-input"
              type="text"
              placeholder="Search training views..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="tte-ref-view-select-top"
            value={currentId}
            onChange={handleFilteredSelectChange}
          >
            {filteredViews.map((view) => (
              <option key={view.id} value={String(view.id)}>
                {view.view_name}
              </option>
            ))}
          </select>
        </div>

        <div className="tte-ref-card">
          <div className="tte-ref-card-titlebar">
            <div className="tte-ref-title-left">
              <span className="tte-ref-view-title">{currentView.view_name}</span>
              <span className="tte-ref-green-pill">{currentView.mnemonic}</span>
            </div>

            <span className="tte-ref-blue-pill">{currentView.category}</span>
          </div>

          <div className="tte-ref-main-body">
            <div className="tte-ref-media-grid">
              <div className="tte-ref-media-col">
                <div className="tte-ref-section-label">UNLABELLED REFERENCE STILL</div>
                <div className="tte-ref-media-frame">
                  <MediaImage
                    src={currentView.image}
                    alt={currentView.view_name}
                  />
                </div>
              </div>

              <div className="tte-ref-media-col">
                <div className="tte-ref-section-label">IDENTIFY STRUCTURE</div>
                <div className="tte-ref-media-frame">
                  <TrainingHotspotVideo
                    src={currentView.video}
                    hotspots={currentHotspots}
                    optionPool={hotspotOptionPool}
                  />
                </div>
              </div>
            </div>

            <div className="tte-ref-details-grid">
              <div className="tte-ref-detail-block">
                <div className="tte-ref-detail-label">VIEW:</div>
                <div className="tte-ref-detail-value">
                  {currentView.description}
                </div>
              </div>

              <div className="tte-ref-detail-block">
                <div className="tte-ref-detail-label">TRAINING TARGET:</div>
                <div className="tte-ref-detail-value">
                  Choose a point on the loop, answer once, then move to the next structure.
                </div>
              </div>
            </div>
          </div>

          <div className="tte-ref-bottom-row">
            <button className="tte-ref-secondary-btn" onClick={() => setWorkflow("menu")}>
              Back
            </button>
            <button className="tte-ref-home-btn" onClick={() => setMode("home")}>
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getHotspotOptionPool() {
  return trainingViews
    .flatMap((view) => view.hotspots ?? [])
    .map((spot) => spot.label)
    .filter((label, index, labels) => labels.indexOf(label) === index);
}

function isInactiveProbeStatus(status) {
  return /choose a detected serial port|no com port found|serial bridge unavailable|serial closed|serial init failed|serial port selection failed/i.test(
    status
  );
}

function mergeHotspots(baseHotspots, supplementalHotspots) {
  const merged = [];
  const labels = new Set();

  [...baseHotspots, ...supplementalHotspots].forEach((spot) => {
    const labelKey = String(spot?.label ?? "").trim().toLowerCase();
    if (!labelKey || labels.has(labelKey)) return;
    labels.add(labelKey);
    merged.push(spot);
  });

  return merged;
}
