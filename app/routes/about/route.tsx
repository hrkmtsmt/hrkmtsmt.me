import React from "react";
import { MetaFunction } from "@remix-run/cloudflare";
import { Container } from "@components/layout";

export const meta: MetaFunction = () => {
  return [
    { title: "hrkmtsmt | About" },
    {
      name: "description",
      content: "My posts",
    },
  ];
};

export default function Page() {
  return <Container>About</Container>;
}
