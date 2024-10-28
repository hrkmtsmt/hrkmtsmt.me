import React, { useEffect, useRef } from 'react';
import { Button, ButtonProps } from '@components/ui';

export interface TabsProps {
  children?: React.ReactNode;
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
      {props.children}
    </div>
  );
};

export interface TabProps extends Pick<ButtonProps, 'value' | 'onClick' | 'children'> {
  active: boolean;
}

export const Tab: React.FC<TabProps> = (props) => {
  return (
    <Button role="tab" color={props.active ? 'primary' : 'secondary'} value={props.value} onClick={props.onClick}>
      {props.children}
    </Button>
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
