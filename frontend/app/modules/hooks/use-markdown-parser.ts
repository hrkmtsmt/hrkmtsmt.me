import { useState, useEffect } from "react";
import { Marked } from "marked";
import DOMPurify from "dompurify";
import { createHighlighter, createCssVariablesTheme, type Highlighter } from "shiki";

const cssVarsTheme = createCssVariablesTheme({ name: "css-variables", variablePrefix: "--shiki-" });

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [cssVarsTheme],
      langs: [
        "bash", "css", "go", "html", "javascript", "json",
        "python", "rust", "tsx", "typescript",
      ],
    });
  }
  return highlighterPromise;
}

function extractTitleAndBody(html: string) {
  const dom = new DOMParser().parseFromString(html, "text/html");
  const title = dom.body.querySelector("h2")?.innerText ?? "";
  dom.body.querySelector("h2")?.remove();
  return { html, title, body: dom.body.innerHTML };
}

function parsePlain(markdown: string) {
  const html = DOMPurify.sanitize(new Marked().parse(markdown, { async: false }));
  return extractTitleAndBody(html);
}

async function parseWithHighlight(markdown: string, highlighter: Highlighter) {
  const raw = new Marked().parse(markdown, { async: false });
  const dom = new DOMParser().parseFromString(raw, "text/html");

  await Promise.all(
    Array.from(dom.querySelectorAll("pre code")).map(async (codeEl) => {
      const pre = codeEl.parentElement!;
      const lang = codeEl.className.replace("language-", "") || "text";
      const code = codeEl.textContent ?? "";

      try {
        const highlighted = await highlighter.codeToHtml(code, {
          lang,
          theme: "css-variables",
        });
        const wrapper = dom.createElement("div");
        wrapper.innerHTML = highlighted;
        pre.replaceWith(wrapper.firstElementChild!);
      } catch {
        // 対応言語外はそのまま
      }
    })
  );

  const html = DOMPurify.sanitize(dom.body.innerHTML, { ADD_ATTR: ["style"] });
  return extractTitleAndBody(html);
}

export const useMarkdownParser = (markdown: string) => {
  const [result, setResult] = useState(() => parsePlain(markdown));

  useEffect(() => {
    let cancelled = false;

    getHighlighter()
      .then((highlighter) => {
        if (cancelled) return;
        return parseWithHighlight(markdown, highlighter);
      })
      .then((result) => {
        if (result && !cancelled) setResult(result);
      });

    return () => { cancelled = true; };
  }, [markdown]);

  return result;
};
