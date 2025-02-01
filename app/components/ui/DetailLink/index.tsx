import React from 'react';
import { Link, LinkProps } from '@remix-run/react';
import { tv } from 'tailwind-variants';
import { ArrowRight } from '@phosphor-icons/react';

const link = tv({
  base: 'relative flex group w-fit font-qualion-bold leading-10 flex text-primary items-center gap-2 transition hover:-translate-x-[28px] hover:',
});

interface DetailLinkProps extends Pick<LinkProps, 'to'> {
  text: string;
}

const Component: React.FC<DetailLinkProps> = (props) => {
  return (
    <Link to={props.to} className={link()}>
      <ArrowRight size={24} weight="bold" className="transition group-hover:scale-0" />
      <span className="flex">{props.text}</span>
      <ArrowRight size={24} weight="bold" className="scale-0 transition group-hover:scale-100" />
    </Link>
  );
};

export const DetailLink = React.memo(Component);
