import UrlPattern from 'url-pattern';
import { decodeAccessToken } from '../utils/jwt';
import { getUserById } from '../db/user';

export default defineEventHandler(async(event) => {
  const endpoints = [
    'api/auth/user', 
    'api/user/tweets', 
    'api/tweets', 
    'api/tweets/:id'
  ];

  const isHandledByThisMiddleware = endpoints.some(endpoint => {
    const pattern = new UrlPattern(endpoint);

    return pattern.match(event.node.req.url || "error");
  });

  if(!isHandledByThisMiddleware) return;

  const token = 
    event.node.req.headers['authorization']?.split(' ')[1];

  if(!token) return;

  const decoded = decodeAccessToken(token);

  if(!decoded) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    }));
  }

  try {
    const userId = decoded.userId;
    const user = await getUserById(userId);
    event.context.auth = { user }
  } catch (error) {
    return;
  }
  
})