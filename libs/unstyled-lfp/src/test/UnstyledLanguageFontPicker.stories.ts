import type { Meta, StoryObj } from "@storybook/react";

import UnstyledLanguageFontPicker from "../UnstyledLanguageFontPicker";

// This default export determines where your story goes in the story list
const meta: Meta<typeof UnstyledLanguageFontPicker> = {
  component: UnstyledLanguageFontPicker,
};

export default meta;

type Story = StoryObj<typeof UnstyledLanguageFontPicker>;

export const ExtraFonts: Story = {
  args: {
    options: {
      extraFonts: [
        { name: "Font Sans" },
        { name: "Font Serif" },
        { name: "Noto Font" },
        { name: "Font SIL" },
      ],
    },
  },
};
