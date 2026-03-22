import { use } from "react";
import { marked } from "marked";
import extention from "marked-shiki";
import DOMPurify from "dompurify";
import { createHighlighter, createCssVariablesTheme, createJavaScriptRegexEngine } from "shiki";

const theme = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--shiki-"
});

const highlighter = await createHighlighter({
  themes: [theme],
  langs: [
    "bash", "css", "go", "html", "javascript", "json",
    "python", "rust", "tsx", "typescript",
  ],
  engine: createJavaScriptRegexEngine(),
});

const shiki = extention({
  highlight: (code, lang, props) => {
    return highlighter.codeToHtml(code, {
      lang,
      theme,
      meta: { __raw: props.join("") },
      transformers: []
    })
  }
});

const cache = new Map<string, Promise<string>>();
export const useMarkdownParser = (markdown: string) => {

  if (!cache.has(markdown)) {
    cache.set(markdown, marked.use(shiki).parse(markdown, { async: true }));
  }

  const dirty = use(cache.get(markdown)!);
  const html = DOMPurify.sanitize(dirty, { ADD_ATTR: ["style"] });
  const dom = new DOMParser().parseFromString(html, "text/html");
  const title = dom.body.querySelector("h2")?.innerText ?? "";
  dom.body.querySelector("h2")?.remove();
  const body = dom.body.innerHTML;

  return { title, body, html }
};
