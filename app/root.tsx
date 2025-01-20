import React from 'react';
import { LinksFunction } from '@remix-run/node'; // or cloudflare/deno
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { Root } from '@components/layout';
import { Footer, Header } from '@components/feature';
import { Loader } from '@components/ui';
import './tailwind.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'icon',
      href: '/icon.svg',
      type: 'image/svg+xml',
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
