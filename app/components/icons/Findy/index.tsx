import { styles } from "@components/icons";
import type { IconProps } from "@components/icons";
import React from "react";

export const Findy: React.FC<IconProps> = (props) => {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9994 1C18.0743 1 23 5.9247 23 12H22.9987C22.9987 14.5255 22.1472 16.8512 20.7172 18.7076L22.9902 20.9831L20.9795 22.9939L18.7066 20.7184C16.8503 22.1484 14.5247 23 11.9994 23C5.92442 23 1 18.0753 1 12C1 5.9247 5.92442 1 11.9994 1ZM4.24183 11.4496C4.52538 7.41028 7.89186 4.22146 12.003 4.22146C16.3001 4.22146 19.7836 7.70514 19.7836 12.0025C19.7836 14.1505 18.9137 16.0951 17.5058 17.503H17.5046C16.0968 18.9122 14.1522 19.7822 12.0043 19.7822C8.92651 19.7822 6.26608 17.9951 5.00412 15.4018C5.91105 13.5403 7.54016 12.0941 9.52555 11.4278C9.70568 10.2747 10.083 9.1878 10.621 8.20019C8.12136 8.52245 5.89106 9.70837 4.24183 11.4496Z"
        className={styles({ color: props.color })}
      />
    </svg>
  );
};
