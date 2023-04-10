import { mediaFilesTransformer } from "./mediaFiles"
import { userTransformer } from "./user"

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
  }
}