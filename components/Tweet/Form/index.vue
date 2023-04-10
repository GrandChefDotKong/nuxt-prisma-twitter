<template>
  <div>
    <div 
      v-if="loading" 
      class="flex items-center justify-center py-6"
    >
      <UISpinner />
    </div>
    <div v-else>
      <TweetFormInput
        :user="props.user"
        placeholder="What's happenig"
        @onSubmit="handleFormSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const loading = ref(false);

  const { postTweet } = useTweet();

  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  });

  async function handleFormSubmit(data) {
    loading.value = true
    try {
      const response = await postTweet(data);
      console.log(response); 
    } catch (error) {
      console.log(error); 
    } finally {
      loading.value = false;
    }
  }
</script>

<style scoped>

</style>
