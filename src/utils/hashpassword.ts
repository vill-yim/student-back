import { hash,genSalt } from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await genSalt();
  const passwordHashed = await hash(password, salt);
  return passwordHashed;
};
