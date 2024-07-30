import { css } from "@emotion/react";
import { IconButton, Link, Stack, Typography } from "@mui/material";
import {
  Close as CloseIcon,
  InfoOutlined as InfoOutlinedIcon,
} from "@mui/icons-material";
import { FunctionComponent } from "react";

import fontInfoText from "./BloomInfoText";
import { kBloomBlue, kDisabledControlGray } from "./BloomMuiTheme";
import { FontMetaData, useL10nHookType } from "./types";

/** Copied and modified from https://github.com/BloomBooks/BloomDesktop/blob/Version6.0/src/BloomBrowserUI/react_components/fontInformationPane.tsx */
const FontInformationPane: FunctionComponent<{
  metadata?: FontMetaData;
  suitabilityCheck?: boolean;
  useL10n?: useL10nHookType;
}> = (props) => {
  const variantString =
    props.metadata && props.metadata.variants
      ? props.metadata.variants.join(", ")
      : undefined;

  const suitability = props.metadata?.determinedSuitability;

  const textColor =
    suitability === "ok"
      ? "primary"
      : suitability === "unknown"
        ? "textPrimary"
        : "error";

  const useL10n = (args: string[]) =>
    props.useL10n
      ? props.useL10n(args[0], args[1], args[2], args[3], args[4])
      : args[0];

  const okayFontMessage = useL10n(fontInfoText.okayFontMessage);
  const unknownFontMessage = useL10n(fontInfoText.unknownFontMessage);
  const unsuitableFontFormatMessage = useL10n(
    fontInfoText.unsuitableFontFormatMessage
  );
  const unsuitableFontLicenseMessage = useL10n(
    fontInfoText.unsuitableFontLicenseMessage
  );

  const mainMessage =
    suitability === "ok"
      ? okayFontMessage
      : suitability === "unknown"
        ? unknownFontMessage
        : suitability === "invalid"
          ? unsuitableFontFormatMessage
          : unsuitableFontLicenseMessage;

  const styleWording = useL10n(fontInfoText.styleWording);
  const versionWording = useL10n(fontInfoText.versionWording);
  const licenseWording = useL10n(fontInfoText.licenseWording);

  const showFontDeveloperData = (fontData: FontMetaData | undefined) => {
    if (!fontData) return;
    let message = `name: ${fontData.name}\n`;
    message += `version: ${fontData.version}\n`;
    message += `license: ${fontData.license}\n`;
    message += `licenseURL: ${fontData.licenseURL}\n`;
    message += `copyright: ${fontData.copyright}\n`;
    message += `designer: ${fontData.designer}\n`;
    message += `designerURL: ${fontData.designerURL}\n`;
    message += `manufacturer: ${fontData.manufacturer}\n`;
    message += `manufacturerURL: ${fontData.manufacturerURL}\n`;
    message += `fsType: ${fontData.fsType}\n`;
    message += `styles: ${fontData.variants?.toString()}\n`;
    if (props.suitabilityCheck) {
      message += `determinedSuitability: ${fontData.determinedSuitability}\n`;
      message += `determinedSuitabilityNotes: ${fontData.determinedSuitabilityNotes}\n`;
    }
    alert(message);
  };

  const SmallLink: FunctionComponent<{
    href: string;
    linkText: string;
  }> = (props) => (
    <Link variant="body2" underline="always" href={props.href}>
      {props.linkText}
    </Link>
  );

  return (
    <Stack direction="row-reverse" alignItems="flex-start">
      <IconButton
        size="small"
        // Clicking anywhere on the pane works, but w/o the button the user might not know this.
        onClick={() => {
          // Do nothing
        }}
        sx={css`
          background-color: ${kBloomBlue} !important;
          border-radius: 4px;
          margin: 2px;
          padding: 0px;
        `}
      >
        <CloseIcon htmlColor="white" />
      </IconButton>
      {!props.metadata || (
        <Stack
          direction="column"
          sx={css`
            flex: 1;
            padding: 10px;
            padding-right: 0px; // because close icon takes up space
            width: 200px;
          `}
        >
          {/* Primary license message */}
          {props.suitabilityCheck && (
            <Typography
              color={textColor}
              sx={css`
                margin-bottom: 10px !important;
              `}
              variant="body2"
            >
              {mainMessage}
            </Typography>
          )}
          {/* Font name */}
          <Typography variant="subtitle2">{props.metadata.name}</Typography>
          {/* Variant style (bold, italic, etc.) */}
          {variantString && (
            <Typography variant="body2">
              {styleWording}: {variantString}
            </Typography>
          )}
          {/* Designer and DesignerURL */}
          {props.metadata.designerURL ? (
            <SmallLink
              href={props.metadata.designerURL}
              linkText={props.metadata.designer ?? props.metadata.designerURL}
            />
          ) : props.metadata.designer ? (
            <Typography variant="body2">{props.metadata.designer}</Typography>
          ) : null}
          {/* Manufacturer and ManufacturerURL */}
          {props.metadata.manufacturerURL ? (
            <SmallLink
              href={props.metadata.manufacturerURL}
              linkText={
                props.metadata.manufacturer ?? props.metadata.manufacturerURL
              }
            />
          ) : props.metadata.manufacturer ? (
            <Typography variant="body2">
              {props.metadata.manufacturer}
            </Typography>
          ) : null}
          {/* Font version number */}
          {props.metadata.version && (
            <Typography variant="body2">
              {versionWording} {props.metadata.version}
            </Typography>
          )}
          {/* LicenseURL */}
          {props.metadata.licenseURL && (
            <SmallLink
              href={props.metadata.licenseURL}
              linkText={licenseWording}
            />
          )}
          {props.suitabilityCheck && suitability !== "ok" && (
            <InfoOutlinedIcon
              htmlColor={kDisabledControlGray}
              onClick={() => showFontDeveloperData(props.metadata)}
              sx={css`
                position: absolute !important;
                bottom: 4px;
                right: 4px;
              `}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default FontInformationPane;
