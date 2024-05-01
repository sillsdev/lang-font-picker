# Headless Language Font Picker (headless-lfp)

This headless React component handles the internal state and logic for a font picker.
It is a UI-agnostic hook that can be called within another component that handles the UI.
The basic, fully-functional, out-of-the-box font picker will be the Unstyled Language Font Picker (unstyled-lfp).
However, this hook can be used with your own custom UI.

## `useLanguageFontPicker`

```js
const { fetchFonts, fonts, toggleSelectFont } = useLanguageFontPicker(options);
```

### `fetchFonts: (language: string) => Promise<void>`

Call this async function to have the Language Font Picker fetch fonts for the specified `language` from an external API (default: https://github.com/silnrsi/langfontfinder?tab=readme-ov-file#language-font-finder-service).

### `fonts: FontLFP[]`

The `fonts` state variable holds an array of font options, both those given in `options` (below) and those fetched by `fetchFonts`.

The `FontLFP` type is

```ts
interface FontLFP {
  name: string;
  selected?: boolean;
}
```

### `toggleSelectFont: (font: string) => boolean | undefined;`

The `.selected` value of the given font in the `fonts` array will be negated and the resulting value returned.
Returns `undefined` if `fonts` does not have a font with `.name` matching the given font string.
Regardless of the result, if `options.multiselect` is false,
then all fonts not matching the given font string will have `.selected` set to `false`.

### `options: LFPOptions`

The `LFPOptions` type is

```ts
interface LFPOptions {
  customFindFontsFunction?: (lang: string) => Promise<FontLFF[]>;
  disableLanguageFontFinder?: boolean;
  extraFonts?: FontLFP[];
  maxFontCount?: number;
  multiselect?: boolean;
}
```

- `customFindFontsFunction` (optional function)

  - allows the user to specify an alternate external font source
  - must return fonts in type `FontLFF` (the format returned by the default external API)

- `disableLanguageFontFinder` (optional boolean)

  - disables the default font finder API call
  - does not disable use of `customFindFontsFunction`

- `extraFonts` (optional array)

  - fonts to include regardless of the language or of the results of the font-finding functions
  - by default, appear at the end of the internal `fonts` array

- `maxFontCount` (optional positive integer)

  - only show the first `maxFontCount` fonts in the internal `fonts` array

- `multiselect` (optional boolean)

  - if false, only one font can be selected at a time
  - set to true to allow selection of multiple fonts
