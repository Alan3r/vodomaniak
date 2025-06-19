import React, { useState, useRef, useEffect } from 'react';
import introVideo from '../intro.mp4';

const MonetizationPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const BLOCK_TIME = 10; // sekundy
  const affiliateUrl = 'https://ogladaj.link/link/2558/31766093'; // Twój reflink

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      if (video.currentTime >= BLOCK_TIME && !isBlocked) {
        video.pause();
        setIsBlocked(true);
        setIsPlaying(false);
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [isBlocked]);

  const handlePlay = () => {
    if (isBlocked || isPlaying) return;
    setIsPlaying(true);
    videoRef.current?.play().catch(console.error);
  };

  const handleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full aspect-video max-w-2xl mx-auto">
      <video
        ref={videoRef}
        src={introVideo}
        className="w-full h-full object-cover rounded-lg"
        controls={false}
        preload="auto"
        tabIndex={-1}
        onClick={isPlaying ? undefined : handlePlay}
      />
      {/* Przycisk Fullscreen */}
      <button
        onClick={handleFullscreen}
        className="absolute top-3 right-3 z-30 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
        title="Pełny ekran"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9V5.25A1.5 1.5 0 0 1 5.25 3.75H9m6 0h3.75a1.5 1.5 0 0 1 1.5 1.5V9m0 6v3.75a1.5 1.5 0 0 1-1.5 1.5H15m-6 0H5.25a1.5 1.5 0 0 1-1.5-1.5V15" />
        </svg>
      </button>
      {/* Nakładka Play */}
      {!isPlaying && !isBlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
          <button
            onClick={handlePlay}
            className="bg-white text-black text-2xl font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            ▶ Play
          </button>
        </div>
      )}
      {/* Nakładka Blokująca */}
      {isBlocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur z-20">
          <div className="text-white text-3xl font-bold mb-6">Dostęp zablokowany</div>
          <button
            onClick={() => (window.location.href = affiliateUrl)}
            className="bg-red-600 text-white text-xl font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Zarejestruj się i Oglądaj Dalej
          </button>
        </div>
      )}
    </div>
  );
};

export default MonetizationPlayer;
