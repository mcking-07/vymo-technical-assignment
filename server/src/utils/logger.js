const log = (level, ...args) => {
  const timestamp = new Date().toISOString();
  const message = args.map(String).join(' ');
  console.log(`[${timestamp}] [${level.toLowerCase()}] ${message}`);
};

const logger = {
  info(...args) {
    log('info', ...args);
  },
  error(...args) {
    log('error', ...args);
  },
};

module.exports = { logger };
