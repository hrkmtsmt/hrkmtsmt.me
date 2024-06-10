import React from 'react';
import { Link, LinkProps } from '@remix-run/react';

interface LProps extends Pick<LinkProps, 'to' | 'children'> {}

interface AProps extends Pick<React.ComponentProps<'a'>, 'onClick' | 'children' | 'ref'> {
  to: string;
}

export type LinkButtonProps = LProps | AProps;

const isURL = (props: LProps | AProps): props is AProps => {
  const pattern = /^https?:\/\/[\w/:%#$&?()~.=+-]+$/;

  return typeof props.to === 'string' && pattern.test(props.to);
}

const Component: React.FC<LinkButtonProps> = (props) => {
  if (isURL(props)) {
    return (
      <a
      href={props.to}
      ref={props.ref}
      className="block w-fit rounded-full bg-primary px-4 font-qualion-bold leading-10 text-black duration-200 ease-in-out hover:opacity-80 active:scale-95"
      >{props.children}</a>
    )
  }

  return (
    <Link
      {...props}
      className="block w-fit rounded-full bg-primary px-4 font-qualion-bold leading-10 text-black duration-200 ease-in-out hover:opacity-80 active:scale-95"
    />
  );
};

export const LinkButton = React.memo(Component);
