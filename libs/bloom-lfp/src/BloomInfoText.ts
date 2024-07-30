/** Extracted from https://github.com/BloomBooks/BloomDesktop/blob/Version6.0/src/BloomBrowserUI/react_components/fontInformationPane.tsx */

interface FontInfoText {
  okayFontMessage: string[];
  unknownFontMessage: string[];
  unsuitableFontFormatMessage: string[];
  unsuitableFontLicenseMessage: string[];
  styleWording: string[];
  versionWording: string[];
  licenseWording: string[];
}
const fontInfoText: FontInfoText = {
  okayFontMessage: [
    "The metadata inside this font indicates that it is legal to use for all Bloom purposes.",
    "FontInformationPane.FontOkay",
    "This shows in the popup when hovering over a useable font.",
  ],
  unknownFontMessage: [
    "Bloom cannot determine what rules govern the use of this font. Please read the license and make sure it allows embedding in ebooks and the web. Before publishing to bloomlibrary.org, you will probably have to make a special request to the Bloom team to investigate this font so that we can make sure we won't get in trouble for hosting it.",
    "FontInformationPane.FontUnknown",
    "This shows in the popup when hovering over a font when Bloom can't determine if it is useable legally.",
  ],
  unsuitableFontFormatMessage: [
    "This font is in a file format that Bloom cannot use for ebooks. Please use a different font.",
    "FontInformationPane.FontFormatUnsuitable",
    "This shows in the popup when hovering over a font that Bloom can't use in ebooks due to its file format.",
  ],
  unsuitableFontLicenseMessage: [
    "The metadata inside this font tells us that it may not be embedded for free in ebooks and the web. Please use a different font.",
    "FontInformationPane.FontUnsuitable",
    "This shows in the popup when hovering over a font that Bloom can't legally host on its website.",
  ],
  styleWording: [
    "Styles",
    "FontInformationPane.Styles",
    "This shows in the popup before the types of variants in the font (e.g. bold, italic).",
  ],
  versionWording: [
    "Version",
    "FontInformationPane.Version",
    "This shows in the popup before the font's version number.",
  ],
  licenseWording: ["License", "Common.License"],
};

export default fontInfoText;
