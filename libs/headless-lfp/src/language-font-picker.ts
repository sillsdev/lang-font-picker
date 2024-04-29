import { useCallback, useState } from "react";

import useLanguageFontFinder, { LFFOptions } from "./language-font-finder";
import { FontLFP } from "./types";
import { convertToFontLFP } from "./utils";

/** The output type of the useLanguageFontPicker hook. */
export interface UseLanguageFontPicker {
  fetchFonts: (language: string) => Promise<void>;
  fonts: FontLFP[];
}

/** The input type of the useLanguageFontPicker hook.
 * `maxFontCount` should be a positive integer. */
export interface LFPOptions extends LFFOptions {
  extraFonts?: FontLFP[];
  maxFontCount?: number;
}

/** This React hook is a headless Font Picker component. Handles the internal state and logic for a
 * picker that gives different font options depending on the specified language. */
export function useLanguageFontPicker(
  options: LFPOptions = {}
): UseLanguageFontPicker {
  const { extraFonts, maxFontCount, ...lffOptions } = options;

  const [fonts, setFonts] = useState<FontLFP[]>(extraFonts ?? []);

  const lff = useLanguageFontFinder(lffOptions);

  /** Fetch fonts for the given language tag. */
  const fetchFonts = useCallback(
    async (language: string) => {
      const foundFonts = (await lff.findFonts(language)).map(convertToFontLFP);
      const allFonts = [...foundFonts, ...(extraFonts ?? [])];
      setFonts(allFonts.slice(0, maxFontCount || undefined));
    },
    [extraFonts, lff, maxFontCount]
  );

  return { fetchFonts, fonts };
}

export default useLanguageFontPicker;
