import { type ReactElement } from "react";

import { FontLFP } from "@lfp/headless-lfp";

import { lfpClassNames } from "./types";

export interface UnstyledFontListProps {
  fontDivider?: ReactElement | boolean;
  fontRowActions?: (rowProps: FontRowProps) => ReactElement;
  fontRowText?: (rowProps: FontRowProps) => ReactElement | string;
  fontRows?: FontLFP[];
  fontTableHeadActions?: ReactElement;
  fontTableHeadText?: ReactElement;
}

interface FontRowProps extends Partial<FontLFP> {
  index?: number;
}

export function UnstyledFontList(props: UnstyledFontListProps): ReactElement {
  const {
    fontDivider,
    fontRowActions,
    fontRowText,
    fontRows,
    fontTableHeadActions,
    fontTableHeadText,
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
