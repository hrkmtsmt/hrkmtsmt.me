import React from "react";
import { useParams } from "react-router";
import { Container, Heading2 } from "@components/layout";
import { AudioButton } from "~/components/ui/AudioButton";
import { SeekBar } from "~/components/ui/SeekBar";
import { useScrap } from "@modules/api";
import { useMarkdownParser } from "@modules/hooks/use-markdown-parser";
import { useAudioPlayer } from "@modules/hooks/use-audio-player";

import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [{ title: "hrkmtsmt | About" }, { name: "description", content: "My posts" }];
}

const Component: React.FC<{ mp3: string; filename: string; markdown: string }> = (props) => {
  const { title, body } = useMarkdownParser(props.markdown);
  const player = useAudioPlayer(props.mp3);

  return (
    <Container>
      <Heading2>{title}</Heading2>
      <div className="flex gap-4 items-center w-full">
        <AudioButton ref={player.ref} onTimeUpdate={player.render} status={player.status} onPlay={player.play} onPause={player.pause} />
        <SeekBar value={player.time} onChange={player.seek} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </Container>
  )
}

export default function Page() {
  const { filename } = useParams<"filename">();
  const { data, isLoading } = useScrap(filename!);

  if (isLoading) {
    return null;
  }

  return (
    <Component mp3={data?.data.mp3} filename={data?.data.filename} markdown={data?.data.markdown} />
  );
}
