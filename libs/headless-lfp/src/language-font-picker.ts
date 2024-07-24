import { useCallback, useState } from "react";

import useLanguageFontFinder from "./language-font-finder";
import type { LFFOptions } from "./language-font-finder";
import type { FontLFP } from "./types";
import { convertToFontLFP } from "./utils";

/** The output type of the useLanguageFontPicker hook. */
export interface UseLanguageFontPicker {
  /** Fetch fonts for the given language tag. */
  fetchFonts: (language: string) => Promise<void>;
  /** Array of font options. */
  fonts: FontLFP[];
  /** Toggle whether the specified font is selected.
   * If `options.allowMultiselect` is `true`, leave all other fonts alone.
   * If `options.allowMultiselect` is `false`, set `isSelected: false` on all other fonts.
   * If specified font is in the fonts list, return the resulting `isSelected` value of that font.
   * If specified font is not in the fonts list, return `undefined`.  */
  toggleFontIsSelected: (font: string) => boolean | undefined;
}

/** The input type of the useLanguageFontPicker hook.
 * `maxFontCount` should be a positive integer. */
export interface LFPOptions extends LFFOptions {
  allowMultiselect?: boolean;
  extraFonts?: FontLFP[];
  maxFontCount?: number;
}

/** This React hook is a headless Font Picker component. Handles the internal state and logic for a
 * picker that gives different font options depending on the specified language. */
export function useLanguageFontPicker(
  options: LFPOptions = {}
): UseLanguageFontPicker {
  const { allowMultiselect, extraFonts, maxFontCount, ...lffOptions } = options;

  const [fonts, setFonts] = useState<FontLFP[]>(extraFonts ?? []);

  const lff = useLanguageFontFinder(lffOptions);

  const fetchFonts = useCallback(
    async (language: string) => {
      const foundFonts = (await lff.findFonts(language)).map(convertToFontLFP);
      const allFonts = [...foundFonts, ...(extraFonts ?? [])];
      setFonts(allFonts.slice(0, maxFontCount || undefined));
    },
    [extraFonts, lff, maxFontCount]
  );

  const toggleFontIsSelected = useCallback(
    (fontName: string) => {
      let isSelected: boolean | undefined;
      setFonts((prev) =>
        prev.map((font) => {
          if (font.name !== fontName) {
            return allowMultiselect ? font : { ...font, isSelected: false };
          }

          isSelected = !font.isSelected;
          return { ...font, isSelected };
        })
      );
      return isSelected;
    },
    [allowMultiselect]
  );

  return { fetchFonts, fonts, toggleFontIsSelected };
}

export default useLanguageFontPicker;
