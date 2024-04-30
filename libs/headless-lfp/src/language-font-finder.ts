import { useCallback, useState } from "react";

import { FontLFF } from "./types";
import { fetchJSON } from "./utils";

export interface UseLanguageFontFinder {
  error?: string;
  findFonts: (language: string) => Promise<FontLFF[]>;
  finding: boolean;
  fonts: FontLFF[];
  language: string;
}

export interface LFFOptions {
  disableLanguageFontFinder?: boolean;
  customFindFontsFunction?: (language: string) => Promise<FontLFF[]>;
}

/** Remove all characters except dash, letters, and numbers. */
export function sanitizeLang(language: string): string {
  return language.replace(/[^a-zA-Z0-9-]/, "");
}

const ErrorEmptyLanguages = "Cannot use empty language.";
const LFFApiUrl = "https://lff.api.languagetechnology.org/lang/";

/** Hook for interacting with https://github.com/silnrsi/langfontfinder. */
export function useLanguageFontFinder(
  options: LFFOptions = {}
): UseLanguageFontFinder {
  const [error, setError] = useState<string | undefined>();
  const [finding, setFinding] = useState(false);
  const [fonts, setFonts] = useState<FontLFF[]>([]);
  const [language, setLanguage] = useState("");

  const findFonts = useCallback(
    async (lang: string): Promise<FontLFF[]> => {
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

      let newError = "";
      const newFonts: FontLFF[] = [];

      if (!options.disableLanguageFontFinder) {
        const url = `${LFFApiUrl}${lang}`;
        await fetchJSON(url)
          .then((obj) => newFonts.push(obj as FontLFF))
          .catch((err) => (newError = `${err}`));
      }

      if (options.customFindFontsFunction) {
        await options
          .customFindFontsFunction(lang)
          .then((fonts) => newFonts.push(...fonts))
          .catch((err) => (newError += `${newError ? "\n" : ""}${err}`));
      }
      setError(newError);
      setFonts(newFonts);
      setFinding(false);
      return newFonts;
    },
    [language, options]
  );

  return { error, findFonts, finding, fonts, language };
}

export default useLanguageFontFinder;
