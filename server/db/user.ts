import { prisma } from '.';
import bcrypt from 'bcrypt';
import { User, UserData } from '~~/types/user';

export const createUser = (userData: UserData) => {
  const finalUserData = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10) as string
  }
  return prisma.user.create({
    data: finalUserData
  });

};

export const getUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username
    }
  });
};