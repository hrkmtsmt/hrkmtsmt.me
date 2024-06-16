import React from 'react';

export interface ContainerProps {
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = (props) => {
  return <div className="m-auto max-w-screen-xl px-6 sm:px-8">{props.children}</div>;
};
