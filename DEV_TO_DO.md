# Development To-Do List

## Monorepo

- Get `nx format:check` and `nx format:write` to work like `prettier -c .` and `prettier -w .`
  - Remove the custom scripts in `package.json`
- Set up test-coverage
- Implement CI with NxCloud
  - [Set up remote caching](https://nx.dev/features/share-your-cache)
  - [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
  - [Learn more how to setup CI](https://nx.dev/recipes/ci)
- Delete this file and establish [kanban](https://github.com/sillsdev/lang-font-picker/projects)/[issue](https://github.com/sillsdev/lang-font-picker/issues) procedure

## Node/React

- Make sure all functions are preceded with a `/** Comment */`
- Plan a first release
  - https://docs.npmjs.com/creating-and-publishing-scoped-public-packages
- Add localization
- Investigate a Node.JS backend for Electron apps (to parallel the .NET backend)

### Apps

#### `lang-font-picker`

- Replace the stand-in app with a demo of `unstyled-lfp`
- Add README

### Libs

- Create a `material-lfp` using MUI/MaterialUI
  - This is either parallel to or (preferably) on-top-of `unstyled-lfp`
- Implement complete component testing ([with Storybook?](https://storybook.js.org/docs/writing-tests))

#### `headless-lfp`

- Fill in README
- Add state for selected font
- Implement font fetching
  - https://github.com/silnrsi/fonts/blob/main/documentation/webfonts.md
- Investigate font caching
  - Does this relate to Progressive Web App (PWA) implementation?

#### `unstyled-lfp`

- Fill in README
- Import `@lfp/headless-lfp` as the logical guts of the component
- Split out Language as own component file to avoid one unwieldy index file
- Create template/method/props to style (css?) the component parts by their `lfpClassNames`
- Add unit tests
- Implement props allowing replacement of generic components (`div`, `p`, `table`, etc.) with custom components
  - This allows an alternative to styling with css
  - `material-lfp` can then simply sub in mui components without having to maintain parallel changes

##### Header sub-component

##### Language sub-component

- Add LanguageActions with a submit button as the default

##### Fonts sub-components

##### Footer sub-component

## .NET

- Migrate backend component from https://github.com/BloomBooks/BloomDesktop/tree/master/src/BloomExe/FontProcessing
- Implement with https://www.nx-dotnet.com/

## Reference links

- Nx docs: https://nx.dev/getting-started/intro
- pnpm workspace: https://pnpm.io/workspaces
- Monorepo example: https://github.com/BiblioNexus-Foundation/scripture-editors
- Language Font Finder API: https://github.com/silnrsi/langfontfinder?tab=readme-ov-file#language-font-finder-service
- Example of Node.js/Electron app using .NET: https://github.com/paranext/paranext-core
