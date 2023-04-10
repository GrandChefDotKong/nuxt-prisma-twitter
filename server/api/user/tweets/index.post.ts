import formidable from 'formidable';
import { createMediaFile } from '~~/server/db/mediaFiles';
import { createTweet } from '~~/server/db/tweets';
import { uploadToCloudinary } from '~~/server/utils/cloudinary';
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
  
  const replyTo = fields.replyTo;
  if(replyTo && replyTo !== "null") {
    tweetData.replyToId = replyTo;
  }

  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async(key) => {

    const file = files[key];
    const cloudinaryRessource = await uploadToCloudinary(file.filepath);

    return createMediaFile({
      url: cloudinaryRessource.secure_url,
      providerPublicId: cloudinaryRessource.public_id,
      userId: userId,
      tweetId: tweet.id
    })
  });

  await Promise.all(filePromises);
  

  return {
    hello: 'world'
  }
})