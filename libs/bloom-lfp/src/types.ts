/** Copied from https://github.com/BloomBooks/BloomDesktop/blob/Version6.0/src/BloomBrowserUI/bookEdit/StyleEditor/fontSelectComponent.tsx */
export interface FontMetaData {
  name: string;
  version?: string;
  license?: string;
  licenseURL?: string;
  copyright?: string;
  manufacturer?: string;
  manufacturerURL?: string;
  fsType?: string;
  variants?: string[];
  designer?: string;
  designerURL?: string;
  trademark?: string;
  // These values are also listed in FontMetadata in src/BloomExe/FontProcessing/FontMetadata.cs.
  determinedSuitability: "ok" | "unknown" | "unsuitable" | "invalid";
  determinedSuitabilityNotes?: string;
}

/** Extracted from https://github.com/BloomBooks/BloomDesktop/blob/Version6.0/src/BloomBrowserUI/react_components/l10nHooks.ts */
export type useL10nHookType = (
  english: string,
  // Can be null (not undefined!) if you want us to return the "english" as the translation
  // Why would you even call this? Because useL10n, like all hooks, cannot be called conditionally.
  l10nKey: string | null,
  l10nComment?: string,
  l10nParam0?: string,
  l10nParam1?: string,
  temporarilyDisableI18nWarning?: boolean
) => string;
