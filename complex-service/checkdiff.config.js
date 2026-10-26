
module.exports = {
  api: { port: 4000, baseUrl: 'http://localhost:4000', swaggerPath: '/api-docs', healthPath: '/health' },
  website: { port: 3001 },
  infraPatterns: ['src/index.js','src/app.js','src/middleware/rateLimiter.js','src/config/*'],
  configPatterns: ['.env','*.config.js']
};
