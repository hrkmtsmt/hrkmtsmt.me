import React, { useEffect, useRef } from 'react';
import { Button, ButtonProps } from '@components/ui';

export interface TabsProps {
  list: { name: string; value: string | undefined; active: boolean }[];
  onClick: ButtonProps['onClick'];
}

export const Tabs: React.FC<TabsProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.addEventListener('wheel', (e) => {
      e.preventDefault();

      ref.current?.scrollBy({
        top: 0,
        left: e.deltaY,
        behavior: 'smooth',
      });
    });
  }, []);

  return (
    <div ref={ref} role="tablist" className="flex w-full gap-4 overflow-x-scroll">
      {props.list.map((item) => (
        <Button
          role="tab"
          color={item.active ? 'primary' : 'secondary'}
          shape="pill"
          value={item.value}
          onClick={props.onClick}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export interface TabPanelProps {
  active: boolean;
  children?: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = (props) => {
  if (props.active) {
    return (
      <div role="tabpanel" tabIndex={0} aria-hidden="false">
        {props.children}
      </div>
    );
  }

  return (
    <div role="tabpanel" tabIndex={-1} aria-hidden="true" className="hidden">
      {props.children}
    </div>
  );
};
