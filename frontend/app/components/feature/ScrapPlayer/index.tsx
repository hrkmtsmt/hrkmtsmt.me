import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { Link } from "react-router";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";
import DOMPurify from "dompurify";
import * as Tempo from "@formkit/tempo";
import { marked } from "marked";

interface ScrapAudio {
  status: "play" | "pause";
  time: number
}

interface ScrapAudioMap extends Map<string, ScrapAudio> {}

const scrapAudioMapAtom = atom<ScrapAudioMap>(new Map());

export interface ScrapPlayerProps {
  path: string;
  text: string;
  mp3: string;
}

export const ScrapPlayer: React.FC<ScrapPlayerProps> = (props) => {
  const ref = useRef<HTMLAudioElement>(null);

  const [map, setMap] = useAtom(scrapAudioMapAtom);
  const scrap = useMemo(() => map.get(props.path) ?? { status: "pause", time: 0 }, [map, props.path]);

  const html = useMemo(() => {
    const parsed = marked.parse(props.text, { async: false });
    return DOMPurify.sanitize(parsed);
  }, [props.text]);

  const dom = useMemo(() => {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }, [html]);

  const date = useMemo(() => {
    return Tempo.format(new Date(Number(props.path)), "YYYY-MM-DD");
  }, [props.text]);

  const title = useMemo(() => dom.querySelector("h2")?.innerText ?? "", [dom]);
  useMemo(() => dom.querySelector("html")?.innerText ?? "", [dom]);

  const onClick = useCallback(async () => {
    const audio = ref.current;

    if (!audio) {
      return;
    };

    if (!audio.src) {
      audio.src = props.mp3;
    }

    if (audio.paused) {
      await audio.play();
      setMap((prev) => {
        const next = new Map(prev);
        const time = next.get(props.path)?.time ?? 0;
        return next.set(props.path, { status: "play", time });
      });
    } else {
      audio.pause();
      setMap((prev) => {
        const next = new Map(prev);
        const time = next.get(props.path)?.time ?? 0;
        return next.set(props.path, { status: "pause", time });
      });
    }
  }, [props.mp3]);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    const audio = ref.current;

    if (!audio) {
      return;
    }

    const time = audio.duration * (Number(e.target.value) / 100);
    audio.currentTime = time;
  }, []);

  const onTimeUpdate = useCallback<React.ReactEventHandler<HTMLAudioElement>>((e) => {
    const audio = e.currentTarget;

    if (audio.duration) {
      const time = (audio.currentTime / audio.duration) * 100;
      setMap((prev) => {
        const next = new Map(prev);
        const status = next.get(props.path)?.status ?? "pause";
        return next.set(props.path, { status, time });
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      ref.current?.pause();
    }
  }, []);

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
      <audio ref={ref} onTimeUpdate={onTimeUpdate} />
      <button
        type="button"
        className="relative z-[2] flex h-10 w-10 cursor-pointer justify-center rounded-2xl bg-primary align-center text-black"
        onClick={onClick}
      >
        {scrap.status === "play" && <PauseIcon className="w-6 stroke-2" />}
        {scrap.status === "pause" && <PlayIcon className="w-6 stroke-2" />}
      </button>
      <input type="range" value={scrap.time} className="z-[2] h-1 bg-black" onChange={onChange} />
    </article>
  );
};
