import React from 'react';
import { Button } from '../Button';

export interface PaginationProps {
  current: number;
  pagination: number[];
  onClick: (page: number) => Promise<void>;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <ul className="flex gap gap-4 items-center">
      {props.pagination.map((p) => (
        <li key={p}>
          <Button shape="circle" color={props.current === p ? 'primary' : 'secondary'} onClick={() => props.onClick(p)}>
            {p}
          </Button>
        </li>
      ))}
    </ul>
  );
};
