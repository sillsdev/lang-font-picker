import type { Meta, StoryObj } from "@storybook/react";

import BloomFontPicker from "../BloomFontPicker";
import { FontMetaData } from "../types";

// This default export determines where your story goes in the story list
const meta: Meta<typeof BloomFontPicker> = {
  component: BloomFontPicker,
};

export default meta;

const fontMetadata: FontMetaData[] = [
  {
    determinedSuitability: "ok",
    name: "Font Sans",
    variants: ["bold", "italics"],
    version: "1.0",
  },
  {
    designer: "Fred Flintstone",
    determinedSuitability: "ok",
    name: "Font Serif",
  },
  {
    designerURL: "https://software.sil.org/fonts/",
    determinedSuitability: "unknown",
    name: "Font Sansif",
  },
  {
    copyright: "BC 1",
    determinedSuitability: "ok",
    license: "OFL",
    name: "Noto Font",
  },
  {
    name: "Noto Silly",
    determinedSuitability: "unsuitable",
    determinedSuitabilityNotes: "Not to be used outside a vacuum.",
    version: "3.14159",
  },
  {
    determinedSuitability: "ok",
    license: "OFL",
    licenseURL: "https://openfontlicense.org/documents/OFL-FAQ.txt",
    manufacturer: "SIL International",
    name: "Font SIL",
  },
  {
    determinedSuitability: "invalid",
    license: "OFL",
    manufacturer: "SIL International",
    manufacturerURL: "https://software.sil.org/",
    name: "Font Deprecated",
  },
];

type Story = StoryObj<typeof BloomFontPicker>;

export const WithSuitabilityCheck: Story = {
  args: {
    currentFontName: fontMetadata[0].name,
    fontMetadata,
    languageNumber: 0,
    suitabilityCheck: true,
  },
};

export const WithoutSuitabilityCheck: Story = {
  args: {
    currentFontName: fontMetadata[0].name,
    fontMetadata,
    languageNumber: 0,
    suitabilityCheck: false,
  },
};
