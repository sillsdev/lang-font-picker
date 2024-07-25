import { useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";

import useLanguageFontPicker from "@lfp/headless-lfp";
import type { LFPOptions } from "@lfp/headless-lfp";

import { lfpClassNames } from "./types";
import UnstyledFontList from "./UnstyledFontList";
import type {
  ExternalFontListProps,
  UnstyledFontListProps,
} from "./UnstyledFontList";

/** The input props of the UnstyledLanguageFontPicker component. */
export interface UnstyledLanguageFontPickerProps extends ExternalFontListProps {
  /** (Optional) Function that runs when the picker (and any font selection) is canceled. */
  cancel?: () => void;
  /** (Optional) Function that runs when font selection is confirmed. */
  confirm?: () => void;
  /** (Optional) Custom footer, by default located at the bottom of the component. */
  footer?: ReactElement;
  /** (Optional) Custom header child component to replace the default cancel and confirm buttons.
   * Warning: If this prop is present, then the `cancel` and `confirm` props will not be used. */
  headerActions?: ReactElement;
  /** (Optional) Custom header child node to replace the default text. */
  headerText?: ReactNode;
  /** (Optional) Initial search value for the language input field. */
  language?: string;
  /** (Optional) Text or element to describe the current language,
   * or function that takes a language code and returns a text/element description. */
  languageInfo?: ReactNode | ((language: string) => ReactNode);
  /** (Optional) Object with options for the internal LFP logic. */
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
    fontHeadActions,
    fontHeadText,
    fontRowActions,
    fontRowText,
    footer,
    headerActions,
    headerText,
    languageInfo,
    options,
  } = props;

  const [language, setLanguage] = useState(props.language ?? "");
  const [langInfo, setLangInfo] = useState<ReactNode>();

  useEffect(() => {
    setLangInfo(
      typeof languageInfo === "function" ? languageInfo(language) : languageInfo
    );
  }, [language, languageInfo]);

  const { fetchFonts, fonts, toggleFontIsSelected } =
    useLanguageFontPicker(options);

  const fontListProps: UnstyledFontListProps = {
    fontDivider,
    fontHeadActions,
    fontHeadText,
    fontRowActions,
    fontRowText,
    fonts,
    toggleFontIsSelected,
  };

  return (
    <div className={lfpClassNames.Main}>
      {/* Header */}
      <div className={lfpClassNames.Header}>
        <div className={lfpClassNames.HeaderText}>
          {headerText || defaultHeaderText}
        </div>
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
          onChange={(e) => {
            setLanguage(e.currentTarget.value);
          }}
          onSubmit={(e) => {
            fetchFonts(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchFonts(e.currentTarget.value);
            }
          }}
          type="text"
          value={language}
        />
        <div className={lfpClassNames.LanguageInfo}>{langInfo}</div>
      </div>

      {/* Fonts */}
      <UnstyledFontList {...fontListProps} />

      {/* Footer */}
      <div className={lfpClassNames.Footer}>{footer}</div>
    </div>
  );
}

export default UnstyledLanguageFontPicker;
