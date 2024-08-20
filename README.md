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

(Use Nx v18 because tests hang with v19, which may be fixed >19.6.1).

(If you choose not to install Nx globally, you will have to prefix `pnpm` to all `nx [...]` commands in this README. For example, `nx test lang-font-picker` becomes `pnpm nx test lang-font-picker`.)

## Developer tasks

Project-specific tasks are generally executed with Nx using

```console
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

- `bloom-lfp`
- `headless-lfp`
- `lang-font-picker`
- `unstyled-lfp`

### Build and preview projects

For a specific `<project>` (e.g., `lang-font-picker`):

```console
nx build <project>
```

To run on all projects:

```console
pnpm build
```

The build artifacts are stored in the output directory `dist/`.

For a production preview of `lang-font-picker` (our only React app project):

```console
nx build lang-font-picker
nx preview lang-font-picker
```

Then open the link given in your console (http://localhost:4300/) to interact with the app in web browser.
If you make any changes to the code, you must run the `build` and `preview` commands again to see the changes.

Calls to the LFF api will not work, because the browser blocks calls to the LFF api from `http://localhost`.
This is only an issue in "production" mode;
we've added proxies to bypass this issue in "development" (with `nx serve ...` and `nx storybook ...`).

### Serve app projects

To serve an app project <project> (i.e., `lang-font-picker` or `lfp-api`):

```console
nx serve <project>
```

Then open the link given in your console (http://localhost:4200 or http://localhost:5222) to interact with the app in web browser.

The app will automatically update as you make changes to the code.

### Formatting and linting

To check formatting on all projects:

```console
pnpm format:check
```

To fix formatting on all projects:

```console
pnpm format:write
```

To lint a specific `<project>` (e.g., `lang-font-picker`):

```console
nx lint <project>
```

To lint all projects:

```console
pnpm lint
```

### Storybooks

To launch the Storybook GUI for <project> with stories (i.e., `bloom-lfp` or `unstyled-lfp`):

```console
nx storybook <project>
```

### Run tests

For a specific `<project>` (e.g., `lang-font-picker`):

```console
nx test <project>
```

To run on all projects:

```console
pnpm test
```

### Visualize Nx projects

```console
nx graph
```

To see the targets available for a specific `<project>` (e.g., `lang-font-picker`):

```console
nx show project <project> --web
```

## Create a new React project

### Library

For a new project with a library (e.g. an internal utility or reusable component) named `<library>`:

```console
nx g @nx/react:library --bundler=vite --component=false --directory=libs/<library> --unitTestRunner=vitest <library>
```

In the new project's folder, in `package.json`:

- change the `version` line to match the version of the other projects;

and in `project.json`:

- change the `sourceRoot` line to `  "sourceRoot": "{projectRoot}/src",`;
- delete the `// targets` line.

## Environment variables

Vite provides the following environment variables, accessed via `import.meta.env.*`:

|             | `nx preview`   | `nx serve`      | `nx storybook`  | `nx test` |
| ----------- | -------------- | --------------- | --------------- | --------- |
| `DEV`       | `false`        | `true`          | `true`          | `true`    |
| `MODE`      | `"production"` | `"development"` | `"development"` | `"test"`  |
| `PROD`      | `true`         | `false`         | `false`         | `false`   |
| `STORYBOOK` | n/a            | n/a             | `"true"`        | n/a       |
| `TEST`      | n/a            | n/a             | n/a             | `"true"`  |

See https://vitejs.dev/guide/env-and-mode.html for more details,
including setting and using environment variables with `.env*` files.

## Add React content to a project

You can use Nx generators to jump-start a new application, component, hook, etc., such as with https://nx.dev/nx-api/react/generators/component. When first executing a `nx generate ...` or `nx g ...` command, use the `--dry-run` flag to see what files will be created or modified.

## Versions and Releases

See https://nx.dev/features/manage-releases for how to use `nx release` to:

- Update version number across all projects;
- Auto-update the CHANGELOG;
- Release the new version of all projects.

## Development workflow

For now, development next-steps and goals can be added to and updated in the [Development To-Do List](DEV_TO_DO.md). After the first release, move dev steps to [issues](https://github.com/sillsdev/lang-font-picker/issues) which can be closed with targeted [pull requests](https://github.com/sillsdev/lang-font-picker/pulls). For broader goals, consider coordinating work with a [GitHub project](https://github.com/sillsdev/lang-font-picker/projects).
