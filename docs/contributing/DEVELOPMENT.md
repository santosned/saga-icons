# Development

This document describes the process for running this application on your local computer.

## Getting started

Saga Icons is powered by Node.js! ✨ 📦 🚀

It runs on macOS, Windows, and Linux environments.

You'll need Node.js version 18 to run our code base. To install Node.js, [download the "LTS" installer from nodejs.org](https://nodejs.org/en/download/). If you're using [`nodenv`](https://github.com/nodenv/nodenv), read the [`nodenv` docs](https://github.com/nodenv/nodenv#readme) for instructions on switching Node.js versions.

Once you've installed Node.js (which includes the popular `npm` package manager), open Terminal and run the following:

```sh
git clone https://github.com/santosned/saga-icons
cd saga-icons
npm ci
npm run build
```

You should now have access to the `icons/` folder containing our latest icons.

Note that `npm ci` and `npm run build` are steps that should only be executed once every time you pull the latest for a branch.

- `npm ci` does a clean install of dependencies, without updating the `package-lock.json` file
- `npm run build` creates static assets, such as SVG and text files.

## Other Resources

For more info about working with this site, check out:

- [tests/README.md](../tests/README.md)
