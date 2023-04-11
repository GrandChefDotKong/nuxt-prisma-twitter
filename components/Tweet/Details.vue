<template>
  <div>
    <TweetItem :tweet="props.tweet" />
    <TweetForm 
      placeholcer="Tweet your reply" 
      :reply-to="props.tweet" 
      :user="props.user"
      @on-success="handleFormSuccess"
    />
    <TweetLsiFeed :tweets="replies" />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    tweet: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
  });

  const replies = computed(() => props.tweet?.replies || []);
  
  function handleFormSuccess(tweet) {
    navigateTo({
      path: `/status/${tweet.id}`
    })
  }
</script>
