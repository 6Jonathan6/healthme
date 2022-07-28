import type { MetaFunction } from "@remix-run/node";
import styles from "./styles/app.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Health Me",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
    },
    {
      rel: "icon",
      href: "/logo-2.png",
      type: "image/png",
    },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
