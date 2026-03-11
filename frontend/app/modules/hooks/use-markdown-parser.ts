
import { useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

export const useMarkdownParser = (markdown: string) => {
  const html = useMemo(() => {
    const parsed = marked.parse(markdown, { async: false });

    return DOMPurify.sanitize(parsed);
  }, [markdown]);

  const dom = useMemo(() => {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }, [html]);

  const title = useMemo(() => {
    const body = dom.querySelector("body");
    return body?.querySelector("h2")?.innerText ?? "";
  }, [dom]);

  const body = useMemo(() => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, "text/html");

    const body = dom.querySelector("body");
    const h2 = body?.querySelector("h2");

    if (h2) body?.removeChild(h2);

    return dom.body.innerHTML;
  }, [html]);

  return { html, title, body };
}
