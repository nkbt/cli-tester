const test = require('blue-tape');
const tester = require('..');


test('Successful run', t =>
  tester(require.resolve('./cli-ok'))
    .then(({code, stdout, stderr}) => {
      t.equal(code, 0, 'should exit with code 0');
      t.equal(stdout, 'OMG!', 'should trim stdout');
      t.equal(stderr, '', 'should not have any errors');
    }));


test('CLI throws', t =>
  tester(require.resolve('./cli-err'))
    .then(({code, stdout, stderr}) => {
      t.equal(code, 1, 'should exit with code 1');
      t.equal(stdout, '', 'should not have any output');
      t.ok(stderr.match('OMG!'), 'should capture OMG! error');
    }));


test('Passing ENVs', t =>
  tester(require.resolve('./cli-env'), {OMG: 'OMG!'})
    .then(({code, stdout, stderr}) => {
      t.equal(code, 0, 'should exit with code 0');
      t.equal(stdout, 'OMG!', 'should output OMG');
      t.equal(stderr, '', 'should not have any errors');
    }));


test('Passing CLI args', t =>
  tester(require.resolve('./cli-args'), 'hello', 'world')
    .then(({code, stdout, stderr}) => {
      t.equal(code, 0, 'should exit with code 0');
      t.equal(stdout, 'hello world', 'should join args with space');
      t.equal(stderr, '', 'should not have any errors');
    }));


test('Passing ENV and CLI args', t =>
  tester(require.resolve('./cli-env-args'), {OMG: 'OMG!'}, 'hello', 'world')
    .then(({code, stdout, stderr}) => {
      t.equal(code, 0, 'should exit with code 0');
      t.equal(stdout, 'OMG! hello world', 'should join OMG and args with space');
      t.equal(stderr, '', 'should not have any errors');
    }));
