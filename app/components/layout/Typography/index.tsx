import React from 'react';

export interface TypographyProps {
  children?: React.ReactNode;
}

export const Heading1: React.FC<TypographyProps> = React.memo((props) => {
  return <h1 className="">{props.children}</h1>;
});

export const Heading2: React.FC<TypographyProps> = React.memo((props) => {
  return <h1 className="font-qualion-bold text-3xl leading-10 text-primary">{props.children}</h1>;
});

export const Paragraph: React.FC<TypographyProps> = React.memo((props) => {
  return <p className="leading-6">{props.children}</p>;
});
