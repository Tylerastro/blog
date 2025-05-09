"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume1, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  filePath: string;
  className?: string;
}

export function AudioPlayer({ filePath, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume
    audio.volume = volume;

    // Event listeners
    const setAudioData = () => {
      if (audio.duration) {
        setDuration(audio.duration);
      }
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    // Add event listeners
    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);

    // Check if audio is already loaded
    if (audio.readyState >= 2) {
      setAudioData();
    }

    // Cleanup
    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [volume]);

  // Format time in MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }

    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleProgressChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className={cn("rounded-md border p-4 shadow-sm", className)}>
      <audio ref={audioRef} src={filePath} preload="metadata" />

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-link hover:bg-link/80 transition-colors duration-200"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>

        <div className="flex flex-1 flex-col gap-1.5">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleProgressChange}
            className="cursor-pointer"
          />

          <div className="flex justify-between text-xs text-slate-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="text-slate-500 hover:text-slate-900"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : volume > 0.5 ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <Volume1 className="h-5 w-5" />
            )}
          </button>

          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-20 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
