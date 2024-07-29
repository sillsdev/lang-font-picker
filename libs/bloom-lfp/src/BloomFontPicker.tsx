/** Copied an modified from https://github.com/BloomBooks/BloomDesktop/blob/Version6.0/src/BloomBrowserUI/bookEdit/StyleEditor/fontSelectComponent.tsx */

import { css } from "@emotion/react";
import {
  MenuItem,
  Popover,
  PopoverOrigin,
  SelectChangeEvent,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { FunctionComponent, useCallback, useEffect, useState } from "react";

import { lightTheme } from "./BloomMuiTheme";
import FontDisplayBar from "./FontDisplayBar";
import FontInformationPane from "./FontInformationPane";
import WinFormsStyleSelect from "./WinFormsStyleSelect";
import { FontMetaData, useL10nHookType } from "./types";

interface FontSelectProps {
  currentFontName: string;
  fontMetadata?: FontMetaData[];
  /** In case multiple font selects are in the DOM at the same time increases, require a number to use as a key. */
  languageNumber: number;
  onChangeFont?: (fontname: string) => void;
  /** Use this if you need to modify the style of popup menus by increasing z-index
   * (e.g., to make the popup be in front of the font dialog) */
  popoverZindex?: string;
  suitabilityCheck?: boolean;
  useL10n?: useL10nHookType;
}

const FontSelectComponent: FunctionComponent<FontSelectProps> = (props) => {
  const getFontDataFromName = useCallback(
    (fontName: string) => {
      if (!props.fontMetadata) return;
      return props.fontMetadata.find((f) => f.name === fontName);
    },
    [props.fontMetadata]
  );

  const [fontChoice, setFontChoice] = useState<FontMetaData | undefined>(
    undefined
  );

  // If the font metadata isn't initially available, reload the 'fontChoice' when it "arrives".
  useEffect(() => {
    const fontData = getFontDataFromName(props.currentFontName);
    setFontChoice(fontData);
  }, [getFontDataFromName, props.currentFontName]);

  // The references to "popover" from here down to 'isPopoverOpen' refer to the font information pane
  // that shows when hovering over the suitability icon near the end of the FontDisplayBar,
  // NOT the select dropdown.
  const [popoverFont, setPopoverFont] = useState<FontMetaData | undefined>(
    undefined
  );
  const [popoverAnchorElement, setPopoverAnchorElement] = useState<
    HTMLElement | undefined
  >(undefined);
  const handlePopoverOpen = (
    hoverTarget: HTMLElement,
    metadata: FontMetaData
  ) => {
    setPopoverAnchorElement(hoverTarget as HTMLElement);
    setPopoverFont(metadata);
  };
  const handlePopoverClose = () => {
    setPopoverAnchorElement(undefined);
    setPopoverFont(undefined);
  };
  const isPopoverOpen = Boolean(popoverAnchorElement);

  const getMenuItemsFromFontMetaData = (): JSX.Element[] => {
    if (!props.fontMetadata) return Array(<div />);
    return props.fontMetadata.map((font, index) => {
      return (
        <MenuItem
          key={index}
          value={font.name}
          dense
          sx={css`
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          `}
        >
          <FontDisplayBar
            fontMetadata={font}
            isPopoverOpen
            isSelected={font === fontChoice}
            suitabilityCheck={props.suitabilityCheck}
            onHover={handlePopoverOpen}
          />
        </MenuItem>
      );
    });
  };

  const handleFontChange = (event: SelectChangeEvent<string>) => {
    const fontName = event.target.value;
    setFontChoice(getFontDataFromName(fontName));
    if (props.onChangeFont) {
      props.onChangeFont(fontName);
    }
  };

  const finalKey = `font-${props.languageNumber.toString()}`;

  const transformOrigin: PopoverOrigin = {
    vertical: "top",
    horizontal: "left",
  };

  const textValue = fontChoice ? fontChoice.name : props.currentFontName;

  return (
    <ThemeProvider theme={lightTheme}>
      <WinFormsStyleSelect
        currentValue={textValue}
        idKey={finalKey}
        onChangeHandler={handleFontChange}
        popoverZindex={props.popoverZindex}
      >
        {getMenuItemsFromFontMetaData()}
      </WinFormsStyleSelect>
      {/* This is the font information popup that gives information about the hovered font. */}
      <Popover
        open={isPopoverOpen}
        anchorEl={popoverAnchorElement}
        // Popover puts its top-left corner in the center of the round suitability icon.
        anchorOrigin={{ horizontal: "center", vertical: "center" }}
        transformOrigin={transformOrigin}
        disableRestoreFocus
        onClick={handlePopoverClose}
      >
        <FontInformationPane metadata={popoverFont} useL10n={props.useL10n} />
      </Popover>
    </ThemeProvider>
  );
};

export default FontSelectComponent;
