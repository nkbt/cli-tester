const fork = require('child_process').fork;


const payload = ({code, stdout, stderr}) => ({
  code,
  stdout: stdout.join('').trim(),
  stderr: stderr.join('').trim(),
});


module.exports = (bin, env, ...args) =>
  new Promise(resolve => {
    const stderr = [];
    const stdout = [];


    const cp = fork(
      bin,
      typeof(env) === 'string' ? [env].concat(args) : args,
      {
        cwd: process.cwd(),
        env: typeof(env) === 'string' ? {} : env,
        silent: true,
      }
    );

    cp.stdout.on('data', chunk => stdout.push(chunk.toString()));
    cp.stderr.on('data', chunk => stderr.push(chunk.toString()));

    cp.on('close', code => resolve(payload({code, stdout, stderr})));
  });
