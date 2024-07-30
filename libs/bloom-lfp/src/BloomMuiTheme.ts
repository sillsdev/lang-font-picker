import { red } from "@mui/material/colors";
import { createTheme, Theme } from "@mui/material/styles";

// Extracted from https://github.com/BloomBooks/BloomDesktop/blob/Version6.0/src/BloomBrowserUI/bloomMaterialUITheme.ts
// and https://github.com/BloomBooks/BloomDesktop/blob/Version6.0/src/BloomBrowserUI/utils/colorUtils.ts

export const kBloomBlue = "#1d94a4";
export const kBloomGold = "#f3aa18";
const kBloomPurple = "#96668f";
export const kDisabledControlGray = "#bbb";
const kDisabledOpacity = 0.38;
const kDisabledText = `rgba(0, 0, 0, ${kDisabledOpacity})`;
export const kErrorColor = red[500];
const kUiFontStack = "Roboto, NotoSans, sans-serif";

declare module "@mui/material/styles" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

// lots of examples: https://github.com/search?q=createMuiTheme&type=Code
export const lightTheme = createTheme({
  palette: {
    primary: { main: kBloomBlue },
    secondary: { main: kBloomPurple },
    error: { main: kErrorColor },
    warning: { main: kBloomGold },
    text: {
      disabled: kDisabledText,
    },
    action: {
      disabled: kDisabledText,
      disabledOpacity: kDisabledOpacity,
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: kUiFontStack,
    subtitle2: { fontWeight: 800 },
  },
});
