import React from 'react';

export interface Heading1Props {
  children?: React.ReactNode;
}

export const Heading1: React.FC<Heading1Props> = (props) => {
  return <h1 className="">{props.children}</h1>
};

export interface Heading2Props {
  children?: React.ReactNode;
}

export const Heading2: React.FC<Heading2Props> = (props) => {
  return <h1 className="font-qualion-bold text-3xl leading-10 text-primary">{props.children}</h1>
};
