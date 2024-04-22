import { ReactElement } from "react";

import { lfpClassNames } from "./types";

export interface UnstyledLanguageFontPickerProps {
  fontDivider?: ReactElement | boolean;
  fontRowActions?: (rowProps: FontRowProps) => ReactElement;
  fontRowText?: (rowProps: FontRowProps) => ReactElement | string;
  fontRows?: FontProps[];
  fontTableHeadActions?: ReactElement;
  fontTableHeadText?: ReactElement;
  footer?: ReactElement;
  headerActions?: ReactElement;
  headerText?: ReactElement | string;
  language?: string;
  languageInfo?: ReactElement | string;
}

interface FontProps {
  name: ReactElement;
}

interface FontRowProps extends Partial<FontProps> {
  index?: number;
}

const defaultHeaderText = "Language Font Picker";

export function UnstyledLanguageFontPicker(
  props: UnstyledLanguageFontPickerProps
): ReactElement {
  const {
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

  const tableRows: ReactElement[] = [];
  fontRows?.forEach((font, index) => {
    /* Optional divider between fonts */
    if (index && fontDivider) {
      tableRows.push(
        <tr className={lfpClassNames.FontDivider} key={`divider-${index}`}>
          <td>{fontDivider === true ? <hr /> : fontDivider}</td>
        </tr>
      );
    }

    /* Row with font info */
    const rowProps: FontRowProps = { ...font, index };
    const rowText = fontRowText ? fontRowText(rowProps) : font.name;
    tableRows.push(
      <tr className={lfpClassNames.FontRow} key={`row-${index}`}>
        <td>
          {typeof rowText === "string" ? (
            <p className={lfpClassNames.FontRowText}>{rowText}</p>
          ) : (
            <div className={lfpClassNames.FontRowText}>{rowText}</div>
          )}
          <div className={lfpClassNames.FontRowActions}>
            {fontRowActions ? fontRowActions(rowProps) : null}
          </div>
        </td>
      </tr>
    );
  });

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
        <div className={lfpClassNames.HeaderActions}>{headerActions}</div>
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
      <table className={lfpClassNames.FontTable}>
        <thead className={lfpClassNames.FontTableHead}>
          <tr>
            <th>
              <div className={lfpClassNames.FontTableHeadText}>
                {fontTableHeadText}
              </div>
              <div className={lfpClassNames.FontTableHeadActions}>
                {fontTableHeadActions}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className={lfpClassNames.FontTableBody}>{tableRows}</tbody>
      </table>

      {/* Footer */}
      <div className={lfpClassNames.Footer}>{footer}</div>
    </div>
  );
}

export default UnstyledLanguageFontPicker;
