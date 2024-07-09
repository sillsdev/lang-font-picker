# Unstyled Language Font Picker (unstyled-lfp)

The is a basic, fully-functional, out-of-the-box font picker.
It is built on the Headless Language Font Picker (headless-lfp) component hook `useLanguageFontPicker`.

## `UnstyledLanguageFontPicker`

```js
<UnstyledLanguageFontPicker {...props} />
```

### `props: UnstyledLanguageFontPickerProps`

The `UnstyledLanguageFontPickerProps` type is

```ts
export interface UnstyledLanguageFontPickerProps extends ExternalFontListProps {
  cancel?: () => void;
  confirm?: () => void;
  footer?: ReactElement;
  headerActions?: ReactElement;
  headerText?: ReactElement | string;
  language?: string;
  languageInfo?: ReactElement | string;
  options?: LFPOptions;
}
```

- `cancel` and `confirm` (optional functions)

Functions that will be executed when the picker is closed via cancel/confirm buttons.

_To be continued..._

## Storybook

This component uses Storybook for developers to test/demo all of the components props.

To interact with all the stories in the Storybook GUI:

```bash
nx storybook unstyled-lfp
```

To add or edit existing stories, modify `libs/unstyled-lfp/src/test/UnstyledLanguageFontPicker.stories.ts`.
