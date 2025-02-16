import React from 'react';
import { Button, ButtonProps } from '../Button';

const page = (i: number) => i + 1;

export interface PaginationProps {
  pages: number | undefined;
  current: number;
  onClick: ButtonProps['onClick'];
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <ul className="flex gap gap-4 items-center">
      {[...Array(props.pages)].map((_, i) => (
        <li key={page(i)}>
          <Button
            shape="circle"
            color={props.current === page(i) ? 'primary' : 'secondary'}
            value={page(i)}
            onClick={props.onClick}
          >
            {page(i)}
          </Button>
        </li>
      ))}
    </ul>
  );
};
