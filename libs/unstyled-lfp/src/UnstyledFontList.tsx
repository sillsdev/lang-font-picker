import { type ReactElement } from "react";

import { FontLFP } from "@lfp/headless-lfp";

import { lfpClassNames } from "./types";

/** FontList props that should also be available to the user. */
export interface ExternalFontListProps {
  fontDivider?: ReactElement | boolean;
  fontRowActions?: (rowProps: FontRowProps) => ReactElement;
  fontRowText?: (rowProps: FontRowProps) => ReactElement | string;
  fontTableHeadActions?: ReactElement;
  fontTableHeadText?: ReactElement;
}

/** All FontList props, including those that only the picker component should see. */
export interface UnstyledFontListProps extends ExternalFontListProps {
  fonts: FontLFP[];
  toggleSelectFont: (font: string) => void;
}

interface FontRowProps extends Partial<FontLFP> {
  index?: number;
}

export function UnstyledFontList(props: UnstyledFontListProps): ReactElement {
  const {
    fontDivider,
    fontRowActions,
    fontRowText,
    fontTableHeadActions,
    fontTableHeadText,
    fonts,
    toggleSelectFont,
  } = props;

  const tableRows: ReactElement[] = [];
  fonts.forEach((font, index) => {
    /* Optional divider between fonts */
    if (index && fontDivider) {
      tableRows.push(
        <tr className={lfpClassNames.FontDivider} key={`divider-${index}`}>
          <td>{fontDivider === true ? <hr /> : fontDivider}</td>
        </tr>
      );
    }

    /* Row with font info */
    const rowClassName: string = font.selected
      ? `${lfpClassNames.FontRow} ${lfpClassNames.FontRowSelected}`
      : lfpClassNames.FontRow;
    const rowProps: FontRowProps = { ...font, index };
    const rowText = fontRowText ? fontRowText(rowProps) : font.name;
    tableRows.push(
      <tr className={rowClassName} key={`row-${index}`}>
        <td onClick={() => toggleSelectFont(font.name)}>
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
  );
}

export default UnstyledFontList;
