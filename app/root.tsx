import React from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import './tailwind.css';
import type { LinksFunction } from '@remix-run/node'; // or cloudflare/deno

export const links: LinksFunction = () => {
  return [
    {
      rel: 'icon',
      href: '/icon.svg',
      type: 'image/svg+xml',
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="ja" className="bg-base font-qualion-regular text-white selection:bg-primary selection:text-white">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}
