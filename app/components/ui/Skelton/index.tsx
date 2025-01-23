import React from 'react';
import { Grid, Column, ColumnProps } from '@components/layout';

export interface SkeltonCardsProps {
  total: number;
  size: ColumnProps['size'];
}

export const SkeltonCards: React.FC<SkeltonCardsProps> = (props) => {
  return (
    <Grid type="ul">
      {[...Array(props.total)].map((_, i) => (
        <Column type="li" key={i} size={props.size}>
          <div className="h-[160px] animate-pulse rounded-2xl bg-black" />
        </Column>
      ))}
    </Grid>
  );
};
