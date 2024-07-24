# Developer README

## Install

### `pnpm`

Install [pnpm](https://pnpm.io/installation#using-npm) globally:

```
npm i -g pnpm@8
pnpm i
pnpm setup
```

(Use pnpm v8, because Nx doesn't support v9.)

After setting up `pnpm`, close and reopen VSCode before continuing to the next step.

### Nx

Install [Nx](https://nx.dev/getting-started/installation#installing-nx-globally) globally:

```
pnpm add -g nx@18
```

(Use Nx v18 because there are testing issues with v19.)

(If you choose not to install Nx globally, you will have to prefix `pnpm` to all `nx [...]` commands in this README. For example, `nx test lang-font-picker` becomes `pnpm nx test lang-font-picker`.)

## Developer tasks

Project-specific tasks are generally executed with Nx using

```bash
nx <target> <project> <...options>
```

where `<target>` is one of

- `build`
- `lint`
- `preview`
- `serve`
- `static-serve`
- `storybook`
- `test`

and `<project>` is one of

- `headless-lfp`
- `lang-font-picker`
- `unstyled-lfp`

### Build projects

For a specific `<project>` (e.g., `lang-font-picker`):

```bash
nx build <project>
```

To run on all projects:

```bash
pnpm build
```

The build artifacts are stored in the output directory `dist/`.

### Formatting and Linting

To check formatting on all projects:

```bash
pnpm format:check
```

To fix formatting on all projects:

```bash
pnpm format:write
```

To lint a specific `<project>` (e.g., `lang-font-picker`):

```bash
nx lint <project>
```

To lint all projects:

```bash
pnpm lint
```

### Storybooks

To launch the Storybook GUI for `unstyled-lfp` (the only project with stories):

```bash
nx storybook unstyled-lfp
```

### Run tests

For a specific `<project>` (e.g., `lang-font-picker`):

```bash
nx test <project>
```

To run on all projects:

```bash
pnpm test
```

### Visualize Nx projects

```bash
nx graph
```

To see the targets available for a specific `<project>` (e.g., `lang-font-picker`):

```bash
nx show project <project> --web
```

## Create a new React project

### Library

For a new project with a library (e.g. an internal utility or reusable component) named `<library>`:

```bash
nx g @nx/react:library --bundler=vite --component=false --directory=libs/<library> --unitTestRunner=vitest <library>
```

In the new project's folder, in `package.json`:

- change the `version` line to match the version of the other projects;

and in `project.json`:

- change the `sourceRoot` line to `  "sourceRoot": "{projectRoot}/src",`;
- delete the `// targets` line.

## Add React content to a project

You can use Nx generators to jump-start a new application, component, hook, etc., such as with https://nx.dev/nx-api/react/generators/component. When first executing a `nx generate ...` or `nx g ...` command, use the `--dry-run` flag to see what files will be created or modified.

## Versions and Releases

See https://nx.dev/features/manage-releases for how to use `nx release` to:

- Update version number across all projects;
- Auto-update the CHANGELOG;
- Release the new version of all projects.

## Development workflow

For now, development next-steps and goals can be added to and updated in the [Development To-Do List](DEV_TO_DO.md). After the first release, move dev steps to [issues](https://github.com/sillsdev/lang-font-picker/issues) which can be closed with targeted [pull requests](https://github.com/sillsdev/lang-font-picker/pulls). For broader goals, consider coordinating work with a [GitHub project](https://github.com/sillsdev/lang-font-picker/projects).
