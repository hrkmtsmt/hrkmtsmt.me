import React, { useMemo } from "react";
import { Link } from "@remix-run/react";
import { BrandSymbol } from "@components/icons";
import { Navigation, NavigationProps } from "@components/ui";
import { Container } from "@components/layout";
import { PAGES } from "@modules/constants";

const Component: React.FC = () => {
  const links: NavigationProps["links"] = useMemo(() => {
    return [
      { to: PAGES.about.path as string, name: PAGES.about.name },
      { to: PAGES.posts.path as string, name: PAGES.posts.name },
    ];
  }, []);

  return (
    <header className="flex h-16 justify-center">
      <Container>
        <div className="flex items-center gap-4">
          <h1>
            <Link to={PAGES.top.path}>
              <BrandSymbol size={40} color="primary" />
            </Link>
          </h1>
          <Navigation links={links} />
        </div>
      </Container>
    </header>
  );
};

export const Header = React.memo(Component);
