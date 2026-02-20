import type { VariantProps } from "tailwind-variants";
import { styles } from "./style";

export interface IconProps extends VariantProps<typeof styles> {
  size: number;
}
