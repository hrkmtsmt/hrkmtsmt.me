import { Container, Heading2, Paragraph } from "@components/layout";
import React from "react";

import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [{ title: "hrkmtsmt | About" }, { name: "description", content: "My posts" }];
}

export default function Page() {
  return (
    <Container>
      <Heading2>About</Heading2>
      <Paragraph>Software engineer.</Paragraph>
    </Container>
  );
}
