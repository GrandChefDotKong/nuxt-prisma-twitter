import { sendError } from 'h3';
import { createUser } from '../../db/user.js';
import { UserData } from '~~/types/user.js';
import { userTransformer } from '../../transformers/user.js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, email, password, repeatPassword, name } = body;
  if(!username || !email || !password || !repeatPassword || !name) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid params'
    }));
  }

  if(password !== repeatPassword) {
    return sendError(event, createError({
      statusCode: 400, statusMessage: 'Passwords does not match'
    }));
  }

  const userData: UserData = {
    username,
    email,
    password,
    name,
    profileImage: 'https:/picsum.photos/200/200'
  };

  const user = await createUser(userData);

  return {
    body: userTransformer(user)
  }
});