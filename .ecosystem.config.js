module.exports = {
  apps: [
    {
      name: 'compasscar-api',
      script: './src/server.ts',
      interpreter: 'ts-node-dev',
      interpreter_args: '-r tsconfig-paths/register --transpile-only',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
