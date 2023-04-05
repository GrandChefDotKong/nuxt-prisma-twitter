import { getUserByUsername } from "~~/server/db/user";

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

  return {
    user: user
  }
})