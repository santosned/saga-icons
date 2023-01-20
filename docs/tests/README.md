## Tests

Running tests locally while developing is not strictly necessary. You can always start a pull request and let the CI service run tests for you, but it's a good idea to run tests locally first before sending your changes to GitHub.

Tests are written using [jest](https://jestjs.io/docs/getting-started), a framework maintained by Facebook and used by many teams at GitHub.

Jest provides everything: a test runner, an assertion library, code coverage analysis, custom reporters for different types of test output, etc.

### Install optional dependencies

We typically rely on CI to run our tests. To run the tests locally, you'll
need to make sure optional dependencies are installed by running:

```sh
npm ci --include=optional
```

### Running all the tests

Once you've followed the development instructions above, you can run the entire
test suite locally:

```sh
npm test
```

### Linting

To validate all your JavaScript code (and auto-format some easily reparable mistakes),
run the linter:

```sh
npm run lint
```

### Formatting

To make sure all our code are formatted properly run the formatter:

```sh
npm run format
```
