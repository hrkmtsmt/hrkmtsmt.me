import React, { useMemo } from 'react';
import { Container } from '@components/layout';

const Component: React.FC = () => {
  const year = useMemo(() => new Date().getFullYear().toString(), []);

  return (
    <footer className="flex h-16 justify-center">
      <Container>
        <address className="flex gap-2 not-italic">
          <span>{`Copyright ${year} Hiroki Matsumoto`}</span>
        </address>
      </Container>
    </footer>
  );
};

export const Footer = React.memo(Component);
