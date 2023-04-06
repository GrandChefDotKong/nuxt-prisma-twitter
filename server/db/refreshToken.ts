import { prisma } from "."

export const createRefreshToken = (refreshToken: any) => {
  return prisma.refreshToken.create({
    data: refreshToken
  });
}


