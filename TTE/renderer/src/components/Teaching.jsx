import { useEffect, useMemo, useState } from "react";
import { views } from "../../../data/tteData.js";
import { MediaImage, MediaVideo, MediaVideoSnapshot } from "./ReferenceMedia.jsx";

export default function Teaching({ setMode }) {
  const [search, setSearch] = useState("");
  const [selectedViewName, setSelectedViewName] = useState("");
  const [currentId, setCurrentId] = useState(views[0]?.id ?? 1);
  const [mediaMode, setMediaMode] = useState("video");
  const isStructureMode = mediaMode === "features";

  const filteredViews = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return views;

    return views.filter((view) => {
      return (
        view.view_name.toLowerCase().includes(q) ||
        view.mnemonic.toLowerCase().includes(q) ||
        view.category.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const currentView = useMemo(() => {
    return views.find((view) => view.id === currentId) ?? views[0];
  }, [currentId]);

  const activeMediaMask =
    mediaMode === "video" ? currentView?.video_mask : currentView?.structure_video_mask;

  useEffect(() => {
    if (!selectedViewName) return;
    const selected = views.find((view) => view.view_name === selectedViewName);
    if (selected) {
      setCurrentId(selected.id);
    }
  }, [selectedViewName]);

  useEffect(() => {
    setMediaMode("video");
  }, [currentId]);

  function handleFilteredSelectChange(e) {
    const value = e.target.value;
    setSelectedViewName(value);

    const selected = views.find((view) => view.view_name === value);
    if (selected) {
      setCurrentId(selected.id);
    }
  }

  if (!currentView) return null;

  return (
    <div className="tte-ref-page">
      <div className="tte-ref-topband">
        <div className="tte-ref-brand-wrap">
          <div className="tte-ref-brand-title">TTE Standard Views</div>
          <div className="tte-ref-brand-subtitle">
            Transthoracic Echocardiography Reference
          </div>
        </div>
      </div>

      <div className="tte-ref-content">
        <div className="tte-ref-controls-row">
          <div className="tte-ref-search-box">
            <span className="tte-ref-search-icon">⌕</span>
            <input
              className="tte-ref-search-input"
              type="text"
              placeholder="Search views..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="tte-ref-view-select-top"
            value={selectedViewName || currentView.view_name}
            onChange={handleFilteredSelectChange}
          >
            {filteredViews.map((view) => (
              <option key={view.id} value={view.view_name}>
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
            <div
              className={`tte-ref-media-grid${
                isStructureMode ? " tte-ref-media-grid-single" : ""
              }`}
            >
              {!isStructureMode ? (
                <div className="tte-ref-media-col">
                  <div className="tte-ref-section-label">PROBE POSITION IMAGE</div>
                  <div className="tte-ref-media-frame">
                    <MediaImage src={currentView.image} alt={currentView.view_name} />
                  </div>
                </div>
              ) : null}

              <div className="tte-ref-media-col">
                {!isStructureMode ? (
                  <select
                    className="tte-ref-section-select"
                    value={mediaMode}
                    onChange={(e) => setMediaMode(e.target.value)}
                    aria-label="Select echocardiography media display"
                  >
                    <option value="video">Echocardiography video</option>
                    <option value="features">Identify the structure</option>
                  </select>
                ) : null}
                <div
                  className={`tte-ref-media-frame${
                    activeMediaMask
                      ? ` tte-ref-media-frame-mask-${activeMediaMask}`
                      : ""
                  }`}
                >
                  {mediaMode === "video" ? (
                    <MediaVideo src={currentView.video} />
                  ) : currentView.structure_video ? (
                    <>
                      <MediaVideo
                        src={currentView.structure_video}
                        fallbackTitle="Marked structure video unavailable"
                      />
                    </>
                  ) : (
                    <MediaVideoSnapshot
                      src={currentView.video}
                      alt={`${currentView.view_name} screenshot`}
                      fallbackTitle="Unable to load the selected view screenshot"
                      loadingTitle="Preparing the selected view screenshot..."
                    />
                  )}
                  {activeMediaMask === "sector-lines" ? (
                    <div className="tte-ref-sector-line-mask" aria-hidden="true">
                      <span className="tte-ref-sector-line-mask-red" />
                      <span className="tte-ref-sector-line-mask-green" />
                      <span className="tte-ref-sector-line-mask-dot" />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {!isStructureMode ? (
              <div className="tte-ref-details-grid">
                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">PROBE POSITION:</div>
                  <div className="tte-ref-detail-value">
                    {currentView.intercostal_space}
                  </div>
                </div>

                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">PROBE MARKER:</div>
                  <div className="tte-ref-detail-value">
                    {currentView.probe_orientation}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="tte-ref-bottom-row">
            {isStructureMode ? (
              <button
                type="button"
                className="tte-ref-back-btn"
                onClick={() => setMediaMode("video")}
              >
                Back
              </button>
            ) : (
              <button className="tte-ref-home-btn" onClick={() => setMode("home")}>
                Home
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
