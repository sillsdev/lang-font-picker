import { useCallback, useState } from "react";

import useLanguageFontFinder, { LFFOptions } from "./language-font-finder";
import { FontLFP } from "./types";
import { convertToFontLFP } from "./utils";

/** The output type of the useLanguageFontPicker hook. */
export interface UseLanguageFontPicker {
  fetchFonts: (language: string) => Promise<void>;
  fonts: FontLFP[];
  toggleSelectFont: (font: string) => boolean | undefined;
}

/** The input type of the useLanguageFontPicker hook.
 * `maxFontCount` should be a positive integer. */
export interface LFPOptions extends LFFOptions {
  extraFonts?: FontLFP[];
  maxFontCount?: number;
  multiselect?: boolean;
}

/** This React hook is a headless Font Picker component. Handles the internal state and logic for a
 * picker that gives different font options depending on the specified language. */
export function useLanguageFontPicker(
  options: LFPOptions = {}
): UseLanguageFontPicker {
  const { extraFonts, maxFontCount, multiselect, ...lffOptions } = options;

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

  /** Toggle whether the specified font is selected.
   * If `options.multiselect` is `true`, leave all other fonts alone.
   * If `options.multiselect` is `false`, set `selected: false` on all other fonts.
   * If specified font is in the fonts list, return the resulting `selected` value of that font.
   * If specified font is not in the fonts list, return `undefined`.  */
  const toggleSelectFont = useCallback(
    (fontName: string) => {
      let selected: boolean | undefined;
      setFonts((prev) =>
        prev.map((font) => {
          if (font.name === fontName) {
            selected = !font.selected;
            return { ...font, selected };
          }
          return multiselect ? font : { ...font, selected: false };
        })
      );
      return selected;
    },
    [multiselect]
  );

  return { fetchFonts, fonts, toggleSelectFont };
}

export default useLanguageFontPicker;
