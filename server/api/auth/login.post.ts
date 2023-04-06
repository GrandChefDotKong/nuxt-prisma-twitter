import { getUserByUsername } from "~~/server/db/user";
import bcrypt from 'bcrypt';
import { generateTokens, sendRefreshToken } from "~~/server/utils/jwt";
import { userTransformer } from "~~/server/transformers/user";
import { createRefreshToken } from "~~/server/db/refreshToken";

export default defineEventHandler(async(event) => {
  const body = await readBody(event);
  const { username, password } = body;

  if(!username ||! password) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid params'
    }));
  }

  const user = await getUserByUsername(username);

  if(!user) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'username or password invalid'
    }));
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if(!passwordMatch) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'username or password invalid'
    }));
  }

  const { accessToken, refreshToken } = generateTokens(user);

  await createRefreshToken({
    token: refreshToken,
    userId: user.id
  });

  sendRefreshToken(event, refreshToken);

  return {
    access_token: accessToken, user: userTransformer(user)
  }
});

