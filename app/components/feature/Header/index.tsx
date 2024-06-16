import React, { useMemo } from 'react';
import { Link } from '@remix-run/react';
import { BrandSymbol, Navigation, NavigationProps } from '@components/ui';
import { Container } from '@components/layout';
import { PAGES } from '@modules/constants';

export const Header: React.FC = () => {
  const links: NavigationProps['links'] = useMemo(() => {
    return [
      { to: PAGES.about.path as string, name: PAGES.about.name },
      { to: PAGES.posts.path as string, name: PAGES.posts.name },
    ];
  }, []);

  return (
    <header>
      <Container>
        <div className="flex items-center gap-4">
          <h1>
            <Link to={PAGES.top.path}>
              <BrandSymbol size={40} />
            </Link>
          </h1>
          <Navigation links={links} />
        </div>
      </Container>
    </header>
  );
};
