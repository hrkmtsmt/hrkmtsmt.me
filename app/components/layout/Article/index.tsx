import React from 'react';

export interface ArticleProps {
  children?: React.ReactNode;
}

export const Article: React.FC<ArticleProps> = (props) => {
  return <article className="flex w-full flex-col gap-6 sm:gap-8">{props.children}</article>;
};
