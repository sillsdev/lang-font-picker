import { useCallback, useState } from 'react';

import { FontLFF } from './types';
import { fetchJSON } from './utils';

export interface UseLanguageFontFinder {
  error?: string;
  findFonts: (lang: string) => Promise<void>;
  finding: boolean;
  fonts: FontLFF[];
  language: string;
}

/** Remove all characters except dash, letters, and numbers. */
export function sanitizeLang(lang: string): string {
  return lang.replace(/[^a-zA-Z0-9-]/, '');
}

const ErrorEmptyLanguages = 'Cannot use empty language.';
const LFFApiUrl = 'https://lff.api.languagetechnology.org/lang/';

/** Hook for interacting with https://github.com/silnrsi/langfontfinder. */
export function useLanguageFontFinder(): UseLanguageFontFinder {
  const [error, setError] = useState<string | undefined>();
  const [finding, setFinding] = useState(false);
  const [fonts, setFonts] = useState<FontLFF[]>([]);
  const [language, setLanguage] = useState('');

  const findFonts = useCallback(
    async (lang: string) => {
      setFinding(true);

      lang = sanitizeLang(lang);
      if (!lang && !language) {
        setError(ErrorEmptyLanguages);
        return Promise.reject(ErrorEmptyLanguages);
      }

      // Set the new language or, if empty, fallback to the previous.
      if (lang) {
        setLanguage(lang);
      } else {
        lang = language;
      }

      const url = `${LFFApiUrl}${lang}`;
      await fetchJSON(url)
        .then((obj) => setFonts([obj as FontLFF]))
        .catch(setError);

      setFinding(false);
    },
    [language]
  );
  return { error, findFonts, finding, fonts, language };
}

export default useLanguageFontFinder;
