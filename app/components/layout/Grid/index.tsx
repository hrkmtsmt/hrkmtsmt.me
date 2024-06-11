import React from 'react';

export interface GridProps {
  children?: React.ReactNode;
}

export const Grid: React.FC<GridProps> = (props) => {
  return <div className="grid w-full grid-cols-4 gap-6 sm:grid-cols-8 sm:gap-8 md:grid-cols-12">{props.children}</div>;
};

const GridColumnSize = {
  full: 'full',
  xl2: 'xl2',
  xl: 'xl',
  lg: 'sm',
  md: 'md',
  sm: 'sm',
} as const;

export interface GridColumnProps {
  size: (typeof GridColumnSize)[keyof typeof GridColumnSize];
  children?: React.ReactNode;
}

export const GridColumn: React.FC<GridColumnProps> = (props) => {
  if (props.size === GridColumnSize.full) {
    return <div className="col-span-full">{props.children}</div>;
  }

  if (props.size === GridColumnSize.xl2) {
    return <div className="col-span-8 md:col-span-full">{props.children}</div>;
  }

  if (props.size === GridColumnSize.xl) {
    return <div className="col-span-4 sm:col-span-4 md:col-span-6">{props.children}</div>;
  }

  if (props.size === GridColumnSize.lg) {
    return <div className="col-span-2 sm:col-span-4 md:col-span-4">{props.children}</div>;
  }

  if (props.size === GridColumnSize.md) {
    return <div className="col-span-2 sm:col-span-4 md:col-span-4">{props.children}</div>;
  }

  return <div className="col-span-2 sm:col-span-2 md:col-span-3">{props.children}</div>;
};
