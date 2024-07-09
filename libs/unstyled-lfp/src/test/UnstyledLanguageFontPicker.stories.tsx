import type { Meta, StoryObj } from "@storybook/react";

import "./stories.css";

import UnstyledLanguageFontPicker from "../UnstyledLanguageFontPicker";

// This default export determines where your story goes in the story list
const meta: Meta<typeof UnstyledLanguageFontPicker> = {
  component: UnstyledLanguageFontPicker,
};

export default meta;

const extraFonts = [
  { name: "Font Sans" },
  { name: "Font Serif" },
  { name: "Noto Font" },
  { name: "Font SIL" },
];

type Story = StoryObj<typeof UnstyledLanguageFontPicker>;

export const MultiselectOff: Story = {
  args: {
    options: { allowMultiselect: false, extraFonts },
  },
};

export const MultiselectOn: Story = {
  args: {
    options: { allowMultiselect: true, extraFonts },
  },
};

export const FontDividerDefault: Story = {
  args: {
    fontDivider: true,
    options: { extraFonts },
  },
};

export const FontDividerCustom: Story = {
  args: {
    fontDivider: (
      <div style={{ backgroundColor: "green", height: "5px", width: "100%" }} />
    ),
    options: { extraFonts },
  },
};
