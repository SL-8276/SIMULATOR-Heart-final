import { useEffect, useState } from "react";

function resolveMediaSource(src) {
  if (!src) return src;
  if (/^(https?:|data:|blob:|file:)/i.test(src)) return src;

  const baseUrl = import.meta.env.BASE_URL || "/";
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  if (src.startsWith("/")) {
    return `${normalizedBase}${src.replace(/^\/+/, "")}`;
  }

  return src;
}

export function MediaImage({ src, alt, fallbackTitle = "Probe Position Image" }) {
  const [error, setError] = useState(false);
  const resolvedSrc = resolveMediaSource(src);

  useEffect(() => {
    setError(false);
  }, [resolvedSrc]);

  if (!resolvedSrc || error) {
    return (
      <div className="tte-ref-media-placeholder">
        <div className="tte-ref-media-placeholder-title">{fallbackTitle}</div>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className="tte-media-fit"
      onError={() => setError(true)}
    />
  );
}

export function MediaVideo({ src, fallbackTitle = "Echocardiography Video" }) {
  const [error, setError] = useState(false);
  const resolvedSrc = resolveMediaSource(src);

  useEffect(() => {
    setError(false);
  }, [resolvedSrc]);

  if (!resolvedSrc || error) {
    return (
      <div className="tte-ref-media-placeholder tte-ref-video-placeholder">
        <div className="tte-ref-media-placeholder-title">{fallbackTitle}</div>
      </div>
    );
  }

  return (
    <video
      key={resolvedSrc}
      className="tte-media-fit tte-video-bg"
      src={resolvedSrc}
      controls
      loop
      autoPlay
      muted
      playsInline
      onError={() => setError(true)}
    />
  );
}

export function MediaVideoSnapshot({
  src,
  alt,
  fallbackTitle = "Unable to load screenshot",
  loadingTitle = "Preparing screenshot..."
}) {
  const [error, setError] = useState(false);
  const [frameSrc, setFrameSrc] = useState("");
  const resolvedSrc = resolveMediaSource(src);

  useEffect(() => {
    setError(false);
    setFrameSrc("");

    if (!resolvedSrc) {
      return undefined;
    }

    const video = document.createElement("video");
    let cancelled = false;
    let hasRequestedSeek = false;

    const cleanup = () => {
      video.removeAttribute("src");
      video.load();
    };

    const fail = () => {
      if (!cancelled) {
        setError(true);
      }
    };

    const captureFrame = () => {
      if (cancelled) return;
      if (!video.videoWidth || !video.videoHeight) {
        fail();
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        fail();
        return;
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      try {
        setFrameSrc(canvas.toDataURL("image/png"));
      } catch {
        fail();
      }
    };

    const handleLoadedMetadata = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const targetTime = duration > 0 ? Math.min(1, Math.max(duration * 0.25, 0.1)) : 0;

      if (targetTime > 0) {
        hasRequestedSeek = true;
        video.currentTime = targetTime;
        return;
      }

      captureFrame();
    };

    const handleLoadedData = () => {
      if (!hasRequestedSeek) {
        captureFrame();
      }
    };

    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("seeked", captureFrame);
    video.addEventListener("error", fail);
    video.src = resolvedSrc;
    video.load();

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("seeked", captureFrame);
      video.removeEventListener("error", fail);
      cleanup();
    };
  }, [resolvedSrc]);

  if (!resolvedSrc || error) {
    return (
      <div className="tte-ref-media-placeholder tte-ref-video-placeholder">
        <div className="tte-ref-media-placeholder-title">{fallbackTitle}</div>
      </div>
    );
  }

  if (!frameSrc) {
    return (
      <div className="tte-ref-media-placeholder tte-ref-video-placeholder">
        <div className="tte-ref-media-placeholder-title">{loadingTitle}</div>
      </div>
    );
  }

  return <img src={frameSrc} alt={alt} className="tte-media-fit tte-video-bg" />;
}
