<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title>Home / Twitter</Title>
      </Head>
      <TweetDetails :user="user" :tweet="tweet" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
  const loading = ref(false);
  const tweet = ref(null)
  const { getTweetById } = useTweet();
  const { useAuthUser } = useAuth();
  const user = useAuthUser();

  watch(() => useRoute().fullPath, () => getTweet());

  function getTweetIdFromRoute() {
    return useRoute().params.id as string;
  }

  async function getTweet() {
    loading.value = true;
    try {
      const tweetId = getTweetIdFromRoute();
      const response = await getTweetById(tweetId);
      tweet.value = response.tweet;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  onBeforeMount(() => {
    getTweet()
  })

</script>