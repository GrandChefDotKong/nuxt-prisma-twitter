import formidable from 'formidable';
import { createTweet } from '~~/server/db/tweets';
import { TweetData } from '~~/types/tweet';

export default defineEventHandler(async(event) => {

  const form = formidable({});
  const response = new Promise((resolve, reject) => {
    form.params(event.node.req, (error, fields, files) => {
      if(error) {
        reject(error);
      }

      resolve({ fields, files });
    });
  })
  
  const { fields, files } = response;

  const userId = event.context?.auth?.user?.id;

  const tweetData = {
    text: fields.text,
    authorId: userId
  } as TweetData;

  const tweet = await createTweet(tweetData);

  return {
    hello: 'world'
  }
})