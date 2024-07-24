import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: { viteConfigPath: "vite.config.ts" },
    },
  },
  // Config vite server per https://storybook.js.org/docs/builders/vite#configuration
  async viteFinal(config) {
    return mergeConfig(config, {
      server: {
        // Avoid CORS blockage in development with `nx storybook unstyled-lfp`.
        proxy: {
          "/lang": {
            changeOrigin: true,
            target: "https://lff.api.languagetechnology.org",
          },
        },
      },
    });
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
