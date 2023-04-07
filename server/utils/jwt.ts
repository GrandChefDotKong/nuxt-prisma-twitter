import jwt from 'jsonwebtoken';
import { User } from '~~/types/user';
import { userTransformer } from '../transformers/user';
import { RefreshToken } from '@prisma/client';

const generateAccessToken = (user: User) => {
  const config = useRuntimeConfig();
  return jwt.sign(
    { userId: user.id }, 
    config.jwtAccessSecret, 
    { expiresIn: '10m' }
  );
}

const generateRefreshToken = (user: User) => {
  const config = useRuntimeConfig();
  return jwt.sign(
    { userId: user.id }, 
    config.jwtRefreshSecret, 
    { expiresIn: '4h' }
  );
}

export const generateTokens = (user: User) => {
  
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  
  return {
    accessToken, refreshToken
  }
}

export const sendRefreshToken = (event: any, token: string) => {
  setCookie(event, 'refresh_token', token, {
    httpOnly: true,
    sameSite: true
  });
}

export const decodeRefreshToken = (token: string) => {
  const config = useRuntimeConfig();

  try {
    return jwt.verify(token, config.jwtRefreshSecret)
  } catch (error) {
    return null;
  }
}