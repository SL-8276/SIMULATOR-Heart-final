import { useEffect, useMemo, useState } from "react";
import { mainTteViews } from "../data/tteViewCatalog.js";
import { MediaImage, MediaVideo } from "./ReferenceMedia.jsx";
import {
  extractQuaternion,
  formatQuaternion,
  getCalibration,
  normalizeProbeReading,
  saveCalibration
} from "../lib/probeMatching.js";
import { getProbeInput } from "../lib/probeInput.js";

export default function Calibration({ setMode }) {
  const [selectedViewId, setSelectedViewId] = useState(mainTteViews[0]?.id ?? 1);
  const [probeReading, setProbeReading] = useState(null);
  const [status, setStatus] = useState("");
  const [serialStatus, setSerialStatus] = useState("Waiting for serial connection.");
  const [serialPorts, setSerialPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState("");
  const [clickedCalibrationViews, setClickedCalibrationViews] = useState({});

  const currentView = useMemo(() => {
    return mainTteViews.find((view) => String(view.id) === String(selectedViewId)) ?? mainTteViews[0];
  }, [selectedViewId]);

  const currentCalibration = useMemo(() => {
    return getCalibration(selectedViewId);
  }, [selectedViewId, status]);

  const isCurrentViewCalibrated = !!clickedCalibrationViews[selectedViewId];

  const rawInputState = useMemo(() => {
    if (!probeReading) return "Waiting for probe values to reach the UI.";
    return probeReading.raw || "Probe values are reaching the UI.";
  }, [probeReading]);

  useEffect(() => {
    const probeInput = getProbeInput();
    const unsubscribeReading =
      probeInput && typeof probeInput.onReading === "function"
        ? probeInput.onReading((reading) => {
            setProbeReading(normalizeProbeReading(reading));
          })
        : null;

    const unsubscribeStatus =
      probeInput && typeof probeInput.onStatus === "function"
        ? probeInput.onStatus((message) => {
            setSerialStatus(String(message || "Serial status updated."));
          })
        : null;

    if (!unsubscribeReading) {
      setStatus("Waiting for live probe data in calibration mode.");
    }

    if (!unsubscribeStatus) {
      setSerialStatus("Serial status unavailable.");
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

  async function refreshSerialPorts() {
    const probeInput = getProbeInput();
    if (!probeInput || typeof probeInput.listPorts !== "function") {
      setSerialPorts([]);
      setSerialStatus("Serial port enumeration unavailable.");
      return;
    }

    try {
      const ports = await probeInput.listPorts();
      const detectedPorts = Array.isArray(ports) ? ports.filter((port) => port?.path) : [];
      setSerialPorts(detectedPorts);
      setSelectedPort((currentPort) =>
        detectedPorts.some((port) => port.path === currentPort) ? currentPort : ""
      );
      setSerialStatus(
        detectedPorts.length
          ? `Detected serial ports: ${detectedPorts.map((port) => port.path).join(", ")}`
          : "No serial ports detected."
      );
    } catch (error) {
      setSerialPorts([]);
      setSerialStatus(`Serial port refresh failed: ${error?.message || error}`);
    }
  }

  useEffect(() => {
    refreshSerialPorts();
  }, []);

  function loadViewCalibration(viewId) {
    setStatus("");
  }

  function handleViewChange(e) {
    const nextViewId = e.target.value;
    setSelectedViewId(nextViewId);
    loadViewCalibration(nextViewId);
  }

  function handleSave() {
    if (!currentView) return;
    if (!probeReading) {
      setStatus("No live probe reading available to save.");
      return;
    }

    saveCalibration(currentView.id, {
      tag: probeReading.rawTag,
      qx: probeReading.qx,
      qy: probeReading.qy,
      qz: probeReading.qz,
      qw: probeReading.qw
    });

    setClickedCalibrationViews((current) => ({
      ...current,
      [currentView.id]: true
    }));
    setStatus("Calibration saved from the latest live probe reading.");
  }

  async function handlePortChange(e) {
    const portPath = e.target.value;
    setSelectedPort(portPath);

    const probeInput = getProbeInput();
    if (!probeInput || typeof probeInput.selectPort !== "function") {
      setSerialStatus("Serial port selection unavailable.");
      return;
    }

    if (!portPath) {
      setSerialStatus("Choose a detected serial port.");
      return;
    }

    try {
      const selected = await probeInput.selectPort(portPath);
      setSerialStatus(`Selected ${selected || portPath}. Connecting with exact port ${selected || portPath}.`);
    } catch (error) {
      setSerialStatus(`Serial port selection failed: ${error?.message || error}`);
    }
  }

  return (
    <div className="tte-ref-page">
      <div className="tte-ref-topband">
        <div className="tte-ref-brand-wrap">
          <div className="tte-ref-brand-title">Calibration Mode</div>
          <div className="tte-ref-brand-subtitle">
            Save the live probe tag and quaternion values for each TTE view
          </div>
        </div>
      </div>

      <div className="tte-ref-content">
        <div className="tte-ref-controls-row">
          <div className="tte-ref-status-box">
            {status || "Choose a view, position the probe, and save the current live reading for training mode."}
          </div>

          <select
            className="tte-ref-view-select-top"
            value={selectedViewId}
            onChange={handleViewChange}
          >
            {mainTteViews.map((view) => (
              <option key={view.id} value={view.id}>
                {view.view_name}
              </option>
            ))}
          </select>
        </div>

        <div className="tte-ref-card">
          <div className="tte-ref-card-titlebar">
            <div className="tte-ref-title-left">
              <span className="tte-ref-view-title">{currentView?.view_name}</span>
              <span className="tte-ref-green-pill">{currentView?.mnemonic}</span>
            </div>

            <span className="tte-ref-blue-pill">{currentView?.category}</span>
          </div>

          <div className="tte-ref-main-body">
            <div className="tte-ref-media-grid">
              <div className="tte-ref-media-col">
                <div className="tte-ref-section-label">PROBE POSITION IMAGE</div>
                <div className="tte-ref-media-frame">
                  <MediaImage src={currentView?.image} alt={currentView?.view_name} />
                </div>
              </div>

              <div className="tte-ref-media-col">
                <div className="tte-ref-section-label">ECHOCARDIOGRAPHY VIDEO</div>
                <div className="tte-ref-media-frame">
                  <MediaVideo src={currentView?.video} />
                </div>
              </div>
            </div>

            <div className="tte-ref-calibration-info-grid">
              <div className="tte-ref-calibration-info-col">
                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">LIVE PROBE TAG</div>
                  <div className="tte-ref-detail-value">
                    {probeReading?.rawTag || "No live tag received yet"}
                  </div>
                </div>

                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">SERIAL STATUS</div>
                  <div className="tte-ref-detail-value">{serialStatus}</div>
                  <div className="tte-ref-serial-controls">
                    <select
                      className="tte-ref-com-select"
                      value={selectedPort}
                      onChange={handlePortChange}
                      aria-label="Select COM port"
                    >
                      <option value="">
                        {serialPorts.length ? "Select port" : "No ports detected"}
                      </option>
                      {serialPorts.map((port) => (
                        <option key={port.path} value={port.path}>
                          {port.path}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="tte-ref-refresh-btn"
                      onClick={refreshSerialPorts}
                    >
                      Refresh
                    </button>
                  </div>
                </div>

                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">SAVED CALIBRATION TAG</div>
                  <div className="tte-ref-detail-value">
                    {currentCalibration?.tag || "No saved calibration for this view"}
                  </div>
                </div>

              </div>

              <div className="tte-ref-calibration-info-col">
                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">LIVE QUATERNION</div>
                  <div className="tte-ref-detail-value">
                    {probeReading
                      ? formatQuaternion(extractQuaternion(probeReading))
                      : "No live quaternion received yet"}
                  </div>
                </div>

                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">RAW INPUT STATE</div>
                  <div className="tte-ref-detail-value tte-ref-detail-value-raw">
                    {rawInputState}
                  </div>
                </div>

                <div className="tte-ref-detail-block">
                  <div className="tte-ref-detail-label">SAVED QUATERNION</div>
                  <div className="tte-ref-detail-value">
                    {currentCalibration
                      ? formatQuaternion(extractQuaternion(currentCalibration))
                      : "No saved quaternion for this view"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tte-ref-bottom-row tte-ref-bottom-row-between">
            <button
              className={`tte-ref-secondary-btn${isCurrentViewCalibrated ? " tte-ref-secondary-btn-success" : ""}`}
              onClick={handleSave}
            >
              Set
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
