import { useCallback, useState } from 'react';

import useLanguageFontFinder from './language-font-finder';
import { FontLFP, convertToFontLFP } from './types';

export interface UseLanguageFontFinder {
  fonts: FontLFP[];
  getFonts: (language: string) => Promise<void>;
}

export function useLanguageFontPicker() {
  const [fonts, setFonts] = useState<FontLFP[]>([]);

  const lff = useLanguageFontFinder();

  const getFonts = useCallback(
    async (language: string) => {
      await lff.findFonts(language);
      setFonts(lff.fonts.map(convertToFontLFP));
    },
    [lff]
  );

  return { fonts, getFonts };
}

export default useLanguageFontPicker;
