import React from "react";
type Props = {
  title: string | undefined;
  caption: string | undefined;
  desc: string | undefined;
  children?: React.ReactNode;
};
export const Section = (props: Props) => {
  const captionJSX = (
    <span className={"c-section-caption"}>{props.caption}</span>
  );
  const titleJSX = <h2 className={"c-section-title"}>{props.title}</h2>;
  const descJSX = <p className={"c-section-desc"}>{props.desc}</p>;
  return (
    <section className={"l-grid l-inner"}>
      <div className={"l-grid-full"}>
        <div className={"c-section"}>
          {props.caption === undefined ? undefined : captionJSX}
          {props.title === undefined ? undefined : titleJSX}
          {props.desc === undefined ? undefined : descJSX}
        </div>
      </div>
      {props.children}
    </section>
  );
};