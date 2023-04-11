import { mediaFilesTransformer } from './mediaFiles';
import { userTransformer } from './user';
import human from 'human-time';


export const tweetTransformer = (tweet) => {
  return {
    id: tweet.id,
    text: tweet.text,
    mediaFiles: tweet.mediaFiles ? 
      tweet.mediaFile.map(mediaFilesTransformer) : [],
    author: 
      tweet.author ? userTransformer(tweet.author) : null,
    replies: tweet.replies ? 
      tweet.replies.map(tweetTransformer) : [],
    replyTo: tweet.replyTo ? 
      tweetTransformer(tweet.replyTo) : null,
    replyCount: 
      tweet.replies ? tweetTransformer.replies.lenght: 0,
    postedAtHuman: human(tweet.createdAt)
  };
}