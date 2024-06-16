import React, { useMemo } from 'react';
import { Link } from '@remix-run/react';
import { BrandSymbol, Navigation, NavigationProps } from '@components/ui';
import { Container } from '@components/layout';

export const Header: React.FC = () => {
  const links: NavigationProps['links'] = useMemo(() => {
    return [
      { to: '/about', name: 'About' },
      { to: '/posts', name: 'Posts' },
    ];
  }, []);

  return (
    <header>
      <Container>
        <div className="flex items-center gap-4">
          <h1>
            <Link to="/">
              <BrandSymbol size={40} />
            </Link>
          </h1>
          <Navigation links={links} />
        </div>
      </Container>
    </header>
  );
};
