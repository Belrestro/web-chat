module.exports = async (ctx, next) => {
  if (ctx.request.method === 'OPTIONS') {
    ctx.status = 200;
  }
  await next();
};