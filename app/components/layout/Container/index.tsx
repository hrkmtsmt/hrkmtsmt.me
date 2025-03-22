import React from "react";

export interface ContainerProps {
  children?: React.ReactNode;
}

const Component: React.FC<ContainerProps> = (props) => {
  return (
    <div className="m-auto flex w-full max-w-(--breakpoint-xl) flex-col gap-6 px-6 sm:gap-8 sm:px-8">
      {props.children}
    </div>
  );
};

export const Container = React.memo(Component);
