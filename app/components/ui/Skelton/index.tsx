import React from 'react';
import { Column, ColumnProps, Grid } from '@components/layout';

export interface SkeltonCardsProps {
  total: number;
  size: ColumnProps['size'];
}

export const SkeltonCards: React.FC<SkeltonCardsProps> = (props) => {
  return (
    <Grid>
      {[...Array(props.total)].map((_, i) => (
        <Column key={i} size={props.size}>
          <div className="h-[160px] animate-pulse rounded-2xl bg-black" />
        </Column>
      ))}
    </Grid>
  );
};
