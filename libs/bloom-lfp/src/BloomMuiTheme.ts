import { createTheme, Theme } from "@mui/material/styles";

// From https://github.com/BloomBooks/BloomDesktop/blob/Version6.0/src/BloomBrowserUI/utils/colorUtils.ts

export const kBloomBlue = "#1d94a4";
const kBloomBlueTextBackground = "#19818f"; // darker for better contrast
export const kBloomGold = "#f3aa18";
const kBloomPurple = "#96668f";
const kDialogTopBottomGray = "#F1F3F4";
export const kDisabledControlGray = "#bbb";
const kBloomDisabledOpacity = 0.38;
const kBloomDisabledText = `rgba(0, 0, 0, ${kBloomDisabledOpacity})`;
export const kErrorColor = "red";
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
    warning: { main: kBloomGold },
    text: { disabled: kBloomDisabledText },
    action: {
      disabled: kBloomDisabledText,
      disabledOpacity: kBloomDisabledOpacity,
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: kUiFontStack,
    h6: { fontSize: "1rem" },
  },
  components: {
    MuiLink: {
      variants: [
        {
          props: { variant: "body1" },
          style: {
            variantMapping: { h6: "h1" },
          },
        },
      ],
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: kBloomBlueTextBackground,
          fontSize: "12px",
          fontWeight: "normal",
          padding: "10px",
          a: {
            color: "white",
            textDecorationColor: "white",
          },
        },
        arrow: { color: kBloomBlueTextBackground },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: kDialogTopBottomGray,
          "& h6": { fontWeight: "bold" },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: { backgroundColor: kDialogTopBottomGray },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          // for some reason,  in Material-UI 4.0 without this, we instead get unchecked boxes having the color of secondary text!!!!
          color: kBloomBlue,
          // In Material-UI 4.0, these just FLAT OUT DON'T WORK, despite the documentation, which I read to say that, if we didn't
          // specify a `color` above, would then let us specify the color you get for primary and secondary. See https://github.com/mui-org/material-ui/issues/13895
          colorPrimary: "green", //kBloomBlue,
          colorSecondary: "pink", //kBloomPurple
        },
      },
    },
  },
});
