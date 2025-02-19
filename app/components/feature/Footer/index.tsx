import React, { useMemo } from 'react';
import { Container } from '@components/layout';
import { Github, Hatena, Lapras, Qiita, X, Zenn } from '@components/icons';

const Component: React.FC = () => {
  const year = useMemo(() => new Date().getFullYear().toString(), []);

  return (
    <footer className="flex h-16 justify-center">
      <Container>
        <ul className="flex gap-2">
          <li>
            <a href="https://github.com/hrkmtsmt">
              <Github size={24} color="white" />
            </a>
          </li>
          <li>
            <a href="https://x.com/hrkmtsmt">
              <X size={24} color="white" />
            </a>
          </li>
          <li>
            <a href="https://hrkmtsmt.hatenablog.com">
              <Hatena size={24} color="white" />
            </a>
          </li>
          <li>
            <a href="https://zenn.dev/hrkmtsmt">
              <Zenn size={24} color="white" />
            </a>
          </li>
          <li>
            <a href="https://qiita.com/hrkmtsmt">
              <Qiita size={24} color="white" />
            </a>
          </li>
          <li>
            <a href="https://lapras.com/public/hrkmtsmt">
              <Lapras size={24} color="white" />
            </a>
          </li>
        </ul>
        <address className="flex gap-2 not-italic">
          <span>{`Copyright ${year} Hiroki Matsumoto`}</span>
        </address>
      </Container>
    </footer>
  );
};

export const Footer = React.memo(Component);
