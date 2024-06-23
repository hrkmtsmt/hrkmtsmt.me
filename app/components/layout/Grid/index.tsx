import React from 'react';

export interface GridProps {
  children?: React.ReactNode;
}

export const Grid: React.FC<GridProps> = (props) => {
  return <div className="grid w-full grid-cols-4 gap-6 sm:grid-cols-8 sm:gap-8 md:grid-cols-12">{props.children}</div>;
};

const GRID_COLUMN_SIZES = {
  full: 'full',
  '2xl': '2xl',
  xl: 'xl',
  lg: 'sm',
  md: 'md',
  sm: 'sm',
} as const;

export interface ColumnProps {
  size: (typeof GRID_COLUMN_SIZES)[keyof typeof GRID_COLUMN_SIZES];
  children?: React.ReactNode;
}

export const Column: React.FC<ColumnProps> = (props) => {
  if (props.size === GRID_COLUMN_SIZES.full) {
    return <div className="col-span-full">{props.children}</div>;
  }

  if (props.size === GRID_COLUMN_SIZES['2xl']) {
    return <div className="col-span-8 md:col-span-full">{props.children}</div>;
  }

  if (props.size === GRID_COLUMN_SIZES.xl) {
    return <div className="col-span-4 sm:col-span-4 md:col-span-6">{props.children}</div>;
  }

  if (props.size === GRID_COLUMN_SIZES.lg) {
    return <div className="col-span-2 sm:col-span-4 md:col-span-4">{props.children}</div>;
  }

  if (props.size === GRID_COLUMN_SIZES.md) {
    return <div className="col-span-2 sm:col-span-4 md:col-span-4">{props.children}</div>;
  }

  return <div className="col-span-2 sm:col-span-2 md:col-span-3">{props.children}</div>;
};
