import React from 'react';
import fs from "node:fs";
import path from "node:path";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import type { EntryContext } from '@remix-run/node';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const shellHtml = fs
    .readFileSync(
      path.join(process.cwd(), "app/index.html")
    )
    .toString();

  const appHtml = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  const html = shellHtml.replace('<!-- Remix SPA -->', appHtml);

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
    status: responseStatusCode,
  });
}
