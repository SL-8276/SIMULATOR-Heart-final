import { useEffect, useMemo, useState } from "react";
import { views } from "../../../data/teeData.js";
import { MediaImage, MediaVideo, MediaVideoSnapshot } from "./ReferenceMedia.jsx";

export default function Teaching({ setMode }) {
  const [search, setSearch] = useState("");
  const [selectedViewName, setSelectedViewName] = useState("");
  const [currentId, setCurrentId] = useState(views[0]?.id ?? 1);
  const [mediaMode, setMediaMode] = useState("video");
  const [selectedStructureNumber, setSelectedStructureNumber] = useState("");
  const [selectedStructureName, setSelectedStructureName] = useState("");
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

  const structureNumberOptions = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => String(index + 1));
  }, []);

  const structureNameOptions = useMemo(() => {
    return currentView?.structures_visible ?? [];
  }, [currentView]);

  const structureSelectionState = useMemo(() => {
    if (!selectedStructureNumber || !selectedStructureName) {
      return "idle";
    }

    const expectedStructureName =
      structureNameOptions[Number(selectedStructureNumber) - 1] ?? "";

    return expectedStructureName === selectedStructureName ? "correct" : "wrong";
  }, [selectedStructureName, selectedStructureNumber, structureNameOptions]);

  useEffect(() => {
    if (!selectedViewName) return;
    const selected = views.find((view) => view.view_name === selectedViewName);
    if (selected) {
      setCurrentId(selected.id);
    }
  }, [selectedViewName]);

  useEffect(() => {
    setMediaMode("video");
    setSelectedStructureNumber("");
    setSelectedStructureName("");
  }, [currentId]);

  useEffect(() => {
    if (!selectedStructureNumber) {
      setSelectedStructureName("");
    }
  }, [selectedStructureNumber]);

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
          <div className="tte-ref-brand-title">TEE Standard Views</div>
          <div className="tte-ref-brand-subtitle">
            Transesophageal Echocardiography Reference
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
                {isStructureMode ? (
                  <div className="tte-ref-structure-select-row">
                    <div className="tte-ref-structure-select-group">
                      <div className="tte-ref-structure-select-label">NUMBER</div>
                      <select
                        className={`tte-ref-structure-select tte-ref-structure-select-${structureSelectionState}`}
                        value={selectedStructureNumber}
                        onChange={(e) => setSelectedStructureNumber(e.target.value)}
                        aria-label="Select structure number"
                      >
                        <option value="">Select number</option>
                        {structureNumberOptions.map((number) => (
                          <option key={number} value={number}>
                            {number}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="tte-ref-structure-select-group">
                      <div className="tte-ref-structure-select-label">STRUCTURE</div>
                      <select
                        className={`tte-ref-structure-select tte-ref-structure-select-${structureSelectionState}`}
                        value={selectedStructureName}
                        onChange={(e) => setSelectedStructureName(e.target.value)}
                        aria-label="Select structure name"
                        disabled={!selectedStructureNumber || !structureNameOptions.length}
                      >
                        <option value="">
                          {structureNameOptions.length
                            ? "Select structure"
                            : "No structures available"}
                        </option>
                        {structureNameOptions.map((structureName) => (
                          <option key={structureName} value={structureName}>
                            {structureName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : null}
                <div className="tte-ref-media-frame">
                  {mediaMode === "video" ? (
                    <MediaVideo src={currentView.video} />
                  ) : (
                    <MediaVideoSnapshot
                      src={currentView.video}
                      alt={`${currentView.view_name} screenshot`}
                      fallbackTitle="Unable to load the selected view screenshot"
                      loadingTitle="Preparing the selected view screenshot..."
                    />
                  )}
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
