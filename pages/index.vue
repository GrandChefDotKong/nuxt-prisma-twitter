<template>
  <div>
    <MainSection title="Home" :loading="loading">
      content
    </MainSection>
  </div>
</template>

<script setup lang="ts">
  const loading = ref(false);
</script>

<style scoped>

</style>