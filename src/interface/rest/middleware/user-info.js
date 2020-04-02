const { UserRepository } = require('../../../controls/repository');

const userInfo = async (ctx, next) => {
  const { user } = ctx.state; 
  if (user && user.id) {
    const userModel = await UserRepository.getById(user.id);

    ctx.state.user = userModel;
  }

  await next();
};

module.exports = userInfo;
