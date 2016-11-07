# cli-tester [![npm](https://img.shields.io/npm/v/cli-tester.svg?style=flat-square)](https://www.npmjs.com/package/cli-tester)
            
[![Discord](https://img.shields.io/badge/chat-discord-blue.svg?style=flat-square)](https://discord.gg/013tGW1IMcW6Vd1o7)

[![CircleCI](https://img.shields.io/circleci/project/nkbt/cli-tester.svg?style=flat-square&label=nix-build)](https://circleci.com/gh/nkbt/cli-tester)
[![AppVeyor](https://img.shields.io/appveyor/ci/nkbt/cli-tester.svg?style=flat-square&label=win-build)](https://ci.appveyor.com/project/nkbt/cli-tester)
[![Travis](https://img.shields.io/travis/nkbt/cli-tester.svg?style=flat-square&label=matrix-build)](https://travis-ci.org/nkbt/cli-tester)
[![Coverage](https://img.shields.io/coveralls/nkbt/cli-tester.svg?style=flat-square)](https://codecov.io/github/nkbt/cli-tester?branch=master)
[![Dependencies](https://img.shields.io/david/nkbt/cli-tester.svg?style=flat-square)](https://david-dm.org/nkbt/cli-tester)
[![Dev Dependencies](https://img.shields.io/david/dev/nkbt/cli-tester.svg?style=flat-square)](https://david-dm.org/nkbt/cli-tester#info=devDependencies)


Lean promisified wrapper to test NodeJS CLI scripts

Plays nicely with [blue-tape](https://npm.im/blue-tape)

## Installation

```sh
npm install --save-dev cli-tester
```

## Usage

```js
const test = require('blue-tape');
const tester = require('cli-tester');


test('Successful run', t =>
  tester(require.resolve('./cli-that-is-ok'))
    .then(({code, stdout, stderr}) => {
      t.equal(code, 0, 'should exit with code 0');
      t.equal(stdout, 'check expected output');
      t.equal(stderr, '', 'should not have any errors');
    }));


test('CLI throws', t =>
  tester(require.resolve('./cli-that-throws'))
    .then(({code, stdout, stderr}) => {
      t.equal(code, 1, 'should exit with code 1');
      t.equal(stdout, '', 'should not have any output');
      t.ok(stderr.match('some error from CLI'));
    }));

```

## Node 5 and older

```js
const tester = require('cli-tester/es5');
```

## API

```js
tester(cli, env, ...args)
```

Returns ES6 Promise, that is always successful

### cli - string

Resolved path to JS CLI, ideally absolute path

```js
tester(require.resolve('./cli'))
```

### env (optional) - object

Object with ENV vars

```js
tester(require.resolve('./cli'), {OMG: 'OMG!'})
```

### ...args (optional) - string

List of command line arguments

```js
// With omitted ENV
tester(require.resolve('./cli'), '--hello', 'world')

// With ENV
tester(require.resolve('./cli'), {OMG: 'OMG!'},'--hello', 'world')
```


## Development and testing

Currently is being developed and tested with the latest stable `Node 7` under `OSX` and `Windows`.

```bash
git clone git@github.com:nkbt/cli-tester.git
cd cli-tester
npm install
```

## Tests

```bash
# to run tests
npm test

# to generate test coverage (./coverage)
npm run cov
```

## License

MIT
