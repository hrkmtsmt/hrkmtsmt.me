import React, { useMemo } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

interface MarkdownPreviewerProps {
  markdown: string;
}

export const MarkdownPreviewer: React.FC<MarkdownPreviewerProps> = (props) => {
  const html = useMemo(
    () => DOMPurify.sanitize(marked.parse(props.markdown, { async: false })),
    [props.markdown]
  );

  return (
    <div
      className="flex flex-col gap-8 leading-8 [&_ul]:pl-4 [&_ul]:list-disc [&_ul]:leading-8 [&_ol]:pl-8 [&_ol]:list-decimal [&_ol]:leading-8 [&_li]:leading-8 [&_a]:text-blue [&_a]underline [&_rt]:leading-3 [&_rt]:text-2 [&_hr]:border-t-0 [&_hr]:py-4 [&_h2]:text-primary [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:leading-8 [&_h3]:font-bold [&_h3]:text-md [&_h3]:leading-8 [&_h4]:font-bold [&_h4]:text-md [&_h4]:leading-8"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

