const browserSubscribers = {
  reading: new Set(),
  status: new Set()
};

let pollTimer = null;
let lastReadingKey = "";
let lastStatus = "";

export function getProbeInput() {
  if (typeof window === "undefined") return null;

  if (window.probeInput) {
    return window.probeInput;
  }

  return browserProbeInput;
}

const browserProbeInput = {
  async listPorts() {
    const response = await fetch("/api/probe/ports", { cache: "no-store" });
    const payload = await readJsonResponse(response);
    return Array.isArray(payload.ports) ? payload.ports : [];
  },

  async selectPort(portPath) {
    const response = await fetch("/api/probe/select-port", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ portPath })
    });
    const payload = await readJsonResponse(response);
    emitStatus(payload.status);
    return payload.selectedPort ?? "";
  },

  onReading(callback) {
    return subscribe("reading", callback);
  },

  onStatus(callback) {
    return subscribe("status", callback);
  }
};

function subscribe(type, callback) {
  if (typeof callback !== "function") {
    return () => {};
  }

  browserSubscribers[type].add(callback);
  ensurePolling();

  return () => {
    browserSubscribers[type].delete(callback);
    if (!browserSubscribers.reading.size && !browserSubscribers.status.size) {
      stopPolling();
    }
  };
}

function ensurePolling() {
  if (pollTimer) return;

  pollProbeState();
  pollTimer = window.setInterval(pollProbeState, 250);
}

function stopPolling() {
  if (!pollTimer) return;

  window.clearInterval(pollTimer);
  pollTimer = null;
}

async function pollProbeState() {
  try {
    const response = await fetch("/api/probe/state", { cache: "no-store" });
    const payload = await readJsonResponse(response);

    emitStatus(payload.status);

    if (payload.reading) {
      const readingKey = [
        payload.reading.ts,
        payload.reading.sequence,
        payload.reading.seq,
        payload.reading.raw
      ].join("|");

      if (readingKey && readingKey !== lastReadingKey) {
        lastReadingKey = readingKey;
        browserSubscribers.reading.forEach((callback) => callback(payload.reading));
      }
    }
  } catch (error) {
    emitStatus(`Serial bridge unavailable: ${error?.message || error}`);
  }
}

async function readJsonResponse(response) {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || `Request failed with ${response.status}`);
  }

  return payload;
}

function emitStatus(status) {
  if (!status || status === lastStatus) return;

  lastStatus = status;
  browserSubscribers.status.forEach((callback) => callback(status));
}
