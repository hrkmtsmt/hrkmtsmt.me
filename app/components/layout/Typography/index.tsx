import React from "react";

export interface TypographyProps {
  children?: React.ReactNode;
}

export const Heading1: React.FC<TypographyProps> = React.memo((props) => {
  return <h1 className="">{props.children}</h1>;
});

export const Heading2: React.FC<TypographyProps> = React.memo((props) => {
  return <h1 className="font-bold font-qualion-round text-3xl text-primary leading-10">{props.children}</h1>;
});

export const Paragraph: React.FC<TypographyProps> = React.memo((props) => {
  return <p className="leading-6">{props.children}</p>;
});
