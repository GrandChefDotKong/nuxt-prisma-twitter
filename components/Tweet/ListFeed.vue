<template>
  <div>
    <div v-if="noTweets">
      <p class="">No Tweets ...</p>
    </div>
    <ul v-else>
      <li v-for="tweet in props.tweets" 
        :key="tweet.id"
        class="pb-4 border-b hoover:bg-gray-100 cursor-pointer 
        dark:hover:bg-dim-300" 
        :class="[twitterBorderColor, defaultTransition]"
        @click.native="redirect(tweet)"
      >
        <TweetItem :tweet="tweet" compact />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const { twitterBorderColor, defaultTransition } = 
    useTailwindConfig();
  const props = defineProps({
    tweets: {
      type: Array,
      required: true
    }
  });

  function redirect(tweet) {
    navigateTo(`/status/${tweet.id}`)
  }

  const noTweets = computed(() => props.tweets.length === 0);
</script>
