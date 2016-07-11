# cli-tester

Lean promisified wrapper to test NodeJS CLI scripts

Plays nicely with [https://npm.im/blue-tape](blue-tape)

## Installation

```sh
npm install --save-dev cli-tester
```

## Usage

```js
const test = require('blue-tape');
const cliTest = require('cli-tester');


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

Currently is being developed and tested with the latest stable `Node 6` under `OSX` and `Windows`.

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
