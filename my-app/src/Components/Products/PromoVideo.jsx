import React, { useEffect, useRef, useState } from "react";
import courseVideo from "../Images/tiktok.mp4";

export default function PromoVideo({
  src = courseVideo,
  ribbon = "WATCH THIS VIDEO TO LEARN ABOUT TIKTOK ADS ACCOUNT",
  poster,
}) {
  const videoRef = useRef(null);

  const [muted, setMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // custom controls state
  const [playing, setPlaying] = useState(true);
  const [current, setCurrent] = useState(0); // seconds
  const [duration, setDuration] = useState(0); // seconds
  const [volume, setVolume] = useState(1); // 0..1

  // ---------- viewport observer ----------
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((e) => e.isIntersecting);
        setIsVisible(inView);
      },
      { threshold: 0.3 }
    );

    if (videoRef.current) io.observe(videoRef.current);
    return () => io.disconnect();
  }, []);

  // ---------- auto play/pause on visibility ----------
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isVisible) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, [isVisible]);

  // ---------- time / duration listeners ----------
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => setDuration(v.duration || 0);
    const onTime = () => setCurrent(v.currentTime || 0);

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTime);

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
    };
  }, []);

  // ---------- controls handlers ----------
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };

  const onSeek = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const val = Number(e.target.value);
    v.currentTime = val;
    setCurrent(val);
  };

  const onVolume = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const vol = Number(e.target.value);
    v.volume = vol;
    setVolume(vol);
    if (vol === 0 && !v.muted) {
      v.muted = true;
      setMuted(true);
    }
    if (vol > 0 && v.muted) {
      v.muted = false;
      setMuted(false);
    }
  };

  const format = (s) => {
    if (!isFinite(s)) return "00:00";
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <section className="bg-[#0b0713] py-6 sm:py-8">
      {/* ribbon */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-md bg-[#fade0e] text-black/90 text-center text-[11px] sm:text-[12px] font-semibold tracking-wider py-2 uppercase">
          {ribbon}
        </div>
      </div>

      {/* video */}
      <div className="max-w-6xl mx-auto px-4 mt-2 sm:mt-3">
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            className="h-full w-full object-cover select-none"
            src={src}
            poster={poster}
            muted={muted}
            playsInline
            loop
            preload="auto"
            autoPlay
            controls={false}                       
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
          />

          {/* Unmute overlay (only while muted) */}
          {muted && (
            <button
              onClick={toggleMute}
              className="absolute inset-0 grid place-items-center bg-[rgba(66,133,244,0.65)] hover:bg-[rgba(66,133,244,0.75)] transition"
            >
              <div className="border-2 border-white/60 rounded-xl p-6 sm:p-10 md:p-14 backdrop-blur-[1px]">
                <div className="mx-auto mb-4 grid place-items-center text-white">
                  <svg
                    width="84"
                    height="84"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M11 5L6 9H3v6h3l5 4V5z" />
                    <path d="M15.54 8.46a5 5 0 010 7.07M17.76 6.24a8 8 0 010 11.31" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl">
                    Your Video Is Playing
                  </p>
                  <p className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl mt-2">
                    Click To Unmute
                  </p>
                </div>
              </div>
            </button>
          )}

          {/* Custom Controls Bar */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-black/0">
            <div className="flex items-center gap-3 text-white">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="p-2 rounded-md hover:bg-white/10"
                title={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  // pause icon
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  // play icon
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Current time */}
              <span className="text-xs tabular-nums">{format(current)}</span>

              {/* Seek bar */}
              <input
                type="range"
                min={0}
                max={Math.max(duration, 0)}
                step="0.1"
                value={Math.min(current, duration)}
                onChange={onSeek}
                className="flex-1 h-1.5 rounded-full accent-[#F5B400]"
              />

              {/* Duration */}
              <span className="text-xs tabular-nums">{format(duration)}</span>

              {/* Mute / Volume */}
              <button
                onClick={toggleMute}
                className="p-2 rounded-md hover:bg-white/10"
                title={muted ? "Unmute" : "Mute"}
              >
                {muted || volume === 0 ? (
                  // muted icon
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 5L6 9H3v6h3l5 4V5z" />
                    <path d="M15 9l6 6M21 9l-6 6" />
                  </svg>
                ) : volume < 0.5 ? (
                  // low volume
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 5L6 9H3v6h3l5 4V5z" />
                    <path d="M15.5 12a3.5 3.5 0 000-3.5" />
                  </svg>
                ) : (
                  // high volume
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 5L6 9H3v6h3l5 4V5z" />
                    <path d="M15.54 8.46a5 5 0 010 7.07M17.76 6.24a8 8 0 010 11.31" />
                  </svg>
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step="0.01"
                value={muted ? 0 : volume}
                onChange={onVolume}
                className="w-28 h-1.5 rounded-full accent-[#F5B400]"
                title="Volume"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
