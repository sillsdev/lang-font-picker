import { useCallback, useState } from "react";

import useLanguageFontFinder, { LFFOptions } from "./language-font-finder";
import { FontLFP } from "./types";
import { convertToFontLFP } from "./utils";

export interface UseLanguageFontPicker {
  fetchFonts: (language: string) => Promise<void>;
  fonts: FontLFP[];
}

export interface LFPOptions extends LFFOptions {
  onlyOneFont?: boolean;
}

export function useLanguageFontPicker(
  options: LFPOptions = {}
): UseLanguageFontPicker {
  const { onlyOneFont, ...lffOptions } = options;

  const [fonts, setFonts] = useState<FontLFP[]>([]);

  const lff = useLanguageFontFinder(lffOptions);

  /** Fetch fonts for the given language tag. */
  const fetchFonts = useCallback(
    async (language: string) => {
      const lffFonts = await lff.findFonts(language);
      setFonts(
        lffFonts.slice(0, onlyOneFont ? 1 : undefined).map(convertToFontLFP)
      );
    },
    [lff, onlyOneFont]
  );

  return { fetchFonts, fonts };
}

export default useLanguageFontPicker;
