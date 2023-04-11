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
        placeholder="What's happening"
        @onSubmit="handleFormSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const loading = ref(false);
  const emits = defineEmits(['onSuccess']);
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
      const response = await postTweet({
        text: data.text,
        mediaFiles: data.mediaFiles,
        replyTo: props.replyTo?.id
      });
      emits('onSuccess', response.tweet);
    } catch (error) {
      console.log(error); 
    } finally {
      loading.value = false;
    }
  }
</script>

<style scoped>

</style>
