import tteLogo from "../assets/tte-simulator-logo-transparent.png";
import teeLogo from "../assets/tee-simulator-logo-transparent.png";

export default function LauncherHome({ onSelectSimulator }) {
  return (
    <div className="launcher-page">
      <div className="launcher-shell">
        <div className="launcher-copy">
          <div className="launcher-kicker">Integrated Echocardiography Learning Platform</div>
          <h1 className="launcher-title">ULTRASOUND SIMULATOR- HEART</h1>
          <p className="launcher-subtitle">
            Choose a simulator to continue into the full TTE or TEE workflow
          </p>
        </div>

        <div className="launcher-button-row">
          <button
            type="button"
            className="launcher-action-btn"
            onClick={() => onSelectSimulator("tte")}
          >
            <img className="launcher-logo" src={tteLogo} alt="TTE Simulator logo" />
            <span className="launcher-action-title">TTE</span>
            <span className="launcher-action-text">
              Transthoracic echocardiography simulator
            </span>
          </button>

          <button
            type="button"
            className="launcher-action-btn"
            onClick={() => onSelectSimulator("tee")}
          >
            <img className="launcher-logo" src={teeLogo} alt="TEE Simulator logo" />
            <span className="launcher-action-title">TEE</span>
            <span className="launcher-action-text">
              Transesophageal echocardiography simulator
            </span>
          </button>
        </div>

        <div className="launcher-developer">Developed by SCTIMST</div>
      </div>
    </div>
  );
}
