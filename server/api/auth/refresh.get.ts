import { getRefreshTokenByToken } from "~~/server/db/refreshToken";
import { getUserById } from "~~/server/db/user";
import { decodeRefreshToken, generateTokens } from "~~/server/utils/jwt";
import { User } from "~~/types/user";

export default defineEventHandler(async(event) => {
  const cookie = getCookie(event, "refresh_token");
  if(!cookie) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    }));
  }
  
  const refreshToken = await getRefreshTokenByToken(cookie);
  
  if(!refreshToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    }));
  }

  const decodedRefreshToken = decodeRefreshToken(refreshToken.token);
  
  if(!decodedRefreshToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    }));
  } 

  try {
    const user = await getUserById(decodedRefreshToken.userId);
    if(!user) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      }));
    }

    const { accessToken } = generateTokens(user);

    return { access_token: accessToken };

  } catch (error) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Something went wrong ...'
    }));
  }
});
