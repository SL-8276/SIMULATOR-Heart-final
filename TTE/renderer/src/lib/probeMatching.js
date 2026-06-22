const CALIBRATION_STORAGE_KEY = "tte-calibration-settings";
const DEFAULT_QUATERNION_TOLERANCE = 0.18;
const INACTIVE_PROBE_TAGS = new Set(["none"]);

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function normalizeTag(tag) {
  return String(tag ?? "").trim().toLowerCase();
}

export function isInactiveProbeTag(tag) {
  return INACTIVE_PROBE_TAGS.has(normalizeTag(tag));
}

export function normalizeCoordinate(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null);
}

export function extractReadingTag(reading) {
  return firstDefined(reading?.tag, reading?.zone, reading?.name, reading?.label);
}

export function extractQuaternion(reading) {
  return {
    qx: normalizeCoordinate(firstDefined(reading?.qx, reading?.x1, reading?.x)),
    qy: normalizeCoordinate(firstDefined(reading?.qy, reading?.y1, reading?.y)),
    qz: normalizeCoordinate(firstDefined(reading?.qz, reading?.z1, reading?.z)),
    qw: normalizeCoordinate(firstDefined(reading?.qw, reading?.w1, reading?.w))
  };
}

function normalizeQuaternionVector(quaternion) {
  const values = [quaternion.qx, quaternion.qy, quaternion.qz, quaternion.qw];
  if (!values.every(Number.isFinite)) return null;

  const magnitude = Math.hypot(...values);
  if (!magnitude) return null;

  return values.map((value) => value / magnitude);
}

export function formatQuaternion(quaternion) {
  if (!quaternion) return "";

  const parts = ["qx", "qy", "qz", "qw"]
    .map((key) => {
      const value = quaternion[key];
      return value === null || value === undefined ? null : `${key}:${value}`;
    })
    .filter(Boolean);

  return parts.join("  ");
}

export function loadCalibrations() {
  if (!canUseStorage()) return {};

  try {
    const raw = window.localStorage.getItem(CALIBRATION_STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveCalibration(viewId, calibration) {
  if (!canUseStorage()) return {};

  const next = {
    ...loadCalibrations(),
    [String(viewId)]: calibration
  };

  window.localStorage.setItem(CALIBRATION_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function getCalibration(viewId) {
  return loadCalibrations()[String(viewId)] ?? null;
}

export function normalizeProbeReading(reading) {
  if (!reading || typeof reading !== "object") return null;

  const quaternion = extractQuaternion(reading);

  return {
    qx: quaternion.qx,
    qy: quaternion.qy,
    qz: quaternion.qz,
    qw: quaternion.qw,
    button: firstDefined(reading.button, reading.btn),
    sequence: firstDefined(reading.sequence, reading.seq),
    raw: String(firstDefined(reading.raw, reading.rawInput, reading.line) ?? "").trim(),
    tag: normalizeTag(extractReadingTag(reading)),
    rawTag: String(extractReadingTag(reading) ?? "").trim()
  };
}

export function findMatchingView(reading, calibrations, views) {
  const normalized = normalizeProbeReading(reading);
  if (!normalized) return null;
  if (isInactiveProbeTag(normalized.tag)) return null;

  const candidates = views
    .map((view) => {
      const saved = calibrations[String(view.id)];
      if (!saved) return null;

      const savedTag = normalizeTag(saved.tag);
      const savedQuaternion = extractQuaternion(saved);

      const tagMatches =
        !normalized.tag || !savedTag ? true : normalized.tag === savedTag;

      if (!tagMatches) return null;

      const currentVector = normalizeQuaternionVector(normalized);
      const savedVector = normalizeQuaternionVector(savedQuaternion);
      const hasQuaternion = Boolean(currentVector && savedVector);
      const directDeltas = hasQuaternion
        ? currentVector.map((value, index) => Math.abs(value - savedVector[index]))
        : [Number.POSITIVE_INFINITY];
      const inverseDeltas = hasQuaternion
        ? currentVector.map((value, index) => Math.abs(value + savedVector[index]))
        : [Number.POSITIVE_INFINITY];
      const directDistance = Math.hypot(...directDeltas);
      const inverseDistance = Math.hypot(...inverseDeltas);
      const deltas = inverseDistance < directDistance ? inverseDeltas : directDeltas;
      const distance = Math.min(directDistance, inverseDistance);

      return {
        view,
        calibration: saved,
        deltas,
        distance,
        exactQuaternionMatch: hasQuaternion
          ? deltas.every((delta) => delta <= DEFAULT_QUATERNION_TOLERANCE)
          : false
      };
    })
    .filter(Boolean);

  if (!candidates.length) return null;

  const exact = candidates
    .filter((candidate) => candidate.exactQuaternionMatch)
    .sort((left, right) => left.distance - right.distance);

  if (exact.length) return exact[0];

  const calibratedTagMatches = normalized.tag
    ? candidates
        .filter((candidate) => normalizeTag(candidate.calibration.tag) === normalized.tag)
        .sort((left, right) => left.distance - right.distance)
    : [];

  if (calibratedTagMatches.length) return calibratedTagMatches[0];

  return null;
}

export { CALIBRATION_STORAGE_KEY, DEFAULT_QUATERNION_TOLERANCE };
