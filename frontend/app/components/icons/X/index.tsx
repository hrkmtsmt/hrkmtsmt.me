import { styles } from "@components/icons";
import type { IconProps } from "@components/icons";
import React from "react";

export const X: React.FC<IconProps> = (props) => {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.4979 10.3155L21.3156 1H19.463L12.6749 9.08852L7.25324 1H1L9.19861 13.2313L1 23H2.85265L10.0211 14.4583L15.7468 23H22L13.4974 10.3155H13.4979ZM10.9604 13.339L10.1297 12.1211L3.52019 2.42965H6.36576L11.6997 10.2509L12.5304 11.4689L19.4639 21.6354H16.6183L10.9604 13.3395V13.339Z"
        className={styles({ color: props.color })}
      />
    </svg>
  );
};
