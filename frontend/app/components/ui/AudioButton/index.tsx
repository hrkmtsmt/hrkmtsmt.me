import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import React from "react";
import { tv } from "tailwind-variants";

const button = tv({
  base: "relative z-[2] flex h-10 w-10 cursor-pointer justify-center rounded-2xl bg-primary align-center text-black",
});

const icon = tv({
  base: "w-6 stroke-2",
});

interface AudioButtonProps {
  ref: React.RefObject<HTMLAudioElement | null>;
  status: "paused" | "playing";
  onPlay: React.ReactEventHandler<HTMLButtonElement>;
  onPause: React.ReactEventHandler<HTMLButtonElement>;
  onTimeUpdate?: React.ReactEventHandler<HTMLAudioElement>;
}

export const AudioButton: React.FC<AudioButtonProps> = React.memo((props) => {
  if (props.status === "paused") {
    return (
      <>
        <button type="button" className={button()} onClick={props.onPlay}>
          <PlayIcon className={icon()} />
        </button>
        <audio ref={props.ref} onTimeUpdate={props.onTimeUpdate} />
      </>
    );
  }

  return (
    <>
      <button type="button" className={button()} onClick={props.onPause}>
        <PauseIcon className={icon()} />
      </button>
      <audio ref={props.ref} onTimeUpdate={props.onTimeUpdate} />
    </>
  );
});
