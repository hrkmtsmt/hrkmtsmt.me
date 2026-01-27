import { Container, Heading2, Paragraph } from "@components/layout";
import { MetaFunction } from "@remix-run/cloudflare";
import React from "react";

export const meta: MetaFunction = () => {
  return [{ title: "hrkmtsmt | About" }, { name: "description", content: "My posts" }];
};

export default function Page() {
  return (
    <Container>
      <Heading2>About</Heading2>
      <Paragraph>Software engineer.</Paragraph>
    </Container>
  );
}
