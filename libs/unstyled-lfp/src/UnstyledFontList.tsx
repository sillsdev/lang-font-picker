import type { ReactElement, ReactNode } from "react";

import type { FontLFP } from "@lfp/headless-lfp";

import { lfpClassNames } from "./types";

/** FontList props that should also be available to the user. */
export interface ExternalFontListProps {
  fontDivider?: ReactElement | boolean;
  fontHeadActions?: ReactElement;
  fontHeadText?: ReactElement;
  fontRowActions?: (rowProps: FontRowProps) => ReactElement;
  fontRowText?: (rowProps: FontRowProps) => ReactNode;
}

/** All FontList props, including those that only the picker component should see. */
export interface UnstyledFontListProps extends ExternalFontListProps {
  fonts: FontLFP[];
  toggleFontIsSelected: (font: string) => void;
}

interface FontRowProps extends Partial<FontLFP> {
  index?: number;
}

export function UnstyledFontList(props: UnstyledFontListProps): ReactElement {
  const {
    fontDivider,
    fontHeadActions,
    fontHeadText,
    fontRowActions,
    fontRowText,
    fonts,
    toggleFontIsSelected,
  } = props;

  const listRows: ReactElement[] = [];
  fonts.forEach((font, index) => {
    /* Optional divider between fonts */
    if (index && fontDivider) {
      listRows.push(
        <li className={lfpClassNames.FontDivider} key={`divider-${index}`}>
          {fontDivider === true ? <hr /> : fontDivider}
        </li>
      );
    }

    /* Row with font info */
    const rowClassName: string = font.isSelected
      ? `${lfpClassNames.FontRow} ${lfpClassNames.FontRowSelected}`
      : lfpClassNames.FontRow;
    const rowProps: FontRowProps = { ...font, index };
    const rowText = fontRowText ? fontRowText(rowProps) : font.name;
    listRows.push(
      <li
        className={rowClassName}
        key={`row-${index}`}
        onClick={() => toggleFontIsSelected(font.name)}
      >
        <div className={lfpClassNames.FontRowText}>{rowText}</div>
        <div className={lfpClassNames.FontRowActions}>
          {fontRowActions ? fontRowActions(rowProps) : null}
        </div>
      </li>
    );
  });

  return (
    <div className={lfpClassNames.FontList}>
      <div className={lfpClassNames.FontListHead}>
        <div className={lfpClassNames.FontListHeadText}>{fontHeadText}</div>
        <div className={lfpClassNames.FontListHeadActions}>
          {fontHeadActions}
        </div>
      </div>
      <ul className={lfpClassNames.FontListList}>{listRows}</ul>
    </div>
  );
}

export default UnstyledFontList;
