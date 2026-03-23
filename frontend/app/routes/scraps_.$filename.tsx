import React, { Suspense } from "react";
import { useParams } from "react-router";
import { Container, Heading2 } from "@components/layout";
import { AudioButton } from "~/components/ui/AudioButton";
import { SeekBar } from "~/components/ui/SeekBar";
import { useScrap } from "@modules/api";
import { useMarkdownParser } from "@modules/hooks/use-markdown-parser";
import { useAudioPlayer } from "@modules/hooks/use-audio-player";
import type { Route } from "./+types/about";

export function meta(props: Route.MetaArgs) {
  return [{ title: "scraps" }, { name: "description", content: "My posts" }];
}

function ScrapContent() {
  const { filename } = useParams<"filename">();
  const { data } = useScrap(filename!);
  const { title, body } = useMarkdownParser(data.data.markdown);
  const player = useAudioPlayer(data.data.mp3);

  return (
    <Container>
      <Heading2>{title}</Heading2>
      <div className="flex gap-4 items-center w-full">
        <AudioButton ref={player.ref} onTimeUpdate={player.render} status={player.status} onPlay={player.play} onPause={player.pause} />
        <SeekBar value={player.time} onChange={player.seek} />
      </div>
      <div
        className="flex flex-col gap-8 leading-8 [&_ul]:pl-4 [&_ul]:list-disc [&_ul]:leading-8 [&_ol]:pl-8 [&_ol]:list-decimal [&_ol]:leading-8 [&_li]:leading-8 [&_a]:text-primary [&_a]underline [&_rt]:leading-3 [&_rt]:text-2 [&_hr]:border-t-0 [&_hr]:py-4 [&_h2]:text-primary [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:leading-8 [&_h3]:font-bold [&_h3]:text-md [&_h3]:leading-8 [&_h4]:font-bold [&_h4]:text-md [&_h4]:leading-8"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </Container>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ScrapContent />
    </Suspense>
  );
}
