import type { TooltipProps } from "@mui/material";

export interface CopyableTooltipProps extends Omit<TooltipProps, "title"> {
  title: string;
  textToCopy?: string;
  copyable?: boolean;
}
