import { ReactElement } from "react";

import { lfpClassNames } from "./types";
import UnstyledFontList, { UnstyledFontListProps } from "./UnstyledFontList";

export interface UnstyledLanguageFontPickerProps extends UnstyledFontListProps {
  cancel?: () => void;
  confirm?: () => void;
  footer?: ReactElement;
  headerActions?: ReactElement;
  headerText?: ReactElement | string;
  language?: string;
  languageInfo?: ReactElement | string;
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
    fontRows,
    fontTableHeadActions,
    fontTableHeadText,
    footer,
    headerActions,
    headerText,
    language,
    languageInfo,
  } = props;

  const fontListProps: UnstyledFontListProps = {
    fontDivider,
    fontRowActions,
    fontRowText,
    fontRows,
    fontTableHeadActions,
    fontTableHeadText,
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
        <input className={lfpClassNames.LanguageInput} type="text">
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
