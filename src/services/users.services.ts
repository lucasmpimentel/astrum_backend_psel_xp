import tokenUtils from '../utils/token.utils';
import CustomError from '../utils/CustomError';

const login = async (email: string, password: string) => {
  const getUser = await CHAMAR_MODEL(email);

  if (!getUser) throw new CustomError(401, 'email or password invalid');

  if (getUser.email === email && getUser.password === password) {
    const token = tokenUtils.create(
      getUser.id,
      getUser.name,
      getUser.email,
      getUser.image,
      getUser.isActive,
    );
    return token;
  }

  throw new CustomError(401, 'email or password invalid');
};

export default {
  login,
};
