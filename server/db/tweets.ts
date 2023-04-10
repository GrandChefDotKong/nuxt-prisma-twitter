import { TweetData } from '~~/types/tweet';
import { prisma } from '.';

export const createTweet = (tweetData: TweetData) => {
  return prisma.tweet.create({
    data: tweetData
  })
}

export const getTweets = (params = {}) => {
  return prisma.tweet.findMany({
    ...params
  });
}