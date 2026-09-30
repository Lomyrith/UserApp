import { useState } from "react";
import { ClickAwayListener, Tooltip, tooltipClasses } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

import type { CopyableTooltipProps } from "../interfaces/CopyableTooltipProps";

export default function CopyableTooltip({
  title,
  textToCopy,
  copyable = true,
  children,
  ...props
}: CopyableTooltipProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const valueToCopy = textToCopy || `${title}: n/a`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(valueToCopy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleTooltipClose = () => {
    setOpen(false);
    setCopied(false);
  };

  if (!copyable) {
    return (
      <Tooltip title={title} arrow placement="bottom-start" {...props}>
        {children}
      </Tooltip>
    );
  }

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          arrow
          placement="bottom-start"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={handleTooltipClose}
          slotProps={{
            popper: {
              sx: {
                // Erlaubt Interaktion (Klicks) im Tooltip
                pointerEvents: "auto",
                [`& .${tooltipClasses.tooltip}`]: {
                  p: 0.5,
                  pl: 1.2,
                },
              },
            },
          }}
          title={
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography variant="caption" sx={{ color: "inherit" }}>
                {title}
              </Typography>
              <Tooltip title={copied ? "Kopiert!" : "Kopieren"} placement="top">
                <IconButton
                  size="small"
                  onClick={handleCopy}
                  sx={{ color: copied ? "success.light" : "inherit", p: 0.25 }}
                >
                  {copied ? (
                    <CheckIcon fontSize="inherit" />
                  ) : (
                    <ContentCopyIcon fontSize="inherit" />
                  )}
                </IconButton>
              </Tooltip>
            </Stack>
          }
          {...props}
        >
          {children}
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
}
