import { Button } from "../ui/button";
import {
  ChevronsLeft,
  ChevronsRight,
  PauseIcon,
  PlayIcon,
  Volume2Icon,
  VolumeOffIcon,
} from "lucide-react";
import { Slider } from "../ui/slider";
import { useCallback, useEffect, useRef, useState } from "react";
import { get, set } from "idb-keyval";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import formatTime from "#/lib/formatTime";

function AudioTestRoom({ audioUrl }: { audioUrl: string }) {
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const [blobUrl, setBlobUrl] = useState("");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentVolume, setCurrentVolume] = useState<number>(1);
  const [prevVolume, setPrevVolume] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handleSeek = (value: number[]) => {
    const newValue = value[0];
    if (playerRef.current) {
      playerRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(playerRef.current?.currentTime || 0);
  };

  const handleChangeVolume = (value: number[]) => {
    const newValue = value[0];

    if (playerRef.current) {
      playerRef.current.volume = newValue;
      setCurrentVolume(newValue);
    }

    setIsMuted(newValue === 0);
  };

  const handleToggleChangeVolume = () => {
    if (playerRef.current) {
      if (!isMuted) {
        setPrevVolume(playerRef.current.volume);
        setCurrentVolume(0);
        setIsMuted(true);
      } else {
        setCurrentVolume(prevVolume);
        setIsMuted(false);
      }
    }
  };

  const handleTogglePlay = useCallback(() => {
    if (!isPlaying) {
      playerRef.current?.play();
      setIsPlaying(true);
    } else {
      playerRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const handleSkipTime = (timeSkipMount: number) => {
    if (playerRef.current) {
      let newTime = playerRef.current.currentTime + timeSkipMount;
      playerRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    const fetchAudio = async (url: string) => {
      let audioBlob = await get(url);

      if (!audioBlob) {
        const res = await fetch(url);
        audioBlob = await res.blob();
        await set("audio", audioBlob);
      }

      const setedUrl = URL.createObjectURL(audioBlob);
      setBlobUrl(setedUrl);
    };

    fetchAudio(audioUrl);
  }, []);

  return (
    <>
      <TooltipProvider>
        <audio
          ref={playerRef}
          src={blobUrl}
          className="hidden"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => setDuration(playerRef.current?.duration || 0)}
          muted={isMuted}
        />
        <div className="max-md:absolute max-md:mt-1 max-md:w-full top-full left-1/2 max-md:-translate-x-1/2 flex justify-center items-center gap-x-1.5 bg-background rounded-md overflow-hidden shadow-md">
          <div className="flex justify-center items-center">
            <Button
              variant="secondary"
              size="icon-sm"
              disabled={currentTime === 0}
              className="rounded-none"
              onClick={() => handleSkipTime(-5)}
            >
              <ChevronsLeft />
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon-sm"
                  className="rounded-none"
                  onClick={handleTogglePlay}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isPlaying ? "Pause" : "Play"}</TooltipContent>
            </Tooltip>
            <Button
              variant="secondary"
              size="icon-sm"
              disabled={currentTime === duration}
              className="rounded-none"
              onClick={() => handleSkipTime(5)}
            >
              <ChevronsRight />
            </Button>
          </div>
          <Slider
            value={[currentTime]}
            max={duration ? duration : 100}
            step={1}
            onValueChange={handleSeek}
            className="mx-auto w-full max-w-xs"
          />
          <div className="flex items-center gap-1.5 w-40">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon-sm"
                  className="rounded-none"
                  onClick={handleToggleChangeVolume}
                >
                  {isMuted ? <VolumeOffIcon /> : <Volume2Icon />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isMuted ? "Unmute" : "Mute"}</TooltipContent>
            </Tooltip>
            <Slider
              value={[currentVolume]}
              max={1}
              step={0.1}
              onValueChange={handleChangeVolume}
              className="mx-auto w-full max-w-xs"
            />
          </div>
          <div className="w-60 flex justify-center items-center gap-1 text-sm font-semibold">
            <p className="text-primary">{formatTime(currentTime)}</p>
            <p className="text-accent-foreground">/</p>
            <p className="text-accent-foreground">{formatTime(duration)}</p>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
}

export default AudioTestRoom;
