import { css } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { CheckCircle, Error, Help } from "@mui/icons-material";
import * as React from "react";
import { useDebouncedCallback } from "use-debounce";

import {
  kBloomBlue,
  kBloomGold,
  kErrorColor,
  kDisabledControlGray,
} from "./BloomMuiTheme";
import { FontMetaData } from "./types";

interface FontDisplayBarProps {
  fontMetadata: FontMetaData;
  isPopoverOpen?: boolean;
  isSelected?: boolean;
  onHover?: (hoverTarget: HTMLElement, metadata: FontMetaData) => void;
  suitabilityCheck?: boolean;
}

/** Copied and modified from https://github.com/BloomBooks/BloomDesktop/blob/Version6.0/src/BloomBrowserUI/react_components/fontDisplayBar.tsx */
const FontDisplayBar: React.FunctionComponent<FontDisplayBarProps> = (
  props
) => {
  const suitability = props.fontMetadata.determinedSuitability;
  const ariaOwns = props.isPopoverOpen ? "mouse-over-popover" : undefined;

  const kHoverDelay = 700; // milliseconds; default MUI tooltip delay
  const debouncedPopover = useDebouncedCallback((target: HTMLElement) => {
    if (!props.onHover) return;
    props.onHover(target, props.fontMetadata);
  }, kHoverDelay);

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (!props.onHover) return;
    debouncedPopover(event.currentTarget as HTMLElement);
  };

  const handleMouseLeave = () => {
    if (!props.onHover) return;
    debouncedPopover.cancel();
  };

  const commonProps = {
    "aria-owns": ariaOwns,
    "aria-haspopup": true,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  const getIconForFont = (): JSX.Element => (
    <Box
      sx={css`
        padding-top: 3px !important;
        padding-right: 3px !important;
      `}
    >
      {props.suitabilityCheck ? (
        suitability === "ok" ? (
          <CheckCircle htmlColor={kBloomBlue} {...commonProps} />
        ) : suitability === "unknown" ? (
          <Help
            htmlColor={props.isSelected ? kBloomGold : kDisabledControlGray}
            {...commonProps}
          />
        ) : (
          <Error
            htmlColor={props.isSelected ? kErrorColor : kDisabledControlGray}
            {...commonProps}
          />
        )
      ) : (
        <Help htmlColor={kBloomBlue} {...commonProps} />
      )}
    </Box>
  );

  const shouldGrayOutText = (): boolean => {
    return !(
      props.isSelected ||
      !props.suitabilityCheck ||
      suitability === "ok"
    );
  };
  const textColor = `color: ${
    shouldGrayOutText() ? kDisabledControlGray : "black"
  };`;

  const cssFontFamily = `font-family: "${props.fontMetadata.name}", "Roboto", "Arial" !important;`;

  return (
    <Box
      className="font-display-bar"
      sx={css`
        display: flex !important;
        flex: 1 !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: center !important;
      `}
    >
      <Typography
        sx={css`
          ${cssFontFamily}
          ${textColor}
        `}
      >
        {props.fontMetadata.name}
      </Typography>
      {getIconForFont()}
    </Box>
  );
};

export default FontDisplayBar;
