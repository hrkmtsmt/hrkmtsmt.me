import React from "react";

export interface RootProps {
  children?: React.ReactNode;
}

const Component: React.FC<RootProps> = (props) => {
  return <div className="flex flex-col gap-16">{props.children}</div>;
};

export const Root = React.memo(Component);
