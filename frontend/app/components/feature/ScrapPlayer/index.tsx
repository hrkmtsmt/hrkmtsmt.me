import React, { useMemo } from "react";
import { Link } from "react-router";
import * as Tempo from "@formkit/tempo";
import { useMarkdownParser } from "@modules/hooks/use-markdown-parser";
import { useAudioPlayer } from "@modules/hooks/use-audio-player";
import { AudioButton } from "~/components/ui/AudioButton";
import { SeekBar } from "~/components/ui/SeekBar";

export interface ScrapPlayerProps {
  path: string;
  filename: string;
  text: string;
  mp3: string;
}

export const ScrapPlayer: React.FC<ScrapPlayerProps> = React.memo((props) => {
  const date = useMemo(() => {
    return Tempo.format(new Date(Number(props.filename)), "YYYY-MM-DD");
  }, [props.filename]);

  const { title } = useMarkdownParser(props.text);

  const player = useAudioPlayer(props.mp3);

  return (
    <article className="relative flex flex-col gap-4 rounded-2xl bg-black p-4 font-default duration-200 ease-in-out hover:scale-101 hover:opacity-80">
      <h3 className="flex flex-col gap-2">
        <time className="text-gray text-xs" dateTime={date}>
          {date}
        </time>
        <Link to={props.path} className="after:absolute after:inset-0 after:z-[1] hover:underline focus:outline-none">
          <span className="line-clamp-2 h-12 leading-6">{title}</span>
        </Link>
      </h3>
      <AudioButton ref={player.ref} status={player.status} onPlay={player.play} onPause={player.pause} onTimeUpdate={player.render} />
      <SeekBar value={player.time} onChange={player.seek} />
    </article>
  );
});
