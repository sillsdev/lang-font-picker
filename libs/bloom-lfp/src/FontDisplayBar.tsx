import { css } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import {
  CheckCircle as OkIcon,
  Error as UnsuitableIcon,
  Help as UnknownIcon,
} from "@mui/icons-material";
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
  inDropdownList: boolean;
  isPopoverOpen: boolean;
  onHover?: (hoverTarget: HTMLElement, metadata: FontMetaData) => void;
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
      {suitability === "ok" && (
        <OkIcon htmlColor={kBloomBlue} {...commonProps} />
      )}
      {suitability === "unknown" && (
        <UnknownIcon
          htmlColor={props.inDropdownList ? kDisabledControlGray : kBloomGold}
          {...commonProps}
        />
      )}
      {(suitability === "unsuitable" || suitability === "invalid") && (
        <UnsuitableIcon
          htmlColor={props.inDropdownList ? kDisabledControlGray : kErrorColor}
          {...commonProps}
        />
      )}
    </Box>
  );

  const shouldGrayOutText = (): boolean => {
    return props.inDropdownList && suitability !== "ok";
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
