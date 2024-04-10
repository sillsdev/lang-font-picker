# Developer README

## Install

### `pnpm`

```
npm i -g pnpm
pnpm i
pnpm setup
```

After setting up `pnpm`, close and reopen VSCode before continuing to the next step.

### Nx

Install Nx globally:

```
pnpm add -g nx
```

If you choose not to install Nx globally, you will have to prefix `pnpm` to all `nx [...]` commands in this README. For example, `nx test lang-font-picker` becomes `pnpm nx test lang-font-picker`.

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
- `test`

and `<project>` is one of

- `lang-font-picker`
- _more coming soon_

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

## ToDo: Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)
