import { styles } from "@components/icons";
import type { IconProps } from "@components/icons";
import React from "react";

export const Zenn: React.FC<IconProps> = (props) => {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.81085 23H1.24208C1.05396 23 0.946459 22.7808 1.02708 22.6164L13.7927 1.30137C13.9002 1.10959 14.0884 1 14.3034 1H18.6303C18.9528 1 19.1409 1.32877 18.9796 1.60274L6.4021 22.6712C6.26773 22.863 6.05273 23 5.81085 23ZM22.9303 12.9452L16.9909 22.6712C16.8834 22.8904 16.6684 23 16.4534 23H12.0727C11.7771 23 11.589 22.6712 11.7502 22.4247L17.8509 12.4795C17.9315 12.3425 18.0928 12.2603 18.254 12.2603H22.554C22.9034 12.2603 23.1184 12.6438 22.9303 12.9452Z"
        className={styles({ color: props.color })}
      />
    </svg>
  );
};
