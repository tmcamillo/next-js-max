const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
module.exports = (phase) => {
  /**
   * @type {import('next').NextConfig}
   */
  if(phase === PHASE_DEVELOPMENT_SERVER){
    return {
      env: {
        mongodb_username: 'x',
        mongodb_password: 'x',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'events-dev',
      }
    }
  }
  return {
    env: {
      mongodb_username: 'x',
      mongodb_password: 'x',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'events-other',
    }
  }  
}
