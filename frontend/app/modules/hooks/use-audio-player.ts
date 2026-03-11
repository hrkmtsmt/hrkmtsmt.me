import React, { useCallback, useRef, useState, useEffect } from "react";

export const useAudioPlayer = (url: string) => {
  const ref = useRef<HTMLAudioElement>(null);

  const [status, setStatus] = useState<"paused" | "playing">("paused");

  const [time, setTime] = useState<number>(0);

  const play = useCallback<React.MouseEventHandler<HTMLButtonElement>>(async () => {
    const audio = ref.current;

    if (!audio) {
      return;
    };

    if (!audio.src) {
      audio.src = url;
    }

    await audio.play();
    setStatus("playing")
  }, [url]);

  const pause = useCallback<React.MouseEventHandler<HTMLButtonElement>>(async () => {
    const audio = ref.current;

    if (!audio) {
      return;
    };

    audio.pause();
    setStatus("paused")
  }, []);

  const toggle = useCallback<React.MouseEventHandler<HTMLButtonElement>>(async () => {
    const audio = ref.current;

    if (!audio) {
      return;
    };

    if (!audio.src) {
      audio.src = url;
    }

    if (audio.paused) {
      await audio.play();
      setStatus("playing");
    } else {
      audio.pause();
      setStatus("paused");
    }
  }, [url]);

  const seek = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    const audio = ref.current;

    if (!audio) {
      return;
    }

    if (!audio.src) {
      audio.src = url;
    }

    const time = audio.duration * (Number(e.target.value) / 100);
    audio.currentTime = time;
  }, [url]);

  const render = useCallback<React.ReactEventHandler<HTMLAudioElement>>((e) => {
    const audio = e.currentTarget;

    if (audio.duration) {
      setTime((audio.currentTime / audio.duration) * 100);
    }
  }, []);

  useEffect(() => {
    return () => {
      ref.current?.pause();
    }
  }, []);

  return { ref, status, time, play, pause, toggle, seek, render }
}
