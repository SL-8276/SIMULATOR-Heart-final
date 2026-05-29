import { useState } from "react";
import LauncherHome from "./components/LauncherHome.jsx";
import Home from "./components/Home.jsx";
import Teaching from "./components/Teaching.jsx";
import Training from "./components/Training.jsx";
import Calibration from "./components/Calibration.jsx";
import TeeHome from "./components/tee/Home.jsx";
import TeeTeaching from "./components/tee/Teaching.jsx";
import TeeTraining from "./components/tee/Training.jsx";
import TeeCalibration from "./components/tee/Calibration.jsx";

export default function App() {
  const [simulator, setSimulator] = useState(null);
  const [mode, setMode] = useState("home");

  function handleSelectSimulator(nextSimulator) {
    setSimulator(nextSimulator);
    setMode("home");
  }

  function handleReturnToLauncher() {
    setSimulator(null);
    setMode("home");
  }

  return (
    <div className="app">
      {!simulator ? <LauncherHome onSelectSimulator={handleSelectSimulator} /> : null}

      {simulator === "tte" && mode === "home" ? (
        <Home setMode={setMode} goToLauncher={handleReturnToLauncher} />
      ) : null}
      {simulator === "tte" && mode === "teaching" ? <Teaching setMode={setMode} /> : null}
      {simulator === "tte" && mode === "training" ? <Training setMode={setMode} /> : null}
      {simulator === "tte" && mode === "calibration" ? <Calibration setMode={setMode} /> : null}

      {simulator === "tee" && mode === "home" ? (
        <TeeHome setMode={setMode} goToLauncher={handleReturnToLauncher} />
      ) : null}
      {simulator === "tee" && mode === "teaching" ? <TeeTeaching setMode={setMode} /> : null}
      {simulator === "tee" && mode === "training" ? <TeeTraining setMode={setMode} /> : null}
      {simulator === "tee" && mode === "calibration" ? <TeeCalibration setMode={setMode} /> : null}
    </div>
  );
}
