const AuthController = require('../../../controls/auth');

const authRoutes = [
  ['POST', '/api/users/login'],
  ['POST', '/api/users/register'],
];

const userAuth = async (ctx, next) => {
  const { method, path, headers } = ctx.request;
  const { authorization } = headers;
  const authRoute = authRoutes.some((route) => {
    return route[0] === method && route[1] === path;
  });

  if (authRoute) {
    return next();
  }

  if (!authorization) {
    ctx.throw(401, 'Unauthorized');
  }

  const [, token] = authorization.split(' ');
  const {
    userId,
    expires,
  } = AuthController.verifyToken(token);

  if (!userId || !expires) {
    ctx.throw(403, 'Invalid token');
  }

  if (expires < Date.now()) {
    ctx.throw(403, 'Token expired');
  }

  ctx.state.user = {
    id: userId,
  };

  await next();
};

module.exports = userAuth;