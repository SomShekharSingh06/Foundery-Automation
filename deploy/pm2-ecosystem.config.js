module.exports = {
  apps: [
    {
      name: 'mcp-launcher',
      script: './mcp-server.js',
      args: '',
      cwd: '/home/driftking/Desktop/Foundery_Automation',
      exec_mode: 'fork',
      restart_delay: 3000,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
