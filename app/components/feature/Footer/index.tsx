import React, { useMemo } from 'react';
import { Container } from '@components/layout';

export const Footer: React.FC = () => {
  const year = useMemo(() => new Date().getFullYear().toString(), []);

  return (
    <footer className="flex h-16 justify-center">
      <Container>
        <address className="flex gap-2 not-italic">
          <span>&copy;</span>
          <span>{year}</span>
          <span>{process.env.NODE_ENV}</span>
        </address>
      </Container>
    </footer>
  );
};
