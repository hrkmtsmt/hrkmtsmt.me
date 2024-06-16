import React from 'react';

export interface RootProps {
  children?: React.ReactNode;
}

export const Root: React.FC<RootProps> = (props) => {
  return <div className="flex flex-col gap-8">{props.children}</div>;
};
