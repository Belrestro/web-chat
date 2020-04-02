const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const { message, code } = err;

    ctx.status = code || 500;
    ctx.body = message || 'Internal server error';
  }
};

const requestLogger = async (ctx, next) => {
  const { method, path } = ctx.request;
  console.log(method, path)
  await next();
};

const useState = async (ctx, next) => {
  if (!ctx.state) ctx.state = {};
  await next();
};

module.exports = {
  errorHandler,
  requestLogger,
  useState,
};
