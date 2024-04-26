import { useCallback, useState } from "react";

import useLanguageFontFinder, { LFFOptions } from "./language-font-finder";
import { FontLFP } from "./types";
import { convertToFontLFP } from "./utils";

export interface UseLanguageFontPicker {
  fetchFonts: (language: string) => Promise<void>;
  fonts: FontLFP[];
}

export interface LFPOptions extends LFFOptions {
  extraFonts?: FontLFP[];
  onlyOneFont?: boolean;
}

export function useLanguageFontPicker(
  options: LFPOptions = {}
): UseLanguageFontPicker {
  const { extraFonts, onlyOneFont, ...lffOptions } = options;

  const [fonts, setFonts] = useState<FontLFP[]>(extraFonts ?? []);

  const lff = useLanguageFontFinder(lffOptions);

  /** Fetch fonts for the given language tag. */
  const fetchFonts = useCallback(
    async (language: string) => {
      const foundFonts = (await lff.findFonts(language)).map(convertToFontLFP);
      const allFonts = [...foundFonts, ...(extraFonts ?? [])];
      setFonts(allFonts.slice(0, onlyOneFont ? 1 : undefined));
    },
    [extraFonts, lff, onlyOneFont]
  );

  return { fetchFonts, fonts };
}

export default useLanguageFontPicker;
