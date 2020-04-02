const { UserRepository, ContactRepository } = require('../../../../controls/repository');
const AuthController = require('../../../../controls/auth');

const { ExistenceError, ValidityError } = require('../../../../lib/errors');
const { UserModel, ContactsModel } = require('../../../../models')

const CONTENT_TYPE = 'application/json';

// TODO read this value from config
const EXPIRATION_PERIOD = 1000 * 60 * 60 * 5; // 5 hours

const register = async (ctx) => {
  const { body } = ctx.request;

  try {
    const user = UserModel.from(body);

    user.password = AuthController.generatePasswordHash(user.password);
    const createdUser = await UserRepository.create(user);
    const contacts = ContactsModel.from({ userId: createdUser.id });
    await ContactRepository.create(contacts);
  } catch (err) {
    if (err instanceof ValidityError) {
      ctx.throw(400, err.message);
    }
    if (err instanceof ExistenceError) {
      ctx.throw(409, 'User already exists');
    }
    ctx.throw(500, err.message);
  }

  ctx.status = 201;
}

const login = async (ctx) => {
  const { body } = ctx.request;
  const { password, login } = body;

  if (!password || !login) {
    ctx.throw(400);
  }

  const user = await UserRepository.findByLogin(login);
  if (!user) {
    ctx.throw(404 , 'Invalid login');
  }

  const passwordIsValid = AuthController.verifyPassword(password, user.password);
  if (!passwordIsValid) {
    ctx.throw(403, 'Invalid password');
  }

  const token = AuthController.generateToken({
    userId: user.id,
    expires: Date.now() + EXPIRATION_PERIOD,
  });

  ctx.status = 200;
  ctx.body = token;
};

const profile = async (ctx) => {
  const { user } = ctx.state;
  if (!user) {
    ctx.throw(401, 'Unauthorized');
  }

  ctx.status = 200;
  ctx.type = CONTENT_TYPE;
  ctx.body = user.serialize(); 
}

module.exports = {
  register,
  login,
  profile,
};
