import simulatorLogo from "../assets/tte-simulator-logo-transparent.png";

export default function Home({ setMode, goToLauncher }) {
  return (
    <div className="home-page">
      <div className="home-shell">
        <div className="home-title-block">
          <div className="home-hero">
            <img
              className="home-logo"
              src={simulatorLogo}
              alt="Interactive TTE Simulator logo"
            />

            <div className="home-copy">
              <div className="home-kicker">Transthoracic Echocardiography Learning Tool</div>
              <h1 className="home-title">TTE SIMULATOR</h1>
              <p className="home-subtitle">
                Learn, review, and practice the 20 standard TTE views
              </p>
            </div>
          </div>
        </div>

        <div className="home-button-row">
          <button className="home-action-btn" onClick={() => setMode("teaching")}>
            <span className="home-action-title">Teaching Mode</span>
            <span className="home-action-text">Reference-guided learning</span>
          </button>

          <button className="home-action-btn" onClick={() => setMode("training")}>
            <span className="home-action-title">Training Mode</span>
            <span className="home-action-text">Self-testing and recall</span>
          </button>

          <button className="home-action-btn" onClick={() => setMode("calibration")}>
            <span className="home-action-title">Calibration Mode</span>
            <span className="home-action-text">Tag and quaternion capture</span>
          </button>
        </div>

        {goToLauncher ? (
          <div className="home-footer">
            <button className="home-launcher-btn" onClick={goToLauncher}>
              Home
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
