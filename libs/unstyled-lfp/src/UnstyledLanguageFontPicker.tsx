import { type ReactElement } from "react";

import useLanguageFontPicker, { type LFPOptions } from "@lfp/headless-lfp";

import { lfpClassNames } from "./types";
import UnstyledFontList, {
  type ExternalFontListProps,
  type UnstyledFontListProps,
} from "./UnstyledFontList";

export interface UnstyledLanguageFontPickerProps extends ExternalFontListProps {
  cancel?: () => void;
  confirm?: () => void;
  footer?: ReactElement;
  headerActions?: ReactElement;
  headerText?: ReactElement | string;
  language?: string;
  languageInfo?: ReactElement | string;
  options?: LFPOptions;
}

const defaultHeaderText = "Language Font Picker";

export function UnstyledLanguageFontPicker(
  props: UnstyledLanguageFontPickerProps
): ReactElement {
  const {
    cancel,
    confirm,
    fontDivider,
    fontRowActions,
    fontRowText,
    fontTableHeadActions,
    fontTableHeadText,
    footer,
    headerActions,
    headerText,
    language,
    languageInfo,
    options,
  } = props;

  const { fetchFonts, fonts, toggleSelectFont } =
    useLanguageFontPicker(options);

  const fontListProps: UnstyledFontListProps = {
    fontDivider,
    fontRowActions,
    fontRowText,
    fontTableHeadActions,
    fontTableHeadText,
    fonts,
    toggleSelectFont,
  };

  return (
    <div className={lfpClassNames.Main}>
      {/* Header */}
      <div className={lfpClassNames.Header}>
        {!headerText || typeof headerText === "string" ? (
          <p className={lfpClassNames.HeaderText}>
            {headerText || defaultHeaderText}
          </p>
        ) : (
          <div className={lfpClassNames.HeaderText}>{headerText}</div>
        )}
        <div className={lfpClassNames.HeaderActions}>
          {headerActions ? (
            headerActions
          ) : (
            <div>
              {confirm ? <button onClick={confirm}>✓</button> : null}
              {cancel ? <button onClick={cancel}>✕</button> : null}
            </div>
          )}
        </div>
      </div>

      {/* Language */}
      <div className={lfpClassNames.Language}>
        <input
          className={lfpClassNames.LanguageInput}
          onSubmit={(e) => {
            fetchFonts(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchFonts(e.currentTarget.value);
            }
          }}
          type="text"
        >
          {language}
        </input>
        {typeof languageInfo === "string" ? (
          <p className={lfpClassNames.LanguageInfo}>{languageInfo}</p>
        ) : (
          <div className={lfpClassNames.LanguageInfo}>{languageInfo}</div>
        )}
      </div>

      {/* Fonts */}
      <UnstyledFontList {...fontListProps} />

      {/* Footer */}
      <div className={lfpClassNames.Footer}>{footer}</div>
    </div>
  );
}

export default UnstyledLanguageFontPicker;
