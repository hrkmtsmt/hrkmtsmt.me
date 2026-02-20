import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { PlayIcon, StopIcon } from "@heroicons/react/24/outline";
import { useScrap } from "@modules/api";
import DOMPurify from "dompurify";
import * as Tempo from "@formkit/tempo";
import { marked } from "marked";
import { tv, type VariantProps } from "tailwind-variants";

const STATUSES = {
  STOPPED: "stopped",
  PLAYING: "playing",
} as const;

const button = tv({
  base: "relative z-[2] flex h-10 w-10 cursor-pointer justify-center rounded-2xl bg-primary align-center text-black",
});

const icon = tv({
  base: "w-6 stroke-2",
});

export interface ScrapPlayerProps extends VariantProps<typeof button> {
  status: (typeof STATUSES)[keyof typeof STATUSES];
  filename: string;
  path: string;
  onPlay: (path: string, text: string) => void;
}

export const ScrapPlayer: React.FC<ScrapPlayerProps> = (props) => {
  const { data } = useScrap({ filename: props.filename });

  const html = useMemo(() => {
    const parsed = marked.parse(data?.data.content ?? "", { async: false });
    return DOMPurify.sanitize(parsed);
  }, [data]);

  const dom = useMemo(() => {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }, [html]);

  const date = useMemo(() => {
    const [unixtime] = props.filename.split(".");
    return Tempo.format(new Date(Number(unixtime)), "YYYY-MM-DD");
  }, [props.filename]);

  const title = useMemo(() => dom.querySelector("h2")?.innerText ?? "", [dom]);
  const text = useMemo(() => dom.querySelector("html")?.innerText ?? "", [dom]);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      props.onPlay(props.path, text);
    },
    [text, props.path, props.onPlay]
  );

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
      <button type="button" className={button()} onClick={onClick}>
        {props.status === "playing" && <StopIcon className={icon()} />}
        {props.status === "stopped" && <PlayIcon className={icon()} />}
      </button>
    </article>
  );
};

export const useScrapPlayer = () => {
  const [current, setCurrent] = useState<string | null>(null);

  const path = useCallback((filename: string) => `/scraps/${filename}`, []);

  const status = useCallback(
    (filename: string) => {
      if (current === path(filename)) {
        return STATUSES.PLAYING;
      }

      return STATUSES.STOPPED;
    },
    [current, path]
  );

  const play: ScrapPlayerProps["onPlay"] = useCallback((path, text) => {
    setCurrent((prev) => {
      speechSynthesis.cancel();

      if (prev === path) {
        return null;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);

      return path;
    });
  }, []);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return { path, status, play };
};
