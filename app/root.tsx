import { Footer, Header } from "@components/feature";
import { Root } from "@components/layout";
import { Loader } from "@components/ui";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import React from "react";
import "./tailwind.css";
import type { LinksFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: `${import.meta.env.VITE_BASE_URL}/icon.ico`,
      type: "image/x-icon",
    },
    {
      rel: "icon",
      href: `${import.meta.env.VITE_BASE_URL}/icon.svg`,
      type: "image/svg+xml",
    },
  ];
};

export const Layout: React.FC = React.memo(() => {
  return (
    <html
      lang="ja"
      className="w-full bg-base font-default text-white transition duration-200 ease-out selection:bg-primary selection:text-white"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Root>
          <Header />
          <Outlet />
          <Footer />
        </Root>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
});

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <Loader />;
}
