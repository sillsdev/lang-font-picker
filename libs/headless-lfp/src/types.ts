/** Font metadata as used inside the Language Font Picker (LFP). */
export interface FontLFP {
  name: string;
}

/** Default conversion of LFF font metadata to LFP font metadata. */
export function convertToFontLFP(font: FontLFF): FontLFP {
  const { defaultfamily, families } = font;
  if (!defaultfamily.length) {
    return { name: '' };
  }

  const id = defaultfamily[0];
  if (!(id in families)) {
    return { name: id };
  }

  return { name: families[id].family };
}

/** Font metadata as received from the Language Font Finder (LFF).
 * Must match https://github.com/silnrsi/langfontfinder/blob/main/docs/results.md */
// ToDo: Write script to auto-generate LFF types if schema becomes available:
// https://github.com/silnrsi/langfontfinder/issues/12
export interface FontLFF {
  apiversion: string;
  defaultfamily: string[];
  families: { [familyid: string]: FontFamilyLFF };
  roles?: { [role: string]: FontRoleLFF };
}

/** https://github.com/silnrsi/langfontfinder/blob/main/docs/results.md#font-family-records */
export interface FontFamilyLFF {
  altfamily?: string;
  defaults?: FontFamilyDefaultsLFF;
  distributable: boolean;
  fallback?: string;
  family: string;
  familyid: string;
  features?: string;
  files?: FontFamilyFilesLFF;
  googlefonts?: FontFamilyGoogleFontsLFF;
  license?: string;
  packageurl?: string;
  siteurl?: string;
  source?: string;
  status?: FontFamilyStatusLFF;
  version?: string;
  ziproot?: string;
}

/** https://github.com/silnrsi/langfontfinder/blob/main/docs/results.md#default-subobjects */
export interface FontFamilyDefaultsLFF {
  tff?: string;
  woff?: string;
  woff2?: string;
}

/** https://github.com/silnrsi/langfontfinder/blob/main/docs/results.md#files-subobjects */
export interface FontFamilyFilesLFF {
  altfamily?: string;
  axes?: FontFamilyFilesAxesLFF;
  flourl?: string;
  packagepath?: string;
  url?: string;
  zippath?: string;
}

/** https://github.com/silnrsi/langfontfinder/blob/main/docs/results.md#axes-subobjects */
export interface FontFamilyFilesAxesLFF {
  ital?: 0 | 1;
  wght?: number;
}

/** https://github.com/silnrsi/langfontfinder/blob/main/docs/results.md#googlefonts-subobjects  */
export type FontFamilyGoogleFontsLFF = object;

export type FontFamilyStatusLFF = 'current' | 'archived' | 'deprecated';

export type FontRoleLFF = { [role: string]: string[] };
